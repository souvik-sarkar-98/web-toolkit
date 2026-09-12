import type { DateRangeValue } from '../models/types.js';
export declare function emptyDateRangeValue(): DateRangeValue;
export declare function isDateRangeValue(value: unknown): value is DateRangeValue;
export declare function isDateRangeEmpty(value: unknown): boolean;
/** Format `Date` to ISO date (`yyyy-MM-dd`) in local calendar. */
export declare function formatIsoDate(value: Date | null | undefined): string | undefined;
export declare function parseIsoDate(value: string | undefined): Date | null;
export declare function mergeDateRangePart(current: DateRangeValue | null | undefined, part: Partial<DateRangeValue>): DateRangeValue;
//# sourceMappingURL=date-range.d.ts.map