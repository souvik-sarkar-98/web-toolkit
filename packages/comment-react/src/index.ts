export { MentionCommentEditor, CommentContent } from './MentionCommentEditor.js';
export type {
  MentionCommentEditorClassNames,
  MentionCommentEditorProps,
  CommentContentClassNames,
  CommentContentProps,
} from './MentionCommentEditor.js';

export { useMentionAutocomplete, syncTextareaCursor } from './useMentionAutocomplete.js';
export type {
  UseMentionAutocompleteOptions,
  UseMentionAutocompleteResult,
} from './useMentionAutocomplete.js';

export type {
  CommentEditorValue,
  CommentMentionSummary,
  CreateCommentPayload,
  MentionCandidate,
  MentionInput,
  MentionUserSearch,
  UpdateCommentPayload,
} from '@ssweb-toolkit/comment-core';

export {
  buildCommentEditorValue,
  contentToEditableText,
  parseContentSegments,
  toCreateCommentPayload,
  toUpdateCommentPayload,
} from '@ssweb-toolkit/comment-core';
