import type { FormDefinition, FormValues } from './models/types.js';
/**
 * Shapes engine values for API POST bodies (field keys → JSON types).
 */
export declare function serializeFormSubmitValues(definition: FormDefinition, values: FormValues): Record<string, unknown>;
/** @deprecated Use `serializeFormSubmitValues`. */
export declare const serializePublicFormSubmitValues: typeof serializeFormSubmitValues;
//# sourceMappingURL=serialize-form-submit-values.d.ts.map