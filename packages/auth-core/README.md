# `@ssweb-toolkit/auth-core`

Framework-agnostic identity and RBAC models. No HTTP, no Angular, no token storage.

## Install

```bash
npm install @ssweb-toolkit/auth-core
```

## What it does

- **`AuthUser`** — standard OIDC-style claims (`sub`, `email`, names, `picture`). Domain modules should use the app’s internal user id, not `sub`, except at the auth boundary.
- **RBAC snapshots** — `RbacAccessSnapshot`, `RbacScopedAccessSnapshot`, `RbacUserAccessSnapshot`, `CurrentUserRbacDto`, `RbacEntityContext`.
- **Helpers** — `snapshotFromCurrentUser`, `findScopedAccess`, `effectivePermissions`, `effectiveRoles`, `effectiveRoleGroups`, `contextFrom`.

UI guards and login live in [`auth-angular`](../auth-angular/README.md).

## Usage

```ts
import {
  snapshotFromCurrentUser,
  effectivePermissions,
  contextFrom,
} from '@ssweb-toolkit/auth-core';

const snapshot = snapshotFromCurrentUser(dto);
const perms = effectivePermissions(snapshot, contextFrom({ entityType: 'donation', entityId }));
```

## Build (this repo)

```bash
npm run build -w @ssweb-toolkit/auth-core
npm test -w @ssweb-toolkit/auth-core
```

Fixed version group with `auth-angular`. Overview: [root README](../../README.md).
