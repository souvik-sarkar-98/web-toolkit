/** Same token format validated server-side in nestjs-shared-comment Comment aggregate. */
export const MENTION_TOKEN_REGEX = /@\[([^\]]+)\]/g;
export function mentionToken(userId) {
    return `@[${userId}]`;
}
export function parseMentionedUserIds(content) {
    const ids = new Set();
    const regex = new RegExp(MENTION_TOKEN_REGEX.source, 'g');
    let match;
    while ((match = regex.exec(content)) !== null) {
        ids.add(match[1]);
    }
    return ids;
}
export function deduplicateMentions(mentions) {
    return [...new Map(mentions.map((m) => [m.userId, m])).values()];
}
/** Keep only mentions whose userId appears as @[userId] in content. */
export function syncMentionsWithContent(content, mentions) {
    const ids = parseMentionedUserIds(content);
    return deduplicateMentions(mentions.filter((m) => ids.has(m.userId)));
}
function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
/** Replace @[userId] tokens with @DisplayName for in-editor display. */
export function contentToEditableText(content, mentions) {
    const byId = new Map(mentions.map((m) => [m.userId, m.displayName]));
    return content.replace(MENTION_TOKEN_REGEX, (_, userId) => {
        const name = byId.get(userId);
        return name ? `@${name}` : `@${userId}`;
    });
}
/** Convert @DisplayName segments back to @[userId] using the known mention list. */
export function editableTextToContent(editableText, mentions) {
    let result = editableText;
    const sorted = [...mentions].sort((a, b) => b.displayName.length - a.displayName.length);
    for (const mention of sorted) {
        const pattern = new RegExp(`@${escapeRegExp(mention.displayName)}(?=\\s|$|[.,!?;:])`, 'g');
        result = result.replace(pattern, mentionToken(mention.userId));
    }
    return result;
}
export function buildCommentEditorValue(editableText, mentions) {
    const content = editableTextToContent(editableText, mentions);
    return {
        content,
        mentions: syncMentionsWithContent(content, mentions),
    };
}
export function insertMentionInEditableText(editableText, cursor, mention) {
    const before = editableText.slice(0, cursor);
    const after = editableText.slice(cursor);
    const atMatch = before.match(/@([^\s@]*)$/);
    const replaceFrom = atMatch ? before.length - atMatch[0].length : cursor;
    const prefix = editableText.slice(0, replaceFrom);
    const insert = `@${mention.displayName} `;
    const text = `${prefix}${insert}${after}`;
    return {
        text,
        cursor: prefix.length + insert.length,
    };
}
export function getActiveMentionQuery(editableText, cursor) {
    const before = editableText.slice(0, cursor);
    const match = before.match(/@([^\s@[\]]*)$/);
    return match ? match[1] : null;
}
/** Split stored content into plain text and mention segments for read-only rendering. */
export function parseContentSegments(content, mentions) {
    const byId = new Map(mentions.map((m) => [m.userId, m.displayName]));
    const segments = [];
    const regex = new RegExp(MENTION_TOKEN_REGEX.source, 'g');
    let lastIndex = 0;
    let match;
    while ((match = regex.exec(content)) !== null) {
        const start = match.index;
        if (start > lastIndex) {
            segments.push({ type: 'text', text: content.slice(lastIndex, start) });
        }
        const userId = match[1];
        const label = byId.get(userId) ?? userId;
        segments.push({ type: 'mention', text: `@${label}`, userId });
        lastIndex = regex.lastIndex;
    }
    if (lastIndex < content.length) {
        segments.push({ type: 'text', text: content.slice(lastIndex) });
    }
    return segments;
}
export function toCreateCommentPayload(value, entityType, entityId, parentId) {
    return {
        content: value.content,
        entityType,
        entityId,
        parentId,
        mentions: value.mentions,
    };
}
export function toUpdateCommentPayload(value) {
    return {
        content: value.content,
        mentions: value.mentions,
    };
}
//# sourceMappingURL=mention-tokens.js.map