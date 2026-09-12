import * as i0 from '@angular/core';
import { Injectable, InjectionToken, Inject, inject, TemplateRef, ViewContainerRef, Input, Directive } from '@angular/core';
import { BehaviorSubject, firstValueFrom, merge, filter, take, map } from 'rxjs';
import { contextFrom, effectivePermissions, effectiveRoles, effectiveRoleGroups } from '@web-toolkit/auth-core';
import { Router } from '@angular/router';

class RbacStateService {
    snapshotSubject = new BehaviorSubject(null);
    loadedSubject = new BehaviorSubject(false);
    loadStateSubject = new BehaviorSubject('idle');
    snapshot$ = this.snapshotSubject.asObservable();
    loaded$ = this.loadedSubject.asObservable();
    loadState$ = this.loadStateSubject.asObservable();
    get snapshot() {
        return this.snapshotSubject.value;
    }
    get loaded() {
        return this.loadedSubject.value;
    }
    get loadState() {
        return this.loadStateSubject.value;
    }
    get idpSub() {
        return this.snapshotSubject.value?.idpSub;
    }
    beginLoad() {
        this.loadStateSubject.next('loading');
    }
    setSnapshot(snapshot) {
        this.snapshotSubject.next(snapshot);
        this.loadedSubject.next(true);
        this.loadStateSubject.next('loaded');
    }
    markFailed() {
        this.snapshotSubject.next(null);
        this.loadedSubject.next(false);
        this.loadStateSubject.next('failed');
    }
    clear() {
        this.snapshotSubject.next(null);
        this.loadedSubject.next(false);
        this.loadStateSubject.next('cleared');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: RbacStateService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: RbacStateService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: RbacStateService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/** Thrown when RBAC snapshot is unavailable (load failed, session cleared, or unauthorized). */
class RbacNotLoadedError extends Error {
    reason;
    constructor(reason, message) {
        super(message ?? `RBAC snapshot not available (${reason})`);
        this.name = 'RbacNotLoadedError';
        this.reason = reason;
    }
}

const RBAC_DATA_SOURCE = new InjectionToken('RBAC_DATA_SOURCE');

class AuthorizationService {
    dataSource;
    state;
    get snapshot$() {
        return this.state.snapshot$;
    }
    get snapshot() {
        return this.state.snapshot;
    }
    get loaded$() {
        return this.state.loaded$;
    }
    constructor(dataSource, state) {
        this.dataSource = dataSource;
        this.state = state;
    }
    contextFrom(entityType, entityId) {
        return contextFrom(entityType, entityId);
    }
    async load() {
        this.state.beginLoad();
        try {
            const snapshot = await firstValueFrom(this.dataSource.fetchCurrentUserSnapshot());
            this.state.setSnapshot(snapshot);
        }
        catch (error) {
            this.state.markFailed();
            throw error;
        }
    }
    async refresh() {
        await this.load();
    }
    clear() {
        this.state.clear();
    }
    async waitUntilLoaded() {
        if (this.state.loadState === 'loaded' && this.state.snapshot) {
            return this.state.snapshot;
        }
        if (this.state.loadState === 'failed') {
            throw new RbacNotLoadedError('failed');
        }
        if (this.state.loadState === 'cleared') {
            throw new RbacNotLoadedError('cleared');
        }
        return firstValueFrom(merge(this.state.snapshot$.pipe(filter((snapshot) => snapshot !== null), take(1)), this.state.loadState$.pipe(filter((state) => state === 'failed' || state === 'cleared'), take(1), map((state) => {
            throw new RbacNotLoadedError(state);
        }))));
    }
    effectivePermissions(context) {
        const snapshot = this.state.snapshot;
        if (!snapshot) {
            return [];
        }
        return effectivePermissions(snapshot, context);
    }
    effectiveRoles(context) {
        const snapshot = this.state.snapshot;
        if (!snapshot) {
            return [];
        }
        return effectiveRoles(snapshot, context);
    }
    effectiveRoleGroups(context) {
        const snapshot = this.state.snapshot;
        if (!snapshot) {
            return [];
        }
        return effectiveRoleGroups(snapshot, context);
    }
    hasPermission(permission) {
        return this.effectivePermissions().includes(permission);
    }
    hasPermissionInContext(permission, context) {
        return this.effectivePermissions(context).includes(permission);
    }
    hasAnyRole(...roles) {
        const current = this.effectiveRoles();
        return roles.some((role) => current.includes(role));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: AuthorizationService, deps: [{ token: RBAC_DATA_SOURCE }, { token: RbacStateService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: AuthorizationService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: AuthorizationService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [RBAC_DATA_SOURCE]
                }] }, { type: RbacStateService }] });

