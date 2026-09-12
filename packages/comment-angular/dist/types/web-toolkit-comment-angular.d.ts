import * as i0 from '@angular/core';
import { InjectionToken, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as _web_toolkit_comment_core from '@web-toolkit/comment-core';
import { MentionCandidate, CommentEditorValue, CommentMentionSummary } from '@web-toolkit/comment-core';

type MentionUserSearchFn = (query: string) => MentionCandidate[] | Promise<MentionCandidate[]>;
declare const MENTION_USER_SEARCH: InjectionToken<MentionUserSearchFn>;

declare class MentionCommentEditorComponent implements ControlValueAccessor {
    private readonly cdr;
    private readonly injectedSearch?;
    rows: number;
    placeholder: string;
    minMentionQueryLength: number;
    showPreview: boolean;
    debounceMs: number;
    searchUsers?: MentionUserSearchFn;
    textareaRef?: ElementRef<HTMLTextAreaElement>;
    value: CommentEditorValue;
    editableText: string;
    disabled: boolean;
    mentionOpen: boolean;
    loading: boolean;
    candidates: MentionCandidate[];
    activeIndex: number;
    private cursor;
    private mentionList;
    private searchTimer?;
    private requestId;
    private onChange;
    private onTouched;
    constructor(cdr: ChangeDetectorRef, injectedSearch?: MentionUserSearchFn);
    private resolveSearch;
    writeValue(value: CommentEditorValue | null): void;
    registerOnChange(fn: (value: CommentEditorValue) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    onEditableChange(nextEditable: string): void;
    syncCursor(): void;
    onKeyDown(event: KeyboardEvent): void;
    pickCandidate(candidate: MentionCandidate, event: MouseEvent): void;
    private applyCandidate;
    private scheduleSearch;
    static ɵfac: i0.ɵɵFactoryDeclaration<MentionCommentEditorComponent, [null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MentionCommentEditorComponent, "cm-mention-comment-editor", never, { "rows": { "alias": "rows"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "minMentionQueryLength": { "alias": "minMentionQueryLength"; "required": false; }; "showPreview": { "alias": "showPreview"; "required": false; }; "debounceMs": { "alias": "debounceMs"; "required": false; }; "searchUsers": { "alias": "searchUsers"; "required": false; }; }, {}, never, never, true, never>;
}

declare class CommentContentComponent {
    content: string;
    mentions: CommentMentionSummary[];
    get segments(): _web_toolkit_comment_core.ContentSegment[];
    static ɵfac: i0.ɵɵFactoryDeclaration<CommentContentComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CommentContentComponent, "cm-comment-content", never, { "content": { "alias": "content"; "required": true; }; "mentions": { "alias": "mentions"; "required": false; }; }, {}, never, never, true, never>;
}

export { CommentContentComponent, MENTION_USER_SEARCH, MentionCommentEditorComponent };
export type { MentionUserSearchFn };
