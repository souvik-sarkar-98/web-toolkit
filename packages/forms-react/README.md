# `@web-toolkit/forms-react`

React renderer for `@web-toolkit/forms-core`: hook, form component, and optional Bootstrap / Zod / unstyled entry points.

## Install

```bash
npm install @web-toolkit/forms-core @web-toolkit/forms-react
```

**Peers:** `react` and `react-dom` (^18 or ^19). Optional: `react-hook-form` (^7), `zod` (^3 or ^4).

## Entry points

| Import | Purpose |
|--------|---------|
| `@web-toolkit/forms-react` | `CustomForm`, `useCustomForm`, `createCustomFormResolver` |
| `@web-toolkit/forms-react/unstyled` | Headless field components (bring your own markup) |
| `@web-toolkit/forms-react/bootstrap` | Bootstrap preset + class names |
| `@web-toolkit/forms-react/bootstrap.css` | Preset stylesheet (import in the host app) |
| `@web-toolkit/forms-react/zod` | Zod helpers for the definition |

Override look-and-feel with the `components` and `classNames` props; you do not have to use Bootstrap.

## Usage

```tsx
import { CustomForm } from '@web-toolkit/forms-react';
import { createPublicBootstrapFormComponents } from '@web-toolkit/forms-react/bootstrap';
import '@web-toolkit/forms-react/bootstrap.css';

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
import { useCustomForm } from '@web-toolkit/forms-react';

const form = useCustomForm({ definition, initialValues });
form.setValue('email', value);
const { valid } = form.validate();
```

## Build (this repo)

```bash
npm run build -w @web-toolkit/forms-react
```

Fixed version group with `forms-core` and `forms-angular`. Overview: [root README](../../README.md).
