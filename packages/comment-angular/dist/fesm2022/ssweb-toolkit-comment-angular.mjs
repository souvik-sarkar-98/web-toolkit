import * as i0 from '@angular/core';
import { Input, ChangeDetectionStrategy, Component, InjectionToken, forwardRef, ViewChild, Optional, Inject } from '@angular/core';
import * as i1 from '@angular/forms';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { parseContentSegments, contentToEditableText, buildCommentEditorValue, insertMentionInEditableText, deduplicateMentions, getActiveMentionQuery } from '@ssweb-toolkit/comment-core';

class CommentContentComponent {
    content;
    mentions = [];
    get segments() {
        return parseContentSegments(this.content, this.mentions);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: CommentContentComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.21", type: CommentContentComponent, isStandalone: true, selector: "cm-comment-content", inputs: { content: "content", mentions: "mentions" }, ngImport: i0, template: `
    @for (segment of segments; track $index) {
      @if (segment.type === 'mention') {
        <strong [attr.data-mention-id]="segment.userId">{{ segment.text }}</strong>
      } @else {
        <span>{{ segment.text }}</span>
      }
    }
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: CommentContentComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'cm-comment-content',
                    standalone: true,
                    template: `
    @for (segment of segments; track $index) {
      @if (segment.type === 'mention') {
        <strong [attr.data-mention-id]="segment.userId">{{ segment.text }}</strong>
      } @else {
        <span>{{ segment.text }}</span>
      }
    }
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], propDecorators: { content: [{
                type: Input,
                args: [{ required: true }]
            }], mentions: [{
                type: Input
            }] } });

const MENTION_USER_SEARCH = new InjectionToken('MENTION_USER_SEARCH');

class MentionCommentEditorComponent {
    cdr;
    injectedSearch;
    rows = 4;
    placeholder = 'Write a comment… Use @ to mention someone';
    minMentionQueryLength = 1;
    showPreview = false;
    debounceMs = 200;
    searchUsers;
    textareaRef;
    value = { content: '', mentions: [] };
    editableText = '';
    disabled = false;
    mentionOpen = false;
    loading = false;
    candidates = [];
    activeIndex = 0;
    cursor = 0;
    mentionList = [];
    searchTimer;
    requestId = 0;
    onChange = () => undefined;
    onTouched = () => undefined;
    constructor(cdr, injectedSearch) {
        this.cdr = cdr;
        this.injectedSearch = injectedSearch;
    }
    resolveSearch() {
        return this.searchUsers ?? this.injectedSearch;
    }
    writeValue(value) {
        this.value = value ?? { content: '', mentions: [] };
        this.mentionList = [...this.value.mentions];
        this.editableText = contentToEditableText(this.value.content, this.value.mentions);
        this.cdr.markForCheck();
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this.cdr.markForCheck();
    }
    onEditableChange(nextEditable) {
        this.editableText = nextEditable;
        this.value = buildCommentEditorValue(nextEditable, this.mentionList);
        this.mentionList = [...this.value.mentions];
        this.onChange(this.value);
        this.scheduleSearch();
        this.cdr.markForCheck();
    }
    syncCursor() {
        const el = this.textareaRef?.nativeElement;
        this.cursor = el?.selectionStart ?? this.editableText.length;
        this.scheduleSearch();
    }
    onKeyDown(event) {
        if (!this.mentionOpen || this.candidates.length === 0) {
            return;
        }
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            this.activeIndex = (this.activeIndex + 1) % this.candidates.length;
            return;
        }
        if (event.key === 'ArrowUp') {
            event.preventDefault();
            this.activeIndex =
                (this.activeIndex - 1 + this.candidates.length) % this.candidates.length;
            return;
        }
        if (event.key === 'Enter' || event.key === 'Tab') {
            event.preventDefault();
            const candidate = this.candidates[this.activeIndex];
            if (candidate) {
                this.applyCandidate(candidate);
            }
            return;
        }
        if (event.key === 'Escape') {
            event.preventDefault();
            this.candidates = [];
            this.mentionOpen = false;
        }
    }
    pickCandidate(candidate, event) {
        event.preventDefault();
        this.applyCandidate(candidate);
    }
    applyCandidate(candidate) {
        const result = insertMentionInEditableText(this.editableText, this.cursor, candidate);
        this.mentionList = deduplicateMentions([
            ...this.mentionList.filter((m) => m.userId !== candidate.userId),
            candidate,
        ]);
        this.editableText = result.text;
        this.cursor = result.cursor;
        this.value = buildCommentEditorValue(this.editableText, this.mentionList);
        this.onChange(this.value);
        this.candidates = [];
        this.mentionOpen = false;
        queueMicrotask(() => {
            const el = this.textareaRef?.nativeElement;
            if (!el)
                return;
            el.focus();
            el.setSelectionRange(this.cursor, this.cursor);
        });
        this.cdr.markForCheck();
    }
    scheduleSearch() {
        const searchUsers = this.resolveSearch();
        if (!searchUsers) {
            this.mentionOpen = false;
            return;
        }
        const query = getActiveMentionQuery(this.editableText, this.cursor);
        if (query === null || query.length < this.minMentionQueryLength) {
            this.mentionOpen = query !== null;
            this.candidates = [];
            this.loading = false;
            this.cdr.markForCheck();
            return;
        }
        this.mentionOpen = true;
        this.loading = true;
        const requestId = ++this.requestId;
        if (this.searchTimer) {
            clearTimeout(this.searchTimer);
        }
        this.searchTimer = setTimeout(() => {
            void Promise.resolve(searchUsers(query))
                .then((results) => {
                if (requestId !== this.requestId)
                    return;
                this.candidates = results;
                this.activeIndex = 0;
            })
                .finally(() => {
                if (requestId === this.requestId) {
                    this.loading = false;
                    this.cdr.markForCheck();
                }
            });
        }, this.debounceMs);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: MentionCommentEditorComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: MENTION_USER_SEARCH, optional: true }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.21", type: MentionCommentEditorComponent, isStandalone: true, selector: "cm-mention-comment-editor", inputs: { rows: "rows", placeholder: "placeholder", minMentionQueryLength: "minMentionQueryLength", showPreview: "showPreview", debounceMs: "debounceMs", searchUsers: "searchUsers" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => MentionCommentEditorComponent),
                multi: true,
            },
        ], viewQueries: [{ propertyName: "textareaRef", first: true, predicate: ["textarea"], descendants: true }], ngImport: i0, template: `
    <div class="cm-mention-editor">
      <textarea
        #textarea
        [rows]="rows"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [(ngModel)]="editableText"
        (ngModelChange)="onEditableChange($event)"
        (click)="syncCursor()"
        (keyup)="syncCursor()"
        (keydown)="onKeyDown($event)"
      ></textarea>

      @if (mentionOpen) {
        <ul class="cm-mention-list" role="listbox">
          @if (loading) {
            <li>Searching…</li>
          } @else if (candidates.length === 0) {
            <li>No people found</li>
          } @else {
            @for (candidate of candidates; track candidate.userId; let i = $index) {
              <li
                role="option"
                [class.active]="i === activeIndex"
                (mousedown)="pickCandidate(candidate, $event)"
              >
                {{ candidate.displayName }}
                @if (candidate.email) {
                  <span>{{ candidate.email }}</span>
                }
              </li>
            }
          }
        </ul>
      }

      @if (showPreview && value) {
        <cm-comment-content [content]="value.content" [mentions]="value.mentions" />
      }
    </div>
  `, isInline: true, styles: [":host{display:block;min-width:0}.cm-mention-editor{position:relative;display:flex;flex-direction:column;gap:8px}textarea{display:block;width:100%;box-sizing:border-box;padding:8px 10px;border:1px solid var(--cm-editor-border, #d1d5db);border-radius:var(--cm-editor-radius, 10px);background:var(--cm-editor-bg, #fff);color:inherit;font:inherit;font-size:var(--cm-editor-font-size, .85rem);line-height:1.45;resize:vertical;transition:border-color .15s ease,box-shadow .15s ease}textarea::placeholder{color:var(--cm-editor-placeholder, #9ca3af)}textarea:focus{outline:none;border-color:var(--cm-editor-focus, #f97316);box-shadow:0 0 0 3px var(--cm-editor-focus-ring, rgba(249, 115, 22, .16))}textarea:disabled{background:var(--cm-editor-disabled-bg, #f9fafb);cursor:not-allowed}.cm-mention-list{position:absolute;top:calc(100% + 4px);left:0;right:0;z-index:30;margin:0;padding:4px;list-style:none;max-height:200px;overflow-y:auto;background:#fff;border:1px solid var(--cm-editor-border, #d1d5db);border-radius:10px;box-shadow:0 8px 24px #0f172a24}.cm-mention-list li{display:flex;flex-direction:column;gap:1px;padding:6px 8px;border-radius:8px;font-size:.8rem;cursor:pointer}.cm-mention-list li:hover,.cm-mention-list li.active{background:var(--cm-mention-active-bg, #fff7ed)}.cm-mention-list li span{color:#6b7280;font-size:.7rem}\n"], dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: CommentContentComponent, selector: "cm-comment-content", inputs: ["content", "mentions"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: MentionCommentEditorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cm-mention-comment-editor', standalone: true, imports: [FormsModule, CommentContentComponent], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => MentionCommentEditorComponent),
                            multi: true,
                        },
                    ], template: `
    <div class="cm-mention-editor">
      <textarea
        #textarea
        [rows]="rows"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [(ngModel)]="editableText"
        (ngModelChange)="onEditableChange($event)"
        (click)="syncCursor()"
        (keyup)="syncCursor()"
        (keydown)="onKeyDown($event)"
      ></textarea>

      @if (mentionOpen) {
        <ul class="cm-mention-list" role="listbox">
          @if (loading) {
            <li>Searching…</li>
          } @else if (candidates.length === 0) {
            <li>No people found</li>
          } @else {
            @for (candidate of candidates; track candidate.userId; let i = $index) {
              <li
                role="option"
                [class.active]="i === activeIndex"
                (mousedown)="pickCandidate(candidate, $event)"
              >
                {{ candidate.displayName }}
                @if (candidate.email) {
                  <span>{{ candidate.email }}</span>
                }
              </li>
            }
          }
        </ul>
      }

      @if (showPreview && value) {
        <cm-comment-content [content]="value.content" [mentions]="value.mentions" />
      }
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: [":host{display:block;min-width:0}.cm-mention-editor{position:relative;display:flex;flex-direction:column;gap:8px}textarea{display:block;width:100%;box-sizing:border-box;padding:8px 10px;border:1px solid var(--cm-editor-border, #d1d5db);border-radius:var(--cm-editor-radius, 10px);background:var(--cm-editor-bg, #fff);color:inherit;font:inherit;font-size:var(--cm-editor-font-size, .85rem);line-height:1.45;resize:vertical;transition:border-color .15s ease,box-shadow .15s ease}textarea::placeholder{color:var(--cm-editor-placeholder, #9ca3af)}textarea:focus{outline:none;border-color:var(--cm-editor-focus, #f97316);box-shadow:0 0 0 3px var(--cm-editor-focus-ring, rgba(249, 115, 22, .16))}textarea:disabled{background:var(--cm-editor-disabled-bg, #f9fafb);cursor:not-allowed}.cm-mention-list{position:absolute;top:calc(100% + 4px);left:0;right:0;z-index:30;margin:0;padding:4px;list-style:none;max-height:200px;overflow-y:auto;background:#fff;border:1px solid var(--cm-editor-border, #d1d5db);border-radius:10px;box-shadow:0 8px 24px #0f172a24}.cm-mention-list li{display:flex;flex-direction:column;gap:1px;padding:6px 8px;border-radius:8px;font-size:.8rem;cursor:pointer}.cm-mention-list li:hover,.cm-mention-list li.active{background:var(--cm-mention-active-bg, #fff7ed)}.cm-mention-list li span{color:#6b7280;font-size:.7rem}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MENTION_USER_SEARCH]
                }] }], propDecorators: { rows: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], minMentionQueryLength: [{
                type: Input
            }], showPreview: [{
                type: Input
            }], debounceMs: [{
                type: Input
            }], searchUsers: [{
                type: Input
            }], textareaRef: [{
                type: ViewChild,
                args: ['textarea']
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { CommentContentComponent, MENTION_USER_SEARCH, MentionCommentEditorComponent };
//# sourceMappingURL=ssweb-toolkit-comment-angular.mjs.map
