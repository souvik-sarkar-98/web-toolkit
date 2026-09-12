import type { FormDefinition, FormEngineOptions, FormStep, FormValidationResult, FormValues, ResolvedField } from '../models/types.js';
export declare class FormEngine {
    private definition;
    private readonly options;
    private values;
    private fieldErrors;
    constructor(definition: FormDefinition, initialValues?: FormValues, options?: FormEngineOptions);
    updateDefinition(definition: FormDefinition): void;
    getValues(): FormValues;
    setValue(key: string, value: FormValues[string]): void;
    setFieldError(key: string, message: string): void;
    clearFieldError(key: string): void;
    setValues(partial: FormValues): void;
    getResolvedFields(): ResolvedField[];
    getVisibleFields(): ResolvedField[];
    /** Keys of fields hidden by an unmet condition — never part of a submit payload. */
    getConditionHiddenKeys(): string[];
    getSteps(): FormStep[];
    validate(): FormValidationResult;
    getFieldErrors(): Record<string, string>;
    reset(initialValues?: FormValues): void;
    private buildInitialValues;
}
//# sourceMappingURL=form-engine-class.d.ts.map