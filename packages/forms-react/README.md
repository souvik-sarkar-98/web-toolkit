# `@ssweb-toolkit/forms-react`

React renderer for `@ssweb-toolkit/forms-core`: hook, form component, and optional Bootstrap / Zod / unstyled entry points.

## Install

```bash
npm install @ssweb-toolkit/forms-core @ssweb-toolkit/forms-react
```

**Peers:** `react` and `react-dom` (^18 or ^19). Optional: `react-hook-form` (^7), `zod` (^3 or ^4).

## Entry points

| Import | Purpose |
|--------|---------|
| `@ssweb-toolkit/forms-react` | `CustomForm`, `useCustomForm`, `createCustomFormResolver` |
| `@ssweb-toolkit/forms-react/unstyled` | Headless field components (bring your own markup) |
| `@ssweb-toolkit/forms-react/bootstrap` | Bootstrap preset + class names |
| `@ssweb-toolkit/forms-react/bootstrap.css` | Preset stylesheet (import in the host app) |
| `@ssweb-toolkit/forms-react/zod` | Zod helpers for the definition |

Override look-and-feel with the `components` and `classNames` props; you do not have to use Bootstrap.

## Usage

```tsx
import { CustomForm } from '@ssweb-toolkit/forms-react';
import { createPublicBootstrapFormComponents } from '@ssweb-toolkit/forms-react/bootstrap';
import '@ssweb-toolkit/forms-react/bootstrap.css';

<CustomForm
  definition={definition}
  initialValues={{}}
  components={createPublicBootstrapFormComponents()}
  onSubmit={async (values) => {
    await save(values);
  }}
/>
```

Headless:

```tsx
import { useCustomForm } from '@ssweb-toolkit/forms-react';

const form = useCustomForm({ definition, initialValues });
form.setValue('email', value);
const { valid } = form.validate();
```

## Build (this repo)

```bash
npm run build -w @ssweb-toolkit/forms-react
```

Fixed version group with `forms-core` and `forms-angular`. Overview: [root README](../../README.md).
