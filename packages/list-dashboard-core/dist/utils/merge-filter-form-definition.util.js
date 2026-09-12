/** Preserve dynamic field options when chip unchanged. */
export function mergeFilterFormDefinition(current, next) {
    if (current?.key === next.key
        && current.fields.length === next.fields.length
        && current.fields.every((field, index) => field.key === next.fields[index]?.key)) {
        return {
            ...current,
            fields: current.fields.map((field, index) => ({
                ...field,
                fieldOptions: next.fields[index].fieldOptions,
                isHidden: next.fields[index].isHidden,
                placeholder: next.fields[index].placeholder,
            })),
        };
    }
    return next;
}
//# sourceMappingURL=merge-filter-form-definition.util.js.map