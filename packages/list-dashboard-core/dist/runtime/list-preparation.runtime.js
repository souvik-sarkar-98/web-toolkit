export class ListPreparationError extends Error {
    taskId;
    constructor(message, taskId, cause) {
        super(message, { cause });
        this.taskId = taskId;
        this.name = 'ListPreparationError';
    }
}
export class ListPreparationCycleError extends Error {
    cycle;
    constructor(cycle) {
        super(`list preparation cycle detected: ${cycle.join(' -> ')}`);
        this.cycle = cycle;
        this.name = 'ListPreparationCycleError';
    }
}
export class ListPreparationTaskNotFoundError extends ListPreparationError {
    constructor(taskId) {
        super(`Unknown list preparation task: ${taskId}`, taskId);
        this.name = 'ListPreparationTaskNotFoundError';
    }
}
export class ListPreparationDuplicateTaskError extends ListPreparationError {
    constructor(taskId) {
        super(`Duplicate list preparation task: ${taskId}`, taskId);
        this.name = 'ListPreparationDuplicateTaskError';
    }
}
export class ListPreparationTaskError extends ListPreparationError {
    constructor(taskId, cause) {
        super(`list preparation task failed: ${taskId}`, taskId, cause);
        this.name = 'ListPreparationTaskError';
    }
}
export class ListPreparationAbortedError extends ListPreparationError {
    constructor(taskId) {
        super(taskId
            ? `list preparation task aborted: ${taskId}`
            : 'list preparation aborted', taskId);
        this.name = 'ListPreparationAbortedError';
    }
}
export function orderPreparationTasks(tasks, requestedIds) {
    const byId = new Map();
    for (const task of tasks) {
        if (byId.has(task.id)) {
            throw new ListPreparationDuplicateTaskError(task.id);
        }
        byId.set(task.id, task);
    }
    const selected = new Set();
    const include = (id) => {
        const task = byId.get(id);
        if (!task)
            throw new ListPreparationTaskNotFoundError(id);
        if (selected.has(id))
            return;
        selected.add(id);
        for (const dependency of task.dependsOn ?? [])
            include(dependency);
    };
    for (const id of requestedIds ?? byId.keys())
        include(id);
    const ordered = [];
    const complete = new Set();
    const active = [];
    const visit = (id) => {
        if (complete.has(id))
            return;
        const cycleStart = active.indexOf(id);
        if (cycleStart >= 0) {
            throw new ListPreparationCycleError([...active.slice(cycleStart), id]);
        }
        active.push(id);
        const task = byId.get(id);
        for (const dependency of task.dependsOn ?? []) {
            if (selected.has(dependency))
                visit(dependency);
        }
        active.pop();
        complete.add(id);
        ordered.push(task);
    };
    for (const id of selected)
        visit(id);
    return ordered;
}
export async function runPreparationTasks(tasks, context, requestedIds, optionsOrSignal = {}) {
    const options = isAbortSignal(optionsOrSignal)
        ? { signal: optionsOrSignal }
        : optionsOrSignal;
    const results = new Map();
    for (const task of orderPreparationTasks(tasks, requestedIds)) {
        if (options.signal?.aborted) {
            throw new ListPreparationAbortedError(task.id);
        }
        try {
            const result = await abortable(Promise.resolve().then(() => task.run(context, options.signal, { signal: options.signal, results })), options.signal, task.id);
            results.set(task.id, result);
        }
        catch (error) {
            if (error instanceof ListPreparationError)
                throw error;
            throw new ListPreparationTaskError(task.id, error);
        }
    }
    return results;
}
function isAbortSignal(value) {
    return value !== null
        && typeof value === 'object'
        && typeof value.aborted === 'boolean'
        && typeof value.addEventListener === 'function';
}
function abortable(promise, signal, taskId) {
    if (!signal)
        return promise;
    if (signal.aborted)
        return Promise.reject(new ListPreparationAbortedError(taskId));
    return new Promise((resolve, reject) => {
        const onAbort = () => reject(new ListPreparationAbortedError(taskId));
        signal.addEventListener('abort', onAbort, { once: true });
        promise.then(value => {
            signal.removeEventListener('abort', onAbort);
            resolve(value);
        }, error => {
            signal.removeEventListener('abort', onAbort);
            reject(error);
        });
    });
}
function stableInput(value) {
    const seen = new WeakSet();
    const normalize = (current) => {
        if (current === undefined)
            return '__undefined__';
        if (current === null
            || typeof current === 'string'
            || typeof current === 'number'
            || typeof current === 'boolean') {
            return current;
        }
        if (typeof current !== 'object')
            return String(current);
        if (seen.has(current)) {
            throw new ListPreparationError('Preparation invalidation inputs must not contain cycles');
        }
        seen.add(current);
        if (Array.isArray(current))
            return current.map(normalize);
        return Object.fromEntries(Object.entries(current)
            .sort(([left], [right]) => left.localeCompare(right))
            .map(([key, item]) => [key, normalize(item)]));
    };
    return JSON.stringify(normalize(value));
}
export class ListPreparationRunner {
    tasks;
    triggers;
    results = new Map();
    pending = new Map();
    latestKeys = new Map();
    constructor(tasks, triggers = {}) {
        this.tasks = tasks;
        this.triggers = triggers;
        orderPreparationTasks(tasks);
        for (const ids of Object.values(triggers)) {
            orderPreparationTasks(tasks, ids);
        }
    }
    run(trigger, context, optionsOrSignal = {}) {
        const options = isAbortSignal(optionsOrSignal)
            ? { signal: optionsOrSignal }
            : optionsOrSignal;
        return this.runSelected(context, this.triggers[trigger], options);
    }
    /** Runs an explicit task id list (plus dependencies) instead of a trigger. */
    runTasks(taskIds, context, optionsOrSignal = {}) {
        const options = isAbortSignal(optionsOrSignal)
            ? { signal: optionsOrSignal }
            : optionsOrSignal;
        return this.runSelected(context, taskIds, options);
    }
    invalidate(taskId, inputs) {
        if (taskId === undefined) {
            this.results.clear();
            this.pending.clear();
            this.latestKeys.clear();
            return;
        }
        const prefix = `${taskId}\u0000`;
        const exact = inputs === undefined ? undefined : `${prefix}${stableInput(inputs)}`;
        for (const key of this.results.keys()) {
            if (exact ? key === exact : key.startsWith(prefix))
                this.results.delete(key);
        }
        for (const key of this.pending.keys()) {
            if (exact ? key === exact : key.startsWith(prefix))
                this.pending.delete(key);
        }
        if (!exact)
            this.latestKeys.delete(taskId);
    }
    async runSelected(context, requestedIds, options) {
        const runResults = new Map();
        for (const task of orderPreparationTasks(this.tasks, requestedIds)) {
            if (options.signal?.aborted) {
                throw new ListPreparationAbortedError(task.id);
            }
            const result = await this.execute(task, context, runResults, options);
            runResults.set(task.id, result);
        }
        return runResults;
    }
    execute(task, context, runResults, options) {
        const cache = typeof task.cache === 'object' ? task.cache : undefined;
        const policy = cache?.policy
            ?? (typeof task.cache === 'string' ? task.cache : undefined)
            ?? task.cachePolicy
            ?? 'none';
        const readInputs = cache?.inputs ?? task.invalidationInputs ?? task.inputs;
        const inputKey = policy === 'byInputs' || readInputs
            ? stableInput(readInputs?.(context))
            : '';
        const key = `${task.id}\u0000${inputKey}`;
        const previousKey = this.latestKeys.get(task.id);
        if (previousKey && previousKey !== key)
            this.results.delete(previousKey);
        this.latestKeys.set(task.id, key);
        if (!options.force && policy !== 'none' && this.results.has(key)) {
            return Promise.resolve(this.results.get(key));
        }
        const inFlight = this.pending.get(key);
        if (inFlight)
            return abortable(inFlight, options.signal, task.id);
        let request;
        request = abortable(Promise.resolve().then(() => task.run(context, options.signal, {
            signal: options.signal,
            results: runResults,
        })), options.signal, task.id)
            .then(result => {
            if (policy !== 'none' && this.pending.get(key) === request) {
                this.results.set(key, result);
            }
            for (const invalidated of task.invalidates ?? []) {
                this.invalidate(invalidated);
            }
            return result;
        })
            .catch(error => {
            if (error instanceof ListPreparationError)
                throw error;
            throw new ListPreparationTaskError(task.id, error);
        })
            .finally(() => {
            if (this.pending.get(key) === request)
                this.pending.delete(key);
        });
        this.pending.set(key, request);
        return request;
    }
}
//# sourceMappingURL=list-preparation.runtime.js.map