import { Observable } from 'rxjs';
import { RbacUserAccessSnapshot, RbacEntityContext, AuthUser } from '@web-toolkit/auth-core';
import * as i0 from '@angular/core';
import { InjectionToken, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

type RbacLoadState = 'idle' | 'loading' | 'loaded' | 'failed' | 'cleared';
declare class RbacStateService<T extends RbacUserAccessSnapshot = RbacUserAccessSnapshot> {
    private readonly snapshotSubject;
    private readonly loadedSubject;
    private readonly loadStateSubject;
    readonly snapshot$: Observable<T | null>;
    readonly loaded$: Observable<boolean>;
    readonly loadState$: Observable<RbacLoadState>;
    get snapshot(): T | null;
    get loaded(): boolean;
    get loadState(): RbacLoadState;
    get idpSub(): string | undefined;
    beginLoad(): void;
    setSnapshot(snapshot: T): void;
    markFailed(): void;
    clear(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RbacStateService<any>, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RbacStateService<any>>;
}

/**
 * Abstraction over the backend call that loads RBAC state.
 * Each consuming app provides its own implementation (e.g. a generated API client service).
 */
interface RbacDataSource<T extends RbacUserAccessSnapshot = RbacUserAccessSnapshot> {
    fetchCurrentUserSnapshot(): Observable<T>;
}
declare const RBAC_DATA_SOURCE: InjectionToken<RbacDataSource<RbacUserAccessSnapshot>>;

declare class AuthorizationService<T extends RbacUserAccessSnapshot = RbacUserAccessSnapshot> {
    private dataSource;
    private state;
    get snapshot$(): Observable<T | null>;
    get snapshot(): T | null;
    get loaded$(): Observable<boolean>;
    constructor(dataSource: RbacDataSource<T>, state: RbacStateService<T>);
    contextFrom(entityType: string, entityId: string): RbacEntityContext;
    load(): Promise<void>;
    refresh(): Promise<void>;
    clear(): void;
    waitUntilLoaded(): Promise<T>;
    effectivePermissions(context?: RbacEntityContext): string[];
    effectiveRoles(context?: RbacEntityContext): string[];
    effectiveRoleGroups(context?: RbacEntityContext): string[];
    hasPermission(permission: string): boolean;
    hasPermissionInContext(permission: string, context: RbacEntityContext): boolean;
    hasAnyRole(...roles: string[]): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthorizationService<any>, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthorizationService<any>>;
}

type LoginType = 'email' | 'password' | 'sms';
/**
 * The auth contract the rest of the app codes against.
 * Implement this abstract class and register it via a factory provider in your app's CoreAuthModule.
 */
declare abstract class PlatformAuthService {
    abstract get isAuthenticated$(): Observable<boolean>;
    abstract get user$(): Observable<AuthUser | null | undefined>;
    abstract getAccessTokenSilently(): Observable<string>;
    abstract initialize(): void;
    abstract loginWith(loginType: LoginType, prompt?: string, redirectUrl?: string): void;
    abstract logout(): void;
}

declare class UserIdentityService<T extends RbacUserAccessSnapshot = RbacUserAccessSnapshot> {
    protected platformAuth: PlatformAuthService;
    protected authorization: AuthorizationService<T>;
    isLoggedIn: boolean;
    /** OIDC claims from the Auth0 token — app-domain profile fields are NOT here. */
    loggedInUser: AuthUser;
    constructor(platformAuth: PlatformAuthService, authorization: AuthorizationService<T>);
    configure(): Promise<void>;
    loginWith(loginType: LoginType, prompt?: string, redirectUrl?: string): void;
    logout(): void;
    isUserLoggedIn(): Promise<boolean>;
    getAccessToken(): Promise<string>;
    getUser(): Promise<AuthUser>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserIdentityService<any>, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserIdentityService<any>>;
}

type RbacLoadFailureReason = 'failed' | 'cleared';
/** Thrown when RBAC snapshot is unavailable (load failed, session cleared, or unauthorized). */
declare class RbacNotLoadedError extends Error {
    readonly reason: RbacLoadFailureReason;
    constructor(reason: RbacLoadFailureReason, message?: string);
}

/**
 * Structural directive — shows content only when the user has the required permission(s).
 *
 * @example
 * <div *hasPermission="'read:users'">...</div>
 * <div *hasPermission="['update:project']; context: projectCtx; requireAll: true">...</div>
 */
declare class HasPermissionDirective implements OnChanges, OnInit, OnDestroy {
    private readonly templateRef;
    private readonly viewContainer;
    private readonly authorization;
    private snapshotSubscription?;
    hasPermission: string | string[];
    hasPermissionContext?: RbacEntityContext;
    hasPermissionRequireAll: boolean;
    ngOnInit(): void;
    ngOnChanges(): void;
    ngOnDestroy(): void;
    private updateView;
    static ɵfac: i0.ɵɵFactoryDeclaration<HasPermissionDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<HasPermissionDirective, "[hasPermission]", never, { "hasPermission": { "alias": "hasPermission"; "required": false; }; "hasPermissionContext": { "alias": "hasPermissionContext"; "required": false; }; "hasPermissionRequireAll": { "alias": "hasPermissionRequireAll"; "required": false; }; }, {}, never, never, true, never>;
}

interface PermissionGuardOptions {
    context?: RbacEntityContext;
    requireAll?: boolean;
}
/** Route guard factory — waits for RBAC load then checks permissions. */
declare function permissionGuard(required: string | string[], options?: PermissionGuardOptions): () => Promise<boolean>;

/**
 * Redirects unauthenticated users to `AuthConfig.loginUrl`.
 * Preserves the originally requested URL in router state as `redirect_to`.
 * No bypass logic — apps that need a dev bypass should wrap this guard.
 */
declare function authGuard(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>;
/**
 * Redirects already-authenticated users to `AuthConfig.postLoginUrl`.
 * No bypass logic — apps that need a dev bypass should wrap this guard.
 */
declare function noAuthGuard(): Promise<boolean>;

/** Route configuration that the auth guards need. Provided by each consuming app. */
interface AuthConfig {
    /** Where unauthenticated users are sent (e.g. login page URL). */
    loginUrl: string;
    /** Default redirect after login and fallback for permission-denied. */
    postLoginUrl: string;
}
declare const AUTH_CONFIG: InjectionToken<AuthConfig>;

/** Minimal identity contract used by guards and HTTP error handling. */
interface UserIdentityFacade {
    configure(): Promise<void>;
    loginWith(loginType: LoginType, prompt?: string, redirectUrl?: string): void;
    logout(): void;
    isUserLoggedIn(): Promise<boolean>;
    getAccessToken(): Promise<string>;
    getUser(): Promise<AuthUser>;
}
declare const USER_IDENTITY: InjectionToken<UserIdentityFacade>;

/**
 * Returns url when it is a safe same-app relative path; otherwise fallback.
 * Rejects protocol-relative paths (//), absolute URLs, backslashes, and empty values.
 */
declare function sanitizeInternalRedirectUrl(url: string | undefined | null, fallback: string): string;

export { AUTH_CONFIG, AuthorizationService, HasPermissionDirective, PlatformAuthService, RBAC_DATA_SOURCE, RbacNotLoadedError, RbacStateService, USER_IDENTITY, UserIdentityService, authGuard, noAuthGuard, permissionGuard, sanitizeInternalRedirectUrl };
export type { AuthConfig, LoginType, PermissionGuardOptions, RbacDataSource, RbacLoadFailureReason, RbacLoadState, UserIdentityFacade };
