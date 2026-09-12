import { useCallback, useEffect, useId, useRef, useState, } from 'react';
import { getActiveMentionQuery } from '@web-toolkit/comment-core';
export function useMentionAutocomplete(options, onSelect) {
    const { editableText, cursor, searchUsers, minQueryLength = 0, debounceMs = 200 } = options;
    const listboxId = useId();
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const requestRef = useRef(0);
    const query = getActiveMentionQuery(editableText, cursor);
    const open = query !== null;
    useEffect(() => {
        setActiveIndex(0);
    }, [query, candidates.length]);
    useEffect(() => {
        if (!open || query === null) {
            setCandidates([]);
            setLoading(false);
            return;
        }
        if (query.length < minQueryLength) {
            setCandidates([]);
            setLoading(false);
            return;
        }
        const requestId = ++requestRef.current;
        setLoading(true);
        const timer = window.setTimeout(() => {
            void Promise.resolve(searchUsers(query))
                .then((results) => {
                if (requestRef.current !== requestId)
                    return;
                setCandidates(results);
            })
                .finally(() => {
                if (requestRef.current === requestId) {
                    setLoading(false);
                }
            });
        }, debounceMs);
        return () => window.clearTimeout(timer);
    }, [open, query, searchUsers, minQueryLength, debounceMs]);
    const selectCandidate = useCallback((candidate) => {
        onSelect(candidate);
        setCandidates([]);
    }, [onSelect]);
    const handleKeyDown = useCallback((event) => {
        if (!open || candidates.length === 0) {
            return false;
        }
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            setActiveIndex((i) => (i + 1) % candidates.length);
            return true;
        }
        if (event.key === 'ArrowUp') {
            event.preventDefault();
            setActiveIndex((i) => (i - 1 + candidates.length) % candidates.length);
            return true;
        }
        if (event.key === 'Enter' || event.key === 'Tab') {
            event.preventDefault();
            const candidate = candidates[activeIndex];
            if (candidate) {
                selectCandidate(candidate);
            }
            return true;
        }
        if (event.key === 'Escape') {
            event.preventDefault();
            setCandidates([]);
            return true;
        }
        return false;
    }, [open, candidates, activeIndex, selectCandidate]);
    return {
        open: open && (loading || candidates.length > 0 || (query?.length ?? 0) >= minQueryLength),
        query,
        candidates,
        loading,
        activeIndex,
        setActiveIndex,
        selectCandidate,
        listboxId,
        handleKeyDown,
    };
}
export function syncTextareaCursor(textareaRef, cursor) {
    const el = textareaRef.current;
    if (!el)
        return;
    el.focus();
    el.setSelectionRange(cursor, cursor);
}
//# sourceMappingURL=useMentionAutocomplete.js.map