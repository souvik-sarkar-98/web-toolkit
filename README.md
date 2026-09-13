# Web Toolkit

npm workspaces + [Turborepo](https://turbo.build/) of **shared frontend libraries** for Nabarun web clients. This repository publishes `@ssfrontend-toolkit/*` packages; applications live in separate repos (for example the frontend monorepo) and consume these libraries from npm or a workspace link.

## Packages

| Family | Packages | Docs |
|--------|----------|------|
| Forms | `@ssfrontend-toolkit/forms-core`, `forms-react`, `forms-angular` | [forms-core](packages/forms-core/README.md) · [forms-react](packages/forms-react/README.md) · [forms-angular](packages/forms-angular/README.md) |
| Comments | `@ssfrontend-toolkit/comment-core`, `comment-react`, `comment-angular` | [comment-core](packages/comment-core/README.md) · [comment-react](packages/comment-react/README.md) · [comment-angular](packages/comment-angular/README.md) |
| List dashboard | `@ssfrontend-toolkit/list-dashboard-core`, `list-dashboard-angular` | [list-dashboard-core](packages/list-dashboard-core/README.md) · [list-dashboard-angular](packages/list-dashboard-angular/README.md) |
| Auth | `@ssfrontend-toolkit/auth-core`, `auth-angular` | [auth-core](packages/auth-core/README.md) · [auth-angular](packages/auth-angular/README.md) |

Catalog and versioning notes: [packages/README.md](packages/README.md).

**Convention:** `*-core` is framework-agnostic TypeScript. `*-angular` / `*-react` are UI and DI adapters that depend on the matching core package.

## Prerequisites

- Node.js 22+
- npm 10+

Install once at the repo root:

```bash
npm install
```

## Commands (from repo root)

| Script | Description |
|--------|-------------|
| `npm run build` | Build all workspace packages (dependency order via `^build`) |
| `npm run lint` | Type-check / lint workspaces that define `lint` |
| `npm run test` | Test workspaces that define `test` |
| `npm run watch:packages` | Rebuild `packages/*` on change |
| `npm run changeset` | Record a semver bump + changelog entry |
| `npm run changeset:status` | Show pending changesets |
| `npm run version-packages` | Apply changesets (bump versions, changelogs) |
| `npm run release` | Build `packages/*` and publish (npm dist-tag `latest`) |
| `npm run release:beta` | Build `packages/*` and publish with npm dist-tag `beta` |

Target one package with `npm run <script> -w @ssfrontend-toolkit/<name>`.

## Adding a shared package

Create `packages/<name>/package.json` (name `@ssfrontend-toolkit/<name>`), then depend on it from another workspace with `"*"` or from an app via npm. Turborepo runs dependency builds first via `dependsOn: ["^build"]`. After a public API or behavior change, run `npm run changeset`.

## Package versioning (Changesets)

This repo uses [Changesets](https://github.com/changesets/changesets) to version and publish libraries under `packages/`.

### Day-to-day workflow

1. **After changing a library**, add a changeset:

   ```bash
   npm run changeset
   ```

   Choose the affected package(s), a semver bump (`patch` / `minor` / `major`), and a short changelog summary.

2. **When ready to release**, on the main line with all changesets merged:

   ```bash
   npm run version-packages   # bumps package.json + CHANGELOG.md
   npm run release            # stable: build packages/ then publish (dist-tag latest)
   # on stage after `changeset pre enter beta`: npm run release:beta
   ```

   Commit the version/changelog updates (for example `chore: version packages`).

3. **Check pending releases** (needs a git repo with a `main` branch):

   ```bash
   npm run changeset:status
   ```

Dependent packages that use workspace `"*"` ranges get a patch bump when an upstream library changes (`updateInternalDependencies` in [`.changeset/config.json`](.changeset/config.json)).

**Linked families:** packages in the same `fixed` group always release together at the same version. A changeset for any member bumps the whole group (the highest selected bump wins).

| Group | Packages |
|-------|----------|
| Forms | `@ssfrontend-toolkit/forms-core`, `@ssfrontend-toolkit/forms-react`, `@ssfrontend-toolkit/forms-angular` |
| Comments | `@ssfrontend-toolkit/comment-core`, `@ssfrontend-toolkit/comment-react`, `@ssfrontend-toolkit/comment-angular` |
| List dashboard | `@ssfrontend-toolkit/list-dashboard-core`, `@ssfrontend-toolkit/list-dashboard-angular` |
| Auth | `@ssfrontend-toolkit/auth-core`, `@ssfrontend-toolkit/auth-angular` |

### CI release pipeline

GitHub Actions uses the **deploy-platform** reusable workflows (this workspace’s `deploy-main` repo, GitHub `nabarun-ngo/deploy-platform`). The publish workflow versions with Changesets and publishes `@ssfrontend-toolkit/*` to the public npm registry. It does **not** create git tags or GitHub Releases. Version history lives in `package.json`, `CHANGELOG.md`, and npm.

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| [`.github/workflows/ci.yml`](.github/workflows/ci.yml) | Pull requests to `main` or `stage` | Calls `reusable-ci-pr-check.yml` (install, lint, type-check, build, test) |
| [`.github/workflows/changeset-check.yml`](.github/workflows/changeset-check.yml) | Pull requests to `main` or `stage` | Calls `reusable-ci-changeset-check.yml`; fails if `packages/` changed without a changeset |
| [`.github/workflows/release.yml`](.github/workflows/release.yml) | Push to `main` or `stage` | Calls `reusable-ci-publish.yml` with `publish_to_npm: true`. Opens a **Version Packages** PR when changesets exist; publishes when that PR merges |

| Branch | npm dist-tag | Install |
|--------|----------------|---------|
| `main` | `latest` | `npm install @ssfrontend-toolkit/auth-angular` |
| `stage` | `beta` | `npm install @ssfrontend-toolkit/auth-angular@beta` |

**Setup (one-time):**

1. Add repository secret **`NPM_TOKEN`** with an npm automation token that can publish `@ssfrontend-toolkit/*` packages.
2. Ensure you are logged in to npmjs with publish rights for `@ssfrontend-toolkit` (`npm login`). Root [`.npmrc`](.npmrc) points the scope at `registry.npmjs.org`.
3. On the **`stage` branch only**, enter Changesets prerelease mode once and commit the result:

   ```bash
   npx changeset pre enter beta
   git add .changeset/pre.json
   git commit -m "chore: enter beta prerelease mode"
   ```

   Do not run that on `main`. To ship a stable line from `stage` later, run `npx changeset pre exit` on `stage` (or merge to `main` without `pre.json`).
4. Merge PRs with changesets as usual — the release workflow opens a follow-up PR that bumps versions and changelogs.
5. Merge the **Version Packages** PR — packages are built and published automatically (`latest` on `main`, `beta` on `stage`).

Local releases (`npm run release` / `npm run release:beta`) still work if you prefer manual control.

### Publishing notes

- Libraries under `packages/` publish as **public** packages to npmjs (`publishConfig.access: public` + `registry.npmjs.org`).
- Anyone can install without a token: `npm install @ssfrontend-toolkit/auth-angular` (stable) or `npm install @ssfrontend-toolkit/auth-angular@beta`.
- For CI publish, use an npm automation token (`NPM_TOKEN`) with write access to the `@ssfrontend-toolkit` org.
- Workflows call `nabarun-ngo/deploy-platform` (`reusable-ci-publish.yml`, `reusable-ci-changeset-check.yml`, `reusable-ci-pr-check.yml`). That is the GitHub identity of this workspace’s `deploy-main` repo; change the `uses:` owner/name if the ops repo is published under a different path.
