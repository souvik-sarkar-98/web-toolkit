# @ssweb-toolkit/list-dashboard-core

Framework-agnostic types, configs, adapters, form/preparation runtime, and
route-query utilities for the Universal List Dashboard.

## Install

```bash
npm install @ssweb-toolkit/forms-core @ssweb-toolkit/list-dashboard-core
```

Depends on `@ssweb-toolkit/forms-core` for form definitions used in list create/edit/filter.

## Exports

- **Models** — `ListRowItem`, `ListDetailSection` (incl. `item_list`), `ChipFilter`, etc.
- **Configs** — `ListDashboardConfig` (unified consumer config), `FilteredListPageConfig`,
  `ListDetailPageConfig`, `FilteredListDashboardConfig`, `ListActionDef`
- **Runtime** — form resolve (local/backend/hybrid), preparation runner,
  `resolveListDashboardConfig` / `compileListDashboardConfig`
- **Adapters** — `createListPageAdapter`, `createDetailPageAdapter`
- **Utils** — route query, detail helpers (`detailItemListSection`), bulk-edit derive

## Consumer contract

Install from npm, or use workspace versions in this monorepo. Feature authors write one `ListDashboardConfig` and pass it to
`<na-list-dashboard>` in `@ssweb-toolkit/list-dashboard-angular`.

Nested collections use `type: 'item_list'` sections — not host forRoot widgets.

## Build

```bash
npm run build -w @ssweb-toolkit/list-dashboard-core
npm test -w @ssweb-toolkit/list-dashboard-core
```

## Consumers

- [`@ssweb-toolkit/list-dashboard-angular`](../list-dashboard-angular/README.md) — Angular host
- `@ssweb-toolkit/list-dashboard-react` — planned

Host applications (separate repos) import the core types and pass a compiled `ListDashboardConfig` into the Angular host.

## Docs

- [ADR: unified list dashboard](./docs/ADR-unified-list-dashboard.md)
- [Design tokens](./docs/TOKENS.md)
- [Angular package](../list-dashboard-angular/README.md) and [developer guide](../list-dashboard-angular/docs/DEVELOPER-GUIDE.html)

Overview: [root README](../../README.md).
