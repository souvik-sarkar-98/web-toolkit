import type { CustomFormClassNames, CustomFormComponents, FieldRenderProps } from './types.js';
import type { ReactNode } from 'react';
declare const DEFAULT_COMPONENTS: CustomFormComponents;
export declare function mergeComponents(base: CustomFormComponents, override?: CustomFormComponents): CustomFormComponents;
export declare function renderFieldControl(props: FieldRenderProps, components: CustomFormComponents): ReactNode;
export declare function wrapFieldLayout(props: FieldRenderProps, control: ReactNode, classNames?: CustomFormClassNames): ReactNode;
export { DEFAULT_COMPONENTS };
//# sourceMappingURL=registry.d.ts.map