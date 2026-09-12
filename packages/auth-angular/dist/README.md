# `@ssweb-toolkit/auth-angular`

Angular auth and RBAC: identity, permission checks, route guards, and a structural directive. The host app implements IdP login and the RBAC HTTP source.

## Install

```bash
npm install @ssweb-toolkit/auth-core @ssweb-toolkit/auth-angular
```

**Peers:** Angular `^19 || ^20 || ^21` (`common`, `core`, `router`) and `rxjs` ^7.

## What you provide

| Token / class | Host responsibility |
|---------------|---------------------|
| `PlatformAuthService` | Abstract class: `isAuthenticated$`, `user$`, silent token, `loginWith`, `logout`, `initialize` |
| `AUTH_CONFIG` | `loginUrl`, `postLoginUrl` |
| `RBAC_DATA_SOURCE` | `fetchCurrentUserSnapshot()` |
| `USER_IDENTITY` | Optional facade if the app maps IdP user to an internal user id |

## Public surface

- **Services** — `AuthorizationService`, `RbacStateService`, `UserIdentityService`, `PlatformAuthService`
- **Guards** — `authGuard`, `noAuthGuard`, `permissionGuard`
- **Directive** — `*hasPermission`
- **Utils** — `sanitizeInternalRedirectUrl`
- **Errors** — `RbacNotLoadedError`

## Usage

```html
<div *hasPermission="'read:users'">…</div>
<div *hasPermission="['update:project']; context: projectCtx; requireAll: true">…</div>
```

```ts
import { Routes } from '@angular/router';
import { authGuard, permissionGuard } from '@ssweb-toolkit/auth-angular';

export const routes: Routes = [
  {
    path: 'admin',
    canActivate: [authGuard, permissionGuard('admin:access')],
    loadComponent: () => import('./admin.page'),
  },
];
```

Call `AuthorizationService` for programmatic checks. Do not pass raw IdP `sub` into non-auth feature modules; use the app user id from identity.

## Build (this repo)

```bash
npm run build -w @ssweb-toolkit/auth-angular
npm test -w @ssweb-toolkit/auth-angular
```

Fixed version group with `auth-core`. Overview: [root README](../../README.md).
