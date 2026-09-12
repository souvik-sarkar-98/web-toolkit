import type { Observable } from 'rxjs';
import type { ListActionFormConfig, ListActionFormContext } from '../config/list-form-flow.config.js';
export interface EditableMessageActionFormOptions<TEntity> {
    id?: string;
    title: string | ((entity: TEntity) => string);
    fieldLabel?: string;
    saveLabel?: string;
    defaultMessage: (entity: TEntity) => string;
    submit: (message: string, context: ListActionFormContext<TEntity>) => Observable<unknown>;
}
/**
 * Creates a reusable action-form preview for reviewing and editing generated
 * text before handing it to a channel-specific submit callback.
 */
export declare function createEditableMessageActionForm<TEntity>(options: EditableMessageActionFormOptions<TEntity>): ListActionFormConfig<TEntity>;
//# sourceMappingURL=create-editable-message-action-form.util.d.ts.map