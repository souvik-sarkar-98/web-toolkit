import type { FormEngineOptions, PhoneCountryCodeOption } from '../models/types.js';
export type { PhoneCountryCodeOption };
export interface ParsedPhoneValue {
    countryCode: string;
    nationalNumber: string;
}
export declare function normalizePhoneCountryCode(raw: string): string;
export declare function resolveDefaultPhoneCountryCode(options?: FormEngineOptions): string;
export declare function resolvePhoneCountryCodeOptions(options?: FormEngineOptions): PhoneCountryCodeOption[];
/** Stored form value: dial code, or dial code + national digits (E.164-style, no spaces). */
export declare function formatPhoneFieldValue(countryCode: string, nationalNumber: string): string;
export declare function parsePhoneFieldValue(value: unknown, options?: FormEngineOptions): ParsedPhoneValue;
export declare function isPhoneValueEmpty(value: unknown, options?: FormEngineOptions): boolean;
export declare function phoneValueForValidation(value: unknown, options?: FormEngineOptions): string;
//# sourceMappingURL=phone.d.ts.map