/**
 * The auth contract the rest of the app codes against.
 * Implement this abstract class and register it via a factory provider in your app's CoreAuthModule.
 */
class PlatformAuthService {
}

class UserIdentityService {
    platformAuth;
    authorization;
    isLoggedIn;
    /** OIDC claims from the Auth0 token — app-domain profile fields are NOT here. */
    loggedInUser;
    constructor(platformAuth, authorization) {
        this.platformAuth = platformAuth;
        this.authorization = authorization;
    }
    async configure() {
        this.platformAuth.initialize();
        this.isLoggedIn = await this.isUserLoggedIn();
        if (this.isLoggedIn) {
            this.loggedInUser = await this.getUser();
            try {
                await this.authorization.load();
            }
            catch {
                // load() marks state as failed; callers use waitUntilLoaded() fail-closed behavior.
            }
        }
    }
    loginWith(loginType, prompt, redirectUrl) {
        this.platformAuth.loginWith(loginType, prompt, redirectUrl);
    }
    logout() {
        this.authorization.clear();
        this.platformAuth.logout();
    }
    async isUserLoggedIn() {
        return await firstValueFrom(this.platformAuth.isAuthenticated$);
    }
    async getAccessToken() {
        return await firstValueFrom(this.platformAuth.getAccessTokenSilently());
    }
    async getUser() {
        const user = await firstValueFrom(this.platformAuth.user$.pipe(filter((value) => !!value)));
        return user;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: UserIdentityService, deps: [{ token: PlatformAuthService }, { token: AuthorizationService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: UserIdentityService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: UserIdentityService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: PlatformAuthService }, { type: AuthorizationService }] });

/**
 * Structural directive — shows content only when the user has the required permission(s).
 *
 * @example
 * <div *hasPermission="'read:users'">...</div>
 * <div *hasPermission="['update:project']; context: projectCtx; requireAll: true">...</div>
 */
class HasPermissionDirective {
    templateRef = inject((TemplateRef));
    viewContainer = inject(ViewContainerRef);
    authorization = inject(AuthorizationService);
    snapshotSubscription;
    hasPermission;
    hasPermissionContext;
    hasPermissionRequireAll = false;
    ngOnInit() {
        this.snapshotSubscription = this.authorization.snapshot$.subscribe(() => {
            this.updateView();
        });
    }
    ngOnChanges() {
        this.updateView();
    }
    ngOnDestroy() {
        this.snapshotSubscription?.unsubscribe();
    }
    updateView() {
        const permissions = Array.isArray(this.hasPermission)
            ? this.hasPermission
            : [this.hasPermission];
        if (!permissions.length || !permissions[0]) {
            this.viewContainer.clear();
            return;
        }
        const check = (p) => this.hasPermissionContext
            ? this.authorization.effectivePermissions(this.hasPermissionContext).includes(p)
            : this.authorization.effectivePermissions().includes(p);
        const visible = this.hasPermissionRequireAll
            ? permissions.every(check)
            : permissions.some(check);
        if (visible) {
            if (this.viewContainer.length === 0) {
                this.viewContainer.createEmbeddedView(this.templateRef);
            }
        }
        else {
            this.viewContainer.clear();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: HasPermissionDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "21.2.21", type: HasPermissionDirective, isStandalone: true, selector: "[hasPermission]", inputs: { hasPermission: "hasPermission", hasPermissionContext: "hasPermissionContext", hasPermissionRequireAll: "hasPermissionRequireAll" }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: HasPermissionDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[hasPermission]',
                    standalone: true,
                }]
        }], propDecorators: { hasPermission: [{
                type: Input
            }], hasPermissionContext: [{
                type: Input
            }], hasPermissionRequireAll: [{
                type: Input
            }] } });

