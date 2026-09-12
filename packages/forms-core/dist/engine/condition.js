export function evaluateCondition(condition, currentValue) {
    if (currentValue === null || currentValue === undefined)
        return false;
    switch (condition.operator) {
        case 'equals':
            return currentValue === condition.value;
        case 'not_equals':
            return currentValue !== condition.value;
        case 'in': {
            const opts = condition.value;
            if (Array.isArray(currentValue)) {
                return currentValue.some((v) => opts.includes(v));
            }
            return opts.includes(currentValue);
        }
        case 'not_in': {
            const opts = condition.value;
            if (Array.isArray(currentValue)) {
                return !currentValue.some((v) => opts.includes(v));
            }
            return !opts.includes(currentValue);
        }
        default:
            return false;
    }
}
//# sourceMappingURL=condition.js.map