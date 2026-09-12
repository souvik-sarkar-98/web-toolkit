export function getDependentOptions(dependentOptions, parentValue) {
    if (parentValue === null || parentValue === undefined || parentValue === '')
        return [];
    const key = Array.isArray(parentValue) ? parentValue[0] : String(parentValue);
    return dependentOptions.optionMap[key] ?? [];
}
//# sourceMappingURL=dependent-options.js.map