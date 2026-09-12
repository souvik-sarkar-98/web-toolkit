import type { CommentMentionSummary } from '@web-toolkit/comment-core';
export interface CommentContentClassNames {
    root?: string;
    mention?: string;
}
export interface CommentContentProps {
    content: string;
    mentions?: CommentMentionSummary[];
    classNames?: CommentContentClassNames;
}
export declare function CommentContent({ content, mentions, classNames }: CommentContentProps): import("react").JSX.Element;
//# sourceMappingURL=CommentContent.d.ts.map