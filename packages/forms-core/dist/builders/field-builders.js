export function toFieldOptions(items) {
    return (items ?? []).map(item => ({
        key: item.key,
        label: 'displayValue' in item && item.displayValue != null
            ? item.displayValue
            : (item.label ?? item.key),
    }));
}
export function baseField(partial) {
    return {
        placeholder: null,
        mandatory: false,
        fieldOptions: [],
        isHidden: false,
        isEncrypted: false,
        enabled: true,
        condition: null,
        dependentOptions: null,
        validationRules: null,
        ...partial,
    };
}
/** Common constraint: dates cannot be in the future. */
export function dateConstraintsTodayMax() {
    return { max: { kind: 'today' } };
}
//# sourceMappingURL=field-builders.js.map