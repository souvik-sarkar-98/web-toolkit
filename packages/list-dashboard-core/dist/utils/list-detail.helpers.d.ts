import { ListDetailContentSection, ListDetailField, ListDetailItemListItem, ListDetailItemListSection, ListDetailKeyValueSection } from '../models/list-detail.model.js';
export declare function detailTextField(label: string, value: string): ListDetailField;
/** Sanitized HTML in a key-value row (links, inline emphasis, etc.). */
export declare function detailHtmlField(label: string, html: string): ListDetailField;
export declare function detailKeyValueSection(id: string, title: string, fields: ListDetailField[], collapsed?: boolean): ListDetailKeyValueSection;
/** Full-width instruction or notice block in the detail sheet. */
export declare function detailContentSection(id: string, html: string, options?: {
    title?: string;
    collapsed?: boolean;
}): ListDetailContentSection;
/** Nested collection section rendered by the framework `item_list` UI. */
export declare function detailItemListSection(id: string, title: string, items: ListDetailItemListItem[], options?: {
    emptyMessage?: string;
    collapsed?: boolean;
    loading?: boolean;
}): ListDetailItemListSection;
//# sourceMappingURL=list-detail.helpers.d.ts.map