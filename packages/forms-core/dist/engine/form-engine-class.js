import { getDefaultValueForFieldType } from './defaults.js';
import { applyDependentValueEffects, groupFieldsByStep, resolveAllFields, validateForm, } from './form-engine.js';
export class FormEngine {
    definition;
    options;
    values;
    fieldErrors = {};
    constructor(definition, initialValues = {}, options = {}) {
        this.definition = definition;
        this.options = options;
        this.values = this.buildInitialValues(initialValues);
    }
    updateDefinition(definition) {
        this.definition = definition;
    }
    getValues() {
        return { ...this.values };
    }
    setValue(key, value) {
        this.values = { ...this.values, [key]: value };
        this.values = applyDependentValueEffects(this.definition, this.values, key, this.options);
        delete this.fieldErrors[key];
    }
    setFieldError(key, message) {
        this.fieldErrors = { ...this.fieldErrors, [key]: message };
    }
    clearFieldError(key) {
        if (!(key in this.fieldErrors)) {
            return;
        }
        const next = { ...this.fieldErrors };
        delete next[key];
        this.fieldErrors = next;
    }
    setValues(partial) {
        let next = { ...this.values, ...partial };
        for (const key of Object.keys(partial)) {
            next = applyDependentValueEffects(this.definition, next, key, this.options);
        }
        this.values = next;
        for (const key of Object.keys(partial)) {
            delete this.fieldErrors[key];
        }
    }
    getResolvedFields() {
        return resolveAllFields(this.definition, this.values, this.options);
    }
    getVisibleFields() {
        return this.getResolvedFields().filter((f) => f.visible);
    }
    /** Keys of fields hidden by an unmet condition — never part of a submit payload. */
    getConditionHiddenKeys() {
        return this.getResolvedFields()
            .filter((f) => !f.visible && f.definition.condition != null)
            .map((f) => f.definition.key);
    }
    getSteps() {
        return groupFieldsByStep(this.getResolvedFields());
    }
    validate() {
        const result = validateForm(this.definition, this.values, this.options);
        this.fieldErrors = { ...result.fieldErrors };
        return result;
    }
    getFieldErrors() {
        return { ...this.fieldErrors };
    }
    reset(initialValues = {}) {
        this.values = this.buildInitialValues(initialValues);
        this.fieldErrors = {};
    }
    buildInitialValues(overrides) {
        // Keep values from prior steps (e.g. stepper) even when those fields are not
        // declared on the current step definition — needed for dependentOptions/conditions.
        let values = { ...overrides };
        for (const field of this.definition.fields) {
            if (field.isEncrypted && this.options.ignoreEncryptedValues)
                continue;
            if (values[field.key] === undefined) {
                values[field.key] = getDefaultValueForFieldType(field.fieldType);
            }
        }
        for (const field of this.definition.fields) {
            values = applyDependentValueEffects(this.definition, values, field.key, this.options);
        }
        return values;
    }
}
//# sourceMappingURL=form-engine-class.js.map