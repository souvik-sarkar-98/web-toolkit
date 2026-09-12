# `@web-toolkit/comment-core`

Framework-agnostic mention tokens and comment editor values. UI packages render these values; this package owns parse/serialize rules.

## Install

```bash
npm install @web-toolkit/comment-core
```

## What it does

- Parse `@[display](userId)`-style mention tokens (`MENTION_TOKEN_REGEX`, `parseContentSegments`, `parseMentionedUserIds`).
- Keep editor state in sync (`buildCommentEditorValue`, `contentToEditableText`, `editableTextToContent`, `syncMentionsWithContent`, `insertMentionInEditableText`).
- Autocomplete query at the caret (`getActiveMentionQuery`).
- API payloads: `toCreateCommentPayload`, `toUpdateCommentPayload`.

Types: `CommentEditorValue`, `MentionCandidate`, `MentionUserSearch`, `CreateCommentPayload`, `UpdateCommentPayload`.

## Usage

```ts
import {
  buildCommentEditorValue,
  parseMentionedUserIds,
  toCreateCommentPayload,
} from '@web-toolkit/comment-core';

const value = buildCommentEditorValue(editableText, mentions);
const userIds = parseMentionedUserIds(value.content);
const payload = toCreateCommentPayload(value);
```

## Build (this repo)

```bash
npm run build -w @web-toolkit/comment-core
npm test -w @web-toolkit/comment-core
```

Fixed version group with `comment-react` and `comment-angular`. Overview: [root README](../../README.md).
