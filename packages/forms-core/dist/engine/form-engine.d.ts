import type { FormDefinition, FormFieldDefinition, FormStep, FormValidationResult, FormValues, ResolvedField, FieldOption } from '../models/types.js';
import { buildDefByKey } from './visibility.js';
import type { FormEngineOptions } from '../models/types.js';
export declare function resolveFieldOptions(def: FormFieldDefinition, values: FormValues): FieldOption[];
export declare function resolveFieldState(def: FormFieldDefinition, defByKey: Map<string, FormFieldDefinition>, values: FormValues, userPermissions?: string[], ignoreEncrypted?: boolean): ResolvedField;
export declare function resolveAllFields(definition: FormDefinition, values: FormValues, options?: FormEngineOptions): ResolvedField[];
export declare function groupFieldsByStep(resolved: ResolvedField[]): FormStep[];
export declare function validateForm(definition: FormDefinition, values: FormValues, options?: FormEngineOptions): FormValidationResult;
export declare function applyDependentValueEffects(definition: FormDefinition, values: FormValues, changedKey: string, engineOptions?: FormEngineOptions): FormValues;
export { buildDefByKey };
//# sourceMappingURL=form-engine.d.ts.map