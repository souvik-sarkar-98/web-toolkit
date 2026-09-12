import type { DateFieldConstraints, DateRangeValue, FormValues } from '../models/types.js';
export interface ResolvedDateBounds {
    min: Date | null;
    max: Date | null;
    endMin: Date | null;
    endMax: Date | null;
    disabledWeekdays: number[];
}
/** Resolve effective min/max calendar bounds from field config and current form values. */
export declare function resolveEffectiveDateBounds(constraints: DateFieldConstraints | null | undefined, values?: FormValues, referenceDate?: Date, selfValue?: DateRangeValue): ResolvedDateBounds;
export declare function isIsoDateWithinBounds(isoDate: string | undefined, bounds: Pick<ResolvedDateBounds, 'min' | 'max' | 'disabledWeekdays'>): boolean;
export declare function isDateWithinBounds(date: Date, bounds: Pick<ResolvedDateBounds, 'min' | 'max' | 'disabledWeekdays'>): boolean;
export declare function isDateRangeWithinBounds(value: unknown, bounds: ResolvedDateBounds): boolean;
export declare function createDatePickerFilter(bounds: ResolvedDateBounds): (date: Date | null) => boolean;
export declare function hasDateConstraints(bounds: ResolvedDateBounds): boolean;
export declare function dateConstraintErrorMessage(label: string, bounds: ResolvedDateBounds, constraints?: DateFieldConstraints | null): string;
//# sourceMappingURL=date-constraints.d.ts.map