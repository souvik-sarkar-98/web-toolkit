import type { FormDefinition, FormEngineOptions, FormValues } from '@ssweb-toolkit/forms-core';
export type CustomFormResolverOptions = FormEngineOptions;
/**
 * Resolver compatible with react-hook-form that validates visible fields using forms-core.
 */
export declare function createCustomFormResolver(definition: FormDefinition, options?: CustomFormResolverOptions): (values: FormValues) => Promise<{
    values: FormValues;
    errors: {};
} | {
    values: {};
    errors: Record<string, {
        type: string;
        message: string;
    }>;
}>;
export type { FormValues };
//# sourceMappingURL=rhf.d.ts.map