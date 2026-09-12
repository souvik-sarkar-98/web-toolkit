import { z } from 'zod';
import { normalizeFieldValidationRules } from '@web-toolkit/forms-core';
function applyValidationRules(fieldSchema, field) {
    const rules = normalizeFieldValidationRules(field.validationRules);
    let schema = fieldSchema;
    for (const rule of rules) {
        if (!rule.pattern)
            continue;
        try {
            const regex = new RegExp(rule.pattern);
            schema = schema.regex(regex, rule.regexErrMsg ?? `Enter a valid ${field.label.toLowerCase()}`);
        }
        catch {
            continue;
        }
    }
    return schema;
}
export function buildFormZodSchema(fields) {
    const shape = {};
    for (const field of fields) {
        let fieldSchema;
        switch (field.fieldType) {
            case 'email':
                fieldSchema = z.string().email(`Enter a valid ${field.label.toLowerCase()}`);
                break;
            case 'phone':
                fieldSchema = z.string().min(1, `${field.label} is required`);
                fieldSchema = applyValidationRules(fieldSchema, field);
                break;
            case 'number':
                fieldSchema = z.string();
                break;
            case 'boolean':
                fieldSchema = z.boolean();
                break;
            case 'textarea':
            case 'text':
            case 'select':
            case 'date':
            default:
                fieldSchema = z.string();
                break;
        }
        if (field.mandatory) {
            if (field.fieldType === 'boolean') {
                fieldSchema = fieldSchema.refine((value) => value === true, {
                    message: `${field.label} is required`,
                });
            }
            else if (field.fieldType === 'text' ||
                field.fieldType === 'textarea' ||
                field.fieldType === 'select' ||
                field.fieldType === 'number' ||
                field.fieldType === 'date') {
                fieldSchema = fieldSchema.min(1, `${field.label} is required`);
                fieldSchema = applyValidationRules(fieldSchema, field);
            }
        }
        else if (field.fieldType === 'boolean') {
            fieldSchema = fieldSchema.optional();
        }
        else {
            fieldSchema = fieldSchema.optional().or(z.literal(''));
            fieldSchema = applyValidationRules(fieldSchema, field);
        }
        shape[field.key] = fieldSchema;
    }
    return z.object(shape);
}
//# sourceMappingURL=build-form-zod-schema.js.map