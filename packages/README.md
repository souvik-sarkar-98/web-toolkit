# Shared packages

Cross-framework custom forms UI (aligned with NestJS `custom-forms` ruleset semantics, no runtime coupling):

| Package | Role |
|---------|------|
| `@web-toolkit/forms-core` | Models, visibility/dependency engine, validation, API adapters, submit serialization, demo fixture |
| `@web-toolkit/forms-react` | `useCustomForm`, `CustomForm`, field renderers; subpaths `@web-toolkit/forms-react/bootstrap` (Bootstrap preset + CSS), `@web-toolkit/forms-react/zod` |
| `@web-toolkit/forms-angular` | `CfForm`, `CfField`, `FormEngineService`, Angular Material defaults, `provideCfFormMaterial()` |
| `@web-toolkit/comment-core` | Mention tokens, comment editor value builders |
| `@web-toolkit/comment-angular` | `cm-mention-comment-editor`, `cm-comment-content` |
| `@web-toolkit/list-dashboard-core` | Unified list/detail/form config, form resolution, preparation, compilation |
| `@web-toolkit/list-dashboard-angular` | `<na-list-dashboard>` Angular host |
| `@web-toolkit/auth-core` | Auth user / RBAC models and helpers |
| `@web-toolkit/auth-angular` | Angular auth/RBAC services, guards, permission directive |

Each package has its own `package.json` and builds to `dist/**`. Apps depend on workspace packages with `"@web-toolkit/...": "*"`.

```bash
npm run build   # turbo builds packages before apps (^build)
```

After changing a package, run `npm run changeset` from the repo root to record a semver bump. Fixed version groups: forms, comments, list-dashboard, and auth. Packages publish as public scoped packages to npmjs. See the root [README](../README.md#package-versioning-changesets).

**Style override:** pass custom `components` (React) or `CUSTOM_FORM_FIELD_RENDERERS` / `CF_FORM_CLASS_NAMES` (Angular). Public Bootstrap preset: `@web-toolkit/forms-react/bootstrap` + `@web-toolkit/forms-react/bootstrap.css`. Angular defaults use Material; call `provideCfFormMaterial()` and import a theme.

**Legacy API payloads:** use `fromPublicFormDefinition()` and `normalizeFieldType()` to map uppercase mock types (`TEXT`, `CHECKBOX`) to canonical lowercase types.
