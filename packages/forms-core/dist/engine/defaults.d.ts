import type { CustomFieldType, FormEngineOptions } from '../models/types.js';
export declare function getDefaultValueForFieldType(fieldType: CustomFieldType): string | number | boolean | string[] | Record<string, never>;
export declare function isEmptyValue(fieldType: CustomFieldType, value: unknown, engineOptions?: FormEngineOptions): boolean;
//# sourceMappingURL=defaults.d.ts.map