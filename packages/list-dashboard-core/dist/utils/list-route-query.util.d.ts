/** Parse comma-separated query values (e.g. `?status=RAISED,PENDING`). */
export declare function parseCsvQueryParam(value: string | null | undefined): string[] | undefined;
/** Serialize string arrays for URL query params; empty → omit (`null`). */
export declare function formatCsvQueryParam(values: string[] | undefined): string | null;
export declare function parseStringQueryParam(value: string | null | undefined): string | undefined;
export declare function parseBooleanQueryParam(value: string | null | undefined): boolean;
export declare function valuesEqual(a: unknown, b: unknown): boolean;
//# sourceMappingURL=list-route-query.util.d.ts.map