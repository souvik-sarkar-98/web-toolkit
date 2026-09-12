import type { FilteredListDashboardConfig } from '../config/filtered-list-dashboard.config.js';
import type { ListFilterCriteria } from '../models/infinite-list.model.js';
import type { ListDashboardConfig, ListDashboardOperations, ResolvedListDashboardConfig } from '../config/list-dashboard.config.js';
import { ListFormResolver, type ListFormResolverContext } from './list-form.runtime.js';
import { ListPreparationRunner } from './list-preparation.runtime.js';
export declare function compileListDashboardConfig<TEntity, TCriteria extends ListFilterCriteria, TContext = unknown, TOperations extends ListDashboardOperations = ListDashboardOperations>(resolved: ResolvedListDashboardConfig<TEntity, TCriteria, TContext, TOperations>): FilteredListDashboardConfig<TEntity, TCriteria>;
export declare function resolveListDashboardConfig<TEntity, TCriteria extends ListFilterCriteria, TContext = unknown, TOperations extends ListDashboardOperations = ListDashboardOperations>(definition: ListDashboardConfig<TEntity, TCriteria, TContext, TOperations>, context: ListFormResolverContext, resolver?: ListFormResolver): Promise<ResolvedListDashboardConfig<TEntity, TCriteria, TContext, TOperations>>;
export declare class ListDashboardRuntime<TContext = unknown> {
    readonly forms: ListFormResolver;
    compile<TEntity, TCriteria extends ListFilterCriteria, TOperations extends ListDashboardOperations = ListDashboardOperations>(definition: ListDashboardConfig<TEntity, TCriteria, TContext, TOperations>, context: ListFormResolverContext): Promise<FilteredListDashboardConfig<TEntity, TCriteria>>;
    preparation<TEntity, TCriteria extends ListFilterCriteria>(definition: ListDashboardConfig<TEntity, TCriteria, TContext>): ListPreparationRunner<TContext> | undefined;
    invalidateForms(id?: string): void;
}
//# sourceMappingURL=list-config.runtime.d.ts.map