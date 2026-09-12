import type { KeyValueLike } from '@web-toolkit/forms-core';

/** Reference-data resolver payload — KeyValue lists plus optional domain buckets. */
export type RefDataMap = Record<string, KeyValueLike[] | unknown>;
