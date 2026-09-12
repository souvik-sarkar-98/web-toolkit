import { z } from 'zod';
import type { FormFieldDefinition } from '@web-toolkit/forms-core';
export declare function buildFormZodSchema(fields: FormFieldDefinition[]): z.ZodObject<{
    [x: string]: z.ZodType<unknown, unknown, z.core.$ZodTypeInternals<unknown, unknown>>;
}, z.core.$strip>;
//# sourceMappingURL=build-form-zod-schema.d.ts.map