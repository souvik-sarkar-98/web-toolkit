# `@ssweb-toolkit/comment-angular`

Angular mention editor and comment display. Standalone components; the editor implements `ControlValueAccessor`.

## Install

```bash
npm install @ssweb-toolkit/comment-core @ssweb-toolkit/comment-angular
```

**Peers:** Angular `^19 || ^20 || ^21` (`common`, `core`, `forms`).

## Setup

Provide user search for `@` autocomplete:

```ts
import { MENTION_USER_SEARCH } from '@ssweb-toolkit/comment-angular';

{
  provide: MENTION_USER_SEARCH,
  useValue: (query: string) => searchPeople(query),
}
```

You can also pass search as an input on the editor when you prefer not to use the token.

## Usage

```html
<cm-mention-comment-editor
  [(ngModel)]="comment"
  [placeholder]="'Write a comment…'"
  [showPreview]="true"
/>

<cm-comment-content [content]="comment.content" [mentions]="comment.mentions" />
```

Public surface:

- `MentionCommentEditorComponent` (`cm-mention-comment-editor`)
- `CommentContentComponent` (`cm-comment-content`)
- `MENTION_USER_SEARCH` token

## Build (this repo)

```bash
npm run build -w @ssweb-toolkit/comment-angular
```

Fixed version group with `comment-core` and `comment-react`. Overview: [root README](../../README.md).