const USER_IDENTITY = new InjectionToken('USER_IDENTITY');

const AUTH_CONFIG = new InjectionToken('AUTH_CONFIG');

/** Route guard factory — waits for RBAC load then checks permissions. */
function permissionGuard(required, options) {
    const permissions = Array.isArray(required) ? required : [required];
    return async () => {
        const authorization = inject(AuthorizationService);
        const router = inject(Router);
        const config = inject(AUTH_CONFIG);
        try {
            await authorization.waitUntilLoaded();
        }
        catch (error) {
            if (error instanceof RbacNotLoadedError) {
                router.navigate([config.loginUrl]);
                return false;
            }
            throw error;
        }
        const check = (p) => authorization.effectivePermissions(options?.context).includes(p);
        const allowed = options?.requireAll
            ? permissions.every(check)
            : permissions.some(check);
        if (allowed) {
            return true;
        }
        router.navigateByUrl(config.postLoginUrl);
        return false;
    };
}

/**
 * Redirects unauthenticated users to `AuthConfig.loginUrl`.
 * Preserves the originally requested URL in router state as `redirect_to`.
 * No bypass logic — apps that need a dev bypass should wrap this guard.
 */
async function authGuard(_route, state) {
    const identityService = inject(USER_IDENTITY);
    const router = inject(Router);
    const config = inject(AUTH_CONFIG);
    if (await identityService.isUserLoggedIn()) {
        return true;
    }
    const request_uri = state.url;
    const redirect_to = request_uri !== '/' ? request_uri : undefined;
    if (redirect_to) {
        router.navigate([config.loginUrl], { state: { redirect_to } });
    }
    else {
        router.navigate([config.loginUrl]);
    }
    return false;
}
/**
 * Redirects already-authenticated users to `AuthConfig.postLoginUrl`.
 * No bypass logic — apps that need a dev bypass should wrap this guard.
 */
async function noAuthGuard() {
    const identityService = inject(USER_IDENTITY);
    const router = inject(Router);
    const config = inject(AUTH_CONFIG);
    if (await identityService.isUserLoggedIn()) {
        router.navigateByUrl(config.postLoginUrl);
        return false;
    }
    return true;
}

/**
 * Returns url when it is a safe same-app relative path; otherwise fallback.
 * Rejects protocol-relative paths (//), absolute URLs, backslashes, and empty values.
 */
function sanitizeInternalRedirectUrl(url, fallback) {
    if (!url || typeof url !== 'string') {
        return fallback;
    }
    const trimmed = url.trim();
    if (!trimmed.startsWith('/') || trimmed.startsWith('//')) {
        return fallback;
    }
    if (trimmed.includes('\\') || /[\u0000-\u001F\u007F]/.test(trimmed)) {
        return fallback;
    }
    if (typeof window === 'undefined' || !window.location?.origin) {
        return trimmed;
    }
    try {
        const resolved = new URL(trimmed, window.location.origin);
        if (resolved.origin !== window.location.origin) {
            return fallback;
        }
        return resolved.pathname + resolved.search + resolved.hash;
    }
    catch {
        return fallback;
    }
}

// Services

/**
 * Generated bundle index. Do not edit.
 */

export { AUTH_CONFIG, AuthorizationService, HasPermissionDirective, PlatformAuthService, RBAC_DATA_SOURCE, RbacNotLoadedError, RbacStateService, USER_IDENTITY, UserIdentityService, authGuard, noAuthGuard, permissionGuard, sanitizeInternalRedirectUrl };
//# sourceMappingURL=web-toolkit-auth-angular.mjs.map
