'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { isDateRangeValue, mergeDateRangePart } from '@ssweb-toolkit/forms-core';
import { createUnstyledComponents } from '../unstyled.js';
import { renderPhoneFieldControl } from '../phone-field.js';
export const publicFormClassNames = {
    root: 'dynamic-form',
    field: 'mb-3',
    label: 'form-label',
    error: 'invalid-feedback d-block',
    requiredMark: 'text-danger ms-1',
    submit: 'btn btn-primary',
    heading: 'h5 mb-3',
    description: 'text-muted mb-4',
    phoneGroup: 'cf-phone-input-group',
    phoneCountry: 'form-select cf-phone-country',
    phoneNational: 'form-control cf-phone-national',
};
export function createPublicBootstrapFormComponents() {
    const base = createUnstyledComponents(publicFormClassNames);
    return {
        ...base,
        select: (p) => (_jsxs("select", { id: p.id, name: p.name, className: `form-select${p.error ? ' is-invalid' : ''}`, value: typeof p.value === 'string' ? p.value : '', onChange: (e) => p.onChange(e.target.value), onBlur: p.onBlur, disabled: p.disabled, "aria-invalid": p.error ? true : undefined, "data-cf-type": "select", children: [_jsx("option", { value: "", children: "Select\u2026" }), p.field.availableOptions.map((opt) => (_jsx("option", { value: opt.key, children: opt.label }, opt.key)))] })),
        boolean: (p) => (_jsx("div", { className: "form-check", children: _jsx("input", { id: p.id, name: p.name, type: "checkbox", className: `form-check-input${p.error ? ' is-invalid' : ''}`, checked: Boolean(p.value), onChange: (e) => p.onChange(e.target.checked), onBlur: p.onBlur, disabled: p.disabled, "aria-invalid": p.error ? true : undefined, "data-cf-type": "boolean" }) })),
        text: (p) => (_jsx("input", { id: p.id, name: p.name, type: "text", className: `form-control${p.error ? ' is-invalid' : ''}`, value: typeof p.value === 'string' ? p.value : '', onChange: (e) => p.onChange(e.target.value), onBlur: p.onBlur, disabled: p.disabled, "aria-invalid": p.error ? true : undefined })),
        textarea: (p) => (_jsx("textarea", { id: p.id, name: p.name, className: `form-control${p.error ? ' is-invalid' : ''}`, rows: 4, value: typeof p.value === 'string' ? p.value : '', onChange: (e) => p.onChange(e.target.value), onBlur: p.onBlur, disabled: p.disabled, "aria-invalid": p.error ? true : undefined })),
        email: (p) => (_jsx("input", { id: p.id, name: p.name, type: "email", className: `form-control${p.error ? ' is-invalid' : ''}`, value: typeof p.value === 'string' ? p.value : '', onChange: (e) => p.onChange(e.target.value), onBlur: p.onBlur, disabled: p.disabled, "aria-invalid": p.error ? true : undefined })),
        phone: (p) => {
            const invalid = p.error ? ' is-invalid' : '';
            const multiCountry = (p.engineOptions?.phoneCountryCodes?.length ?? 0) > 1;
            return renderPhoneFieldControl(p, {
                group: `cf-phone-input-group${invalid}`,
                country: multiCountry
                    ? `form-select cf-phone-country${invalid}`
                    : `cf-phone-country-static${invalid}`,
                national: `form-control cf-phone-national${invalid}`,
            });
        },
        number: (p) => (_jsx("input", { id: p.id, name: p.name, type: "number", className: `form-control${p.error ? ' is-invalid' : ''}`, value: p.value === '' || p.value === null ? '' : String(p.value), onChange: (e) => {
                const v = e.target.value;
                p.onChange(v === '' ? '' : Number(v));
            }, onBlur: p.onBlur, disabled: p.disabled, "aria-invalid": p.error ? true : undefined })),
        date: (p) => (_jsx("input", { id: p.id, name: p.name, type: "date", className: `form-control${p.error ? ' is-invalid' : ''}`, value: typeof p.value === 'string' ? p.value : '', onChange: (e) => p.onChange(e.target.value), onBlur: p.onBlur, disabled: p.disabled, "aria-invalid": p.error ? true : undefined })),
        date_range: (p) => {
            const range = isDateRangeValue(p.value) ? p.value : {};
            return (_jsxs("div", { className: "d-flex gap-2", "data-cf-type": "date_range", children: [_jsx("input", { id: `${p.id}-start`, name: `${p.name}-start`, type: "date", className: `form-control${p.error ? ' is-invalid' : ''}`, value: range.startDate ?? '', onChange: (e) => p.onChange(mergeDateRangePart(range, { startDate: e.target.value || undefined })), onBlur: p.onBlur, disabled: p.disabled, "aria-invalid": p.error ? true : undefined, "aria-label": "Start date" }), _jsx("input", { id: `${p.id}-end`, name: `${p.name}-end`, type: "date", className: `form-control${p.error ? ' is-invalid' : ''}`, value: range.endDate ?? '', onChange: (e) => p.onChange(mergeDateRangePart(range, { endDate: e.target.value || undefined })), onBlur: p.onBlur, disabled: p.disabled, "aria-invalid": p.error ? true : undefined, "aria-label": "End date" })] }));
        },
    };
}
//# sourceMappingURL=public-bootstrap.js.map