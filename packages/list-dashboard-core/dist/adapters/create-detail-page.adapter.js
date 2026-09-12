export function createDetailPageAdapter(config) {
    let context = {
        activeChip: () => '',
        canUpdate: () => false,
    };
    const adapter = {
        editDocumentAllowedTypes: config.edit.documentTypes,
        // Getter, not a snapshot: configs may switch flow per chip or per entity.
        get editFlowKind() {
            return config.edit.kind ?? 'form';
        },
        getTitle: (entity) => config.getTitle(entity),
        getEntityId: config.getEntityId
            ? (entity) => config.getEntityId(entity)
            : undefined,
        buildViewSections: (entity, refData) => config.buildViewSections(entity, refData),
        buildDocumentsLoadingSection: config.documents?.buildLoadingSection,
        loadDocumentsSection: config.documents
            ? entityId => config.documents.loadSection(entityId)
            : undefined,
        resolveDocumentsEntityId: config.documents?.resolveEntityId,
        fetchById: id => config.fetchById(id),
        findInList: (items, id) => config.findInList(items, id),
        refreshOnOpen: config.refreshOnOpen
            ? entity => config.refreshOnOpen(entity)
            : undefined,
        resolvePrimaryActionLabel: entity => config.primaryAction?.when({ ...context, entity })
            ? config.primaryAction.label
            : undefined,
        buildEditSummary: ctx => config.edit.buildEditSummary(ctx),
        buildEditForm: ctx => config.edit.buildEditForm(ctx),
        entityToEditValues: entity => config.edit.entityToEditValues(entity),
        refreshEditForm: config.edit.refreshEditForm
            ? ctx => config.edit.refreshEditForm(ctx)
            : undefined,
        prepareEdit: config.edit.prepareEdit,
        onEditValuesChange: config.edit.onEditValuesChange,
        validateBeforeSave: config.edit.validateBeforeSave,
        save: ctx => config.edit.save(ctx),
    };
    return Object.assign(adapter, {
        configure(ctx) {
            context = ctx;
        },
    });
}
//# sourceMappingURL=create-detail-page.adapter.js.map