import { baseField } from '@ssweb-toolkit/forms-core';
/**
 * Creates a reusable action-form preview for reviewing and editing generated
 * text before handing it to a channel-specific submit callback.
 */
export function createEditableMessageActionForm(options) {
    const id = options.id ?? 'editable-message';
    return {
        kind: 'form',
        title: options.title,
        saveLabel: options.saveLabel ?? 'Continue',
        defaultValues: entity => ({ message: options.defaultMessage(entity) }),
        buildForm: () => ({
            id,
            key: id,
            label: typeof options.title === 'string' ? options.title : 'Message preview',
            description: 'Review and edit the message before continuing.',
            fields: [
                baseField({
                    id: `${id}-message`,
                    key: 'message',
                    label: options.fieldLabel ?? 'Message',
                    fieldType: 'textarea',
                    mandatory: true,
                    sortOrder: 1,
                }),
            ],
        }),
        validateBeforeSave: context => String(context.values['message'] ?? '').trim()
            ? undefined
            : 'Enter a message to continue.',
        save: context => options.submit(String(context.values['message'] ?? '').trim(), context),
        success: {
            mode: 'none',
        },
    };
}
//# sourceMappingURL=create-editable-message-action-form.util.js.map