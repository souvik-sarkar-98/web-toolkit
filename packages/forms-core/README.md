# `@web-toolkit/forms-core`

Framework-agnostic models and engine for definition-driven custom forms: visibility, dependent options, validation, dates/phones, and submit serialization.

## Install

```bash
npm install @web-toolkit/forms-core
```

Peer-free; UI lives in [`forms-react`](../forms-react/README.md) and [`forms-angular`](../forms-angular/README.md).

## What it does

- **Definitions** — `FormDefinition`, field types (`text`, `select`, `date_range`, `phone`, …), steps, conditions, dependent options, date constraints.
- **Engine** — `FormEngine`, `resolveAllFields`, `validateForm`, `isFieldVisible` / `canSeeFormField`, `getDependentOptions`.
- **Adapters** — `fromPublicFormDefinition()`, `normalizeFieldType()` for uppercase/legacy payloads (`TEXT`, `CHECKBOX`).
- **Submit** — `serializeFormSubmitValues` / `serializePublicFormSubmitValues`.
- **Builders** — `baseField`, `toFieldOptions`, `dateConstraintsTodayMax`.
- **Fixture** — `DEMO_FORM_DEFINITION` for local experiments (not production seed data).

Field values that are hidden by conditions should not be submitted; the serialize helpers follow the resolved visible field set.

## Usage

```ts
import {
  FormEngine,
  fromPublicFormDefinition,
  serializeFormSubmitValues,
} from '@web-toolkit/forms-core';

const definition = fromPublicFormDefinition(apiPayload);
const engine = new FormEngine(definition, { initialValues: {} });

engine.setValue('country', 'IN');
const result = engine.validate();
if (result.valid) {
  const body = serializeFormSubmitValues(engine.getSubmitValues(), definition);
}
```

## Build (this repo)

```bash
npm run build -w @web-toolkit/forms-core
npm test -w @web-toolkit/forms-core
```

Fixed version group with `forms-react` and `forms-angular`. Overview: [root README](../../README.md).
