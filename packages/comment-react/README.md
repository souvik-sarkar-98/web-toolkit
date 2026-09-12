# `@web-toolkit/comment-react`

React textarea editor and read-only mention rendering on top of `@web-toolkit/comment-core`.

## Install

```bash
npm install @web-toolkit/comment-core @web-toolkit/comment-react
```

**Peers:** `react` and `react-dom` (^18 or ^19).

## Public surface

- `MentionCommentEditor` — controlled editor (`value` / `onChange`), `@` user search, optional preview.
- `CommentContent` — render stored content + mention list.
- `useMentionAutocomplete` / `syncTextareaCursor` — build a custom editor.

`searchUsers` must match `MentionUserSearch` from core (query in, candidates out).

## Usage

```tsx
import { MentionCommentEditor, CommentContent } from '@web-toolkit/comment-react';
import { buildCommentEditorValue } from '@web-toolkit/comment-core';

<MentionCommentEditor
  value={value}
  onChange={setValue}
  searchUsers={searchUsers}
  showPreview
/>

<CommentContent content={value.content} mentions={value.mentions} />
```

Style via `classNames` (`root`, `textarea`, `mentionList`, `mentionOption`, `preview`).

## Build (this repo)

```bash
npm run build -w @web-toolkit/comment-react
```

Fixed version group with `comment-core` and `comment-angular`. Overview: [root README](../../README.md).
