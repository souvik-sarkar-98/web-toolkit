import { jsx as _jsx } from "react/jsx-runtime";
import { parseContentSegments } from '@ssweb-toolkit/comment-core';
export function CommentContent({ content, mentions = [], classNames }) {
    const segments = parseContentSegments(content, mentions);
    return (_jsx("span", { className: classNames?.root, children: segments.map((segment, index) => segment.type === 'mention' ? (_jsx("strong", { className: classNames?.mention, "data-mention-id": segment.userId, children: segment.text }, index)) : (_jsx("span", { children: segment.text }, index))) }));
}
//# sourceMappingURL=CommentContent.js.map