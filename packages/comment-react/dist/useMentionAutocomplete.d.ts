import { type KeyboardEvent, type RefObject } from 'react';
import type { MentionCandidate, MentionUserSearch } from '@web-toolkit/comment-core';
export interface UseMentionAutocompleteOptions {
    editableText: string;
    cursor: number;
    searchUsers: MentionUserSearch;
    minQueryLength?: number;
    debounceMs?: number;
}
export interface UseMentionAutocompleteResult {
    open: boolean;
    query: string | null;
    candidates: MentionCandidate[];
    loading: boolean;
    activeIndex: number;
    setActiveIndex: (index: number) => void;
    selectCandidate: (candidate: MentionCandidate) => void;
    listboxId: string;
    handleKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => boolean;
}
export declare function useMentionAutocomplete(options: UseMentionAutocompleteOptions, onSelect: (candidate: MentionCandidate) => void): UseMentionAutocompleteResult;
export declare function syncTextareaCursor(textareaRef: RefObject<HTMLTextAreaElement | null>, cursor: number): void;
//# sourceMappingURL=useMentionAutocomplete.d.ts.map