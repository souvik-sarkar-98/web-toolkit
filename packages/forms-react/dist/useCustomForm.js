'use client';
import { useCallback, useMemo, useState } from 'react';
import { FormEngine } from '@web-toolkit/forms-core';
export function useCustomForm({ definition, initialValues, engineOptions, }) {
    const engine = useMemo(() => new FormEngine(definition, initialValues, engineOptions), [definition, initialValues, engineOptions]);
    const [, bump] = useState(0);
    const rerender = useCallback(() => bump((n) => n + 1), []);
    const values = engine.getValues();
    const resolvedFields = engine.getResolvedFields();
    const visibleFields = engine.getVisibleFields();
    const steps = engine.getSteps();
    const fieldErrors = engine.getFieldErrors();
    const setValue = useCallback((key, value) => {
        engine.setValue(key, value);
        rerender();
    }, [engine, rerender]);
    const setValues = useCallback((partial) => {
        engine.setValues(partial);
        rerender();
    }, [engine, rerender]);
    const validate = useCallback(() => {
        const result = engine.validate();
        rerender();
        return result;
    }, [engine, rerender]);
    const reset = useCallback((nextInitial) => {
        engine.reset(nextInitial);
        rerender();
    }, [engine, rerender]);
    const getSubmitValues = useCallback(() => {
        const visibleKeys = new Set(engine.getVisibleFields().map((f) => f.definition.key));
        const all = engine.getValues();
        const out = {};
        for (const [key, value] of Object.entries(all)) {
            if (visibleKeys.has(key))
                out[key] = value;
        }
        return out;
    }, [engine]);
    return {
        values,
        resolvedFields,
        visibleFields,
        steps,
        fieldErrors,
        setValue,
        setValues,
        validate,
        reset,
        getSubmitValues,
    };
}
//# sourceMappingURL=useCustomForm.js.map