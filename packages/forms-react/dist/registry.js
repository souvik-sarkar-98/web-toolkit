import { createElement } from 'react';
const DEFAULT_COMPONENTS = {};
export function mergeComponents(base, override) {
    return { ...base, ...override };
}
export function renderFieldControl(props, components) {
    const type = props.field.definition.fieldType;
    const Component = components[type];
    if (!Component) {
        return createElement('span', { 'data-cf-missing-renderer': type }, `No renderer for field type "${type}"`);
    }
    return Component(props);
}
export function wrapFieldLayout(props, control, classNames) {
    const { field, id, error } = props;
    const required = field.effectiveMandatory;
    const isPhone = field.definition.fieldType === 'phone';
    return createElement('div', {
        className: classNames?.field,
        'data-cf-field': field.definition.key,
        'data-cf-type': field.definition.fieldType,
    }, createElement('label', {
        htmlFor: isPhone ? undefined : id,
        className: classNames?.label,
        id: isPhone ? `${id}-label` : undefined,
    }, field.definition.label, required &&
        createElement('span', { className: classNames?.requiredMark, 'aria-hidden': true }, ' *')), isPhone
        ? createElement('div', {
            role: 'group',
            'aria-labelledby': `${id}-label`,
        }, control)
        : createElement('div', { className: classNames?.control }, control), error &&
        createElement('div', { className: classNames?.error, role: 'alert' }, error));
}
export { DEFAULT_COMPONENTS };
//# sourceMappingURL=registry.js.map