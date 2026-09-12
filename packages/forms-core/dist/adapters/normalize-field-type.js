import { CUSTOM_FIELD_TYPES } from '../models/types.js';
const LEGACY_TYPE_MAP = {
    TEXT: 'text',
    TEXTAREA: 'textarea',
    EMAIL: 'email',
    PHONE: 'phone',
    NUMBER: 'number',
    CHECKBOX: 'boolean',
    BOOLEAN: 'boolean',
    TOGGLE: 'toggle',
    AUTOCOMPLETE: 'autocomplete',
    DATE: 'date',
    DATE_RANGE: 'date_range',
    SELECT: 'select',
    MULTISELECT: 'multiselect',
};
export function normalizeFieldType(raw) {
    const trimmed = raw?.trim() ?? '';
    const lower = trimmed.toLowerCase();
    if (CUSTOM_FIELD_TYPES.includes(lower)) {
        return lower;
    }
    const legacy = LEGACY_TYPE_MAP[trimmed.toUpperCase()];
    if (legacy)
        return legacy;
    throw new Error(`Unknown field type: ${raw}`);
}
//# sourceMappingURL=normalize-field-type.js.map