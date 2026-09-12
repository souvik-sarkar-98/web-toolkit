import { phoneValueForValidation } from './phone.js';
function toMatchString(fieldType, value) {
    switch (fieldType) {
        case 'text':
        case 'textarea':
        case 'email':
        case 'phone':
        case 'date':
            return typeof value === 'string' ? value : null;
        case 'number':
            if (typeof value === 'number' && Number.isFinite(value))
                return String(value);
            if (typeof value === 'string' && value.trim() !== '')
                return value.trim();
            return null;
        default:
            return null;
    }
}
export function normalizeFieldValidationRules(rules) {
    if (rules == null)
        return [];
    return Array.isArray(rules) ? rules : [rules];
}
function candidateForRule(fieldType, value, engineOptions) {
    let candidate = toMatchString(fieldType, value);
    if (fieldType === 'phone') {
        candidate = phoneValueForValidation(value, engineOptions);
    }
    return candidate;
}
export function matchesValidationRule(fieldType, value, rule, engineOptions) {
    if (!rule.pattern)
        return true;
    const candidate = candidateForRule(fieldType, value, engineOptions);
    if (candidate === null || candidate === '')
        return true;
    try {
        return new RegExp(rule.pattern).test(candidate);
    }
    catch {
        return true;
    }
}
/** All rules must pass (AND). Empty rule list passes. */
export function matchesValidationPattern(fieldType, value, rules, engineOptions) {
    return findFirstFailedValidationRule(fieldType, value, rules, engineOptions) == null;
}
export function findFirstFailedValidationRule(fieldType, value, rules, engineOptions) {
    for (const rule of normalizeFieldValidationRules(rules)) {
        if (!matchesValidationRule(fieldType, value, rule, engineOptions)) {
            return rule;
        }
    }
    return null;
}
export function validationErrorMessage(fieldLabel, rules, failedRule) {
    const rule = failedRule ??
        normalizeFieldValidationRules(rules).find((r) => Boolean(r.regexErrMsg)) ??
        normalizeFieldValidationRules(rules)[0];
    return rule?.regexErrMsg ?? `Enter a valid ${fieldLabel.toLowerCase()}`;
}
export function validationErrorMessageForValue(fieldType, fieldLabel, value, rules, engineOptions) {
    const failed = findFirstFailedValidationRule(fieldType, value, rules, engineOptions);
    return validationErrorMessage(fieldLabel, rules, failed);
}
//# sourceMappingURL=validation-pattern.js.map