# `@ssweb-toolkit/forms-angular`

Angular Material renderer for `@ssweb-toolkit/forms-core`: `cf-form`, `cf-field`, stepper, and `FormEngineService`.

## Install

```bash
npm install @ssweb-toolkit/forms-core @ssweb-toolkit/forms-angular
```

**Peers:** Angular `^19 || ^20 || ^21` (`animations`, `cdk`, `common`, `core`, `forms`, `material`). Import a Material theme in the host app.

## Setup

```ts
import { provideCfFormMaterial } from '@ssweb-toolkit/forms-angular';

export const appConfig: ApplicationConfig = {
  providers: [provideCfFormMaterial()],
};
```

Optional tokens:

- `CUSTOM_FORM_FIELD_RENDERERS` — replace or extend field widgets.
- `CF_FORM_CLASS_NAMES` — extra CSS class map on the form root.

## Usage

```html
<cf-form
  [definition]="definition"
  [initialValues]="initialValues"
  (submitted)="onSubmit($event)"
/>
```

```ts
import { FormEngineService } from '@ssweb-toolkit/forms-angular';

// Injected per cf-form instance. Use CfField / CfFormStepper for multi-step flows.
```

Public surface:

- `CfFormComponent` (`cf-form`)
- `CfFieldComponent` (`cf-field`)
- `CfFormStepperComponent` + `CfFormStepperStepDirective`
- `FormEngineService`
- `provideCfFormMaterial()`

## Build (this repo)

```bash
npm run build -w @ssweb-toolkit/forms-angular
```

Fixed version group with `forms-core` and `forms-react`. Overview: [root README](../../README.md).
