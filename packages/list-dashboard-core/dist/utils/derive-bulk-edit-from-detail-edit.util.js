/** Reuses single-entity detail edit hooks for bulk edit overlays. */
export function deriveBulkEditHooksFromDetailEdit(edit, options = {}) {
    const prepareEdit = options.preparePayableAccounts
        ?? (edit.prepareEdit
            ? (onReady) => {
                edit.prepareEdit({ entity: {}, refData: {} }, () => onReady([]));
            }
            : undefined);
    return {
        documentTypes: edit.documentTypes,
        lockedFields: edit.lockedFields,
        entityToEditValues: edit.entityToEditValues,
        buildEditForm: (template, refData, _payableAccountOptions) => edit.buildEditForm({ entity: template, refData }),
        refreshEditForm: edit.refreshEditForm
            ? (template, refData, _payableAccountOptions) => edit.refreshEditForm({ entity: template, refData })
            : undefined,
        prepareEdit,
        onEditValuesChange: (template, values, setFormValue, refData = {}) => edit.onEditValuesChange?.({ entity: template, refData }, values, setFormValue),
        validateBeforeSave: (template, values, documents, refData = {}) => edit.validateBeforeSave?.({
            entity: template,
            refData,
            values,
            documents,
            existingDocumentCount: 0,
        }),
    };
}
//# sourceMappingURL=derive-bulk-edit-from-detail-edit.util.js.map