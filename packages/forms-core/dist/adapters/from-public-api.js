import { normalizeFieldType } from './normalize-field-type.js';
function asObject(value) {
    return value !== null && typeof value === 'object' ? value : null;
}
function mapFieldOption(raw) {
    const o = asObject(raw);
    return {
        key: String(o?.key ?? ''),
        label: String(o?.label ?? o?.key ?? ''),
    };
}
function mapField(raw) {
    const f = asObject(raw);
    if (!f)
        throw new Error('Invalid field definition');
    return {
        id: String(f.id ?? f.key ?? ''),
        key: String(f.key ?? ''),
        label: String(f.label ?? f.key ?? ''),
        placeholder: f.placeholder != null ? String(f.placeholder) : null,
        hint: typeof f.hint === 'string' ? f.hint : null,
        fieldType: normalizeFieldType(String(f.fieldType ?? 'text')),
        mandatory: Boolean(f.mandatory),
        fieldOptions: Array.isArray(f.fieldOptions) ? f.fieldOptions.map(mapFieldOption) : [],
        isHidden: Boolean(f.isHidden),
        isEncrypted: Boolean(f.isEncrypted),
        enabled: f.enabled !== false,
        readOnly: Boolean(f.readOnly),
        sortOrder: typeof f.sortOrder === 'number' ? f.sortOrder : 0,
        condition: f.condition ? mapCondition(f.condition) : null,
        dependentOptions: f.dependentOptions ? mapDependentOptions(f.dependentOptions) : null,
        validationRules: f.validationRules ? mapValidationRules(f.validationRules) : null,
        dateConstraints: f.dateConstraints ? mapDateConstraints(f.dateConstraints) : null,
        viewPermissions: Array.isArray(f.viewPermissions)
            ? f.viewPermissions.map(String)
            : undefined,
        stepId: f.stepId != null ? String(f.stepId) : null,
        stepName: f.stepName != null ? String(f.stepName) : null,
    };
}
function mapCondition(raw) {
    const c = asObject(raw);
    if (!c)
        return null;
    // A condition without a parent key can never be satisfied, which would hide
    // the field forever; treat it as "no condition" instead.
    if (!String(c.dependsOnKey ?? '').trim())
        return null;
    return {
        dependsOnKey: String(c.dependsOnKey ?? ''),
        operator: String(c.operator ?? 'equals'),
        value: c.value,
    };
}
function mapDependentOptions(raw) {
    const d = asObject(raw);
    if (!d)
        return null;
    // Without a parent key the option map can never resolve, leaving the field
    // with no options at all; fall back to the field's own options.
    if (!String(d.dependsOnKey ?? '').trim())
        return null;
    const optionMap = {};
    const rawMap = asObject(d.optionMap) ?? {};
    for (const [parentKey, opts] of Object.entries(rawMap)) {
        optionMap[parentKey] = Array.isArray(opts) ? opts.map(mapFieldOption) : [];
    }
    return {
        dependsOnKey: String(d.dependsOnKey ?? ''),
        optionMap,
    };
}
function mapValidationRule(raw) {
    const r = asObject(raw);
    if (!r?.pattern)
        return null;
    return {
        key: r.key != null ? String(r.key) : undefined,
        pattern: String(r.pattern),
        regexErrMsg: r.regexErrMsg != null ? String(r.regexErrMsg) : undefined,
    };
}
function mapValidationRules(raw) {
    if (raw == null)
        return null;
    if (Array.isArray(raw)) {
        const rules = raw
            .map(mapValidationRule)
            .filter((rule) => rule != null);
        return rules.length ? rules : null;
    }
    return mapValidationRule(raw);
}
function mapDateBoundRef(raw) {
    const ref = asObject(raw);
    if (!ref?.kind) {
        return undefined;
    }
    switch (String(ref.kind)) {
        case 'literal':
            return { kind: 'literal', value: String(ref.value ?? '') };
        case 'today':
            return { kind: 'today' };
        case 'field':
            return { kind: 'field', key: String(ref.key ?? '') };
        case 'rangePart':
            return {
                kind: 'rangePart',
                part: ref.part === 'endDate' ? 'endDate' : 'startDate',
            };
        default:
            return undefined;
    }
}
function mapDateConstraints(raw) {
    const constraints = asObject(raw);
    if (!constraints)
        return null;
    return {
        min: mapDateBoundRef(constraints.min),
        max: mapDateBoundRef(constraints.max),
        endMin: mapDateBoundRef(constraints.endMin),
        endMax: mapDateBoundRef(constraints.endMax),
        disableWeekends: constraints.disableWeekends === true,
        disabledWeekdays: Array.isArray(constraints.disabledWeekdays)
            ? constraints.disabledWeekdays.map(day => Number(day)).filter(day => Number.isInteger(day))
            : undefined,
    };
}
export function fromPublicFormDefinition(dto) {
    const root = asObject(dto);
    if (!root)
        throw new Error('Invalid form definition');
    const fields = Array.isArray(root.fields) ? root.fields.map(mapField) : [];
    return {
        id: String(root.id ?? root.key ?? ''),
        key: String(root.key ?? ''),
        label: String(root.label ?? ''),
        description: root.description != null ? String(root.description) : null,
        fields,
    };
}
//# sourceMappingURL=from-public-api.js.map