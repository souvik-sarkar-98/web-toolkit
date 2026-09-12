import type { CustomFieldValueParsed, FormFieldDefinition, FormValues } from '../models/types.js';
export declare function canSeeFormField(field: FormFieldDefinition, userPermissions: string[]): boolean;
export declare function isFieldVisible(def: FormFieldDefinition, defByKey: Map<string, FormFieldDefinition>, values: FormValues, userPermissions?: string[]): boolean;
export declare function buildDefByKey(fields: FormFieldDefinition[]): Map<string, FormFieldDefinition>;
export declare function getParentStringValue(values: FormValues, parentKey: string): string | null;
export type { CustomFieldValueParsed };
//# sourceMappingURL=visibility.d.ts.map