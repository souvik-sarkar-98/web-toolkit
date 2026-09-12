export function detailTextField(label, value) {
    return { label, value, format: 'text' };
}
/** Sanitized HTML in a key-value row (links, inline emphasis, etc.). */
export function detailHtmlField(label, html) {
    return { label, value: html, format: 'html' };
}
export function detailKeyValueSection(id, title, fields, collapsed = false) {
    return { type: 'key_value', id, title, fields, collapsed };
}
/** Full-width instruction or notice block in the detail sheet. */
export function detailContentSection(id, html, options) {
    return {
        type: 'content',
        id,
        html,
        title: options?.title,
        collapsed: options?.collapsed ?? false,
    };
}
/** Nested collection section rendered by the framework `item_list` UI. */
export function detailItemListSection(id, title, items, options) {
    return {
        type: 'item_list',
        id,
        title,
        items,
        emptyMessage: options?.emptyMessage,
        collapsed: options?.collapsed ?? false,
        loading: options?.loading,
    };
}
//# sourceMappingURL=list-detail.helpers.js.map