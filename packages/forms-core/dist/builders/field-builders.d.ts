import type { DateFieldConstraints, FieldOption, FormFieldDefinition } from '../models/types.js';
/** Minimal KeyValue shape used by internal-app ref data. */
export interface KeyValueLike {
    key: string;
    label?: string;
    displayValue?: string;
}
export declare function toFieldOptions(items: KeyValueLike[] | FieldOption[] | undefined): FieldOption[];
export declare function baseField(partial: Pick<FormFieldDefinition, 'id' | 'key' | 'label' | 'fieldType' | 'sortOrder'> & Partial<FormFieldDefinition>): FormFieldDefinition;
/** Common constraint: dates cannot be in the future. */
export declare function dateConstraintsTodayMax(): DateFieldConstraints;
//# sourceMappingURL=field-builders.d.ts.map