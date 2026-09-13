import type { KeyValueLike } from '@ssfrontend-toolkit/forms-core';

/** Reference-data resolver payload — KeyValue lists plus optional domain buckets. */
export type RefDataMap = Record<string, KeyValueLike[] | unknown>;
