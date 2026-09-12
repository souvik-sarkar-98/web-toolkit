# @web-toolkit/list-dashboard-core

Framework-agnostic types, configs, adapters, form/preparation runtime, and
route-query utilities for the Universal List Dashboard.

## Exports

- **Models** — `ListRowItem`, `ListDetailSection` (incl. `item_list`), `ChipFilter`, etc.
- **Configs** — `ListDashboardConfig` (unified consumer config), `FilteredListPageConfig`,
  `ListDetailPageConfig`, `FilteredListDashboardConfig`, `ListActionDef`
- **Runtime** — form resolve (local/backend/hybrid), preparation runner,
  `resolveListDashboardConfig` / `compileListDashboardConfig`
- **Adapters** — `createListPageAdapter`, `createDetailPageAdapter`
- **Utils** — route query, detail helpers (`detailItemListSection`), bulk-edit derive

## Consumer contract

Feature authors write one `ListDashboardConfig` and pass it to
`<na-list-dashboard>` in `@web-toolkit/list-dashboard-angular`.

Nested collections use `type: 'item_list'` sections — not host forRoot widgets.

## Build

```bash
npm run build -w @web-toolkit/list-dashboard-core
npm test -w @web-toolkit/list-dashboard-core
```

## Consumers

- `@web-toolkit/list-dashboard-angular` — Angular host
- `@web-toolkit/list-dashboard-react` — planned
- `@web-toolkit/public-site` — backend form resolution via `resolveListForm`

## Docs

- [ADR: unified list dashboard](./docs/ADR-unified-list-dashboard.md)
- [Design tokens](./docs/TOKENS.md)
- Angular developer guide: `@web-toolkit/list-dashboard-angular` → `docs/DEVELOPER-GUIDE.html`
