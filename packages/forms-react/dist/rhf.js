import { validateForm } from '@web-toolkit/forms-core';
/**
 * Resolver compatible with react-hook-form that validates visible fields using forms-core.
 */
export function createCustomFormResolver(definition, options) {
    return async (values) => {
        const result = validateForm(definition, values, options);
        if (result.valid) {
            return { values, errors: {} };
        }
        const errors = {};
        for (const [key, message] of Object.entries(result.fieldErrors)) {
            errors[key] = { type: 'custom', message };
        }
        return { values: {}, errors };
    };
}
//# sourceMappingURL=rhf.js.map