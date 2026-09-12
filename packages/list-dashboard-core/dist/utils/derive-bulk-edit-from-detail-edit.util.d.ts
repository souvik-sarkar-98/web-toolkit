import type { BulkEditPageConfig } from '../config/filtered-list-dashboard.config.js';
import type { ListDetailEditPageConfig } from '../config/list-detail-page.config.js';
export type DetailDerivedBulkEditHooks<TEntity> = Pick<BulkEditPageConfig<TEntity>, 'documentTypes' | 'lockedFields' | 'entityToEditValues' | 'buildEditForm' | 'refreshEditForm' | 'prepareEdit' | 'onEditValuesChange' | 'validateBeforeSave'>;
export interface DeriveBulkEditFromDetailEditOptions<TEntity> {
    /** Maps detail {@link ListDetailEditPageConfig.prepareEdit} to bulk payable-account loading. */
    preparePayableAccounts?: (onReady: (payableAccountOptions: {
        key: string;
        label: string;
    }[]) => void) => void;
}
/** Reuses single-entity detail edit hooks for bulk edit overlays. */
export declare function deriveBulkEditHooksFromDetailEdit<TEntity>(edit: ListDetailEditPageConfig<TEntity>, options?: DeriveBulkEditFromDetailEditOptions<TEntity>): DetailDerivedBulkEditHooks<TEntity>;
//# sourceMappingURL=derive-bulk-edit-from-detail-edit.util.d.ts.map