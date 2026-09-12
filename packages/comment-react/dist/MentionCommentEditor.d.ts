import { type TextareaHTMLAttributes } from 'react';
import type { CommentEditorValue, MentionUserSearch } from '@web-toolkit/comment-core';
export interface MentionCommentEditorClassNames {
    root?: string;
    textarea?: string;
    mentionList?: string;
    mentionOption?: string;
    mentionOptionActive?: string;
    preview?: string;
}
export interface MentionCommentEditorProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange' | 'defaultValue'> {
    value: CommentEditorValue;
    onChange: (value: CommentEditorValue) => void;
    searchUsers: MentionUserSearch;
    minMentionQueryLength?: number;
    showPreview?: boolean;
    classNames?: MentionCommentEditorClassNames;
    mentionListLabel?: string;
}
export declare function MentionCommentEditor({ value, onChange, searchUsers, minMentionQueryLength, showPreview, classNames, mentionListLabel, placeholder, rows, ...textareaProps }: MentionCommentEditorProps): import("react").JSX.Element;
export { CommentContent } from './CommentContent.js';
export type { CommentContentClassNames, CommentContentProps } from './CommentContent.js';
//# sourceMappingURL=MentionCommentEditor.d.ts.map