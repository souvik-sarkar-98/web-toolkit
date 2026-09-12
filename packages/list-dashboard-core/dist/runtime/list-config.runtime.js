import { ListFormResolver, } from './list-form.runtime.js';
import { ListPreparationRunner } from './list-preparation.runtime.js';
function boundForm(binding, forms) {
    const resolved = forms[binding.source];
    if (!resolved) {
        throw new Error(`List form source was not resolved: ${binding.source}`);
    }
    return binding.transform
        ? binding.transform(resolved.definition)
        : resolved.definition;
}
export function compileListDashboardConfig(resolved) {
    const { definition, forms } = resolved;
    const { editForm, ...detail } = definition.detail;
    const create = definition.create;
    const bulkEdit = definition.bulkEdit;
    const { mapToListRow: _mapToListRow, ...list } = definition.list;
    return {
        list,
        detail: {
            ...detail,
            edit: {
                ...detail.edit,
                buildEditForm: editForm
                    ? () => boundForm(editForm, forms)
                    : detail.edit.buildEditForm,
            },
        },
        create: create
            ? (() => {
                const { form, ...config } = create;
                return {
                    ...config,
                    buildCreateForm: form
                        ? () => boundForm(form, forms)
                        : config.buildCreateForm,
                };
            })()
            : undefined,
        bulkEdit: bulkEdit
            ? (() => {
                const { form, ...config } = bulkEdit;
                return {
                    ...config,
                    buildEditForm: form
                        ? () => boundForm(form, forms)
                        : config.buildEditForm,
                };
            })()
            : undefined,
        resolvePermissions: definition.permissions?.resolve,
        selectableWhen: definition.behavior?.selectableWhen,
        canUpdateEntity: definition.behavior?.canUpdateEntity,
        refDataLoaders: definition.behavior?.refDataLoaders,
        searchPlaceholder: definition.meta.searchPlaceholder,
        filterSheetTitle: definition.meta.filterSheetTitle,
        emptyMessage: definition.meta.emptyMessage,
        detailRouteSync: definition.meta.detailRouteSync,
        pageName: definition.meta.pageName,
    };
}
export async function resolveListDashboardConfig(definition, context, resolver = new ListFormResolver()) {
    const entries = await Promise.all(Object.entries(definition.forms ?? {}).map(async ([id, source]) => {
        const resolved = await resolver.resolve(id, source, context);
        return [id, resolved];
    }));
    return { definition, forms: Object.fromEntries(entries) };
}
export class ListDashboardRuntime {
    forms = new ListFormResolver();
    async compile(definition, context) {
        const resolved = await resolveListDashboardConfig(definition, context, this.forms);
        return compileListDashboardConfig(resolved);
    }
    preparation(definition) {
        return definition.preparation
            ? new ListPreparationRunner(definition.preparation.tasks, definition.preparation.triggers)
            : undefined;
    }
    invalidateForms(id) {
        this.forms.invalidate(id);
    }
}
//# sourceMappingURL=list-config.runtime.js.map