'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useCustomForm } from './useCustomForm.js';
import { mergeComponents, renderFieldControl, wrapFieldLayout } from './registry.js';
import { createUnstyledComponents } from './unstyled.js';
export function CustomForm({ definition, initialValues, engineOptions, components, classNames, idPrefix = 'cf', disabled = false, hideHeading = false, submitLabel = 'Submit', onSubmit, renderStep, }) {
    const form = useCustomForm({ definition, initialValues, engineOptions });
    const [submitting, setSubmitting] = useState(false);
    const merged = mergeComponents(createUnstyledComponents(classNames), components);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const result = form.validate();
        if (!result.valid)
            return;
        if (!onSubmit)
            return;
        setSubmitting(true);
        try {
            await onSubmit(form.getSubmitValues());
            form.reset();
        }
        finally {
            setSubmitting(false);
        }
    };
    const renderFields = (fields) => fields.map((field) => {
        const key = field.definition.key;
        const id = `${idPrefix}-${key}`;
        const props = {
            field,
            id,
            name: key,
            value: form.values[key] ?? null,
            onChange: (value) => form.setValue(key, value),
            disabled,
            error: form.fieldErrors[key],
            engineOptions,
        };
        const control = renderFieldControl(props, merged);
        return (_jsx("div", { children: wrapFieldLayout(props, control, classNames) }, field.definition.id));
    });
    const stepsContent = form.steps.map((step) => {
        const fieldsNode = renderFields(step.fields);
        if (renderStep)
            return renderStep(step, () => fieldsNode);
        return (_jsxs("div", { "data-cf-step": step.stepId || undefined, children: [step.stepName && _jsx("h4", { children: step.stepName }), fieldsNode] }, step.stepId || 'default'));
    });
    return (_jsxs("form", { className: classNames?.root, onSubmit: handleSubmit, noValidate: true, "data-cf-form": definition.key, children: [!hideHeading && definition.label && (_jsx("h3", { className: classNames?.heading, children: definition.label })), !hideHeading && definition.description && (_jsx("p", { className: classNames?.description, children: definition.description })), stepsContent, onSubmit && (_jsx("button", { type: "submit", className: classNames?.submit, disabled: disabled || submitting, children: submitting ? 'Submitting…' : submitLabel }))] }));
}
//# sourceMappingURL=CustomForm.js.map