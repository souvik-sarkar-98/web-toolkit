import { isDateRangeValue, parseIsoDate } from './date-range.js';
function startOfDay(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
function resolveDisabledWeekdays(constraints) {
    if (!constraints) {
        return [];
    }
    if (constraints.disableWeekends) {
        return [0, 6];
    }
    return (constraints.disabledWeekdays ?? []).filter(day => Number.isInteger(day) && day >= 0 && day <= 6);
}
function resolveDateBoundRef(ref, values, referenceDate, selfValue) {
    if (!ref) {
        return null;
    }
    switch (ref.kind) {
        case 'literal':
            return parseIsoDate(ref.value);
        case 'today':
            return startOfDay(referenceDate);
        case 'field': {
            const raw = values[ref.key];
            return typeof raw === 'string' ? parseIsoDate(raw) : null;
        }
        case 'rangePart':
            return parseIsoDate(selfValue?.[ref.part]);
        default:
            return null;
    }
}
/** Resolve effective min/max calendar bounds from field config and current form values. */
export function resolveEffectiveDateBounds(constraints, values = {}, referenceDate = new Date(), selfValue) {
    if (!constraints) {
        return { min: null, max: null, endMin: null, endMax: null, disabledWeekdays: [] };
    }
    const min = resolveDateBoundRef(constraints.min, values, referenceDate, selfValue);
    const max = resolveDateBoundRef(constraints.max, values, referenceDate, selfValue);
    const endMin = resolveDateBoundRef(constraints.endMin, values, referenceDate, selfValue) ?? min;
    const endMax = resolveDateBoundRef(constraints.endMax, values, referenceDate, selfValue) ?? max;
    return {
        min,
        max,
        endMin,
        endMax,
        disabledWeekdays: resolveDisabledWeekdays(constraints),
    };
}
export function isIsoDateWithinBounds(isoDate, bounds) {
    if (!isoDate?.trim()) {
        return true;
    }
    const date = parseIsoDate(isoDate);
    if (!date) {
        return true;
    }
    return isDateWithinBounds(date, bounds);
}
export function isDateWithinBounds(date, bounds) {
    const day = startOfDay(date);
    if (bounds.min && day.getTime() < startOfDay(bounds.min).getTime()) {
        return false;
    }
    if (bounds.max && day.getTime() > startOfDay(bounds.max).getTime()) {
        return false;
    }
    if (bounds.disabledWeekdays?.includes(day.getDay())) {
        return false;
    }
    return true;
}
export function isDateRangeWithinBounds(value, bounds) {
    if (!isDateRangeValue(value)) {
        return true;
    }
    return (isIsoDateWithinBounds(value.startDate, bounds)
        && isIsoDateWithinBounds(value.endDate, {
            min: bounds.endMin,
            max: bounds.endMax,
            disabledWeekdays: bounds.disabledWeekdays,
        }));
}
export function createDatePickerFilter(bounds) {
    return (date) => !date || isDateWithinBounds(date, bounds);
}
export function hasDateConstraints(bounds) {
    return Boolean(bounds.min
        || bounds.max
        || bounds.disabledWeekdays.length);
}
export function dateConstraintErrorMessage(label, bounds, constraints) {
    const { min, max, endMin, endMax, disabledWeekdays } = bounds;
    const hasEndOverride = endMin !== min || endMax !== max;
    const weekendsDisabled = constraints?.disableWeekends || disabledWeekdays.includes(0) && disabledWeekdays.includes(6);
    if (weekendsDisabled && !min && !max && !hasEndOverride) {
        return `${label} cannot fall on a weekend`;
    }
    if (hasEndOverride) {
        if (endMin && endMax) {
            return `${label} end date must be between ${formatBoundLabel(endMin)} and ${formatBoundLabel(endMax)}`;
        }
        if (endMax) {
            return `${label} end date must be on or before ${formatBoundLabel(endMax)}`;
        }
        if (endMin) {
            return `${label} end date must be on or after ${formatBoundLabel(endMin)}`;
        }
    }
    if (min && max && min.getTime() === max.getTime()) {
        return `${label} must be ${formatBoundLabel(min)}`;
    }
    if (min && max) {
        return `${label} must be between ${formatBoundLabel(min)} and ${formatBoundLabel(max)}`;
    }
    if (max) {
        return `${label} must be on or before ${formatBoundLabel(max)}`;
    }
    if (min) {
        return `${label} must be on or after ${formatBoundLabel(min)}`;
    }
    return `${label} is not a valid date`;
}
function formatBoundLabel(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}
//# sourceMappingURL=date-constraints.js.map