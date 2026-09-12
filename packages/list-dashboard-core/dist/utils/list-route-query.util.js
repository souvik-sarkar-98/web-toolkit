/** Parse comma-separated query values (e.g. `?status=RAISED,PENDING`). */
export function parseCsvQueryParam(value) {
    if (!value?.trim()) {
        return undefined;
    }
    const items = value.split(',').map(item => item.trim()).filter(Boolean);
    return items.length ? items : undefined;
}
/** Serialize string arrays for URL query params; empty → omit (`null`). */
export function formatCsvQueryParam(values) {
    if (!values?.length) {
        return null;
    }
    return values.join(',');
}
export function parseStringQueryParam(value) {
    const trimmed = value?.trim();
    return trimmed || undefined;
}
export function parseBooleanQueryParam(value) {
    return value === 'true' || value === '1';
}
export function valuesEqual(a, b) {
    if (a === b) {
        return true;
    }
    if (Array.isArray(a) && Array.isArray(b)) {
        return a.length === b.length && a.every((item, index) => item === b[index]);
    }
    return false;
}
//# sourceMappingURL=list-route-query.util.js.map