# Angular monorepo

npm workspaces + [Turborepo](https://turbo.build/) for the NGO Nabarun web apps.

## Structure

| Path | Package | Stack |
|------|---------|--------|
| [`apps/public-site`](apps/public-site) | `@web-toolkit/public-site` | Next.js 15 (static export) |
| [`apps/internal-app`](apps/internal-app) | `@web-toolkit/internal-app` | Angular (portal shell) |
| [`packages/`](packages) | `@web-toolkit/*` | Shared libraries |

## Prerequisites

- Node.js 20+
- npm 10+

Install once at the repo root:

```bash
npm install
```

## Commands (from repo root)

| Script | Description |
|--------|-------------|
| `npm run build` | Build all workspace packages and apps |
| `npm run lint` | Lint all workspaces that define `lint` |
| `npm run test` | Test all workspaces that define `test` |
| `npm run watch:packages` | Rebuild `packages/*` on change |
| `npm run changeset` | Record a semver bump + changelog entry |
| `npm run changeset:status` | Show pending changesets |
| `npm run version-packages` | Apply changesets (bump versions, changelogs) |
| `npm run release` | Build `packages/*` and publish |

### Apps (run in the app folder or via workspace)

```bash
npm run dev -w @web-toolkit/public-site
npm run build -w @web-toolkit/public-site

npm run dev -w @web-toolkit/internal-app
npm run build -w @web-toolkit/internal-app
npm run build:stage -w @web-toolkit/internal-app
```

## Environment (public site)

Copy [`apps/public-site/.env.example`](apps/public-site/.env.example) to `apps/public-site/.env` and set values for local builds.

## Adding shared packages

Create `packages/<name>/package.json`, then depend on it from an app with a workspace version (for example `"@org/lib": "*"`). Turborepo runs dependency builds first via `dependsOn: ["^build"]`.

## Package versioning (Changesets)

This repo uses [Changesets](https://github.com/changesets/changesets) to version and publish libraries under `packages/`. Apps (`public`, `internal`) are ignored.

### Day-to-day workflow

1. **After making a change** to a library, add a changeset:

   ```bash
   npm run changeset
   ```

   Choose the affected package(s), semver bump (`patch` / `minor` / `major`), and write a short summary for the changelog.

2. **When ready to release**, on your main branch with all changesets merged:

   ```bash
   npm run version-packages   # bumps package.json + CHANGELOG.md
   npm run release            # build packages/ then publish (requires auth)
   ```

   Commit the version/changelog updates (for example `chore: version packages`).

3. **Check pending releases** at any time (requires a git repo with a `main` branch):

   ```bash
   npm run changeset:status
   ```

Dependent packages that use workspace `"*"` ranges get a patch bump automatically when an upstream library changes (`updateInternalDependencies` in [`.changeset/config.json`](.changeset/config.json)).

**Linked families:** packages in the same `fixed` group always release together at the same version:

| Group | Packages |
|-------|----------|
| Forms | `@web-toolkit/forms-core`, `@web-toolkit/forms-react`, `@web-toolkit/forms-angular` |
| Comments | `@web-toolkit/comment-core`, `@web-toolkit/comment-react`, `@web-toolkit/comment-angular` |
| List dashboard | `@web-toolkit/list-dashboard-core`, `@web-toolkit/list-dashboard-angular` |
| Auth | `@web-toolkit/auth-core`, `@web-toolkit/auth-angular` |

A changeset for any member bumps the whole group (the highest semver among selected bumps wins).

### CI release pipeline

GitHub Actions automates versioning and publishing on push to `main`:

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| [`.github/workflows/changeset-check.yml`](.github/workflows/changeset-check.yml) | Pull requests to `main` | Fails if `packages/` changed without a changeset |
| [`.github/workflows/release.yml`](.github/workflows/release.yml) | Push to `main` | Opens a **Version Packages** PR when changesets exist; publishes when that PR merges |

**Setup (one-time):**

1. Add repository secret **`NPM_TOKEN`** with an npm automation token that can publish `@web-toolkit/*` packages.
2. Ensure you are logged in to npmjs with publish rights for `@web-toolkit` (`npm login`). Root [`.npmrc`](.npmrc) points the scope at `registry.npmjs.org`.
3. Merge PRs with changesets as usual — the release workflow opens a follow-up PR that bumps versions and changelogs.
4. Merge the **Version Packages** PR — packages are built and published automatically.

Local releases (`npm run release`, etc.) still work if you prefer manual control.

### Publishing notes

- Libraries under `packages/` publish as **public** packages to npmjs (`publishConfig.access: public` + `registry.npmjs.org`).
- Anyone can install without a token: `npm install @web-toolkit/auth-angular`.
- Apps (`public-site`, `internal-app`) stay private and are ignored by Changesets.
- For CI publish, use an npm automation token (`NPM_TOKEN`) with write access to the `@web-toolkit` org.