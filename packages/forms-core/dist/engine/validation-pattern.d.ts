import type { CustomFieldType, CustomFieldValueParsed, FieldValidationRule, FieldValidationRules, FormEngineOptions } from '../models/types.js';
export declare function normalizeFieldValidationRules(rules: FieldValidationRules | null | undefined): FieldValidationRule[];
export declare function matchesValidationRule(fieldType: CustomFieldType, value: CustomFieldValueParsed, rule: FieldValidationRule, engineOptions?: FormEngineOptions): boolean;
/** All rules must pass (AND). Empty rule list passes. */
export declare function matchesValidationPattern(fieldType: CustomFieldType, value: CustomFieldValueParsed, rules: FieldValidationRules | null, engineOptions?: FormEngineOptions): boolean;
export declare function findFirstFailedValidationRule(fieldType: CustomFieldType, value: CustomFieldValueParsed, rules: FieldValidationRules | null, engineOptions?: FormEngineOptions): FieldValidationRule | null;
export declare function validationErrorMessage(fieldLabel: string, rules: FieldValidationRules | null, failedRule?: FieldValidationRule | null): string;
export declare function validationErrorMessageForValue(fieldType: CustomFieldType, fieldLabel: string, value: CustomFieldValueParsed, rules: FieldValidationRules | null, engineOptions?: FormEngineOptions): string;
//# sourceMappingURL=validation-pattern.d.ts.map