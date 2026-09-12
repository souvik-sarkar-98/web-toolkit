import type { CommentEditorValue, CommentMentionSummary, CreateCommentPayload, MentionInput, UpdateCommentPayload } from './types.js';
/** Same token format validated server-side in nestjs-shared-comment Comment aggregate. */
export declare const MENTION_TOKEN_REGEX: RegExp;
export declare function mentionToken(userId: string): string;
export declare function parseMentionedUserIds(content: string): Set<string>;
export declare function deduplicateMentions(mentions: readonly MentionInput[]): MentionInput[];
/** Keep only mentions whose userId appears as @[userId] in content. */
export declare function syncMentionsWithContent(content: string, mentions: readonly MentionInput[]): MentionInput[];
/** Replace @[userId] tokens with @DisplayName for in-editor display. */
export declare function contentToEditableText(content: string, mentions: readonly Pick<MentionInput, 'userId' | 'displayName'>[]): string;
/** Convert @DisplayName segments back to @[userId] using the known mention list. */
export declare function editableTextToContent(editableText: string, mentions: readonly MentionInput[]): string;
export declare function buildCommentEditorValue(editableText: string, mentions: readonly MentionInput[]): CommentEditorValue;
export declare function insertMentionInEditableText(editableText: string, cursor: number, mention: MentionInput): {
    text: string;
    cursor: number;
};
export declare function getActiveMentionQuery(editableText: string, cursor: number): string | null;
export interface ContentSegment {
    type: 'text' | 'mention';
    text: string;
    userId?: string;
}
/** Split stored content into plain text and mention segments for read-only rendering. */
export declare function parseContentSegments(content: string, mentions: readonly CommentMentionSummary[]): ContentSegment[];
export declare function toCreateCommentPayload(value: CommentEditorValue, entityType: string, entityId: string, parentId?: string): CreateCommentPayload;
export declare function toUpdateCommentPayload(value: CommentEditorValue): UpdateCommentPayload;
//# sourceMappingURL=mention-tokens.d.ts.map