import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useMemo, useRef, useState, } from 'react';
import { buildCommentEditorValue, contentToEditableText, deduplicateMentions, insertMentionInEditableText, } from '@ssweb-toolkit/comment-core';
import { CommentContent } from './CommentContent.js';
import { syncTextareaCursor, useMentionAutocomplete } from './useMentionAutocomplete.js';
export function MentionCommentEditor({ value, onChange, searchUsers, minMentionQueryLength = 1, showPreview = false, classNames, mentionListLabel = 'Mention suggestions', placeholder = 'Write a comment… Use @ to mention someone', rows = 4, ...textareaProps }) {
    const textareaRef = useRef(null);
    const [cursor, setCursor] = useState(0);
    const editableText = contentToEditableText(value.content, value.mentions);
    const emitFromEditable = useCallback((nextEditable, mentionList = value.mentions) => {
        onChange(buildCommentEditorValue(nextEditable, mentionList));
    }, [onChange, value.mentions]);
    const onMentionSelect = useCallback((candidate) => {
        const result = insertMentionInEditableText(editableText, cursor, candidate);
        const nextMentions = deduplicateMentions([
            ...value.mentions.filter((m) => m.userId !== candidate.userId),
            candidate,
        ]);
        onChange(buildCommentEditorValue(result.text, nextMentions));
        setCursor(result.cursor);
        syncTextareaCursor(textareaRef, result.cursor);
    }, [cursor, editableText, onChange, value.mentions]);
    const autocomplete = useMentionAutocomplete({
        editableText,
        cursor,
        searchUsers,
        minQueryLength: minMentionQueryLength,
    }, onMentionSelect);
    const onTextChange = (event) => {
        const next = event.target.value;
        const nextCursor = event.target.selectionStart ?? next.length;
        setCursor(nextCursor);
        emitFromEditable(next);
    };
    const onKeyDown = (event) => {
        if (autocomplete.handleKeyDown(event)) {
            return;
        }
        textareaProps.onKeyDown?.(event);
    };
    const onSelect = (event) => {
        setCursor(event.target.selectionStart ?? 0);
        textareaProps.onSelect?.(event);
    };
    const onClick = (event) => {
        const target = event.currentTarget;
        setCursor(target.selectionStart ?? 0);
        textareaProps.onClick?.(event);
    };
    const previewMentions = useMemo(() => value.mentions.map((m) => ({ userId: m.userId, displayName: m.displayName })), [value.mentions]);
    return (_jsxs("div", { className: classNames?.root, "data-mention-editor": true, children: [_jsx("textarea", { ...textareaProps, ref: textareaRef, className: classNames?.textarea, value: editableText, rows: rows, placeholder: placeholder, "aria-autocomplete": "list", "aria-controls": autocomplete.open ? autocomplete.listboxId : undefined, "aria-expanded": autocomplete.open, onChange: onTextChange, onKeyDown: onKeyDown, onSelect: onSelect, onClick: onClick }), autocomplete.open ? (_jsxs("ul", { id: autocomplete.listboxId, className: classNames?.mentionList, role: "listbox", "aria-label": mentionListLabel, children: [autocomplete.loading ? (_jsx("li", { role: "option", "aria-disabled": "true", children: "Searching\u2026" })) : null, !autocomplete.loading && autocomplete.candidates.length === 0 ? (_jsx("li", { role: "option", "aria-disabled": "true", children: "No people found" })) : null, autocomplete.candidates.map((candidate, index) => {
                        const active = index === autocomplete.activeIndex;
                        return (_jsxs("li", { role: "option", "aria-selected": active, className: active
                                ? [classNames?.mentionOption, classNames?.mentionOptionActive]
                                    .filter(Boolean)
                                    .join(' ')
                                : classNames?.mentionOption, onMouseDown: (event) => {
                                event.preventDefault();
                                autocomplete.selectCandidate(candidate);
                            }, onMouseEnter: () => autocomplete.setActiveIndex(index), children: [_jsx("span", { children: candidate.displayName }), candidate.email ? _jsx("span", { children: candidate.email }) : null] }, candidate.userId));
                    })] })) : null, showPreview ? (_jsx("div", { className: classNames?.preview, "aria-live": "polite", children: _jsx(CommentContent, { content: value.content, mentions: previewMentions }) })) : null] }));
}
export { CommentContent } from './CommentContent.js';
//# sourceMappingURL=MentionCommentEditor.js.map