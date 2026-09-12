import { type FieldOption, type FormDefinition, type FormValues } from '@web-toolkit/forms-core';
export interface ListFormContext<TEntity = unknown> {
    dashboardId?: string;
    /** @deprecated Use dashboardId for new list-dashboard consumers. */
    experienceId?: string;
    slot?: string;
    chip?: string;
    activeChip?: string;
    entity?: TEntity;
    refData?: Readonly<Record<string, unknown>>;
    presets?: Readonly<Record<string, unknown>>;
    values?: Readonly<FormValues>;
    accumulatedValues?: Readonly<FormValues>;
    asyncOptions?: readonly FieldOption[] | Readonly<Record<string, readonly FieldOption[]>>;
    locale?: string;
    permissions?: readonly string[];
    data?: Readonly<Record<string, unknown>>;
}
/** @deprecated Use ListFormContext. */
export type ListFormResolverContext<TEntity = unknown> = ListFormContext<TEntity>;
export interface ListObservableSubscription {
    unsubscribe?: () => void;
}
export interface ListObservableLike<T> {
    subscribe(observer: {
        next?: (value: T) => void;
        error?: (error: unknown) => void;
        complete?: () => void;
    } | ((value: T) => void), error?: (error: unknown) => void, complete?: () => void): ListObservableSubscription | (() => void) | void;
}
export type ListAsyncResult<T> = PromiseLike<T> | ListObservableLike<T>;
export interface ListBackendFormEnvelope {
    definition: unknown;
    version?: string | number;
    metadata?: Readonly<Record<string, unknown>>;
}
interface ListFormSourceBase {
    /** Adds tenant/locale/etc. identity to the instance cache key. */
    cacheKey?: (context: ListFormContext) => string;
}
export interface LocalListFormSource extends ListFormSourceBase {
    kind: 'local';
    /** Plan form; preferred for context-dependent local definitions. */
    build?: (context: ListFormContext) => FormDefinition;
    /** Backward-compatible static or builder form. One of build/definition is required at runtime. */
    definition?: FormDefinition | ((context: ListFormContext) => FormDefinition);
}
export interface BackendListFormSource extends ListFormSourceBase {
    kind: 'backend';
    load: (context: ListFormContext) => ListAsyncResult<unknown | ListBackendFormEnvelope>;
    /** Defaults to forms-core's fromPublicFormDefinition adapter. */
    map?: (payload: unknown, context: ListFormContext) => FormDefinition;
}
export interface HybridListFormSource extends ListFormSourceBase {
    kind: 'hybrid';
    /** Preferred mode: resolve any source, then enrich it with runtime data. */
    base?: ListFormSource;
    enrich?: (definition: FormDefinition, context: ListFormContext) => FormDefinition | PromiseLike<FormDefinition>;
    /** Legacy merge mode. */
    local?: FormDefinition | ((context: ListFormContext) => FormDefinition);
    load?: (context: ListFormContext) => ListAsyncResult<unknown | ListBackendFormEnvelope>;
    /** Defaults to forms-core's fromPublicFormDefinition adapter. */
    map?: (payload: unknown, context: ListFormContext) => FormDefinition;
    /** Defaults to a field-aware remote-over-local merge. */
    merge?: (local: FormDefinition, backend: FormDefinition, context: ListFormContext) => FormDefinition;
}
export type ListFormSource = LocalListFormSource | BackendListFormSource | HybridListFormSource;
export interface ResolvedListForm {
    definition: FormDefinition;
    source: ListFormSource['kind'];
    cacheKey: string;
    resolvedAt: number;
    version?: string | number;
    metadata?: Readonly<Record<string, unknown>>;
}
export declare class ListFormResolutionError extends Error {
    readonly code: 'missing-local-definition' | 'invalid-backend-result' | 'empty-backend-result' | 'invalid-definition' | 'invalid-hybrid-source';
    constructor(code: 'missing-local-definition' | 'invalid-backend-result' | 'empty-backend-result' | 'invalid-definition' | 'invalid-hybrid-source', message: string, cause?: unknown);
}
export declare function mergeListForms(local: FormDefinition, backend: FormDefinition): FormDefinition;
export declare function resolveListForm(source: ListFormSource, context: ListFormContext, cacheKey?: string): Promise<ResolvedListForm>;
export declare class ListFormResolver {
    private readonly resolved;
    private readonly pending;
    resolve(id: string, source: ListFormSource, context: ListFormContext): Promise<ResolvedListForm>;
    invalidate(id?: string): void;
    private key;
}
export {};
//# sourceMappingURL=list-form.runtime.d.ts.map