import { mergeFilterFormDefinition } from '../utils/merge-filter-form-definition.util.js';
export function createListPageAdapter(config) {
    const runtime = {
        asyncFilterOptions: [],
        filterPermissions: {},
    };
    function applyScope(criteria) {
        if (runtime.forEventId && config.applyProjectEventScope) {
            return config.applyProjectEventScope(criteria, runtime.forEventId);
        }
        return criteria;
    }
    const adapter = {
        get pageSize() {
            return config.pageSize;
        },
        get searchDebounceMs() {
            return config.searchDebounceMs;
        },
        buildChips: () => config.chips,
        getDefaultChip: () => config.defaultChip,
        isValidChip: chipId => config.isValidChip(chipId),
        cloneCriteria: criteria => config.cloneCriteria(criteria),
        getDefaultCriteriaForChip: chipId => applyScope(config.getDefaultCriteriaForChip(chipId, runtime)),
        onChipSelect(_chipId, defaultCriteria) {
            return applyScope(defaultCriteria);
        },
        buildCriteriaFromRoute(chipId, routeFilters, _routeState) {
            let criteria = config.getDefaultCriteriaForChip(chipId, runtime);
            if (runtime.listRouteSync) {
                criteria = runtime.listRouteSync.mergeFiltersIntoCriteria(criteria, routeFilters);
            }
            return applyScope(criteria);
        },
        buildFilterFormDefinition(chipId, refData, criteria) {
            return config.buildFilterFormDefinition(chipId, refData, criteria, runtime);
        },
        mergeFilterFormDefinition(current, next) {
            return mergeFilterFormDefinition(current, next);
        },
        criteriaToFilterFormValues: (chipId, criteria) => config.criteriaToFilterFormValues(chipId, criteria),
        filterFormValuesToCriteria(chipId, values, criteria) {
            return config.filterFormValuesToCriteria(chipId, values, criteria, runtime);
        },
        buildAppliedFilters: (criteria, refData, chipId) => config.buildAppliedFilters(criteria, refData, chipId),
        countActiveSheetFilters: (criteria, chipId) => config.countActiveSheetFilters(criteria, chipId),
        removeFilterById: (criteria, pillId) => config.removeFilterById(criteria, pillId),
        loadPage: query => config.loadPage(query, runtime),
    };
    return Object.assign(adapter, {
        configure(options) {
            runtime.forEventId = options.forEventId;
            runtime.listRouteSync = options.listRouteSync;
            runtime.filterPermissions = options.filterPermissions ?? runtime.filterPermissions;
        },
        setAsyncFilterOptions(options) {
            runtime.asyncFilterOptions = options;
        },
        setRefData(refData) {
            runtime.refData = refData;
        },
        getRuntimeContext() {
            return runtime;
        },
    });
}
//# sourceMappingURL=create-list-page.adapter.js.map