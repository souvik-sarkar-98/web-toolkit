# Shared packages

Framework-agnostic cores plus Angular / React adapters. Semantics for custom forms align with the NestJS custom-forms ruleset; there is no runtime coupling to the backend.

| Package | Role |
|---------|------|
| [`@web-toolkit/forms-core`](forms-core/README.md) | Models, visibility/dependency engine, validation, API adapters, submit serialization |
| [`@web-toolkit/forms-react`](forms-react/README.md) | `useCustomForm`, `CustomForm`; subpaths `unstyled`, `bootstrap` (+ CSS), `zod` |
| [`@web-toolkit/forms-angular`](forms-angular/README.md) | `cf-form`, `cf-field`, `FormEngineService`, Material defaults via `provideCfFormMaterial()` |
| [`@web-toolkit/comment-core`](comment-core/README.md) | Mention tokens, comment editor value builders, create/update payloads |
| [`@web-toolkit/comment-react`](comment-react/README.md) | `MentionCommentEditor`, `CommentContent`, `useMentionAutocomplete` |
| [`@web-toolkit/comment-angular`](comment-angular/README.md) | `cm-mention-comment-editor`, `cm-comment-content` |
| [`@web-toolkit/list-dashboard-core`](list-dashboard-core/README.md) | Unified list/detail/form config, form resolution, preparation, compilation |
| [`@web-toolkit/list-dashboard-angular`](list-dashboard-angular/README.md) | `<na-list-dashboard>` Angular host |
| [`@web-toolkit/auth-core`](auth-core/README.md) | Auth user and RBAC models/helpers |
| [`@web-toolkit/auth-angular`](auth-angular/README.md) | Auth/RBAC services, guards, `*hasPermission` |

Each package has its own `package.json` and builds to `dist/**`. Consumers install published versions from npm, or use workspace `"*"` ranges inside this monorepo.

```bash
npm run build   # turbo builds packages in dependency order (^build)
```

After changing a package, run `npm run changeset` from the repo root. Fixed version groups: forms, comments, list-dashboard, and auth. Packages publish as public scoped packages to npmjs (`latest` from `main`, `beta` from `stage`). CI does not create git tags or GitHub Releases. See the root [README](../README.md#package-versioning-changesets).

**Forms style override:** pass custom `components` (React) or `CUSTOM_FORM_FIELD_RENDERERS` / `CF_FORM_CLASS_NAMES` (Angular). Public Bootstrap preset: `@web-toolkit/forms-react/bootstrap` + `@web-toolkit/forms-react/bootstrap.css`. Angular defaults use Material; call `provideCfFormMaterial()` and import a theme.

**Legacy API payloads:** use `fromPublicFormDefinition()` and `normalizeFieldType()` to map uppercase mock types (`TEXT`, `CHECKBOX`) to canonical lowercase types.
