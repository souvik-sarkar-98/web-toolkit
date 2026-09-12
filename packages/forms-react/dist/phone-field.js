'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { formatPhoneFieldValue, parsePhoneFieldValue, resolvePhoneCountryCodeOptions, } from '@web-toolkit/forms-core';
export function renderPhoneFieldControl(props, classNames) {
    const engineOptions = props.engineOptions;
    const countryOptions = resolvePhoneCountryCodeOptions(engineOptions);
    const parsed = parsePhoneFieldValue(props.value, engineOptions);
    const invalid = props.error ? true : undefined;
    const showCountrySelect = countryOptions.length > 1;
    const onCountryChange = (code) => {
        props.onChange(formatPhoneFieldValue(code, parsed.nationalNumber));
    };
    const onNationalChange = (national) => {
        props.onChange(formatPhoneFieldValue(parsed.countryCode, national));
    };
    const groupClass = classNames?.group ??
        'cf-phone-field';
    const countryFlex = { flex: '0 0 25%', maxWidth: '25%', minWidth: 0 };
    const nationalFlex = { flex: '1 1 auto', minWidth: 0 };
    const useLayoutCss = Boolean(classNames?.group?.includes('cf-phone-input-group'));
    return (_jsxs("div", { className: groupClass, "data-cf-type": "phone", "data-cf-phone-combined": "true", role: "group", "aria-label": "Phone number", style: classNames?.group
            ? undefined
            : {
                display: 'flex',
                alignItems: 'stretch',
                border: '1px solid #ccc',
                borderRadius: 4,
                overflow: 'hidden',
            }, children: [showCountrySelect ? (_jsx("select", { id: `${props.id}-country`, className: classNames?.country, value: parsed.countryCode, onChange: (e) => onCountryChange(e.target.value), onBlur: props.onBlur, disabled: props.disabled, "aria-label": "Country code", style: useLayoutCss
                    ? { cursor: 'pointer' }
                    : classNames?.country
                        ? { ...countryFlex, cursor: 'pointer' }
                        : { ...countryFlex, border: 'none', cursor: 'pointer' }, children: countryOptions.map((opt) => (_jsx("option", { value: opt.code, children: opt.label ?? opt.code }, opt.code))) })) : (_jsx("span", { className: classNames?.country, "aria-hidden": "true", style: classNames?.country
                    ? countryFlex
                    : {
                        ...countryFlex,
                        padding: '0.375rem 0.5rem',
                        background: '#f4f4f4',
                        borderRight: '1px solid #ccc',
                    }, children: parsed.countryCode })), _jsx("input", { id: props.id, name: props.name, type: "tel", inputMode: "tel", autoComplete: "tel-national", className: classNames?.national, value: parsed.nationalNumber, onChange: (e) => onNationalChange(e.target.value), onBlur: props.onBlur, disabled: props.disabled, "aria-invalid": invalid, placeholder: "Phone number", style: useLayoutCss
                    ? undefined
                    : classNames?.national
                        ? nationalFlex
                        : { ...nationalFlex, border: 'none', padding: '0.375rem 0.5rem', outline: 'none' } })] }));
}
//# sourceMappingURL=phone-field.js.map