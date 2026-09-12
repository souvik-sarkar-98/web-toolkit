export type ListPreparationTrigger = 'init' | 'filterOpen' | 'createOpen' | 'editPrepare' | 'operation'
/** Backward-compatible aliases. */
 | 'list' | 'detail' | 'create' | 'bulkEdit';
export type ListPreparationCachePolicy = 'none' | 'instance' | 'byInputs';
export interface ListPreparationCacheConfig<TContext> {
    policy: ListPreparationCachePolicy;
    inputs?: (context: TContext) => unknown;
}
export interface ListPreparationTaskRunContext {
    signal?: AbortSignal;
    results: ReadonlyMap<string, unknown>;
}
export interface ListPreparationTask<TContext = unknown, TResult = unknown> {
    id: string;
    dependsOn?: string[];
    cache?: ListPreparationCachePolicy | ListPreparationCacheConfig<TContext>;
    cachePolicy?: ListPreparationCachePolicy;
    /** Changes to these inputs invalidate this task's instance-cached result. */
    invalidationInputs?: (context: TContext) => unknown;
    inputs?: (context: TContext) => unknown;
    /** Clear these task result caches after this task succeeds. */
    invalidates?: string[];
    run: (context: TContext, signal?: AbortSignal, execution?: ListPreparationTaskRunContext) => TResult | Promise<TResult>;
}
export declare class ListPreparationError extends Error {
    readonly taskId?: string | undefined;
    constructor(message: string, taskId?: string | undefined, cause?: unknown);
}
export declare class ListPreparationCycleError extends Error {
    readonly cycle: readonly string[];
    constructor(cycle: readonly string[]);
}
export declare class ListPreparationTaskNotFoundError extends ListPreparationError {
    constructor(taskId: string);
}
export declare class ListPreparationDuplicateTaskError extends ListPreparationError {
    constructor(taskId: string);
}
export declare class ListPreparationTaskError extends ListPreparationError {
    constructor(taskId: string, cause: unknown);
}
export declare class ListPreparationAbortedError extends ListPreparationError {
    constructor(taskId?: string);
}
export declare function orderPreparationTasks<TContext>(tasks: readonly ListPreparationTask<TContext>[], requestedIds?: readonly string[]): ListPreparationTask<TContext>[];
export declare function runPreparationTasks<TContext>(tasks: readonly ListPreparationTask<TContext>[], context: TContext, requestedIds?: readonly string[], optionsOrSignal?: ListPreparationRunOptions | AbortSignal): Promise<ReadonlyMap<string, unknown>>;
export interface ListPreparationRunOptions {
    signal?: AbortSignal;
    /** Ignore persistent result caches for this run. */
    force?: boolean;
}
export declare class ListPreparationRunner<TContext = unknown> {
    private readonly tasks;
    private readonly triggers;
    private readonly results;
    private readonly pending;
    private readonly latestKeys;
    constructor(tasks: readonly ListPreparationTask<TContext>[], triggers?: Partial<Record<ListPreparationTrigger, string[]>>);
    run(trigger: ListPreparationTrigger, context: TContext, optionsOrSignal?: ListPreparationRunOptions | AbortSignal): Promise<ReadonlyMap<string, unknown>>;
    /** Runs an explicit task id list (plus dependencies) instead of a trigger. */
    runTasks(taskIds: readonly string[], context: TContext, optionsOrSignal?: ListPreparationRunOptions | AbortSignal): Promise<ReadonlyMap<string, unknown>>;
    invalidate(taskId?: string, inputs?: unknown): void;
    private runSelected;
    private execute;
}
//# sourceMappingURL=list-preparation.runtime.d.ts.map