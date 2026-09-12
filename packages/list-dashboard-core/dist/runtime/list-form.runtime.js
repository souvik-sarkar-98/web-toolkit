import { fromPublicFormDefinition, } from '@ssweb-toolkit/forms-core';
function resolveLocal(source, context) {
    if (source.build)
        return source.build(context);
    const definition = source.definition;
    if (!definition) {
        throw new ListFormResolutionError('missing-local-definition', 'Local list form requires build or definition');
    }
    return typeof definition === 'function' ? definition(context) : definition;
}
export class ListFormResolutionError extends Error {
    code;
    constructor(code, message, cause) {
        super(message, { cause });
        this.code = code;
        this.name = 'ListFormResolutionError';
    }
}
function isObservableLike(value) {
    return value !== null
        && typeof value === 'object'
        && typeof value.subscribe === 'function';
}
async function firstAsyncValue(result) {
    if (!isObservableLike(result))
        return Promise.resolve(result);
    return new Promise((resolve, reject) => {
        let settled = false;
        let subscription;
        const cleanup = () => {
            if (typeof subscription === 'function')
                subscription();
            else
                subscription?.unsubscribe?.();
        };
        const succeed = (value) => {
            if (settled)
                return;
            settled = true;
            resolve(value);
            queueMicrotask(cleanup);
        };
        const fail = (error) => {
            if (settled)
                return;
            settled = true;
            reject(error);
        };
        try {
            subscription = result.subscribe({
                next: succeed,
                error: fail,
                complete: () => {
                    if (!settled) {
                        fail(new ListFormResolutionError('empty-backend-result', 'Backend form source completed without a definition'));
                    }
                },
            });
        }
        catch (error) {
            fail(error);
        }
    });
}
function unpackBackendResult(value) {
    if (value == null) {
        throw new ListFormResolutionError('empty-backend-result', 'Backend form source returned no definition');
    }
    if (typeof value === 'object' && Object.prototype.hasOwnProperty.call(value, 'definition')) {
        const envelope = value;
        if (envelope.definition == null) {
            throw new ListFormResolutionError('empty-backend-result', 'Backend form envelope has no definition');
        }
        return {
            payload: envelope.definition,
            version: envelope.version,
            metadata: envelope.metadata,
        };
    }
    return { payload: value };
}
function assertFormDefinition(definition) {
    if (definition == null
        || typeof definition !== 'object'
        || (!definition.id && !definition.key)
        || !Array.isArray(definition.fields)) {
        throw new ListFormResolutionError('invalid-definition', 'Resolved list form is missing an id/key or fields array');
    }
    return definition;
}
async function resolveBackend(load, map, context) {
    let raw;
    try {
        raw = await firstAsyncValue(load(context));
    }
    catch (error) {
        if (error instanceof ListFormResolutionError)
            throw error;
        throw new ListFormResolutionError('invalid-backend-result', 'Backend form source failed', error);
    }
    const { payload, version, metadata } = unpackBackendResult(raw);
    let definition;
    try {
        definition = map ? map(payload, context) : fromPublicFormDefinition(payload);
    }
    catch (error) {
        throw new ListFormResolutionError('invalid-definition', 'Backend form definition could not be mapped', error);
    }
    return { definition: assertFormDefinition(definition), version, metadata };
}
export function mergeListForms(local, backend) {
    const localFields = new Map(local.fields.map(field => [field.key, field]));
    const remoteKeys = new Set(backend.fields.map(field => field.key));
    return {
        ...local,
        ...backend,
        id: backend.id || local.id,
        key: backend.key || local.key,
        label: backend.label || local.label,
        description: backend.description ?? local.description,
        fields: [
            ...backend.fields.map(field => ({
                ...localFields.get(field.key),
                ...field,
            })),
            ...local.fields.filter(field => !remoteKeys.has(field.key)),
        ],
    };
}
export async function resolveListForm(source, context, cacheKey = source.cacheKey?.(context) ?? '') {
    let definition;
    let version;
    let metadata;
    switch (source.kind) {
        case 'local':
            definition = assertFormDefinition(resolveLocal(source, context));
            break;
        case 'backend': {
            const backend = await resolveBackend(source.load, source.map, context);
            ({ definition, version, metadata } = backend);
            break;
        }
        case 'hybrid': {
            if (source.base && source.enrich) {
                const base = await resolveListForm(source.base, context);
                definition = assertFormDefinition(await source.enrich(base.definition, context));
                version = base.version;
                metadata = base.metadata;
                break;
            }
            if (!source.local || !source.load) {
                throw new ListFormResolutionError('invalid-hybrid-source', 'Hybrid list form requires base/enrich or local/load');
            }
            const local = resolveLocal({ kind: 'local', definition: source.local }, context);
            const backend = await resolveBackend(source.load, source.map, context);
            definition = assertFormDefinition((source.merge ?? mergeListForms)(local, backend.definition, context));
            version = backend.version;
            metadata = backend.metadata;
            break;
        }
    }
    return {
        definition,
        source: source.kind,
        cacheKey,
        resolvedAt: Date.now(),
        version,
        metadata,
    };
}
export class ListFormResolver {
    resolved = new Map();
    pending = new Map();
    async resolve(id, source, context) {
        const key = this.key(id, source, context);
        const cached = this.resolved.get(key);
        if (cached)
            return cached;
        const inFlight = this.pending.get(key);
        if (inFlight)
            return inFlight;
        let request;
        request = resolveListForm(source, context, key)
            .then(result => {
            if (this.pending.get(key) === request) {
                this.resolved.set(key, result);
            }
            return result;
        })
            .finally(() => {
            if (this.pending.get(key) === request) {
                this.pending.delete(key);
            }
        });
        this.pending.set(key, request);
        return request;
    }
    invalidate(id) {
        if (id === undefined) {
            this.resolved.clear();
            this.pending.clear();
            return;
        }
        const prefix = `${id}\u0000`;
        for (const key of this.resolved.keys()) {
            if (key.startsWith(prefix))
                this.resolved.delete(key);
        }
        for (const key of this.pending.keys()) {
            if (key.startsWith(prefix))
                this.pending.delete(key);
        }
    }
    key(id, source, context) {
        return `${id}\u0000${source.cacheKey?.(context) ?? ''}`;
    }
}
//# sourceMappingURL=list-form.runtime.js.map