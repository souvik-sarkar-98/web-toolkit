import { parseBooleanQueryParam, parseStringQueryParam, parseCsvQueryParam, formatCsvQueryParam, valuesEqual, createListPageAdapter, createDetailPageAdapter, ListFormResolver, resolveListDashboardConfig, compileListDashboardConfig, ListPreparationRunner } from '@web-toolkit/list-dashboard-core';
export * from '@web-toolkit/list-dashboard-core';
export { readRouteRefData } from '@web-toolkit/list-dashboard-core';
import * as i0 from '@angular/core';
import { EventEmitter, Output, Input, Component, Directive, TemplateRef, HostListener, ContentChild, ViewChild, InjectionToken, Inject, ViewContainerRef, Optional, NgModule, Injectable } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import * as i2 from '@angular/material/checkbox';
import { MatCheckboxModule } from '@angular/material/checkbox';
import * as i2$1 from '@web-toolkit/forms-angular';
import { CfFormComponent, CfFormStepperComponent, CfFormStepperStepDirective } from '@web-toolkit/forms-angular';
import { Subscription, catchError, of, isObservable, tap } from 'rxjs';
import * as i5 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i6 from '@angular/material/menu';
import { MatMenuModule } from '@angular/material/menu';
import * as i1$1 from '@angular/router';

class ChipFilterBarComponent {
    chips = [];
    activeId = '';
    chipSelect = new EventEmitter();
    get visibleChips() {
        return this.chips.filter(chip => !chip.hidden);
    }
    selectChip(chipId) {
        if (chipId !== this.activeId) {
            this.chipSelect.emit(chipId);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: ChipFilterBarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.21", type: ChipFilterBarComponent, isStandalone: false, selector: "app-chip-filter-bar", inputs: { chips: "chips", activeId: "activeId" }, outputs: { chipSelect: "chipSelect" }, ngImport: i0, template: "<div class=\"chip-bar\" role=\"tablist\" aria-label=\"Filters\">\n  <button\n    *ngFor=\"let chip of visibleChips\"\n    type=\"button\"\n    class=\"chip-bar__chip\"\n    role=\"tab\"\n    [class.chip-bar__chip--active]=\"chip.id === activeId\"\n    [attr.aria-selected]=\"chip.id === activeId\"\n    (click)=\"selectChip(chip.id)\">\n    {{ chip.label }}\n  </button>\n</div>\n", styles: [".chip-bar{display:flex;gap:8px;overflow-x:auto;width:100%;min-width:0;max-width:100%;box-sizing:border-box;padding:0 0 12px;scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch}.chip-bar::-webkit-scrollbar{display:none}.chip-bar__chip{flex:0 0 auto;border:1px solid rgba(148,163,184,.35);background:#fff;color:var(--secondary-600);border-radius:999px;padding:8px 14px;font-size:.72rem;font-weight:700;line-height:1;cursor:pointer;transition:all .18s ease;white-space:nowrap}.chip-bar__chip:hover{border-color:var(--primary-200);color:var(--primary-700);background:var(--primary-50)}.chip-bar__chip--active{background:var(--primary-500);border-color:var(--primary-500);color:#fff;box-shadow:0 4px 12px #f9731647}@media(max-width:480px){.chip-bar{gap:6px;padding-bottom:10px}.chip-bar__chip{padding:6px 10px;font-size:.68rem}}\n"], dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: ChipFilterBarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-chip-filter-bar', standalone: false, template: "<div class=\"chip-bar\" role=\"tablist\" aria-label=\"Filters\">\n  <button\n    *ngFor=\"let chip of visibleChips\"\n    type=\"button\"\n    class=\"chip-bar__chip\"\n    role=\"tab\"\n    [class.chip-bar__chip--active]=\"chip.id === activeId\"\n    [attr.aria-selected]=\"chip.id === activeId\"\n    (click)=\"selectChip(chip.id)\">\n    {{ chip.label }}\n  </button>\n</div>\n", styles: [".chip-bar{display:flex;gap:8px;overflow-x:auto;width:100%;min-width:0;max-width:100%;box-sizing:border-box;padding:0 0 12px;scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch}.chip-bar::-webkit-scrollbar{display:none}.chip-bar__chip{flex:0 0 auto;border:1px solid rgba(148,163,184,.35);background:#fff;color:var(--secondary-600);border-radius:999px;padding:8px 14px;font-size:.72rem;font-weight:700;line-height:1;cursor:pointer;transition:all .18s ease;white-space:nowrap}.chip-bar__chip:hover{border-color:var(--primary-200);color:var(--primary-700);background:var(--primary-50)}.chip-bar__chip--active{background:var(--primary-500);border-color:var(--primary-500);color:#fff;box-shadow:0 4px 12px #f9731647}@media(max-width:480px){.chip-bar{gap:6px;padding-bottom:10px}.chip-bar__chip{padding:6px 10px;font-size:.68rem}}\n"] }]
        }], propDecorators: { chips: [{
                type: Input,
                args: [{ required: true }]
            }], activeId: [{
                type: Input
            }], chipSelect: [{
                type: Output
            }] } });

class ListRowCardComponent {
    iconTone = 'orange';
    avatar = false;
    badgeTone = 'neutral';
    get iconToneClass() {
        return this.avatar ? 'list-row__icon--avatar' : `list-row__icon--${this.iconTone}`;
    }
    get badgeToneClass() {
        return `list-row__badge--${this.badgeTone}`;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: ListRowCardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.21", type: ListRowCardComponent, isStandalone: false, selector: "app-list-row-card", inputs: { iconTone: "iconTone", avatar: "avatar", badgeTone: "badgeTone" }, ngImport: i0, template: "<div class=\"list-row\">\n  <div class=\"list-row__icon\" [ngClass]=\"iconToneClass\">\n    <ng-content select=\"[listRowIcon]\"></ng-content>\n  </div>\n\n  <div class=\"list-row__content\">\n    <div class=\"list-row__title\">\n      <ng-content select=\"[listRowTitle]\"></ng-content>\n    </div>\n    <div class=\"list-row__subtitle\">\n      <ng-content select=\"[listRowSubtitle]\"></ng-content>\n    </div>\n    <div class=\"list-row__meta\">\n      <span><ng-content select=\"[listRowMetaLeft]\"></ng-content></span>\n    </div>\n  </div>\n\n  <div class=\"list-row__aside\">\n    <span class=\"list-row__badge\" [ngClass]=\"badgeToneClass\">\n      <ng-content select=\"[listRowBadge]\"></ng-content>\n    </span>\n    <span class=\"list-row__date\">\n      <ng-content select=\"[listRowMetaRight]\"></ng-content>\n    </span>\n  </div>\n</div>\n", styles: [".list-row{display:flex;align-items:flex-start;gap:10px;padding:12px 10px;background:transparent;border-bottom:none;cursor:pointer;transition:background .15s ease}.list-row:hover{background:var(--uld-row-hover, #fffaf5)}.list-row:active{background:var(--primary-50)}.list-row__icon{width:36px;height:36px;margin-top:1px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:inset 0 0 0 1px #f973161a}.list-row__icon:empty{display:none}.list-row__icon ::ng-deep svg,.list-row__icon ::ng-deep .list-row__icon-symbol{width:16px;height:16px;display:block;flex-shrink:0}.list-row__icon ::ng-deep .list-row__icon-symbol{font-size:.95rem;font-weight:700;line-height:1}.list-row__icon ::ng-deep .list-row__avatar{width:100%;height:100%;display:block;object-fit:cover}.list-row__icon ::ng-deep .list-row__avatar--initials{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:.72rem;font-weight:700;letter-spacing:.02em;text-transform:uppercase;background:linear-gradient(135deg,#fdba74,#f97316);color:#fff}.list-row__icon--orange{background:var(--uld-icon-orange, #ffedd5);color:var(--uld-icon-orange-fg, #c2410c)}.list-row__icon--blue{background:var(--uld-icon-blue, #dbeafe);color:var(--uld-icon-blue-fg, #1d4ed8)}.list-row__icon--green{background:var(--uld-icon-green, #dcfce7);color:var(--uld-icon-green-fg, #15803d)}.list-row__icon--red{background:var(--uld-icon-red, #fee2e2);color:var(--uld-icon-red-fg, #b91c1c)}.list-row__icon--amber{background:var(--uld-icon-amber, #fef3c7);color:var(--uld-icon-amber-fg, #b45309)}.list-row__icon--indigo{background:var(--uld-icon-indigo, #e0e7ff);color:var(--uld-icon-indigo-fg, #4338ca)}.list-row__icon--neutral{background:var(--uld-icon-neutral, #f1f5f9);color:var(--uld-icon-neutral-fg, #334155)}.list-row__icon--avatar{border-radius:50%;overflow:hidden;padding:0;box-shadow:none;background:#e2e8f0;color:#475569}.list-row__content{flex:1;min-width:0}.list-row__title{font-size:.82rem;font-weight:700;color:var(--secondary-900);line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.list-row__title:empty{display:none}.list-row__subtitle{margin-top:2px;font-size:.68rem;color:var(--secondary-500);line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.list-row__subtitle:empty{display:none;margin-top:0}.list-row__meta{margin-top:4px;display:flex;justify-content:space-between;gap:8px;font-size:.62rem;color:var(--secondary-500)}.list-row__meta:not(:has(span:not(:empty))){display:none}.list-row__meta span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.list-row__meta span:empty{display:none}.list-row__aside{flex-shrink:0;display:flex;flex-direction:column;align-items:flex-end;gap:4px;min-width:72px;padding-top:2px}.list-row__aside:has(.list-row__badge:empty):has(.list-row__date:empty){display:none}.list-row__date{font-size:.62rem;color:var(--secondary-500);line-height:1.2;text-align:right;white-space:nowrap}.list-row__date:empty{display:none}.list-row__badge{font-size:.58rem;font-weight:700;letter-spacing:.02em;text-transform:uppercase;border-radius:999px;padding:4px 8px;line-height:1}.list-row__badge:empty{display:none}.list-row__badge--primary{background:var(--primary-100);color:var(--primary-700)}.list-row__badge--success{background:var(--uld-badge-success-bg, #dcfce7);color:var(--uld-badge-success-fg, #15803d)}.list-row__badge--warning{background:var(--uld-badge-warning-bg, #fef3c7);color:var(--uld-badge-warning-fg, #b45309)}.list-row__badge--danger{background:var(--uld-badge-danger-bg, #fee2e2);color:var(--uld-badge-danger-fg, #b91c1c)}.list-row__badge--neutral{background:var(--uld-badge-neutral-bg, #f1f5f9);color:var(--uld-badge-neutral-fg, #475569)}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: ListRowCardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-list-row-card', standalone: false, template: "<div class=\"list-row\">\n  <div class=\"list-row__icon\" [ngClass]=\"iconToneClass\">\n    <ng-content select=\"[listRowIcon]\"></ng-content>\n  </div>\n\n  <div class=\"list-row__content\">\n    <div class=\"list-row__title\">\n      <ng-content select=\"[listRowTitle]\"></ng-content>\n    </div>\n    <div class=\"list-row__subtitle\">\n      <ng-content select=\"[listRowSubtitle]\"></ng-content>\n    </div>\n    <div class=\"list-row__meta\">\n      <span><ng-content select=\"[listRowMetaLeft]\"></ng-content></span>\n    </div>\n  </div>\n\n  <div class=\"list-row__aside\">\n    <span class=\"list-row__badge\" [ngClass]=\"badgeToneClass\">\n      <ng-content select=\"[listRowBadge]\"></ng-content>\n    </span>\n    <span class=\"list-row__date\">\n      <ng-content select=\"[listRowMetaRight]\"></ng-content>\n    </span>\n  </div>\n</div>\n", styles: [".list-row{display:flex;align-items:flex-start;gap:10px;padding:12px 10px;background:transparent;border-bottom:none;cursor:pointer;transition:background .15s ease}.list-row:hover{background:var(--uld-row-hover, #fffaf5)}.list-row:active{background:var(--primary-50)}.list-row__icon{width:36px;height:36px;margin-top:1px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:inset 0 0 0 1px #f973161a}.list-row__icon:empty{display:none}.list-row__icon ::ng-deep svg,.list-row__icon ::ng-deep .list-row__icon-symbol{width:16px;height:16px;display:block;flex-shrink:0}.list-row__icon ::ng-deep .list-row__icon-symbol{font-size:.95rem;font-weight:700;line-height:1}.list-row__icon ::ng-deep .list-row__avatar{width:100%;height:100%;display:block;object-fit:cover}.list-row__icon ::ng-deep .list-row__avatar--initials{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:.72rem;font-weight:700;letter-spacing:.02em;text-transform:uppercase;background:linear-gradient(135deg,#fdba74,#f97316);color:#fff}.list-row__icon--orange{background:var(--uld-icon-orange, #ffedd5);color:var(--uld-icon-orange-fg, #c2410c)}.list-row__icon--blue{background:var(--uld-icon-blue, #dbeafe);color:var(--uld-icon-blue-fg, #1d4ed8)}.list-row__icon--green{background:var(--uld-icon-green, #dcfce7);color:var(--uld-icon-green-fg, #15803d)}.list-row__icon--red{background:var(--uld-icon-red, #fee2e2);color:var(--uld-icon-red-fg, #b91c1c)}.list-row__icon--amber{background:var(--uld-icon-amber, #fef3c7);color:var(--uld-icon-amber-fg, #b45309)}.list-row__icon--indigo{background:var(--uld-icon-indigo, #e0e7ff);color:var(--uld-icon-indigo-fg, #4338ca)}.list-row__icon--neutral{background:var(--uld-icon-neutral, #f1f5f9);color:var(--uld-icon-neutral-fg, #334155)}.list-row__icon--avatar{border-radius:50%;overflow:hidden;padding:0;box-shadow:none;background:#e2e8f0;color:#475569}.list-row__content{flex:1;min-width:0}.list-row__title{font-size:.82rem;font-weight:700;color:var(--secondary-900);line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.list-row__title:empty{display:none}.list-row__subtitle{margin-top:2px;font-size:.68rem;color:var(--secondary-500);line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.list-row__subtitle:empty{display:none;margin-top:0}.list-row__meta{margin-top:4px;display:flex;justify-content:space-between;gap:8px;font-size:.62rem;color:var(--secondary-500)}.list-row__meta:not(:has(span:not(:empty))){display:none}.list-row__meta span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.list-row__meta span:empty{display:none}.list-row__aside{flex-shrink:0;display:flex;flex-direction:column;align-items:flex-end;gap:4px;min-width:72px;padding-top:2px}.list-row__aside:has(.list-row__badge:empty):has(.list-row__date:empty){display:none}.list-row__date{font-size:.62rem;color:var(--secondary-500);line-height:1.2;text-align:right;white-space:nowrap}.list-row__date:empty{display:none}.list-row__badge{font-size:.58rem;font-weight:700;letter-spacing:.02em;text-transform:uppercase;border-radius:999px;padding:4px 8px;line-height:1}.list-row__badge:empty{display:none}.list-row__badge--primary{background:var(--primary-100);color:var(--primary-700)}.list-row__badge--success{background:var(--uld-badge-success-bg, #dcfce7);color:var(--uld-badge-success-fg, #15803d)}.list-row__badge--warning{background:var(--uld-badge-warning-bg, #fef3c7);color:var(--uld-badge-warning-fg, #b45309)}.list-row__badge--danger{background:var(--uld-badge-danger-bg, #fee2e2);color:var(--uld-badge-danger-fg, #b91c1c)}.list-row__badge--neutral{background:var(--uld-badge-neutral-bg, #f1f5f9);color:var(--uld-badge-neutral-fg, #475569)}\n"] }]
        }], propDecorators: { iconTone: [{
                type: Input
            }], avatar: [{
                type: Input
            }], badgeTone: [{
                type: Input
            }] } });

class InfiniteListRowComponent {
    item;
    rowLinkClick = new EventEmitter();
    onLinkClick(event, linkId) {
        event.preventDefault();
        event.stopPropagation();
        this.rowLinkClick.emit({ item: this.item, linkId });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: InfiniteListRowComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.21", type: InfiniteListRowComponent, isStandalone: false, selector: "app-infinite-list-row", inputs: { item: "item" }, outputs: { rowLinkClick: "rowLinkClick" }, ngImport: i0, template: "<app-list-row-card\n  [iconTone]=\"item.iconTone ?? 'orange'\"\n  [avatar]=\"!!item.avatarUrl || !!item.avatarInitials\"\n  [badgeTone]=\"item.badge?.tone ?? 'neutral'\">\n  <img\n    *ngIf=\"item.avatarUrl\"\n    listRowIcon\n    class=\"list-row__avatar\"\n    [src]=\"item.avatarUrl\"\n    [alt]=\"item.title\"\n  />\n  <span\n    *ngIf=\"!item.avatarUrl && item.avatarInitials\"\n    listRowIcon\n    class=\"list-row__avatar list-row__avatar--initials\"\n    aria-hidden=\"true\">{{ item.avatarInitials }}</span>\n  <svg\n    *ngIf=\"!item.avatarUrl && !item.avatarInitials\"\n    listRowIcon\n    class=\"list-row__icon-svg\"\n    width=\"16\"\n    height=\"16\"\n    viewBox=\"0 0 24 24\"\n    fill=\"none\"\n    stroke=\"currentColor\"\n    stroke-width=\"2\"\n    stroke-linecap=\"round\"\n    stroke-linejoin=\"round\"\n    aria-hidden=\"true\">\n    <ng-container [ngSwitch]=\"item.icon\">\n      <path *ngSwitchCase=\"'account'\" d=\"M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z\"></path>\n      <path *ngSwitchCase=\"'expense'\" d=\"M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2z\"></path>\n      <path *ngSwitchCase=\"'task'\" d=\"M9 11l3 3L22 4\"></path>\n      <path *ngSwitchCase=\"'person'\" d=\"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2\"></path>\n      <path *ngSwitchDefault d=\"M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6\"></path>\n    </ng-container>\n  </svg>\n\n  <span listRowTitle>{{ item.title }}</span>\n\n  <span listRowSubtitle *ngIf=\"item.subtitleParts?.length; else plainSubtitle\">\n    <ng-container *ngFor=\"let part of item.subtitleParts; let last = last\">\n      <span\n        *ngIf=\"part.linkId; else textPart\"\n        class=\"list-row__subtitle-link\"\n        role=\"link\"\n        tabindex=\"0\"\n        (click)=\"onLinkClick($event, part.linkId)\"\n        (keydown.enter)=\"onLinkClick($event, part.linkId)\"\n        (keydown.space)=\"onLinkClick($event, part.linkId)\">{{ part.text }}</span>\n      <ng-template #textPart>\n        <span [class.list-row__subtitle-emphasis]=\"part.emphasis\">{{ part.text }}</span>\n      </ng-template>\n      <span *ngIf=\"!last\" class=\"list-row__subtitle-sep\">{{ item.subtitleSeparator ?? ' \u00B7 ' }}</span>\n    </ng-container>\n  </span>\n  <ng-template #plainSubtitle>\n    <span *ngIf=\"item.subtitle\" listRowSubtitle>{{ item.subtitle }}</span>\n  </ng-template>\n\n  <span *ngIf=\"item.metaLeft\" listRowMetaLeft>{{ item.metaLeft }}</span>\n  <span *ngIf=\"item.metaRight\" listRowMetaRight>{{ item.metaRight }}</span>\n  <span *ngIf=\"item.badge\" listRowBadge>{{ item.badge.label }}</span>\n</app-list-row-card>\n", styles: [":host ::ng-deep .list-row__subtitle-link{color:var(--primary-700);font-weight:600;text-decoration:underline;cursor:pointer}:host ::ng-deep .list-row__subtitle-link:hover{color:var(--primary-800)}:host ::ng-deep .list-row__subtitle-emphasis{font-weight:700;color:var(--secondary-700)}:host ::ng-deep .list-row__subtitle-sep{color:var(--secondary-400)}\n"], dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i1.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { kind: "component", type: ListRowCardComponent, selector: "app-list-row-card", inputs: ["iconTone", "avatar", "badgeTone"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: InfiniteListRowComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-infinite-list-row', standalone: false, template: "<app-list-row-card\n  [iconTone]=\"item.iconTone ?? 'orange'\"\n  [avatar]=\"!!item.avatarUrl || !!item.avatarInitials\"\n  [badgeTone]=\"item.badge?.tone ?? 'neutral'\">\n  <img\n    *ngIf=\"item.avatarUrl\"\n    listRowIcon\n    class=\"list-row__avatar\"\n    [src]=\"item.avatarUrl\"\n    [alt]=\"item.title\"\n  />\n  <span\n    *ngIf=\"!item.avatarUrl && item.avatarInitials\"\n    listRowIcon\n    class=\"list-row__avatar list-row__avatar--initials\"\n    aria-hidden=\"true\">{{ item.avatarInitials }}</span>\n  <svg\n    *ngIf=\"!item.avatarUrl && !item.avatarInitials\"\n    listRowIcon\n    class=\"list-row__icon-svg\"\n    width=\"16\"\n    height=\"16\"\n    viewBox=\"0 0 24 24\"\n    fill=\"none\"\n    stroke=\"currentColor\"\n    stroke-width=\"2\"\n    stroke-linecap=\"round\"\n    stroke-linejoin=\"round\"\n    aria-hidden=\"true\">\n    <ng-container [ngSwitch]=\"item.icon\">\n      <path *ngSwitchCase=\"'account'\" d=\"M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z\"></path>\n      <path *ngSwitchCase=\"'expense'\" d=\"M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2z\"></path>\n      <path *ngSwitchCase=\"'task'\" d=\"M9 11l3 3L22 4\"></path>\n      <path *ngSwitchCase=\"'person'\" d=\"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2\"></path>\n      <path *ngSwitchDefault d=\"M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6\"></path>\n    </ng-container>\n  </svg>\n\n  <span listRowTitle>{{ item.title }}</span>\n\n  <span listRowSubtitle *ngIf=\"item.subtitleParts?.length; else plainSubtitle\">\n    <ng-container *ngFor=\"let part of item.subtitleParts; let last = last\">\n      <span\n        *ngIf=\"part.linkId; else textPart\"\n        class=\"list-row__subtitle-link\"\n        role=\"link\"\n        tabindex=\"0\"\n        (click)=\"onLinkClick($event, part.linkId)\"\n        (keydown.enter)=\"onLinkClick($event, part.linkId)\"\n        (keydown.space)=\"onLinkClick($event, part.linkId)\">{{ part.text }}</span>\n      <ng-template #textPart>\n        <span [class.list-row__subtitle-emphasis]=\"part.emphasis\">{{ part.text }}</span>\n      </ng-template>\n      <span *ngIf=\"!last\" class=\"list-row__subtitle-sep\">{{ item.subtitleSeparator ?? ' \u00B7 ' }}</span>\n    </ng-container>\n  </span>\n  <ng-template #plainSubtitle>\n    <span *ngIf=\"item.subtitle\" listRowSubtitle>{{ item.subtitle }}</span>\n  </ng-template>\n\n  <span *ngIf=\"item.metaLeft\" listRowMetaLeft>{{ item.metaLeft }}</span>\n  <span *ngIf=\"item.metaRight\" listRowMetaRight>{{ item.metaRight }}</span>\n  <span *ngIf=\"item.badge\" listRowBadge>{{ item.badge.label }}</span>\n</app-list-row-card>\n", styles: [":host ::ng-deep .list-row__subtitle-link{color:var(--primary-700);font-weight:600;text-decoration:underline;cursor:pointer}:host ::ng-deep .list-row__subtitle-link:hover{color:var(--primary-800)}:host ::ng-deep .list-row__subtitle-emphasis{font-weight:700;color:var(--secondary-700)}:host ::ng-deep .list-row__subtitle-sep{color:var(--secondary-400)}\n"] }]
        }], propDecorators: { item: [{
                type: Input,
                args: [{ required: true }]
            }], rowLinkClick: [{
                type: Output
            }] } });

class ListFilterToolbarComponent {
    searchText = '';
    searchPlaceholder = 'Search by ID';
    filterCount = 0;
    searchChange = new EventEmitter();
    filterOpen = new EventEmitter();
    onSearchInput(value) {
        this.searchChange.emit(value);
    }
    onFilterClick() {
        this.filterOpen.emit();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: ListFilterToolbarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.21", type: ListFilterToolbarComponent, isStandalone: false, selector: "app-list-filter-toolbar", inputs: { searchText: "searchText", searchPlaceholder: "searchPlaceholder", filterCount: "filterCount" }, outputs: { searchChange: "searchChange", filterOpen: "filterOpen" }, ngImport: i0, template: "<div class=\"list-filter-toolbar\">\n  <div class=\"list-filter-toolbar__search\">\n    <svg class=\"list-filter-toolbar__search-icon\" viewBox=\"0 0 24 24\" fill=\"currentColor\" aria-hidden=\"true\">\n      <path d=\"M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z\"/>\n    </svg>\n    <input\n      type=\"search\"\n      class=\"list-filter-toolbar__input\"\n      [value]=\"searchText\"\n      [placeholder]=\"searchPlaceholder\"\n      (input)=\"onSearchInput($any($event.target).value)\"\n      aria-label=\"Search list\">\n  </div>\n\n  <button\n    type=\"button\"\n    class=\"list-filter-toolbar__filters-btn\"\n    (click)=\"onFilterClick()\"\n    aria-label=\"Open filters\">\n    <svg class=\"list-filter-toolbar__filters-icon\" viewBox=\"0 0 24 24\" fill=\"currentColor\" aria-hidden=\"true\">\n      <path d=\"M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z\"/>\n    </svg>\n    <span class=\"list-filter-toolbar__filters-label\">Filters</span>\n    <span *ngIf=\"filterCount > 0\" class=\"list-filter-toolbar__badge\">{{ filterCount }}</span>\n  </button>\n</div>\n", styles: [".list-filter-toolbar{display:flex;align-items:center;gap:8px;width:100%;min-width:0;max-width:100%;box-sizing:border-box;padding:0 0 10px}.list-filter-toolbar__search{flex:1 1 auto;display:flex;align-items:center;gap:8px;min-width:0;background:#fff;border:1px solid rgba(148,163,184,.35);border-radius:12px;padding:0 12px;min-height:40px}.list-filter-toolbar__search-icon{width:18px;height:18px;color:var(--secondary-400);flex-shrink:0}.list-filter-toolbar__input{flex:1 1 auto;width:100%;min-width:0;border:none;background:transparent;font-size:.78rem;color:var(--secondary-800);outline:none}.list-filter-toolbar__input::placeholder{color:var(--secondary-400)}.list-filter-toolbar__filters-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;flex:0 0 auto;border:1px solid rgba(148,163,184,.35);background:#fff;color:var(--secondary-700);border-radius:12px;padding:0 12px;min-height:40px;min-width:40px;font-size:.72rem;font-weight:700;cursor:pointer;transition:all .18s ease}.list-filter-toolbar__filters-btn:hover{border-color:var(--primary-200);color:var(--primary-700);background:var(--primary-50)}.list-filter-toolbar__filters-icon{width:18px;height:18px;flex-shrink:0}.list-filter-toolbar__filters-label{white-space:nowrap}.list-filter-toolbar__badge{display:inline-flex;align-items:center;justify-content:center;min-width:18px;height:18px;padding:0 5px;border-radius:999px;background:var(--primary-500);color:#fff;font-size:.62rem;font-weight:700;line-height:1}@media(max-width:480px){.list-filter-toolbar{gap:6px}.list-filter-toolbar__search{padding:0 8px;gap:6px;min-height:36px}.list-filter-toolbar__search-icon{width:16px;height:16px}.list-filter-toolbar__input{font-size:.72rem}.list-filter-toolbar__filters-btn{padding:0 10px;min-height:36px;min-width:36px}.list-filter-toolbar__filters-label{display:none}}@media(max-width:360px){.list-filter-toolbar__search{padding:0 6px}.list-filter-toolbar__filters-btn{padding:0 8px}}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: ListFilterToolbarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-list-filter-toolbar', standalone: false, template: "<div class=\"list-filter-toolbar\">\n  <div class=\"list-filter-toolbar__search\">\n    <svg class=\"list-filter-toolbar__search-icon\" viewBox=\"0 0 24 24\" fill=\"currentColor\" aria-hidden=\"true\">\n      <path d=\"M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z\"/>\n    </svg>\n    <input\n      type=\"search\"\n      class=\"list-filter-toolbar__input\"\n      [value]=\"searchText\"\n      [placeholder]=\"searchPlaceholder\"\n      (input)=\"onSearchInput($any($event.target).value)\"\n      aria-label=\"Search list\">\n  </div>\n\n  <button\n    type=\"button\"\n    class=\"list-filter-toolbar__filters-btn\"\n    (click)=\"onFilterClick()\"\n    aria-label=\"Open filters\">\n    <svg class=\"list-filter-toolbar__filters-icon\" viewBox=\"0 0 24 24\" fill=\"currentColor\" aria-hidden=\"true\">\n      <path d=\"M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z\"/>\n    </svg>\n    <span class=\"list-filter-toolbar__filters-label\">Filters</span>\n    <span *ngIf=\"filterCount > 0\" class=\"list-filter-toolbar__badge\">{{ filterCount }}</span>\n  </button>\n</div>\n", styles: [".list-filter-toolbar{display:flex;align-items:center;gap:8px;width:100%;min-width:0;max-width:100%;box-sizing:border-box;padding:0 0 10px}.list-filter-toolbar__search{flex:1 1 auto;display:flex;align-items:center;gap:8px;min-width:0;background:#fff;border:1px solid rgba(148,163,184,.35);border-radius:12px;padding:0 12px;min-height:40px}.list-filter-toolbar__search-icon{width:18px;height:18px;color:var(--secondary-400);flex-shrink:0}.list-filter-toolbar__input{flex:1 1 auto;width:100%;min-width:0;border:none;background:transparent;font-size:.78rem;color:var(--secondary-800);outline:none}.list-filter-toolbar__input::placeholder{color:var(--secondary-400)}.list-filter-toolbar__filters-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;flex:0 0 auto;border:1px solid rgba(148,163,184,.35);background:#fff;color:var(--secondary-700);border-radius:12px;padding:0 12px;min-height:40px;min-width:40px;font-size:.72rem;font-weight:700;cursor:pointer;transition:all .18s ease}.list-filter-toolbar__filters-btn:hover{border-color:var(--primary-200);color:var(--primary-700);background:var(--primary-50)}.list-filter-toolbar__filters-icon{width:18px;height:18px;flex-shrink:0}.list-filter-toolbar__filters-label{white-space:nowrap}.list-filter-toolbar__badge{display:inline-flex;align-items:center;justify-content:center;min-width:18px;height:18px;padding:0 5px;border-radius:999px;background:var(--primary-500);color:#fff;font-size:.62rem;font-weight:700;line-height:1}@media(max-width:480px){.list-filter-toolbar{gap:6px}.list-filter-toolbar__search{padding:0 8px;gap:6px;min-height:36px}.list-filter-toolbar__search-icon{width:16px;height:16px}.list-filter-toolbar__input{font-size:.72rem}.list-filter-toolbar__filters-btn{padding:0 10px;min-height:36px;min-width:36px}.list-filter-toolbar__filters-label{display:none}}@media(max-width:360px){.list-filter-toolbar__search{padding:0 6px}.list-filter-toolbar__filters-btn{padding:0 8px}}\n"] }]
        }], propDecorators: { searchText: [{
                type: Input
            }], searchPlaceholder: [{
                type: Input
            }], filterCount: [{
                type: Input
            }], searchChange: [{
                type: Output
            }], filterOpen: [{
                type: Output
            }] } });

class AppliedFilterPillsComponent {
    filters = [];
    remove = new EventEmitter();
    onRemove(id) {
        this.remove.emit(id);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: AppliedFilterPillsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.21", type: AppliedFilterPillsComponent, isStandalone: false, selector: "app-applied-filter-pills", inputs: { filters: "filters" }, outputs: { remove: "remove" }, ngImport: i0, template: "<div *ngIf=\"filters.length\" class=\"applied-filter-pills\">\n  <button\n    *ngFor=\"let filter of filters\"\n    type=\"button\"\n    class=\"applied-filter-pills__pill\"\n    (click)=\"onRemove(filter.id)\"\n    [attr.aria-label]=\"'Remove filter: ' + filter.label\">\n    <span>{{ filter.label }}</span>\n    <span class=\"applied-filter-pills__close\" aria-hidden=\"true\">&times;</span>\n  </button>\n</div>\n", styles: [".applied-filter-pills{display:flex;flex-wrap:wrap;gap:6px;width:100%;min-width:0;max-width:100%;box-sizing:border-box;padding:0 0 10px}.applied-filter-pills__pill{display:inline-flex;align-items:center;gap:4px;border:1px solid rgba(249,115,22,.35);background:var(--primary-50);color:var(--primary-800);border-radius:999px;padding:5px 10px;font-size:.68rem;font-weight:600;cursor:pointer;transition:all .15s ease}.applied-filter-pills__pill:hover{background:var(--primary-100);border-color:var(--primary-300)}.applied-filter-pills__close{font-size:.85rem;line-height:1;opacity:.7}\n"], dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: AppliedFilterPillsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-applied-filter-pills', standalone: false, template: "<div *ngIf=\"filters.length\" class=\"applied-filter-pills\">\n  <button\n    *ngFor=\"let filter of filters\"\n    type=\"button\"\n    class=\"applied-filter-pills__pill\"\n    (click)=\"onRemove(filter.id)\"\n    [attr.aria-label]=\"'Remove filter: ' + filter.label\">\n    <span>{{ filter.label }}</span>\n    <span class=\"applied-filter-pills__close\" aria-hidden=\"true\">&times;</span>\n  </button>\n</div>\n", styles: [".applied-filter-pills{display:flex;flex-wrap:wrap;gap:6px;width:100%;min-width:0;max-width:100%;box-sizing:border-box;padding:0 0 10px}.applied-filter-pills__pill{display:inline-flex;align-items:center;gap:4px;border:1px solid rgba(249,115,22,.35);background:var(--primary-50);color:var(--primary-800);border-radius:999px;padding:5px 10px;font-size:.68rem;font-weight:600;cursor:pointer;transition:all .15s ease}.applied-filter-pills__pill:hover{background:var(--primary-100);border-color:var(--primary-300)}.applied-filter-pills__close{font-size:.85rem;line-height:1;opacity:.7}\n"] }]
        }], propDecorators: { filters: [{
                type: Input,
                args: [{ required: true }]
            }], remove: [{
                type: Output
            }] } });

class InfiniteScrollSentinelDirective {
    elementRef;
    visible = new EventEmitter();
    observer;
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    ngAfterViewInit() {
        if (typeof IntersectionObserver === 'undefined') {
            return;
        }
        this.observer = new IntersectionObserver(entries => {
            if (entries.some(entry => entry.isIntersecting)) {
                this.visible.emit();
            }
        }, { rootMargin: '120px 0px' });
        this.observer.observe(this.elementRef.nativeElement);
    }
    ngOnDestroy() {
        this.observer?.disconnect();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: InfiniteScrollSentinelDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "21.2.21", type: InfiniteScrollSentinelDirective, isStandalone: false, selector: "[appInfiniteScrollSentinel]", outputs: { visible: "visible" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: InfiniteScrollSentinelDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[appInfiniteScrollSentinel]',
                    standalone: false,
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { visible: [{
                type: Output
            }] } });

class FilteredInfiniteListComponent {
    chips = [];
    activeChipId = '';
    items = [];
    loading = false;
    loadingMore = false;
    hasMore = false;
    emptyMessage = 'No items found.';
    showToolbar = false;
    searchText = '';
    searchPlaceholder = 'Search by ID';
    filterCount = 0;
    appliedFilters = [];
    selectable = false;
    selectedIds = [];
    /** checkbox: always show checkboxes. tap: selection mode + row tap. responsive: tap below 640px. */
    selectionInteraction = 'responsive';
    /** Optional override when the list is wrapped (e.g. by {@link FilteredListPageComponent}). */
    rowTemplateRef;
    rowTrailingTemplateRef;
    rowTemplate;
    rowTrailingTemplate;
    chipSelect = new EventEmitter();
    loadMore = new EventEmitter();
    rowClick = new EventEmitter();
    rowLinkClick = new EventEmitter();
    filterOpen = new EventEmitter();
    searchChange = new EventEmitter();
    pillRemove = new EventEmitter();
    selectedIdsChange = new EventEmitter();
    selectionModeChange = new EventEmitter();
    selectionModeActive = false;
    useTapInteraction = false;
    longPressTimer;
    longPressHandled = false;
    ngOnInit() {
        this.syncInteractionMode();
    }
    ngOnChanges(changes) {
        if (changes['selectionInteraction']) {
            this.syncInteractionMode();
        }
        if (changes['selectedIds'] && this.selectedIds.length === 0) {
            this.selectionModeActive = false;
        }
        if (changes['selectable'] && !this.selectable) {
            this.exitSelectionMode(false);
        }
    }
    onWindowResize() {
        if (this.selectionInteraction === 'responsive') {
            this.syncInteractionMode();
        }
    }
    get selectedCount() {
        return this.selectedIds.length;
    }
    get allSelected() {
        return this.items.length > 0 && this.items.every(item => this.isSelected(item.id));
    }
    get isIndeterminate() {
        return this.selectedCount > 0 && !this.allSelected;
    }
    get resolvedRowTemplate() {
        return this.rowTemplateRef ?? this.rowTemplate;
    }
    get resolvedRowTrailingTemplate() {
        return this.rowTrailingTemplateRef ?? this.rowTrailingTemplate;
    }
    /** First fetch with no rows yet — panel-scoped centered spinner. */
    get initialLoading() {
        return this.loading && this.items.length === 0;
    }
    /** Chip/filter/search reload — keep stale rows, show top refresh bar. */
    get refreshing() {
        return this.loading && this.items.length > 0;
    }
    isSelected(id) {
        return this.selectedIds.includes(id);
    }
    toggleSelection(item, checked) {
        const next = checked
            ? [...new Set([...this.selectedIds, item.id])]
            : this.selectedIds.filter(id => id !== item.id);
        this.selectedIdsChange.emit(next);
    }
    toggleAll(checked) {
        if (!checked) {
            this.selectedIdsChange.emit([]);
            return;
        }
        const loadedIds = this.items.map(item => item.id);
        this.selectedIdsChange.emit([...new Set([...this.selectedIds, ...loadedIds])]);
    }
    clearSelection() {
        if (this.selectedCount) {
            this.selectedIdsChange.emit([]);
        }
    }
    enterSelectionMode() {
        if (!this.selectable || !this.useTapInteraction || this.selectionModeActive) {
            return;
        }
        this.selectionModeActive = true;
        this.selectionModeChange.emit(true);
    }
    exitSelectionMode(clearSelected = true) {
        if (clearSelected) {
            this.clearSelection();
        }
        if (!this.selectionModeActive) {
            return;
        }
        this.selectionModeActive = false;
        this.selectionModeChange.emit(false);
    }
    onRowClick(item) {
        if (this.longPressHandled) {
            this.longPressHandled = false;
            return;
        }
        if (this.selectable && this.useTapInteraction && this.selectionModeActive) {
            this.toggleSelection(item, !this.isSelected(item.id));
            return;
        }
        this.rowClick.emit(item);
    }
    onRowPointerDown(item) {
        if (!this.selectable || !this.useTapInteraction || this.selectionModeActive) {
            return;
        }
        this.longPressHandled = false;
        this.longPressTimer = setTimeout(() => {
            this.longPressHandled = true;
            this.enterSelectionMode();
            this.toggleSelection(item, true);
        }, 450);
    }
    onRowPointerUp() {
        if (this.longPressTimer) {
            clearTimeout(this.longPressTimer);
            this.longPressTimer = undefined;
        }
    }
    syncInteractionMode() {
        if (this.selectionInteraction === 'tap') {
            this.useTapInteraction = true;
            return;
        }
        if (this.selectionInteraction === 'checkbox') {
            this.useTapInteraction = false;
            this.selectionModeActive = false;
            return;
        }
        this.useTapInteraction = window.matchMedia('(max-width: 639px)').matches;
        if (!this.useTapInteraction) {
            this.selectionModeActive = false;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: FilteredInfiniteListComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.21", type: FilteredInfiniteListComponent, isStandalone: false, selector: "app-filtered-infinite-list", inputs: { chips: "chips", activeChipId: "activeChipId", items: "items", loading: "loading", loadingMore: "loadingMore", hasMore: "hasMore", emptyMessage: "emptyMessage", showToolbar: "showToolbar", searchText: "searchText", searchPlaceholder: "searchPlaceholder", filterCount: "filterCount", appliedFilters: "appliedFilters", selectable: "selectable", selectedIds: "selectedIds", selectionInteraction: "selectionInteraction", rowTemplateRef: "rowTemplateRef", rowTrailingTemplateRef: "rowTrailingTemplateRef" }, outputs: { chipSelect: "chipSelect", loadMore: "loadMore", rowClick: "rowClick", rowLinkClick: "rowLinkClick", filterOpen: "filterOpen", searchChange: "searchChange", pillRemove: "pillRemove", selectedIdsChange: "selectedIdsChange", selectionModeChange: "selectionModeChange" }, host: { listeners: { "window:resize": "onWindowResize()" } }, queries: [{ propertyName: "rowTemplate", first: true, predicate: ["rowTemplate"], descendants: true, read: TemplateRef }, { propertyName: "rowTrailingTemplate", first: true, predicate: ["rowTrailing"], descendants: true, read: TemplateRef }], usesOnChanges: true, ngImport: i0, template: "<div class=\"filtered-infinite-list\">\n  <app-chip-filter-bar\n    [chips]=\"chips\"\n    [activeId]=\"activeChipId\"\n    (chipSelect)=\"chipSelect.emit($event)\">\n  </app-chip-filter-bar>\n\n  <app-list-filter-toolbar\n    *ngIf=\"showToolbar\"\n    [searchText]=\"searchText\"\n    [searchPlaceholder]=\"searchPlaceholder\"\n    [filterCount]=\"filterCount\"\n    (searchChange)=\"searchChange.emit($event)\"\n    (filterOpen)=\"filterOpen.emit()\">\n  </app-list-filter-toolbar>\n\n  <app-applied-filter-pills\n    *ngIf=\"showToolbar && appliedFilters.length\"\n    [filters]=\"appliedFilters\"\n    (remove)=\"pillRemove.emit($event)\">\n  </app-applied-filter-pills>\n\n  <div\n    *ngIf=\"selectable && useTapInteraction && !selectionModeActive && !initialLoading && items.length\"\n    class=\"filtered-infinite-list__select-entry\">\n    <button type=\"button\" class=\"filtered-infinite-list__select-entry-btn\" (click)=\"enterSelectionMode()\">\n      Select items\n    </button>\n    <span class=\"filtered-infinite-list__select-entry-hint\">or long-press a row</span>\n  </div>\n\n  <div\n    *ngIf=\"selectable && selectedCount > 0\"\n    class=\"filtered-infinite-list__bulk-bar\">\n    <div class=\"filtered-infinite-list__bulk-meta\">\n      <span class=\"filtered-infinite-list__bulk-count\">{{ selectedCount }} selected</span>\n      <button type=\"button\" class=\"filtered-infinite-list__bulk-clear\" (click)=\"clearSelection()\">\n        Clear selection\n      </button>\n    </div>\n    <div class=\"filtered-infinite-list__bulk-actions\">\n      <ng-content select=\"[bulkActions]\"></ng-content>\n    </div>\n  </div>\n\n  <div\n    class=\"filtered-infinite-list__panel\"\n    [class.filtered-infinite-list__panel--refreshing]=\"refreshing\">\n    <div\n      *ngIf=\"selectable && useTapInteraction && selectionModeActive && items.length\"\n      class=\"filtered-infinite-list__select-header filtered-infinite-list__select-header--tap\">\n      <button\n        type=\"button\"\n        class=\"filtered-infinite-list__select-action\"\n        (click)=\"toggleAll(!allSelected)\">\n        {{ allSelected ? 'Deselect all' : 'Select all' }}\n      </button>\n      <span class=\"filtered-infinite-list__select-label\">Tap rows to select</span>\n      <button type=\"button\" class=\"filtered-infinite-list__select-action\" (click)=\"exitSelectionMode()\">\n        Cancel\n      </button>\n    </div>\n\n    <div\n      *ngIf=\"selectable && !useTapInteraction && items.length\"\n      class=\"filtered-infinite-list__select-header\">\n      <mat-checkbox\n        color=\"primary\"\n        [checked]=\"allSelected\"\n        [indeterminate]=\"isIndeterminate\"\n        (change)=\"toggleAll($event.checked)\">\n      </mat-checkbox>\n      <span class=\"filtered-infinite-list__select-label\">Select all</span>\n    </div>\n\n    <div\n      *ngIf=\"refreshing\"\n      class=\"filtered-infinite-list__refresh-bar\"\n      role=\"status\"\n      aria-live=\"polite\">\n      <span class=\"filtered-infinite-list__spinner filtered-infinite-list__spinner--sm\" aria-hidden=\"true\"></span>\n      <span>Updating\u2026</span>\n    </div>\n\n    <div *ngIf=\"initialLoading\" class=\"filtered-infinite-list__state filtered-infinite-list__state--initial\">\n      <span class=\"filtered-infinite-list__spinner\" aria-hidden=\"true\"></span>\n      <span>Loading\u2026</span>\n    </div>\n\n    <div\n      *ngFor=\"let item of items\"\n      class=\"filtered-infinite-list__row\"\n      [class.filtered-infinite-list__row--selected]=\"isSelected(item.id)\">\n      <div\n        *ngIf=\"selectable && !useTapInteraction\"\n        class=\"filtered-infinite-list__row-check\"\n        (click)=\"$event.stopPropagation()\">\n        <mat-checkbox\n          color=\"primary\"\n          [checked]=\"isSelected(item.id)\"\n          (change)=\"toggleSelection(item, $event.checked)\">\n        </mat-checkbox>\n      </div>\n      <button\n        type=\"button\"\n        class=\"filtered-infinite-list__row-btn\"\n        [class.filtered-infinite-list__row-btn--selectable]=\"selectable && useTapInteraction && selectionModeActive\"\n        [attr.aria-pressed]=\"selectable && useTapInteraction && selectionModeActive ? isSelected(item.id) : null\"\n        (click)=\"onRowClick(item)\"\n        (pointerdown)=\"onRowPointerDown(item)\"\n        (pointerup)=\"onRowPointerUp()\"\n        (pointerleave)=\"onRowPointerUp()\"\n        (pointercancel)=\"onRowPointerUp()\">\n        <ng-container\n          *ngIf=\"resolvedRowTemplate; else defaultRow\"\n          [ngTemplateOutlet]=\"resolvedRowTemplate\"\n          [ngTemplateOutletContext]=\"{ $implicit: item }\">\n        </ng-container>\n        <ng-template #defaultRow>\n          <app-infinite-list-row\n            [item]=\"item\"\n            (rowLinkClick)=\"rowLinkClick.emit($event)\">\n          </app-infinite-list-row>\n        </ng-template>\n      </button>\n      <div\n        *ngIf=\"resolvedRowTrailingTemplate\"\n        class=\"filtered-infinite-list__row-trailing\"\n        (click)=\"$event.stopPropagation()\">\n        <ng-container\n          [ngTemplateOutlet]=\"resolvedRowTrailingTemplate\"\n          [ngTemplateOutletContext]=\"{ $implicit: item }\">\n        </ng-container>\n      </div>\n    </div>\n\n    <p *ngIf=\"!items.length && !loading\" class=\"filtered-infinite-list__empty\">{{ emptyMessage }}</p>\n\n    <div *ngIf=\"loadingMore\" class=\"filtered-infinite-list__state filtered-infinite-list__state--inline\">\n      <span class=\"filtered-infinite-list__spinner\" aria-hidden=\"true\"></span>\n      <span>Loading more\u2026</span>\n    </div>\n\n    <div\n      *ngIf=\"hasMore && !loadingMore && items.length\"\n      appInfiniteScrollSentinel\n      (visible)=\"loadMore.emit()\"\n      class=\"filtered-infinite-list__sentinel\"\n      aria-hidden=\"true\">\n    </div>\n  </div>\n</div>\n", styles: [".filtered-infinite-list{display:flex;flex-direction:column;min-height:0;width:100%;min-width:0;max-width:100%;box-sizing:border-box}.filtered-infinite-list__panel{background:#fff;border-radius:16px;border:1px solid rgba(148,163,184,.22);box-shadow:0 1px 2px #0f172a0d,0 4px 14px #0f172a12;overflow:hidden}.filtered-infinite-list__panel--refreshing .filtered-infinite-list__row{opacity:.6;pointer-events:none}.filtered-infinite-list__refresh-bar{display:flex;align-items:center;justify-content:center;gap:8px;padding:10px 16px;font-size:.72rem;font-weight:600;color:var(--secondary-600);background:#f8fafc;border-bottom:1px solid rgba(148,163,184,.18)}.filtered-infinite-list__bulk-bar{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px;padding:10px 12px;border-radius:14px;background:#fff;border:1px solid rgba(59,130,246,.25);box-shadow:0 4px 14px #3b82f61f}.filtered-infinite-list__bulk-meta{display:flex;align-items:center;gap:12px;min-width:0}.filtered-infinite-list__bulk-count{font-size:.72rem;font-weight:700;color:var(--primary-700);white-space:nowrap}.filtered-infinite-list__bulk-clear{padding:0;border:none;background:transparent;font-size:.68rem;font-weight:600;color:var(--primary-600);cursor:pointer;text-decoration:underline}.filtered-infinite-list__bulk-actions{display:flex;align-items:center;gap:8px;flex-shrink:0}.filtered-infinite-list__select-entry{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px;padding:0 2px}.filtered-infinite-list__select-entry-btn{padding:0;border:none;background:transparent;font-size:.72rem;font-weight:700;color:var(--primary-700);cursor:pointer;text-decoration:underline}.filtered-infinite-list__select-entry-hint{font-size:.62rem;color:var(--secondary-400);white-space:nowrap}.filtered-infinite-list__select-header{display:flex;align-items:center;gap:8px;padding:8px 12px;border-bottom:1px solid rgba(148,163,184,.18);background:#f8fafc}.filtered-infinite-list__select-header--tap{justify-content:space-between;gap:6px}.filtered-infinite-list__select-action{padding:0;border:none;background:transparent;font-size:.68rem;font-weight:700;color:var(--primary-700);cursor:pointer;white-space:nowrap;flex-shrink:0}.filtered-infinite-list__select-label{font-size:.62rem;font-weight:600;color:var(--secondary-500);text-align:center;min-width:0}.filtered-infinite-list__row{display:flex;align-items:stretch;background:#fff;border-bottom:1px solid rgba(148,163,184,.18)}.filtered-infinite-list__row--selected{background:var(--primary-100);box-shadow:inset 4px 0 0 var(--primary-700)}.filtered-infinite-list__row--selected ::ng-deep .list-row{background:var(--primary-100)}.filtered-infinite-list__row--selected ::ng-deep .list-row:hover,.filtered-infinite-list__row--selected ::ng-deep .list-row:active{background:var(--primary-200)}.filtered-infinite-list__row-btn--selectable{touch-action:manipulation}.filtered-infinite-list__row-check{display:flex;align-items:center;padding-left:8px;flex-shrink:0}.filtered-infinite-list__row-btn{display:block;flex:1;min-width:0;padding:0;margin:0;border:none;background:transparent;text-align:left;cursor:pointer}.filtered-infinite-list__row-trailing{display:flex;align-items:center;flex-shrink:0;padding:8px 10px 8px 0}.filtered-infinite-list__empty{margin:0;padding:28px 16px;text-align:center;font-size:.78rem;color:var(--secondary-500)}.filtered-infinite-list__state{display:flex;align-items:center;justify-content:center;gap:8px;padding:28px 16px;font-size:.75rem;color:var(--secondary-500)}.filtered-infinite-list__state--initial{min-height:120px}.filtered-infinite-list__state--inline{padding:16px;border-top:1px solid rgba(148,163,184,.15)}.filtered-infinite-list__spinner{width:16px;height:16px;border-radius:50%;border:2px solid rgba(148,163,184,.35);border-top-color:var(--primary-500);animation:filtered-list-spin .8s linear infinite}.filtered-infinite-list__spinner--sm{width:14px;height:14px;border-width:2px}.filtered-infinite-list__sentinel{height:1px}@keyframes filtered-list-spin{to{transform:rotate(360deg)}}\n"], dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: i2.MatCheckbox, selector: "mat-checkbox", inputs: ["aria-label", "aria-labelledby", "aria-describedby", "aria-expanded", "aria-controls", "aria-owns", "id", "required", "labelPosition", "name", "value", "disableRipple", "tabIndex", "color", "disabledInteractive", "checked", "disabled", "indeterminate"], outputs: ["change", "indeterminateChange"], exportAs: ["matCheckbox"] }, { kind: "component", type: ChipFilterBarComponent, selector: "app-chip-filter-bar", inputs: ["chips", "activeId"], outputs: ["chipSelect"] }, { kind: "component", type: InfiniteListRowComponent, selector: "app-infinite-list-row", inputs: ["item"], outputs: ["rowLinkClick"] }, { kind: "component", type: ListFilterToolbarComponent, selector: "app-list-filter-toolbar", inputs: ["searchText", "searchPlaceholder", "filterCount"], outputs: ["searchChange", "filterOpen"] }, { kind: "component", type: AppliedFilterPillsComponent, selector: "app-applied-filter-pills", inputs: ["filters"], outputs: ["remove"] }, { kind: "directive", type: InfiniteScrollSentinelDirective, selector: "[appInfiniteScrollSentinel]", outputs: ["visible"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: FilteredInfiniteListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-filtered-infinite-list', standalone: false, template: "<div class=\"filtered-infinite-list\">\n  <app-chip-filter-bar\n    [chips]=\"chips\"\n    [activeId]=\"activeChipId\"\n    (chipSelect)=\"chipSelect.emit($event)\">\n  </app-chip-filter-bar>\n\n  <app-list-filter-toolbar\n    *ngIf=\"showToolbar\"\n    [searchText]=\"searchText\"\n    [searchPlaceholder]=\"searchPlaceholder\"\n    [filterCount]=\"filterCount\"\n    (searchChange)=\"searchChange.emit($event)\"\n    (filterOpen)=\"filterOpen.emit()\">\n  </app-list-filter-toolbar>\n\n  <app-applied-filter-pills\n    *ngIf=\"showToolbar && appliedFilters.length\"\n    [filters]=\"appliedFilters\"\n    (remove)=\"pillRemove.emit($event)\">\n  </app-applied-filter-pills>\n\n  <div\n    *ngIf=\"selectable && useTapInteraction && !selectionModeActive && !initialLoading && items.length\"\n    class=\"filtered-infinite-list__select-entry\">\n    <button type=\"button\" class=\"filtered-infinite-list__select-entry-btn\" (click)=\"enterSelectionMode()\">\n      Select items\n    </button>\n    <span class=\"filtered-infinite-list__select-entry-hint\">or long-press a row</span>\n  </div>\n\n  <div\n    *ngIf=\"selectable && selectedCount > 0\"\n    class=\"filtered-infinite-list__bulk-bar\">\n    <div class=\"filtered-infinite-list__bulk-meta\">\n      <span class=\"filtered-infinite-list__bulk-count\">{{ selectedCount }} selected</span>\n      <button type=\"button\" class=\"filtered-infinite-list__bulk-clear\" (click)=\"clearSelection()\">\n        Clear selection\n      </button>\n    </div>\n    <div class=\"filtered-infinite-list__bulk-actions\">\n      <ng-content select=\"[bulkActions]\"></ng-content>\n    </div>\n  </div>\n\n  <div\n    class=\"filtered-infinite-list__panel\"\n    [class.filtered-infinite-list__panel--refreshing]=\"refreshing\">\n    <div\n      *ngIf=\"selectable && useTapInteraction && selectionModeActive && items.length\"\n      class=\"filtered-infinite-list__select-header filtered-infinite-list__select-header--tap\">\n      <button\n        type=\"button\"\n        class=\"filtered-infinite-list__select-action\"\n        (click)=\"toggleAll(!allSelected)\">\n        {{ allSelected ? 'Deselect all' : 'Select all' }}\n      </button>\n      <span class=\"filtered-infinite-list__select-label\">Tap rows to select</span>\n      <button type=\"button\" class=\"filtered-infinite-list__select-action\" (click)=\"exitSelectionMode()\">\n        Cancel\n      </button>\n    </div>\n\n    <div\n      *ngIf=\"selectable && !useTapInteraction && items.length\"\n      class=\"filtered-infinite-list__select-header\">\n      <mat-checkbox\n        color=\"primary\"\n        [checked]=\"allSelected\"\n        [indeterminate]=\"isIndeterminate\"\n        (change)=\"toggleAll($event.checked)\">\n      </mat-checkbox>\n      <span class=\"filtered-infinite-list__select-label\">Select all</span>\n    </div>\n\n    <div\n      *ngIf=\"refreshing\"\n      class=\"filtered-infinite-list__refresh-bar\"\n      role=\"status\"\n      aria-live=\"polite\">\n      <span class=\"filtered-infinite-list__spinner filtered-infinite-list__spinner--sm\" aria-hidden=\"true\"></span>\n      <span>Updating\u2026</span>\n    </div>\n\n    <div *ngIf=\"initialLoading\" class=\"filtered-infinite-list__state filtered-infinite-list__state--initial\">\n      <span class=\"filtered-infinite-list__spinner\" aria-hidden=\"true\"></span>\n      <span>Loading\u2026</span>\n    </div>\n\n    <div\n      *ngFor=\"let item of items\"\n      class=\"filtered-infinite-list__row\"\n      [class.filtered-infinite-list__row--selected]=\"isSelected(item.id)\">\n      <div\n        *ngIf=\"selectable && !useTapInteraction\"\n        class=\"filtered-infinite-list__row-check\"\n        (click)=\"$event.stopPropagation()\">\n        <mat-checkbox\n          color=\"primary\"\n          [checked]=\"isSelected(item.id)\"\n          (change)=\"toggleSelection(item, $event.checked)\">\n        </mat-checkbox>\n      </div>\n      <button\n        type=\"button\"\n        class=\"filtered-infinite-list__row-btn\"\n        [class.filtered-infinite-list__row-btn--selectable]=\"selectable && useTapInteraction && selectionModeActive\"\n        [attr.aria-pressed]=\"selectable && useTapInteraction && selectionModeActive ? isSelected(item.id) : null\"\n        (click)=\"onRowClick(item)\"\n        (pointerdown)=\"onRowPointerDown(item)\"\n        (pointerup)=\"onRowPointerUp()\"\n        (pointerleave)=\"onRowPointerUp()\"\n        (pointercancel)=\"onRowPointerUp()\">\n        <ng-container\n          *ngIf=\"resolvedRowTemplate; else defaultRow\"\n          [ngTemplateOutlet]=\"resolvedRowTemplate\"\n          [ngTemplateOutletContext]=\"{ $implicit: item }\">\n        </ng-container>\n        <ng-template #defaultRow>\n          <app-infinite-list-row\n            [item]=\"item\"\n            (rowLinkClick)=\"rowLinkClick.emit($event)\">\n          </app-infinite-list-row>\n        </ng-template>\n      </button>\n      <div\n        *ngIf=\"resolvedRowTrailingTemplate\"\n        class=\"filtered-infinite-list__row-trailing\"\n        (click)=\"$event.stopPropagation()\">\n        <ng-container\n          [ngTemplateOutlet]=\"resolvedRowTrailingTemplate\"\n          [ngTemplateOutletContext]=\"{ $implicit: item }\">\n        </ng-container>\n      </div>\n    </div>\n\n    <p *ngIf=\"!items.length && !loading\" class=\"filtered-infinite-list__empty\">{{ emptyMessage }}</p>\n\n    <div *ngIf=\"loadingMore\" class=\"filtered-infinite-list__state filtered-infinite-list__state--inline\">\n      <span class=\"filtered-infinite-list__spinner\" aria-hidden=\"true\"></span>\n      <span>Loading more\u2026</span>\n    </div>\n\n    <div\n      *ngIf=\"hasMore && !loadingMore && items.length\"\n      appInfiniteScrollSentinel\n      (visible)=\"loadMore.emit()\"\n      class=\"filtered-infinite-list__sentinel\"\n      aria-hidden=\"true\">\n    </div>\n  </div>\n</div>\n", styles: [".filtered-infinite-list{display:flex;flex-direction:column;min-height:0;width:100%;min-width:0;max-width:100%;box-sizing:border-box}.filtered-infinite-list__panel{background:#fff;border-radius:16px;border:1px solid rgba(148,163,184,.22);box-shadow:0 1px 2px #0f172a0d,0 4px 14px #0f172a12;overflow:hidden}.filtered-infinite-list__panel--refreshing .filtered-infinite-list__row{opacity:.6;pointer-events:none}.filtered-infinite-list__refresh-bar{display:flex;align-items:center;justify-content:center;gap:8px;padding:10px 16px;font-size:.72rem;font-weight:600;color:var(--secondary-600);background:#f8fafc;border-bottom:1px solid rgba(148,163,184,.18)}.filtered-infinite-list__bulk-bar{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px;padding:10px 12px;border-radius:14px;background:#fff;border:1px solid rgba(59,130,246,.25);box-shadow:0 4px 14px #3b82f61f}.filtered-infinite-list__bulk-meta{display:flex;align-items:center;gap:12px;min-width:0}.filtered-infinite-list__bulk-count{font-size:.72rem;font-weight:700;color:var(--primary-700);white-space:nowrap}.filtered-infinite-list__bulk-clear{padding:0;border:none;background:transparent;font-size:.68rem;font-weight:600;color:var(--primary-600);cursor:pointer;text-decoration:underline}.filtered-infinite-list__bulk-actions{display:flex;align-items:center;gap:8px;flex-shrink:0}.filtered-infinite-list__select-entry{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px;padding:0 2px}.filtered-infinite-list__select-entry-btn{padding:0;border:none;background:transparent;font-size:.72rem;font-weight:700;color:var(--primary-700);cursor:pointer;text-decoration:underline}.filtered-infinite-list__select-entry-hint{font-size:.62rem;color:var(--secondary-400);white-space:nowrap}.filtered-infinite-list__select-header{display:flex;align-items:center;gap:8px;padding:8px 12px;border-bottom:1px solid rgba(148,163,184,.18);background:#f8fafc}.filtered-infinite-list__select-header--tap{justify-content:space-between;gap:6px}.filtered-infinite-list__select-action{padding:0;border:none;background:transparent;font-size:.68rem;font-weight:700;color:var(--primary-700);cursor:pointer;white-space:nowrap;flex-shrink:0}.filtered-infinite-list__select-label{font-size:.62rem;font-weight:600;color:var(--secondary-500);text-align:center;min-width:0}.filtered-infinite-list__row{display:flex;align-items:stretch;background:#fff;border-bottom:1px solid rgba(148,163,184,.18)}.filtered-infinite-list__row--selected{background:var(--primary-100);box-shadow:inset 4px 0 0 var(--primary-700)}.filtered-infinite-list__row--selected ::ng-deep .list-row{background:var(--primary-100)}.filtered-infinite-list__row--selected ::ng-deep .list-row:hover,.filtered-infinite-list__row--selected ::ng-deep .list-row:active{background:var(--primary-200)}.filtered-infinite-list__row-btn--selectable{touch-action:manipulation}.filtered-infinite-list__row-check{display:flex;align-items:center;padding-left:8px;flex-shrink:0}.filtered-infinite-list__row-btn{display:block;flex:1;min-width:0;padding:0;margin:0;border:none;background:transparent;text-align:left;cursor:pointer}.filtered-infinite-list__row-trailing{display:flex;align-items:center;flex-shrink:0;padding:8px 10px 8px 0}.filtered-infinite-list__empty{margin:0;padding:28px 16px;text-align:center;font-size:.78rem;color:var(--secondary-500)}.filtered-infinite-list__state{display:flex;align-items:center;justify-content:center;gap:8px;padding:28px 16px;font-size:.75rem;color:var(--secondary-500)}.filtered-infinite-list__state--initial{min-height:120px}.filtered-infinite-list__state--inline{padding:16px;border-top:1px solid rgba(148,163,184,.15)}.filtered-infinite-list__spinner{width:16px;height:16px;border-radius:50%;border:2px solid rgba(148,163,184,.35);border-top-color:var(--primary-500);animation:filtered-list-spin .8s linear infinite}.filtered-infinite-list__spinner--sm{width:14px;height:14px;border-width:2px}.filtered-infinite-list__sentinel{height:1px}@keyframes filtered-list-spin{to{transform:rotate(360deg)}}\n"] }]
        }], propDecorators: { chips: [{
                type: Input,
                args: [{ required: true }]
            }], activeChipId: [{
                type: Input
            }], items: [{
                type: Input,
                args: [{ required: true }]
            }], loading: [{
                type: Input
            }], loadingMore: [{
                type: Input
            }], hasMore: [{
                type: Input
            }], emptyMessage: [{
                type: Input
            }], showToolbar: [{
                type: Input
            }], searchText: [{
                type: Input
            }], searchPlaceholder: [{
                type: Input
            }], filterCount: [{
                type: Input
            }], appliedFilters: [{
                type: Input
            }], selectable: [{
                type: Input
            }], selectedIds: [{
                type: Input
            }], selectionInteraction: [{
                type: Input
            }], rowTemplateRef: [{
                type: Input
            }], rowTrailingTemplateRef: [{
                type: Input
            }], rowTemplate: [{
                type: ContentChild,
                args: ['rowTemplate', { read: TemplateRef }]
            }], rowTrailingTemplate: [{
                type: ContentChild,
                args: ['rowTrailing', { read: TemplateRef }]
            }], chipSelect: [{
                type: Output
            }], loadMore: [{
                type: Output
            }], rowClick: [{
                type: Output
            }], rowLinkClick: [{
                type: Output
            }], filterOpen: [{
                type: Output
            }], searchChange: [{
                type: Output
            }], pillRemove: [{
                type: Output
            }], selectedIdsChange: [{
                type: Output
            }], selectionModeChange: [{
                type: Output
            }], onWindowResize: [{
                type: HostListener,
                args: ['window:resize']
            }] } });

let openSheetCount = 0;
/** Hides the mobile bottom nav while a full-screen drawer/sheet is open. */
function setMobileSheetOpen(open) {
    if (typeof document === 'undefined') {
        return;
    }
    openSheetCount = open
        ? openSheetCount + 1
        : Math.max(0, openSheetCount - 1);
    document.body.classList.toggle('mobile-sheet-open', openSheetCount > 0);
}

class ListFilterSheetComponent {
    open = false;
    title = 'Filters';
    definition;
    initialValues = {};
    closed = new EventEmitter();
    reset = new EventEmitter();
    applied = new EventEmitter();
    cfForm;
    ngOnChanges(changes) {
        if ('open' in changes) {
            setMobileSheetOpen(changes['open'].currentValue === true);
        }
        const openedNow = changes['open']?.currentValue === true && changes['open']?.previousValue !== true;
        if (this.definition && openedNow) {
            queueMicrotask(() => this.cfForm?.resetForm(this.initialValues));
            return;
        }
        // Keep an open sheet in sync when criteria defaults change (e.g. Reset).
        if (changes['initialValues'] && this.open && this.definition) {
            queueMicrotask(() => this.cfForm?.resetForm(this.initialValues));
        }
    }
    ngOnDestroy() {
        if (this.open) {
            setMobileSheetOpen(false);
        }
    }
    onBackdropClick() {
        this.closed.emit();
    }
    onReset() {
        // Clear the open form immediately. Parent also resets list criteria via (reset).
        this.cfForm?.resetForm({});
        this.reset.emit();
    }
    onApply() {
        if (!this.cfForm) {
            return;
        }
        this.applied.emit(this.cfForm.getVisibleValues());
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: ListFilterSheetComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.21", type: ListFilterSheetComponent, isStandalone: false, selector: "app-list-filter-sheet", inputs: { open: "open", title: "title", definition: "definition", initialValues: "initialValues" }, outputs: { closed: "closed", reset: "reset", applied: "applied" }, viewQueries: [{ propertyName: "cfForm", first: true, predicate: CfFormComponent, descendants: true }], usesOnChanges: true, ngImport: i0, template: "<ng-container *ngIf=\"open\">\n  <div\n    class=\"list-filter-sheet__backdrop\"\n    (click)=\"onBackdropClick()\"\n    aria-hidden=\"true\">\n  </div>\n\n  <div class=\"list-filter-sheet\" role=\"dialog\" [attr.aria-label]=\"title\">\n    <div class=\"list-filter-sheet__handle\" aria-hidden=\"true\"></div>\n\n    <div class=\"list-filter-sheet__title-row\">\n      <h2 class=\"list-filter-sheet__title\">{{ title }}</h2>\n      <button\n        type=\"button\"\n        class=\"list-filter-sheet__close\"\n        (click)=\"onBackdropClick()\"\n        aria-label=\"Close\">\n        <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"\n             stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\">\n          <line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"></line>\n          <line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"></line>\n        </svg>\n      </button>\n    </div>\n\n    <div class=\"list-filter-sheet__body\">\n      <cf-form\n        *ngIf=\"definition\"\n        class=\"list-filter-sheet__form\"\n        [definition]=\"definition\"\n        [initialValues]=\"initialValues\"\n        [hideHeading]=\"true\"\n        [showSubmit]=\"false\"\n        idPrefix=\"filter\">\n      </cf-form>\n    </div>\n\n    <div class=\"list-filter-sheet__actions app-btn-group\">\n      <button type=\"button\" class=\"app-btn app-btn--ghost\" (click)=\"onReset()\">\n        Reset\n      </button>\n      <button type=\"button\" class=\"app-btn app-btn--primary\" (click)=\"onApply()\">\n        Apply\n      </button>\n    </div>\n  </div>\n</ng-container>\n", styles: [".list-filter-sheet__backdrop{position:fixed;inset:0;background:#0f172a59;z-index:250;animation:list-filter-sheet-fade-in .2s ease}.list-filter-sheet{position:fixed;left:0;right:0;bottom:0;z-index:251;background:#fff;border-radius:20px 20px 0 0;box-shadow:0 -8px 32px #0f172a1f;padding:10px 16px calc(16px + env(safe-area-inset-bottom,0));animation:list-filter-sheet-slide-up .24s cubic-bezier(.22,1,.36,1);max-height:min(88vh,560px);display:flex;flex-direction:column}.list-filter-sheet__handle{width:36px;height:4px;border-radius:999px;background:#cbd5e1;margin:0 auto 12px;flex-shrink:0}.list-filter-sheet__title-row{display:flex;align-items:center;justify-content:center;position:relative;margin-bottom:1.25rem;padding:0 36px;flex-shrink:0}.list-filter-sheet__title{margin:0;font-size:.85rem;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--secondary-800);text-align:center}.list-filter-sheet__back,.list-filter-sheet__close{position:absolute;top:50%;transform:translateY(-50%);width:32px;height:32px;display:flex;align-items:center;justify-content:center;border:none;border-radius:999px;background:#f1f5f9;color:var(--secondary-600);cursor:pointer;padding:0}.list-filter-sheet__back svg,.list-filter-sheet__close svg{width:16px;height:16px}.list-filter-sheet__back:active,.list-filter-sheet__close:active{background:#e2e8f0}.list-filter-sheet__back{left:0}.list-filter-sheet__close{right:0}.list-filter-sheet__body{flex:1;overflow-y:auto;scrollbar-width:none;-ms-overflow-style:none;padding-bottom:8px}.list-filter-sheet__body::-webkit-scrollbar{display:none}.list-filter-sheet__form{display:block}.list-filter-sheet__actions{padding-top:12px;border-top:1px solid rgba(148,163,184,.2);flex-shrink:0}@keyframes list-filter-sheet-fade-in{0%{opacity:0}to{opacity:1}}@keyframes list-filter-sheet-slide-up{0%{transform:translateY(100%)}to{transform:translateY(0)}}@media(min-width:768px){.list-filter-sheet{inset:50% auto auto 50%;transform:translate(-50%,-50%);width:min(720px,100vw - 48px);max-height:min(85vh,720px);border-radius:20px;padding:16px 24px 20px;animation:list-filter-sheet-dialog-in .24s cubic-bezier(.22,1,.36,1)}.list-filter-sheet__handle{display:none}}@keyframes list-filter-sheet-dialog-in{0%{opacity:0;transform:translate(-50%,calc(-50% + 16px))}to{opacity:1;transform:translate(-50%,-50%)}}.list-filter-sheet .cf-toggle-field{gap:0;margin-top:.25rem;padding-top:.75rem;border-top:1px solid rgba(148,163,184,.35)}.list-filter-sheet .cf-toggle-field mat-slide-toggle{width:100%}.list-filter-sheet .cf-toggle-field .mdc-form-field{margin-bottom:0}.list-filter-sheet .cf-toggle-field .mdc-label{padding-top:0;padding-bottom:0;line-height:1.25}.list-filter-sheet .cf-toggle-field .mdc-switch{transform:scale(.9);transform-origin:left center}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2$1.CfFormComponent, selector: "cf-form", inputs: ["definition", "initialValues", "engineOptions", "idPrefix", "hideHeading", "submitLabel", "showSubmit"], outputs: ["submitted", "valuesChange"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: ListFilterSheetComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-list-filter-sheet', standalone: false, template: "<ng-container *ngIf=\"open\">\n  <div\n    class=\"list-filter-sheet__backdrop\"\n    (click)=\"onBackdropClick()\"\n    aria-hidden=\"true\">\n  </div>\n\n  <div class=\"list-filter-sheet\" role=\"dialog\" [attr.aria-label]=\"title\">\n    <div class=\"list-filter-sheet__handle\" aria-hidden=\"true\"></div>\n\n    <div class=\"list-filter-sheet__title-row\">\n      <h2 class=\"list-filter-sheet__title\">{{ title }}</h2>\n      <button\n        type=\"button\"\n        class=\"list-filter-sheet__close\"\n        (click)=\"onBackdropClick()\"\n        aria-label=\"Close\">\n        <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"\n             stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\">\n          <line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"></line>\n          <line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"></line>\n        </svg>\n      </button>\n    </div>\n\n    <div class=\"list-filter-sheet__body\">\n      <cf-form\n        *ngIf=\"definition\"\n        class=\"list-filter-sheet__form\"\n        [definition]=\"definition\"\n        [initialValues]=\"initialValues\"\n        [hideHeading]=\"true\"\n        [showSubmit]=\"false\"\n        idPrefix=\"filter\">\n      </cf-form>\n    </div>\n\n    <div class=\"list-filter-sheet__actions app-btn-group\">\n      <button type=\"button\" class=\"app-btn app-btn--ghost\" (click)=\"onReset()\">\n        Reset\n      </button>\n      <button type=\"button\" class=\"app-btn app-btn--primary\" (click)=\"onApply()\">\n        Apply\n      </button>\n    </div>\n  </div>\n</ng-container>\n", styles: [".list-filter-sheet__backdrop{position:fixed;inset:0;background:#0f172a59;z-index:250;animation:list-filter-sheet-fade-in .2s ease}.list-filter-sheet{position:fixed;left:0;right:0;bottom:0;z-index:251;background:#fff;border-radius:20px 20px 0 0;box-shadow:0 -8px 32px #0f172a1f;padding:10px 16px calc(16px + env(safe-area-inset-bottom,0));animation:list-filter-sheet-slide-up .24s cubic-bezier(.22,1,.36,1);max-height:min(88vh,560px);display:flex;flex-direction:column}.list-filter-sheet__handle{width:36px;height:4px;border-radius:999px;background:#cbd5e1;margin:0 auto 12px;flex-shrink:0}.list-filter-sheet__title-row{display:flex;align-items:center;justify-content:center;position:relative;margin-bottom:1.25rem;padding:0 36px;flex-shrink:0}.list-filter-sheet__title{margin:0;font-size:.85rem;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--secondary-800);text-align:center}.list-filter-sheet__back,.list-filter-sheet__close{position:absolute;top:50%;transform:translateY(-50%);width:32px;height:32px;display:flex;align-items:center;justify-content:center;border:none;border-radius:999px;background:#f1f5f9;color:var(--secondary-600);cursor:pointer;padding:0}.list-filter-sheet__back svg,.list-filter-sheet__close svg{width:16px;height:16px}.list-filter-sheet__back:active,.list-filter-sheet__close:active{background:#e2e8f0}.list-filter-sheet__back{left:0}.list-filter-sheet__close{right:0}.list-filter-sheet__body{flex:1;overflow-y:auto;scrollbar-width:none;-ms-overflow-style:none;padding-bottom:8px}.list-filter-sheet__body::-webkit-scrollbar{display:none}.list-filter-sheet__form{display:block}.list-filter-sheet__actions{padding-top:12px;border-top:1px solid rgba(148,163,184,.2);flex-shrink:0}@keyframes list-filter-sheet-fade-in{0%{opacity:0}to{opacity:1}}@keyframes list-filter-sheet-slide-up{0%{transform:translateY(100%)}to{transform:translateY(0)}}@media(min-width:768px){.list-filter-sheet{inset:50% auto auto 50%;transform:translate(-50%,-50%);width:min(720px,100vw - 48px);max-height:min(85vh,720px);border-radius:20px;padding:16px 24px 20px;animation:list-filter-sheet-dialog-in .24s cubic-bezier(.22,1,.36,1)}.list-filter-sheet__handle{display:none}}@keyframes list-filter-sheet-dialog-in{0%{opacity:0;transform:translate(-50%,calc(-50% + 16px))}to{opacity:1;transform:translate(-50%,-50%)}}.list-filter-sheet .cf-toggle-field{gap:0;margin-top:.25rem;padding-top:.75rem;border-top:1px solid rgba(148,163,184,.35)}.list-filter-sheet .cf-toggle-field mat-slide-toggle{width:100%}.list-filter-sheet .cf-toggle-field .mdc-form-field{margin-bottom:0}.list-filter-sheet .cf-toggle-field .mdc-label{padding-top:0;padding-bottom:0;line-height:1.25}.list-filter-sheet .cf-toggle-field .mdc-switch{transform:scale(.9);transform-origin:left center}\n"] }]
        }], propDecorators: { open: [{
                type: Input
            }], title: [{
                type: Input
            }], definition: [{
                type: Input
            }], initialValues: [{
                type: Input
            }], closed: [{
                type: Output
            }], reset: [{
                type: Output
            }], applied: [{
                type: Output
            }], cfForm: [{
                type: ViewChild,
                args: [CfFormComponent]
            }] } });

const ULD_DOCUMENT_LIST = new InjectionToken('ULD_DOCUMENT_LIST');
const ULD_FILE_UPLOAD = new InjectionToken('ULD_FILE_UPLOAD');
const ULD_ROOT_CONFIG = new InjectionToken('ULD_ROOT_CONFIG');
/** Multi-provider registry mapping a framework-neutral renderer key to a component. */
const LIST_FORM_CUSTOM_STEP_RENDERERS = new InjectionToken('LIST_FORM_CUSTOM_STEP_RENDERERS');
function provideListFormCustomStepRenderer(rendererKey, component) {
    return {
        provide: LIST_FORM_CUSTOM_STEP_RENDERERS,
        multi: true,
        useValue: { rendererKey, component },
    };
}

class ListDetailSectionsComponent {
    documentListComponent;
    sections = [];
    constructor(documentListComponent) {
        this.documentListComponent = documentListComponent;
    }
    toggleSection(section) {
        section.collapsed = !section.collapsed;
    }
    trackSection(_index, section) {
        return section.id;
    }
    trackField(_index, field) {
        return field.label;
    }
    trackItemListItem(index, item) {
        return item.id ?? `${item.title}-${index}`;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: ListDetailSectionsComponent, deps: [{ token: ULD_DOCUMENT_LIST }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.21", type: ListDetailSectionsComponent, isStandalone: false, selector: "app-list-detail-sections", inputs: { sections: "sections" }, ngImport: i0, template: "<section\n  *ngFor=\"let section of sections; trackBy: trackSection\"\n  class=\"list-detail-sections__section\">\n  <button\n    *ngIf=\"section.type === 'key_value' || section.type === 'item_list' || (section.type === 'content' && section.title)\"\n    type=\"button\"\n    class=\"list-detail-sections__section-header\"\n    (click)=\"toggleSection(section)\">\n    <span class=\"list-detail-sections__section-title\">{{ section.title }}</span>\n    <svg\n      class=\"list-detail-sections__chevron\"\n      [class.list-detail-sections__chevron--collapsed]=\"section.collapsed\"\n      viewBox=\"0 0 24 24\"\n      fill=\"none\"\n      stroke=\"currentColor\"\n      stroke-width=\"2\"\n      aria-hidden=\"true\">\n      <polyline points=\"18 15 12 9 6 15\"></polyline>\n    </svg>\n  </button>\n\n  <div\n    *ngIf=\"section.type === 'documents'\"\n    class=\"list-detail-sections__section-header list-detail-sections__section-header--static\">\n    <span class=\"list-detail-sections__section-title\">{{ section.title }}</span>\n  </div>\n\n  <div\n    *ngIf=\"section.type === 'key_value' && !section.collapsed\"\n    class=\"list-detail-sections__kv-grid\">\n    <div\n      *ngFor=\"let field of section.fields; trackBy: trackField\"\n      class=\"list-detail-sections__kv-row\">\n      <div class=\"list-detail-sections__kv-label\">{{ field.label }}</div>\n      <div\n        *ngIf=\"field.format !== 'html'\"\n        class=\"list-detail-sections__kv-value\">\n        {{ field.value }}\n      </div>\n      <div\n        *ngIf=\"field.format === 'html'\"\n        class=\"list-detail-sections__kv-value list-detail-sections__rich-html\"\n        [innerHTML]=\"field.value\">\n      </div>\n    </div>\n  </div>\n\n  <div\n    *ngIf=\"section.type === 'content' && !section.collapsed\"\n    class=\"list-detail-sections__content list-detail-sections__rich-html\"\n    [innerHTML]=\"section.html\">\n  </div>\n\n  <div *ngIf=\"section.type === 'item_list' && !section.collapsed\" class=\"list-detail-sections__item-list\">\n    <div *ngIf=\"section.loading\" class=\"list-detail-sections__state list-detail-sections__state--inline\">\n      <span class=\"list-detail-sections__spinner\" aria-hidden=\"true\"></span>\n      <span>Loading\u2026</span>\n    </div>\n    <p\n      *ngIf=\"!section.loading && !section.items.length\"\n      class=\"list-detail-sections__empty\">\n      {{ section.emptyMessage || 'No items.' }}\n    </p>\n    <article\n      *ngFor=\"let item of section.items; trackBy: trackItemListItem\"\n      class=\"list-detail-sections__item\">\n      <div class=\"list-detail-sections__item-main\">\n        <div class=\"list-detail-sections__item-title\">{{ item.title }}</div>\n        <div *ngIf=\"item.subtitle\" class=\"list-detail-sections__item-subtitle\">{{ item.subtitle }}</div>\n        <div *ngIf=\"item.metaLeft || item.metaRight\" class=\"list-detail-sections__item-meta\">\n          <span *ngIf=\"item.metaLeft\">{{ item.metaLeft }}</span>\n          <span *ngIf=\"item.metaRight\">{{ item.metaRight }}</span>\n        </div>\n      </div>\n      <span\n        *ngIf=\"item.badge\"\n        class=\"list-detail-sections__item-badge\"\n        [attr.data-tone]=\"item.badge.tone || 'neutral'\">\n        {{ item.badge.label }}\n      </span>\n    </article>\n  </div>\n\n  <div *ngIf=\"section.type === 'documents'\" class=\"list-detail-sections__documents\">\n    <div *ngIf=\"section.loading\" class=\"list-detail-sections__state list-detail-sections__state--inline\">\n      <span class=\"list-detail-sections__spinner\" aria-hidden=\"true\"></span>\n      <span>Loading documents...</span>\n    </div>\n    <ng-container *ngIf=\"!section.loading\">\n      <ng-container\n        *ngComponentOutlet=\"\n          documentListComponent;\n          inputs: { documents: section.documents, showHeading: false }\n        \">\n      </ng-container>\n    </ng-container>\n  </div>\n</section>\n", styles: [".list-detail-sections__section+.list-detail-sections__section{margin-top:10px}.list-detail-sections__section-header{width:100%;display:flex;align-items:center;justify-content:space-between;gap:8px;padding:10px 12px;border:1px solid var(--primary-200);border-radius:12px;background:var(--primary-100);cursor:pointer;text-align:left}.list-detail-sections__section-header--static{cursor:default}.list-detail-sections__section-title{font-size:.72rem;font-weight:700;letter-spacing:.03em;text-transform:uppercase;color:var(--primary-800)}.list-detail-sections__chevron{width:16px;height:16px;color:var(--primary-700);transition:transform .2s ease;flex-shrink:0}.list-detail-sections__chevron--collapsed{transform:rotate(180deg)}.list-detail-sections__kv-grid{margin-top:8px;border:1px solid rgba(148,163,184,.18);border-radius:12px;overflow:hidden}.list-detail-sections__kv-row{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:8px;padding:10px 12px;font-size:.72rem;line-height:1.35}.list-detail-sections__kv-row:nth-child(2n){background:#f8fafce6}.list-detail-sections__kv-label{font-weight:600;color:var(--secondary-700)}.list-detail-sections__kv-value{color:var(--secondary-900);word-break:break-word}.list-detail-sections__content{margin-top:8px;padding:10px 12px;border:1px solid rgba(148,163,184,.18);border-radius:12px;font-size:.72rem;line-height:1.45;color:var(--secondary-800);background:#f8fafce6}.list-detail-sections__rich-html :where(a){color:var(--primary-700);font-weight:600;text-decoration:underline;text-underline-offset:2px}.list-detail-sections__rich-html :where(p+p){margin-top:.5rem}.list-detail-sections__rich-html :where(ul,ol){margin:.35rem 0 0;padding-left:1.1rem}.list-detail-sections__rich-html :where(pre){margin:.35rem 0 0;padding:8px 10px;border-radius:8px;background:var(--uld-icon-neutral);color:var(--secondary-700);font-size:.72rem;line-height:1.35;white-space:pre-wrap;overflow-wrap:anywhere}.list-detail-sections__documents{margin-top:8px;border:1px solid rgba(148,163,184,.18);border-radius:12px;overflow:hidden;background:#fff}.list-detail-sections__state{display:flex;align-items:center;justify-content:center;gap:8px;padding:24px 12px;font-size:.75rem;color:var(--secondary-500)}.list-detail-sections__state--inline{padding:16px 12px}.list-detail-sections__spinner{width:18px;height:18px;border:2px solid rgba(249,115,22,.2);border-top-color:var(--primary-500);border-radius:50%;animation:list-detail-sections-spin .7s linear infinite}@keyframes list-detail-sections-spin{to{transform:rotate(360deg)}}.list-detail-sections__item-list{display:flex;flex-direction:column;gap:8px;margin-top:8px}.list-detail-sections__empty{margin:0;padding:12px;font-size:.75rem;color:var(--secondary-500);border:1px dashed var(--uld-item-list-border, rgba(148, 163, 184, .35));border-radius:12px}.list-detail-sections__item{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;padding:10px 12px;border:1px solid var(--uld-item-list-border, rgba(148, 163, 184, .18));border-radius:12px;background:#fff}.list-detail-sections__item-title{font-size:.82rem;font-weight:700;color:var(--secondary-900)}.list-detail-sections__item-subtitle{margin-top:2px;font-size:.68rem;color:var(--secondary-500)}.list-detail-sections__item-meta{margin-top:4px;display:flex;justify-content:space-between;gap:8px;font-size:.62rem;color:var(--secondary-500)}.list-detail-sections__item-badge{flex-shrink:0;font-size:.58rem;font-weight:700;letter-spacing:.02em;text-transform:uppercase;border-radius:999px;padding:4px 8px;line-height:1;background:var(--uld-badge-neutral-bg, #f1f5f9);color:var(--uld-badge-neutral-fg, #475569)}.list-detail-sections__item-badge[data-tone=success]{background:var(--uld-badge-success-bg, #dcfce7);color:var(--uld-badge-success-fg, #15803d)}.list-detail-sections__item-badge[data-tone=warning]{background:var(--uld-badge-warning-bg, #fef3c7);color:var(--uld-badge-warning-fg, #b45309)}.list-detail-sections__item-badge[data-tone=danger]{background:var(--uld-badge-danger-bg, #fee2e2);color:var(--uld-badge-danger-fg, #b91c1c)}.list-detail-sections__item-badge[data-tone=primary]{background:var(--primary-100);color:var(--primary-700)}\n"], dependencies: [{ kind: "directive", type: i1.NgComponentOutlet, selector: "[ngComponentOutlet]", inputs: ["ngComponentOutlet", "ngComponentOutletInputs", "ngComponentOutletInjector", "ngComponentOutletEnvironmentInjector", "ngComponentOutletContent", "ngComponentOutletNgModule"], exportAs: ["ngComponentOutlet"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: ListDetailSectionsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-list-detail-sections', standalone: false, template: "<section\n  *ngFor=\"let section of sections; trackBy: trackSection\"\n  class=\"list-detail-sections__section\">\n  <button\n    *ngIf=\"section.type === 'key_value' || section.type === 'item_list' || (section.type === 'content' && section.title)\"\n    type=\"button\"\n    class=\"list-detail-sections__section-header\"\n    (click)=\"toggleSection(section)\">\n    <span class=\"list-detail-sections__section-title\">{{ section.title }}</span>\n    <svg\n      class=\"list-detail-sections__chevron\"\n      [class.list-detail-sections__chevron--collapsed]=\"section.collapsed\"\n      viewBox=\"0 0 24 24\"\n      fill=\"none\"\n      stroke=\"currentColor\"\n      stroke-width=\"2\"\n      aria-hidden=\"true\">\n      <polyline points=\"18 15 12 9 6 15\"></polyline>\n    </svg>\n  </button>\n\n  <div\n    *ngIf=\"section.type === 'documents'\"\n    class=\"list-detail-sections__section-header list-detail-sections__section-header--static\">\n    <span class=\"list-detail-sections__section-title\">{{ section.title }}</span>\n  </div>\n\n  <div\n    *ngIf=\"section.type === 'key_value' && !section.collapsed\"\n    class=\"list-detail-sections__kv-grid\">\n    <div\n      *ngFor=\"let field of section.fields; trackBy: trackField\"\n      class=\"list-detail-sections__kv-row\">\n      <div class=\"list-detail-sections__kv-label\">{{ field.label }}</div>\n      <div\n        *ngIf=\"field.format !== 'html'\"\n        class=\"list-detail-sections__kv-value\">\n        {{ field.value }}\n      </div>\n      <div\n        *ngIf=\"field.format === 'html'\"\n        class=\"list-detail-sections__kv-value list-detail-sections__rich-html\"\n        [innerHTML]=\"field.value\">\n      </div>\n    </div>\n  </div>\n\n  <div\n    *ngIf=\"section.type === 'content' && !section.collapsed\"\n    class=\"list-detail-sections__content list-detail-sections__rich-html\"\n    [innerHTML]=\"section.html\">\n  </div>\n\n  <div *ngIf=\"section.type === 'item_list' && !section.collapsed\" class=\"list-detail-sections__item-list\">\n    <div *ngIf=\"section.loading\" class=\"list-detail-sections__state list-detail-sections__state--inline\">\n      <span class=\"list-detail-sections__spinner\" aria-hidden=\"true\"></span>\n      <span>Loading\u2026</span>\n    </div>\n    <p\n      *ngIf=\"!section.loading && !section.items.length\"\n      class=\"list-detail-sections__empty\">\n      {{ section.emptyMessage || 'No items.' }}\n    </p>\n    <article\n      *ngFor=\"let item of section.items; trackBy: trackItemListItem\"\n      class=\"list-detail-sections__item\">\n      <div class=\"list-detail-sections__item-main\">\n        <div class=\"list-detail-sections__item-title\">{{ item.title }}</div>\n        <div *ngIf=\"item.subtitle\" class=\"list-detail-sections__item-subtitle\">{{ item.subtitle }}</div>\n        <div *ngIf=\"item.metaLeft || item.metaRight\" class=\"list-detail-sections__item-meta\">\n          <span *ngIf=\"item.metaLeft\">{{ item.metaLeft }}</span>\n          <span *ngIf=\"item.metaRight\">{{ item.metaRight }}</span>\n        </div>\n      </div>\n      <span\n        *ngIf=\"item.badge\"\n        class=\"list-detail-sections__item-badge\"\n        [attr.data-tone]=\"item.badge.tone || 'neutral'\">\n        {{ item.badge.label }}\n      </span>\n    </article>\n  </div>\n\n  <div *ngIf=\"section.type === 'documents'\" class=\"list-detail-sections__documents\">\n    <div *ngIf=\"section.loading\" class=\"list-detail-sections__state list-detail-sections__state--inline\">\n      <span class=\"list-detail-sections__spinner\" aria-hidden=\"true\"></span>\n      <span>Loading documents...</span>\n    </div>\n    <ng-container *ngIf=\"!section.loading\">\n      <ng-container\n        *ngComponentOutlet=\"\n          documentListComponent;\n          inputs: { documents: section.documents, showHeading: false }\n        \">\n      </ng-container>\n    </ng-container>\n  </div>\n</section>\n", styles: [".list-detail-sections__section+.list-detail-sections__section{margin-top:10px}.list-detail-sections__section-header{width:100%;display:flex;align-items:center;justify-content:space-between;gap:8px;padding:10px 12px;border:1px solid var(--primary-200);border-radius:12px;background:var(--primary-100);cursor:pointer;text-align:left}.list-detail-sections__section-header--static{cursor:default}.list-detail-sections__section-title{font-size:.72rem;font-weight:700;letter-spacing:.03em;text-transform:uppercase;color:var(--primary-800)}.list-detail-sections__chevron{width:16px;height:16px;color:var(--primary-700);transition:transform .2s ease;flex-shrink:0}.list-detail-sections__chevron--collapsed{transform:rotate(180deg)}.list-detail-sections__kv-grid{margin-top:8px;border:1px solid rgba(148,163,184,.18);border-radius:12px;overflow:hidden}.list-detail-sections__kv-row{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:8px;padding:10px 12px;font-size:.72rem;line-height:1.35}.list-detail-sections__kv-row:nth-child(2n){background:#f8fafce6}.list-detail-sections__kv-label{font-weight:600;color:var(--secondary-700)}.list-detail-sections__kv-value{color:var(--secondary-900);word-break:break-word}.list-detail-sections__content{margin-top:8px;padding:10px 12px;border:1px solid rgba(148,163,184,.18);border-radius:12px;font-size:.72rem;line-height:1.45;color:var(--secondary-800);background:#f8fafce6}.list-detail-sections__rich-html :where(a){color:var(--primary-700);font-weight:600;text-decoration:underline;text-underline-offset:2px}.list-detail-sections__rich-html :where(p+p){margin-top:.5rem}.list-detail-sections__rich-html :where(ul,ol){margin:.35rem 0 0;padding-left:1.1rem}.list-detail-sections__rich-html :where(pre){margin:.35rem 0 0;padding:8px 10px;border-radius:8px;background:var(--uld-icon-neutral);color:var(--secondary-700);font-size:.72rem;line-height:1.35;white-space:pre-wrap;overflow-wrap:anywhere}.list-detail-sections__documents{margin-top:8px;border:1px solid rgba(148,163,184,.18);border-radius:12px;overflow:hidden;background:#fff}.list-detail-sections__state{display:flex;align-items:center;justify-content:center;gap:8px;padding:24px 12px;font-size:.75rem;color:var(--secondary-500)}.list-detail-sections__state--inline{padding:16px 12px}.list-detail-sections__spinner{width:18px;height:18px;border:2px solid rgba(249,115,22,.2);border-top-color:var(--primary-500);border-radius:50%;animation:list-detail-sections-spin .7s linear infinite}@keyframes list-detail-sections-spin{to{transform:rotate(360deg)}}.list-detail-sections__item-list{display:flex;flex-direction:column;gap:8px;margin-top:8px}.list-detail-sections__empty{margin:0;padding:12px;font-size:.75rem;color:var(--secondary-500);border:1px dashed var(--uld-item-list-border, rgba(148, 163, 184, .35));border-radius:12px}.list-detail-sections__item{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;padding:10px 12px;border:1px solid var(--uld-item-list-border, rgba(148, 163, 184, .18));border-radius:12px;background:#fff}.list-detail-sections__item-title{font-size:.82rem;font-weight:700;color:var(--secondary-900)}.list-detail-sections__item-subtitle{margin-top:2px;font-size:.68rem;color:var(--secondary-500)}.list-detail-sections__item-meta{margin-top:4px;display:flex;justify-content:space-between;gap:8px;font-size:.62rem;color:var(--secondary-500)}.list-detail-sections__item-badge{flex-shrink:0;font-size:.58rem;font-weight:700;letter-spacing:.02em;text-transform:uppercase;border-radius:999px;padding:4px 8px;line-height:1;background:var(--uld-badge-neutral-bg, #f1f5f9);color:var(--uld-badge-neutral-fg, #475569)}.list-detail-sections__item-badge[data-tone=success]{background:var(--uld-badge-success-bg, #dcfce7);color:var(--uld-badge-success-fg, #15803d)}.list-detail-sections__item-badge[data-tone=warning]{background:var(--uld-badge-warning-bg, #fef3c7);color:var(--uld-badge-warning-fg, #b45309)}.list-detail-sections__item-badge[data-tone=danger]{background:var(--uld-badge-danger-bg, #fee2e2);color:var(--uld-badge-danger-fg, #b91c1c)}.list-detail-sections__item-badge[data-tone=primary]{background:var(--primary-100);color:var(--primary-700)}\n"] }]
        }], ctorParameters: () => [{ type: i0.Type, decorators: [{
                    type: Inject,
                    args: [ULD_DOCUMENT_LIST]
                }] }], propDecorators: { sections: [{
                type: Input
            }] } });

class DynamicFileUploadComponent {
    component;
    allowedFileTypes;
    maxFileSize;
    files = new EventEmitter();
    host;
    componentRef;
    outputSubscription;
    viewReady = false;
    ngAfterViewInit() {
        this.viewReady = true;
        this.render();
    }
    ngOnChanges(changes) {
        if (!this.viewReady) {
            return;
        }
        if ('component' in changes) {
            this.render();
            return;
        }
        this.applyInputs();
    }
    ngOnDestroy() {
        this.outputSubscription?.unsubscribe();
        this.componentRef?.destroy();
    }
    render() {
        this.outputSubscription?.unsubscribe();
        this.outputSubscription = undefined;
        this.host.clear();
        this.componentRef = undefined;
        if (!this.component) {
            return;
        }
        this.componentRef = this.host.createComponent(this.component);
        this.applyInputs();
        const output = this.componentRef.instance.files;
        if (output && typeof output.subscribe === 'function') {
            this.outputSubscription = output.subscribe(value => this.files.emit(value));
        }
    }
    applyInputs() {
        this.componentRef?.setInput('allowedFileTypes', this.allowedFileTypes);
        this.componentRef?.setInput('maxFileSize', this.maxFileSize);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: DynamicFileUploadComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.21", type: DynamicFileUploadComponent, isStandalone: false, selector: "uld-dynamic-file-upload", inputs: { component: "component", allowedFileTypes: "allowedFileTypes", maxFileSize: "maxFileSize" }, outputs: { files: "files" }, viewQueries: [{ propertyName: "host", first: true, predicate: ["host"], descendants: true, read: ViewContainerRef, static: true }], usesOnChanges: true, ngImport: i0, template: '<ng-container #host></ng-container>', isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: DynamicFileUploadComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'uld-dynamic-file-upload',
                    template: '<ng-container #host></ng-container>',
                    standalone: false,
                }]
        }], propDecorators: { component: [{
                type: Input,
                args: [{ required: true }]
            }], allowedFileTypes: [{
                type: Input
            }], maxFileSize: [{
                type: Input
            }], files: [{
                type: Output
            }], host: [{
                type: ViewChild,
                args: ['host', { read: ViewContainerRef, static: true }]
            }] } });

class ListDetailSheetComponent {
    fileUploadComponent;
    open = false;
    mode = 'view';
    title = 'Details';
    sections = [];
    loading = false;
    saving = false;
    primaryActionLabel;
    /** Read-only context shown above the edit form. */
    editSummary = [];
    editDefinition;
    editInitialValues = {};
    editEngineOptions;
    editTitle;
    /** Optional payment-proof upload shown below the edit form (e.g. paid donations). */
    editShowDocumentUpload = false;
    editDocumentUploadLabel = 'Payment proof';
    editDocumentUploadHint = 'Upload a supporting image or PDF';
    editDocumentUploadError;
    editDocumentAllowedTypes = ['jpg', 'jpeg', 'png', 'pdf'];
    hasFooterActions = false;
    allowEditCancel = true;
    allowDismiss = true;
    hideEditForm = false;
    hideEditActions = false;
    closed = new EventEmitter();
    primaryAction = new EventEmitter();
    editSave = new EventEmitter();
    editCancel = new EventEmitter();
    editValuesChange = new EventEmitter();
    editDocumentsChange = new EventEmitter();
    cfForm;
    fileUploadMaxSize = 2 * 1024 * 1024;
    constructor(fileUploadComponent) {
        this.fileUploadComponent = fileUploadComponent;
    }
    get sheetTitle() {
        if (this.mode === 'edit') {
            return this.editTitle ?? `${this.title} — Edit`;
        }
        return this.title;
    }
    ngOnChanges(changes) {
        if ('open' in changes) {
            this.syncBodyLock(changes['open'].currentValue === true);
        }
        const enteredEdit = changes['mode']?.currentValue === 'edit'
            && changes['mode']?.previousValue !== 'edit';
        const openedInEdit = changes['open']?.currentValue === true && this.mode === 'edit';
        if (this.editDefinition && (enteredEdit || openedInEdit)) {
            queueMicrotask(() => this.cfForm?.resetForm(this.editInitialValues));
        }
    }
    ngOnDestroy() {
        if (this.open) {
            setMobileSheetOpen(false);
        }
    }
    onDismissClick() {
        if (this.mode === 'edit') {
            if (!this.allowEditCancel) {
                return;
            }
            this.editCancel.emit();
            return;
        }
        if (!this.allowDismiss) {
            return;
        }
        this.closed.emit();
    }
    onBackdropClick() {
        if (!this.allowDismiss) {
            return;
        }
        this.onDismissClick();
    }
    onPrimaryAction() {
        this.primaryAction.emit();
    }
    onCancelEdit() {
        this.editCancel.emit();
    }
    onSaveEdit() {
        if (!this.cfForm || !this.cfForm.validateForm()) {
            return;
        }
        this.editSave.emit(this.cfForm.getVisibleValues());
    }
    onEditValuesChange(values) {
        this.editValuesChange.emit(values);
    }
    onEditDocumentsChange(files) {
        this.editDocumentsChange.emit(files);
    }
    onFileUpload = (files) => {
        this.onEditDocumentsChange(files);
    };
    trackSummaryField(_index, field) {
        return field.label;
    }
    syncBodyLock(open) {
        setMobileSheetOpen(open);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: ListDetailSheetComponent, deps: [{ token: ULD_FILE_UPLOAD }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.21", type: ListDetailSheetComponent, isStandalone: false, selector: "app-list-detail-sheet", inputs: { open: "open", mode: "mode", title: "title", sections: "sections", loading: "loading", saving: "saving", primaryActionLabel: "primaryActionLabel", editSummary: "editSummary", editDefinition: "editDefinition", editInitialValues: "editInitialValues", editEngineOptions: "editEngineOptions", editTitle: "editTitle", editShowDocumentUpload: "editShowDocumentUpload", editDocumentUploadLabel: "editDocumentUploadLabel", editDocumentUploadHint: "editDocumentUploadHint", editDocumentUploadError: "editDocumentUploadError", editDocumentAllowedTypes: "editDocumentAllowedTypes", hasFooterActions: "hasFooterActions", allowEditCancel: "allowEditCancel", allowDismiss: "allowDismiss", hideEditForm: "hideEditForm", hideEditActions: "hideEditActions" }, outputs: { closed: "closed", primaryAction: "primaryAction", editSave: "editSave", editCancel: "editCancel", editValuesChange: "editValuesChange", editDocumentsChange: "editDocumentsChange" }, viewQueries: [{ propertyName: "cfForm", first: true, predicate: CfFormComponent, descendants: true }], usesOnChanges: true, ngImport: i0, template: "<ng-container *ngIf=\"open\">\n  <div\n    class=\"list-detail-sheet__backdrop\"\n    (click)=\"onBackdropClick()\"\n    aria-hidden=\"true\">\n  </div>\n\n  <div class=\"list-detail-sheet\" role=\"dialog\" [attr.aria-label]=\"sheetTitle\">\n    <div class=\"list-detail-sheet__handle\" aria-hidden=\"true\"></div>\n\n    <div class=\"list-detail-sheet__title-row\">\n      <h2 class=\"list-detail-sheet__title\">{{ sheetTitle }}</h2>\n      <div class=\"list-detail-sheet__title-actions\">\n        <ng-content select=\"[detailHeaderActions]\"></ng-content>\n        <button\n          *ngIf=\"allowDismiss || (mode === 'edit' && allowEditCancel)\"\n          type=\"button\"\n          class=\"list-detail-sheet__close\"\n          (click)=\"onDismissClick()\"\n          [attr.aria-label]=\"mode === 'edit' ? 'Cancel edit' : 'Close'\">\n          <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"\n               stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\">\n            <line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"></line>\n            <line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"></line>\n          </svg>\n        </button>\n      </div>\n    </div>\n\n    <div class=\"list-detail-sheet__hero-slot\" *ngIf=\"mode === 'view'\">\n      <ng-content select=\"[detailHero]\"></ng-content>\n    </div>\n\n    <div class=\"list-detail-sheet__body\">\n      <div *ngIf=\"loading && !sections.length\" class=\"list-detail-sheet__state\">\n        <span class=\"list-detail-sheet__spinner\" aria-hidden=\"true\"></span>\n        <span>Loading details\u2026</span>\n      </div>\n\n      <app-list-detail-sections\n        *ngIf=\"sections.length && mode === 'view'\"\n        [sections]=\"sections\">\n      </app-list-detail-sections>\n\n      <div class=\"list-detail-sheet__view-extras\" *ngIf=\"mode === 'view'\">\n        <ng-content select=\"[detailViewExtras]\"></ng-content>\n      </div>\n\n      <ng-container *ngIf=\"mode === 'edit'\">\n        <div *ngIf=\"editSummary.length\" class=\"list-detail-sheet__summary\">\n          <div\n            *ngFor=\"let field of editSummary; trackBy: trackSummaryField\"\n            class=\"list-detail-sheet__summary-row\">\n            <span class=\"list-detail-sheet__summary-label\">{{ field.label }}</span>\n            <span\n              *ngIf=\"field.format !== 'html'\"\n              class=\"list-detail-sheet__summary-value\">\n              {{ field.value }}\n            </span>\n            <span\n              *ngIf=\"field.format === 'html'\"\n              class=\"list-detail-sheet__summary-value list-detail-sheet__rich-html\"\n              [innerHTML]=\"field.value\">\n            </span>\n          </div>\n        </div>\n\n        <cf-form\n          *ngIf=\"editDefinition && !hideEditForm\"\n          class=\"list-detail-sheet__form\"\n          [definition]=\"editDefinition\"\n          [initialValues]=\"editInitialValues\"\n          [engineOptions]=\"editEngineOptions\"\n          [hideHeading]=\"true\"\n          [showSubmit]=\"false\"\n          idPrefix=\"detail-edit\"\n          (valuesChange)=\"onEditValuesChange($event)\">\n        </cf-form>\n\n        <ng-content select=\"[detailEditExtras]\"></ng-content>\n\n        <section *ngIf=\"editShowDocumentUpload\" class=\"list-detail-sheet__upload\">\n          <label class=\"cf-field-label list-detail-sheet__upload-label\">\n            {{ editDocumentUploadLabel }}\n            <span class=\"cf-required-mark\" aria-hidden=\"true\"> *</span>\n          </label>\n          <p class=\"list-detail-sheet__upload-hint\">{{ editDocumentUploadHint }}</p>\n          <uld-dynamic-file-upload\n            [component]=\"fileUploadComponent\"\n            [allowedFileTypes]=\"editDocumentAllowedTypes\"\n            [maxFileSize]=\"fileUploadMaxSize\"\n            (files)=\"onFileUpload($event)\">\n          </uld-dynamic-file-upload>\n          <div *ngIf=\"editDocumentUploadError\" class=\"cf-field-error mat-mdc-form-field-error\" role=\"alert\">\n            {{ editDocumentUploadError }}\n          </div>\n        </section>\n      </ng-container>\n    </div>\n\n    <div\n      class=\"list-detail-sheet__actions list-detail-sheet__actions--stacked\"\n      *ngIf=\"mode === 'view' && (primaryActionLabel || hasFooterActions)\">\n      <ng-content select=\"[detailFooterActions]\"></ng-content>\n      <button\n        *ngIf=\"primaryActionLabel\"\n        type=\"button\"\n        class=\"app-btn app-btn--primary app-btn--block\"\n        (click)=\"onPrimaryAction()\">\n        {{ primaryActionLabel }}\n      </button>\n    </div>\n\n    <div class=\"list-detail-sheet__actions app-btn-group\" *ngIf=\"mode === 'edit' && !hideEditActions\">\n      <button\n        *ngIf=\"allowEditCancel\"\n        type=\"button\"\n        class=\"app-btn app-btn--ghost\"\n        (click)=\"onCancelEdit()\"\n        [disabled]=\"saving\">\n        Cancel\n      </button>\n      <button type=\"button\" class=\"app-btn app-btn--primary\" (click)=\"onSaveEdit()\" [disabled]=\"saving\">\n        {{ saving ? 'Saving...' : 'Save' }}\n      </button>\n    </div>\n  </div>\n</ng-container>\n", styles: [".list-detail-sheet__backdrop{position:fixed;inset:0;background:#0f172a59;z-index:250;animation:list-detail-sheet-fade-in .2s ease}.list-detail-sheet{position:fixed;left:0;right:0;bottom:0;z-index:251;background:#fff;border-radius:20px 20px 0 0;box-shadow:0 -8px 32px #0f172a1f;padding:10px 16px calc(16px + env(safe-area-inset-bottom,0));animation:list-detail-sheet-slide-up .24s cubic-bezier(.22,1,.36,1);max-height:min(92vh,680px);display:flex;flex-direction:column}.list-detail-sheet__handle{width:36px;height:4px;border-radius:999px;background:#cbd5e1;margin:0 auto 12px;flex-shrink:0}.list-detail-sheet__title-row{display:flex;align-items:center;justify-content:center;position:relative;margin-bottom:1rem;padding:0 36px;flex-shrink:0}.list-detail-sheet__title{margin:0;font-size:.85rem;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--secondary-800);text-align:center}.list-detail-sheet__back,.list-detail-sheet__close{position:absolute;top:50%;transform:translateY(-50%);width:32px;height:32px;display:flex;align-items:center;justify-content:center;border:none;border-radius:999px;background:#f1f5f9;color:var(--secondary-600);cursor:pointer;padding:0}.list-detail-sheet__back svg,.list-detail-sheet__close svg{width:16px;height:16px}.list-detail-sheet__back:active,.list-detail-sheet__close:active{background:#e2e8f0}.list-detail-sheet__back{left:0}.list-detail-sheet__close{right:0}.list-detail-sheet__body{flex:1;overflow-y:auto;scrollbar-width:none;-ms-overflow-style:none;padding-bottom:8px}.list-detail-sheet__body::-webkit-scrollbar{display:none}.list-detail-sheet__form{display:block}.list-detail-sheet__actions{padding-top:12px;border-top:1px solid rgba(148,163,184,.2);flex-shrink:0}@keyframes list-detail-sheet-fade-in{0%{opacity:0}to{opacity:1}}@keyframes list-detail-sheet-slide-up{0%{transform:translateY(100%)}to{transform:translateY(0)}}@media(min-width:768px){.list-detail-sheet{inset:50% auto auto 50%;transform:translate(-50%,-50%);width:min(720px,100vw - 48px);max-height:min(85vh,720px);border-radius:20px;padding:16px 24px 20px;animation:list-detail-sheet-dialog-in .24s cubic-bezier(.22,1,.36,1)}.list-detail-sheet__handle{display:none}}@keyframes list-detail-sheet-dialog-in{0%{opacity:0;transform:translate(-50%,calc(-50% + 16px))}to{opacity:1;transform:translate(-50%,-50%)}}.list-detail-sheet__title-actions{position:absolute;top:50%;right:0;transform:translateY(-50%);display:flex;align-items:center;gap:4px}.list-detail-sheet__title-actions .list-detail-sheet__close{position:static;top:auto;right:auto;transform:none}.list-detail-sheet__title-row{padding-right:76px}.list-detail-sheet__hero-slot{display:block;padding:0 16px 14px}.list-detail-sheet__hero-slot:empty{display:none;padding:0}.list-detail-sheet__view-extras{display:block;padding:0 16px 14px}.list-detail-sheet__view-extras:empty{display:none;padding:0}.list-detail-sheet__state{display:flex;align-items:center;justify-content:center;gap:8px;padding:24px 12px;font-size:.75rem;color:var(--secondary-500)}.list-detail-sheet__state--inline{padding:16px 12px}.list-detail-sheet__spinner{width:18px;height:18px;border:2px solid rgba(249,115,22,.2);border-top-color:var(--primary-500);border-radius:50%;animation:list-detail-sheet-spin .7s linear infinite}.list-detail-sheet__summary{margin-bottom:12px;border:1px solid rgba(148,163,184,.18);border-radius:12px;overflow:hidden;background:#fffaf5}.list-detail-sheet__summary-row{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:8px;padding:8px 12px;font-size:.72rem;line-height:1.35}.list-detail-sheet__summary-row:not(:last-child){border-bottom:1px solid rgba(148,163,184,.12)}.list-detail-sheet__summary-label{font-weight:600;color:var(--secondary-700)}.list-detail-sheet__summary-value{color:var(--secondary-900);word-break:break-word}.list-detail-sheet__rich-html :where(a){color:var(--primary-700);font-weight:600;text-decoration:underline;text-underline-offset:2px}.list-detail-sheet__upload{margin-top:1rem;display:flex;flex-direction:column;gap:.5rem}.list-detail-sheet__upload-label{margin:0}.list-detail-sheet__upload-hint{margin:0;font-size:.72rem;line-height:1.35;color:var(--secondary-500)}.list-detail-sheet__upload .cf-field-error{font-size:.75rem;color:#ba1a1a}.list-detail-sheet__actions--stacked{display:flex;flex-direction:column;gap:.5rem}@keyframes list-detail-sheet-spin{to{transform:rotate(360deg)}}@media(min-width:768px){.list-detail-sheet__summary-row{grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr)}}\n"], dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2$1.CfFormComponent, selector: "cf-form", inputs: ["definition", "initialValues", "engineOptions", "idPrefix", "hideHeading", "submitLabel", "showSubmit"], outputs: ["submitted", "valuesChange"] }, { kind: "component", type: ListDetailSectionsComponent, selector: "app-list-detail-sections", inputs: ["sections"] }, { kind: "component", type: DynamicFileUploadComponent, selector: "uld-dynamic-file-upload", inputs: ["component", "allowedFileTypes", "maxFileSize"], outputs: ["files"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: ListDetailSheetComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-list-detail-sheet', standalone: false, template: "<ng-container *ngIf=\"open\">\n  <div\n    class=\"list-detail-sheet__backdrop\"\n    (click)=\"onBackdropClick()\"\n    aria-hidden=\"true\">\n  </div>\n\n  <div class=\"list-detail-sheet\" role=\"dialog\" [attr.aria-label]=\"sheetTitle\">\n    <div class=\"list-detail-sheet__handle\" aria-hidden=\"true\"></div>\n\n    <div class=\"list-detail-sheet__title-row\">\n      <h2 class=\"list-detail-sheet__title\">{{ sheetTitle }}</h2>\n      <div class=\"list-detail-sheet__title-actions\">\n        <ng-content select=\"[detailHeaderActions]\"></ng-content>\n        <button\n          *ngIf=\"allowDismiss || (mode === 'edit' && allowEditCancel)\"\n          type=\"button\"\n          class=\"list-detail-sheet__close\"\n          (click)=\"onDismissClick()\"\n          [attr.aria-label]=\"mode === 'edit' ? 'Cancel edit' : 'Close'\">\n          <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"\n               stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\">\n            <line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"></line>\n            <line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"></line>\n          </svg>\n        </button>\n      </div>\n    </div>\n\n    <div class=\"list-detail-sheet__hero-slot\" *ngIf=\"mode === 'view'\">\n      <ng-content select=\"[detailHero]\"></ng-content>\n    </div>\n\n    <div class=\"list-detail-sheet__body\">\n      <div *ngIf=\"loading && !sections.length\" class=\"list-detail-sheet__state\">\n        <span class=\"list-detail-sheet__spinner\" aria-hidden=\"true\"></span>\n        <span>Loading details\u2026</span>\n      </div>\n\n      <app-list-detail-sections\n        *ngIf=\"sections.length && mode === 'view'\"\n        [sections]=\"sections\">\n      </app-list-detail-sections>\n\n      <div class=\"list-detail-sheet__view-extras\" *ngIf=\"mode === 'view'\">\n        <ng-content select=\"[detailViewExtras]\"></ng-content>\n      </div>\n\n      <ng-container *ngIf=\"mode === 'edit'\">\n        <div *ngIf=\"editSummary.length\" class=\"list-detail-sheet__summary\">\n          <div\n            *ngFor=\"let field of editSummary; trackBy: trackSummaryField\"\n            class=\"list-detail-sheet__summary-row\">\n            <span class=\"list-detail-sheet__summary-label\">{{ field.label }}</span>\n            <span\n              *ngIf=\"field.format !== 'html'\"\n              class=\"list-detail-sheet__summary-value\">\n              {{ field.value }}\n            </span>\n            <span\n              *ngIf=\"field.format === 'html'\"\n              class=\"list-detail-sheet__summary-value list-detail-sheet__rich-html\"\n              [innerHTML]=\"field.value\">\n            </span>\n          </div>\n        </div>\n\n        <cf-form\n          *ngIf=\"editDefinition && !hideEditForm\"\n          class=\"list-detail-sheet__form\"\n          [definition]=\"editDefinition\"\n          [initialValues]=\"editInitialValues\"\n          [engineOptions]=\"editEngineOptions\"\n          [hideHeading]=\"true\"\n          [showSubmit]=\"false\"\n          idPrefix=\"detail-edit\"\n          (valuesChange)=\"onEditValuesChange($event)\">\n        </cf-form>\n\n        <ng-content select=\"[detailEditExtras]\"></ng-content>\n\n        <section *ngIf=\"editShowDocumentUpload\" class=\"list-detail-sheet__upload\">\n          <label class=\"cf-field-label list-detail-sheet__upload-label\">\n            {{ editDocumentUploadLabel }}\n            <span class=\"cf-required-mark\" aria-hidden=\"true\"> *</span>\n          </label>\n          <p class=\"list-detail-sheet__upload-hint\">{{ editDocumentUploadHint }}</p>\n          <uld-dynamic-file-upload\n            [component]=\"fileUploadComponent\"\n            [allowedFileTypes]=\"editDocumentAllowedTypes\"\n            [maxFileSize]=\"fileUploadMaxSize\"\n            (files)=\"onFileUpload($event)\">\n          </uld-dynamic-file-upload>\n          <div *ngIf=\"editDocumentUploadError\" class=\"cf-field-error mat-mdc-form-field-error\" role=\"alert\">\n            {{ editDocumentUploadError }}\n          </div>\n        </section>\n      </ng-container>\n    </div>\n\n    <div\n      class=\"list-detail-sheet__actions list-detail-sheet__actions--stacked\"\n      *ngIf=\"mode === 'view' && (primaryActionLabel || hasFooterActions)\">\n      <ng-content select=\"[detailFooterActions]\"></ng-content>\n      <button\n        *ngIf=\"primaryActionLabel\"\n        type=\"button\"\n        class=\"app-btn app-btn--primary app-btn--block\"\n        (click)=\"onPrimaryAction()\">\n        {{ primaryActionLabel }}\n      </button>\n    </div>\n\n    <div class=\"list-detail-sheet__actions app-btn-group\" *ngIf=\"mode === 'edit' && !hideEditActions\">\n      <button\n        *ngIf=\"allowEditCancel\"\n        type=\"button\"\n        class=\"app-btn app-btn--ghost\"\n        (click)=\"onCancelEdit()\"\n        [disabled]=\"saving\">\n        Cancel\n      </button>\n      <button type=\"button\" class=\"app-btn app-btn--primary\" (click)=\"onSaveEdit()\" [disabled]=\"saving\">\n        {{ saving ? 'Saving...' : 'Save' }}\n      </button>\n    </div>\n  </div>\n</ng-container>\n", styles: [".list-detail-sheet__backdrop{position:fixed;inset:0;background:#0f172a59;z-index:250;animation:list-detail-sheet-fade-in .2s ease}.list-detail-sheet{position:fixed;left:0;right:0;bottom:0;z-index:251;background:#fff;border-radius:20px 20px 0 0;box-shadow:0 -8px 32px #0f172a1f;padding:10px 16px calc(16px + env(safe-area-inset-bottom,0));animation:list-detail-sheet-slide-up .24s cubic-bezier(.22,1,.36,1);max-height:min(92vh,680px);display:flex;flex-direction:column}.list-detail-sheet__handle{width:36px;height:4px;border-radius:999px;background:#cbd5e1;margin:0 auto 12px;flex-shrink:0}.list-detail-sheet__title-row{display:flex;align-items:center;justify-content:center;position:relative;margin-bottom:1rem;padding:0 36px;flex-shrink:0}.list-detail-sheet__title{margin:0;font-size:.85rem;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--secondary-800);text-align:center}.list-detail-sheet__back,.list-detail-sheet__close{position:absolute;top:50%;transform:translateY(-50%);width:32px;height:32px;display:flex;align-items:center;justify-content:center;border:none;border-radius:999px;background:#f1f5f9;color:var(--secondary-600);cursor:pointer;padding:0}.list-detail-sheet__back svg,.list-detail-sheet__close svg{width:16px;height:16px}.list-detail-sheet__back:active,.list-detail-sheet__close:active{background:#e2e8f0}.list-detail-sheet__back{left:0}.list-detail-sheet__close{right:0}.list-detail-sheet__body{flex:1;overflow-y:auto;scrollbar-width:none;-ms-overflow-style:none;padding-bottom:8px}.list-detail-sheet__body::-webkit-scrollbar{display:none}.list-detail-sheet__form{display:block}.list-detail-sheet__actions{padding-top:12px;border-top:1px solid rgba(148,163,184,.2);flex-shrink:0}@keyframes list-detail-sheet-fade-in{0%{opacity:0}to{opacity:1}}@keyframes list-detail-sheet-slide-up{0%{transform:translateY(100%)}to{transform:translateY(0)}}@media(min-width:768px){.list-detail-sheet{inset:50% auto auto 50%;transform:translate(-50%,-50%);width:min(720px,100vw - 48px);max-height:min(85vh,720px);border-radius:20px;padding:16px 24px 20px;animation:list-detail-sheet-dialog-in .24s cubic-bezier(.22,1,.36,1)}.list-detail-sheet__handle{display:none}}@keyframes list-detail-sheet-dialog-in{0%{opacity:0;transform:translate(-50%,calc(-50% + 16px))}to{opacity:1;transform:translate(-50%,-50%)}}.list-detail-sheet__title-actions{position:absolute;top:50%;right:0;transform:translateY(-50%);display:flex;align-items:center;gap:4px}.list-detail-sheet__title-actions .list-detail-sheet__close{position:static;top:auto;right:auto;transform:none}.list-detail-sheet__title-row{padding-right:76px}.list-detail-sheet__hero-slot{display:block;padding:0 16px 14px}.list-detail-sheet__hero-slot:empty{display:none;padding:0}.list-detail-sheet__view-extras{display:block;padding:0 16px 14px}.list-detail-sheet__view-extras:empty{display:none;padding:0}.list-detail-sheet__state{display:flex;align-items:center;justify-content:center;gap:8px;padding:24px 12px;font-size:.75rem;color:var(--secondary-500)}.list-detail-sheet__state--inline{padding:16px 12px}.list-detail-sheet__spinner{width:18px;height:18px;border:2px solid rgba(249,115,22,.2);border-top-color:var(--primary-500);border-radius:50%;animation:list-detail-sheet-spin .7s linear infinite}.list-detail-sheet__summary{margin-bottom:12px;border:1px solid rgba(148,163,184,.18);border-radius:12px;overflow:hidden;background:#fffaf5}.list-detail-sheet__summary-row{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:8px;padding:8px 12px;font-size:.72rem;line-height:1.35}.list-detail-sheet__summary-row:not(:last-child){border-bottom:1px solid rgba(148,163,184,.12)}.list-detail-sheet__summary-label{font-weight:600;color:var(--secondary-700)}.list-detail-sheet__summary-value{color:var(--secondary-900);word-break:break-word}.list-detail-sheet__rich-html :where(a){color:var(--primary-700);font-weight:600;text-decoration:underline;text-underline-offset:2px}.list-detail-sheet__upload{margin-top:1rem;display:flex;flex-direction:column;gap:.5rem}.list-detail-sheet__upload-label{margin:0}.list-detail-sheet__upload-hint{margin:0;font-size:.72rem;line-height:1.35;color:var(--secondary-500)}.list-detail-sheet__upload .cf-field-error{font-size:.75rem;color:#ba1a1a}.list-detail-sheet__actions--stacked{display:flex;flex-direction:column;gap:.5rem}@keyframes list-detail-sheet-spin{to{transform:rotate(360deg)}}@media(min-width:768px){.list-detail-sheet__summary-row{grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr)}}\n"] }]
        }], ctorParameters: () => [{ type: i0.Type, decorators: [{
                    type: Inject,
                    args: [ULD_FILE_UPLOAD]
                }] }], propDecorators: { open: [{
                type: Input
            }], mode: [{
                type: Input
            }], title: [{
                type: Input
            }], sections: [{
                type: Input
            }], loading: [{
                type: Input
            }], saving: [{
                type: Input
            }], primaryActionLabel: [{
                type: Input
            }], editSummary: [{
                type: Input
            }], editDefinition: [{
                type: Input
            }], editInitialValues: [{
                type: Input
            }], editEngineOptions: [{
                type: Input
            }], editTitle: [{
                type: Input
            }], editShowDocumentUpload: [{
                type: Input
            }], editDocumentUploadLabel: [{
                type: Input
            }], editDocumentUploadHint: [{
                type: Input
            }], editDocumentUploadError: [{
                type: Input
            }], editDocumentAllowedTypes: [{
                type: Input
            }], hasFooterActions: [{
                type: Input
            }], allowEditCancel: [{
                type: Input
            }], allowDismiss: [{
                type: Input
            }], hideEditForm: [{
                type: Input
            }], hideEditActions: [{
                type: Input
            }], closed: [{
                type: Output
            }], primaryAction: [{
                type: Output
            }], editSave: [{
                type: Output
            }], editCancel: [{
                type: Output
            }], editValuesChange: [{
                type: Output
            }], editDocumentsChange: [{
                type: Output
            }], cfForm: [{
                type: ViewChild,
                args: [CfFormComponent]
            }] } });

class FilteredListPageComponent {
    controller;
    searchPlaceholder = 'Search by ID';
    emptyMessage = 'No items match this filter.';
    showToolbar = true;
    selectable = false;
    filterSheetTitle = 'Filters';
    rowTemplate;
    rowTrailing;
    rowClick = new EventEmitter();
    rowLinkClick = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: FilteredListPageComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.21", type: FilteredListPageComponent, isStandalone: false, selector: "app-filtered-list-page", inputs: { controller: "controller", searchPlaceholder: "searchPlaceholder", emptyMessage: "emptyMessage", showToolbar: "showToolbar", selectable: "selectable", filterSheetTitle: "filterSheetTitle" }, outputs: { rowClick: "rowClick", rowLinkClick: "rowLinkClick" }, queries: [{ propertyName: "rowTemplate", first: true, predicate: ["rowTemplate"], descendants: true, read: TemplateRef }, { propertyName: "rowTrailing", first: true, predicate: ["rowTrailing"], descendants: true, read: TemplateRef }], ngImport: i0, template: "<app-filtered-infinite-list\n  [chips]=\"controller.chips\"\n  [activeChipId]=\"controller.activeChip\"\n  [items]=\"controller.listItems\"\n  [loading]=\"controller.listLoading\"\n  [loadingMore]=\"controller.listLoadingMore\"\n  [hasMore]=\"controller.listHasMore\"\n  [showToolbar]=\"showToolbar\"\n  [searchText]=\"controller.listSearchText\"\n  [searchPlaceholder]=\"searchPlaceholder\"\n  [filterCount]=\"controller.activeFilterCount\"\n  [appliedFilters]=\"controller.appliedFilters\"\n  [selectable]=\"selectable\"\n  [selectedIds]=\"controller.selectedIds\"\n  [emptyMessage]=\"emptyMessage\"\n  [rowTemplateRef]=\"rowTemplate\"\n  [rowTrailingTemplateRef]=\"rowTrailing\"\n  (chipSelect)=\"controller.onChipSelect($event)\"\n  (searchChange)=\"controller.onSearchChange($event)\"\n  (filterOpen)=\"controller.onFilterOpen()\"\n  (pillRemove)=\"controller.onPillRemove($event)\"\n  (loadMore)=\"controller.onLoadMore()\"\n  (selectedIdsChange)=\"controller.onSelectionChange($event)\"\n  (rowClick)=\"rowClick.emit($event)\"\n  (rowLinkClick)=\"rowLinkClick.emit($event)\">\n  <div bulkActions>\n    <ng-content select=\"[bulkActions]\"></ng-content>\n  </div>\n</app-filtered-infinite-list>\n\n<app-list-filter-sheet\n  [open]=\"controller.filterSheetOpen\"\n  [title]=\"filterSheetTitle\"\n  [definition]=\"controller.filterFormDefinition!\"\n  [initialValues]=\"controller.filterFormInitialValues\"\n  (closed)=\"controller.onFilterSheetClose()\"\n  (applied)=\"controller.onFilterSheetApply($event)\"\n  (reset)=\"controller.onFilterSheetReset()\">\n</app-list-filter-sheet>\n\n<ng-content select=\"[listOverlays]\"></ng-content>\n", styles: [":host{display:block}\n"], dependencies: [{ kind: "component", type: FilteredInfiniteListComponent, selector: "app-filtered-infinite-list", inputs: ["chips", "activeChipId", "items", "loading", "loadingMore", "hasMore", "emptyMessage", "showToolbar", "searchText", "searchPlaceholder", "filterCount", "appliedFilters", "selectable", "selectedIds", "selectionInteraction", "rowTemplateRef", "rowTrailingTemplateRef"], outputs: ["chipSelect", "loadMore", "rowClick", "rowLinkClick", "filterOpen", "searchChange", "pillRemove", "selectedIdsChange", "selectionModeChange"] }, { kind: "component", type: ListFilterSheetComponent, selector: "app-list-filter-sheet", inputs: ["open", "title", "definition", "initialValues"], outputs: ["closed", "reset", "applied"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: FilteredListPageComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-filtered-list-page', standalone: false, template: "<app-filtered-infinite-list\n  [chips]=\"controller.chips\"\n  [activeChipId]=\"controller.activeChip\"\n  [items]=\"controller.listItems\"\n  [loading]=\"controller.listLoading\"\n  [loadingMore]=\"controller.listLoadingMore\"\n  [hasMore]=\"controller.listHasMore\"\n  [showToolbar]=\"showToolbar\"\n  [searchText]=\"controller.listSearchText\"\n  [searchPlaceholder]=\"searchPlaceholder\"\n  [filterCount]=\"controller.activeFilterCount\"\n  [appliedFilters]=\"controller.appliedFilters\"\n  [selectable]=\"selectable\"\n  [selectedIds]=\"controller.selectedIds\"\n  [emptyMessage]=\"emptyMessage\"\n  [rowTemplateRef]=\"rowTemplate\"\n  [rowTrailingTemplateRef]=\"rowTrailing\"\n  (chipSelect)=\"controller.onChipSelect($event)\"\n  (searchChange)=\"controller.onSearchChange($event)\"\n  (filterOpen)=\"controller.onFilterOpen()\"\n  (pillRemove)=\"controller.onPillRemove($event)\"\n  (loadMore)=\"controller.onLoadMore()\"\n  (selectedIdsChange)=\"controller.onSelectionChange($event)\"\n  (rowClick)=\"rowClick.emit($event)\"\n  (rowLinkClick)=\"rowLinkClick.emit($event)\">\n  <div bulkActions>\n    <ng-content select=\"[bulkActions]\"></ng-content>\n  </div>\n</app-filtered-infinite-list>\n\n<app-list-filter-sheet\n  [open]=\"controller.filterSheetOpen\"\n  [title]=\"filterSheetTitle\"\n  [definition]=\"controller.filterFormDefinition!\"\n  [initialValues]=\"controller.filterFormInitialValues\"\n  (closed)=\"controller.onFilterSheetClose()\"\n  (applied)=\"controller.onFilterSheetApply($event)\"\n  (reset)=\"controller.onFilterSheetReset()\">\n</app-list-filter-sheet>\n\n<ng-content select=\"[listOverlays]\"></ng-content>\n", styles: [":host{display:block}\n"] }]
        }], propDecorators: { controller: [{
                type: Input,
                args: [{ required: true }]
            }], searchPlaceholder: [{
                type: Input
            }], emptyMessage: [{
                type: Input
            }], showToolbar: [{
                type: Input
            }], selectable: [{
                type: Input
            }], filterSheetTitle: [{
                type: Input
            }], rowTemplate: [{
                type: ContentChild,
                args: ['rowTemplate', { read: TemplateRef }]
            }], rowTrailing: [{
                type: ContentChild,
                args: ['rowTrailing', { read: TemplateRef }]
            }], rowClick: [{
                type: Output
            }], rowLinkClick: [{
                type: Output
            }] } });

class MobileFormSheetComponent {
    open = false;
    title = '';
    ariaLabel;
    saving = false;
    saveLabel = 'Save';
    cancelLabel = 'Cancel';
    showSave = true;
    showCancel = true;
    showDefaultFooter = true;
    hint;
    dismissed = new EventEmitter();
    save = new EventEmitter();
    cancel = new EventEmitter();
    ngOnChanges(changes) {
        if ('open' in changes) {
            setMobileSheetOpen(changes['open'].currentValue === true);
        }
    }
    ngOnDestroy() {
        if (this.open) {
            setMobileSheetOpen(false);
        }
    }
    onBackdropClick() {
        this.dismissed.emit();
    }
    onCloseClick() {
        this.dismissed.emit();
    }
    onCancelClick() {
        this.cancel.emit();
        this.dismissed.emit();
    }
    onSaveClick() {
        this.save.emit();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: MobileFormSheetComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.21", type: MobileFormSheetComponent, isStandalone: true, selector: "app-mobile-form-sheet", inputs: { open: "open", title: "title", ariaLabel: "ariaLabel", saving: "saving", saveLabel: "saveLabel", cancelLabel: "cancelLabel", showSave: "showSave", showCancel: "showCancel", showDefaultFooter: "showDefaultFooter", hint: "hint" }, outputs: { dismissed: "dismissed", save: "save", cancel: "cancel" }, usesOnChanges: true, ngImport: i0, template: "<ng-container *ngIf=\"open\">\n  <div class=\"mobile-form-sheet__backdrop\" (click)=\"onBackdropClick()\" aria-hidden=\"true\"></div>\n\n  <div\n    class=\"mobile-form-sheet\"\n    role=\"dialog\"\n    [attr.aria-label]=\"ariaLabel ?? title\">\n    <div class=\"mobile-form-sheet__handle\" aria-hidden=\"true\"></div>\n\n    <div class=\"mobile-form-sheet__title-row\">\n      <h2 class=\"mobile-form-sheet__title\">{{ title }}</h2>\n      <button type=\"button\" class=\"mobile-form-sheet__close\" (click)=\"onCloseClick()\" aria-label=\"Close\">\n        <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" aria-hidden=\"true\">\n          <line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"></line>\n          <line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"></line>\n        </svg>\n      </button>\n    </div>\n\n    <p *ngIf=\"hint\" class=\"mobile-form-sheet__hint\">{{ hint }}</p>\n\n    <div class=\"mobile-form-sheet__body\">\n      <ng-content></ng-content>\n    </div>\n\n    <div class=\"mobile-form-sheet__actions app-btn-group\">\n      <ng-content select=\"[sheetFooterActions]\"></ng-content>\n      <ng-container *ngIf=\"showDefaultFooter\">\n        <button\n          *ngIf=\"showCancel\"\n          type=\"button\"\n          class=\"app-btn app-btn--ghost\"\n          (click)=\"onCancelClick()\"\n          [disabled]=\"saving\">\n          {{ cancelLabel }}\n        </button>\n        <button\n          *ngIf=\"showSave\"\n          type=\"button\"\n          class=\"app-btn app-btn--primary\"\n          (click)=\"onSaveClick()\"\n          [disabled]=\"saving\">\n          {{ saving ? 'Saving\u2026' : saveLabel }}\n        </button>\n      </ng-container>\n    </div>\n  </div>\n</ng-container>\n", styles: [".mobile-form-sheet__backdrop{position:fixed;inset:0;background:#0f172a59;z-index:250;animation:mobile-form-sheet-fade-in .2s ease}.mobile-form-sheet{position:fixed;left:0;right:0;bottom:0;z-index:251;background:#fff;border-radius:20px 20px 0 0;box-shadow:0 -8px 32px #0f172a1f;padding:10px 16px calc(16px + env(safe-area-inset-bottom,0));animation:mobile-form-sheet-slide-up .24s cubic-bezier(.22,1,.36,1);max-height:min(92vh,680px);display:flex;flex-direction:column}.mobile-form-sheet__handle{width:36px;height:4px;border-radius:999px;background:#cbd5e1;margin:0 auto 12px;flex-shrink:0}.mobile-form-sheet__title-row{display:flex;align-items:center;justify-content:center;position:relative;margin-bottom:1rem;padding:0 36px;flex-shrink:0}.mobile-form-sheet__title{margin:0;font-size:.85rem;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--secondary-800);text-align:center}.mobile-form-sheet__back,.mobile-form-sheet__close{position:absolute;top:50%;transform:translateY(-50%);width:32px;height:32px;display:flex;align-items:center;justify-content:center;border:none;border-radius:999px;background:#f1f5f9;color:var(--secondary-600);cursor:pointer;padding:0}.mobile-form-sheet__back svg,.mobile-form-sheet__close svg{width:16px;height:16px}.mobile-form-sheet__back:active,.mobile-form-sheet__close:active{background:#e2e8f0}.mobile-form-sheet__back{left:0}.mobile-form-sheet__close{right:0}.mobile-form-sheet__body{flex:1;overflow-y:auto;scrollbar-width:none;-ms-overflow-style:none;padding-bottom:8px}.mobile-form-sheet__body::-webkit-scrollbar{display:none}.mobile-form-sheet__form{display:block}.mobile-form-sheet__actions{padding-top:12px;border-top:1px solid rgba(148,163,184,.2);flex-shrink:0}@keyframes mobile-form-sheet-fade-in{0%{opacity:0}to{opacity:1}}@keyframes mobile-form-sheet-slide-up{0%{transform:translateY(100%)}to{transform:translateY(0)}}@media(min-width:768px){.mobile-form-sheet{inset:50% auto auto 50%;transform:translate(-50%,-50%);width:min(720px,100vw - 48px);max-height:min(85vh,720px);border-radius:20px;padding:16px 24px 20px;animation:mobile-form-sheet-dialog-in .24s cubic-bezier(.22,1,.36,1)}.mobile-form-sheet__handle{display:none}}@keyframes mobile-form-sheet-dialog-in{0%{opacity:0;transform:translate(-50%,calc(-50% + 16px))}to{opacity:1;transform:translate(-50%,-50%)}}.mobile-form-sheet__hint{margin:0 0 12px;font-size:.72rem;line-height:1.4;color:var(--secondary-500);text-align:center}.mobile-form-sheet__body{flex:1;overflow-y:auto;min-height:0}.mobile-form-sheet__actions{flex-shrink:0;padding-top:.5rem}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: MobileFormSheetComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-mobile-form-sheet', standalone: true, imports: [CommonModule], template: "<ng-container *ngIf=\"open\">\n  <div class=\"mobile-form-sheet__backdrop\" (click)=\"onBackdropClick()\" aria-hidden=\"true\"></div>\n\n  <div\n    class=\"mobile-form-sheet\"\n    role=\"dialog\"\n    [attr.aria-label]=\"ariaLabel ?? title\">\n    <div class=\"mobile-form-sheet__handle\" aria-hidden=\"true\"></div>\n\n    <div class=\"mobile-form-sheet__title-row\">\n      <h2 class=\"mobile-form-sheet__title\">{{ title }}</h2>\n      <button type=\"button\" class=\"mobile-form-sheet__close\" (click)=\"onCloseClick()\" aria-label=\"Close\">\n        <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" aria-hidden=\"true\">\n          <line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"></line>\n          <line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"></line>\n        </svg>\n      </button>\n    </div>\n\n    <p *ngIf=\"hint\" class=\"mobile-form-sheet__hint\">{{ hint }}</p>\n\n    <div class=\"mobile-form-sheet__body\">\n      <ng-content></ng-content>\n    </div>\n\n    <div class=\"mobile-form-sheet__actions app-btn-group\">\n      <ng-content select=\"[sheetFooterActions]\"></ng-content>\n      <ng-container *ngIf=\"showDefaultFooter\">\n        <button\n          *ngIf=\"showCancel\"\n          type=\"button\"\n          class=\"app-btn app-btn--ghost\"\n          (click)=\"onCancelClick()\"\n          [disabled]=\"saving\">\n          {{ cancelLabel }}\n        </button>\n        <button\n          *ngIf=\"showSave\"\n          type=\"button\"\n          class=\"app-btn app-btn--primary\"\n          (click)=\"onSaveClick()\"\n          [disabled]=\"saving\">\n          {{ saving ? 'Saving\u2026' : saveLabel }}\n        </button>\n      </ng-container>\n    </div>\n  </div>\n</ng-container>\n", styles: [".mobile-form-sheet__backdrop{position:fixed;inset:0;background:#0f172a59;z-index:250;animation:mobile-form-sheet-fade-in .2s ease}.mobile-form-sheet{position:fixed;left:0;right:0;bottom:0;z-index:251;background:#fff;border-radius:20px 20px 0 0;box-shadow:0 -8px 32px #0f172a1f;padding:10px 16px calc(16px + env(safe-area-inset-bottom,0));animation:mobile-form-sheet-slide-up .24s cubic-bezier(.22,1,.36,1);max-height:min(92vh,680px);display:flex;flex-direction:column}.mobile-form-sheet__handle{width:36px;height:4px;border-radius:999px;background:#cbd5e1;margin:0 auto 12px;flex-shrink:0}.mobile-form-sheet__title-row{display:flex;align-items:center;justify-content:center;position:relative;margin-bottom:1rem;padding:0 36px;flex-shrink:0}.mobile-form-sheet__title{margin:0;font-size:.85rem;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--secondary-800);text-align:center}.mobile-form-sheet__back,.mobile-form-sheet__close{position:absolute;top:50%;transform:translateY(-50%);width:32px;height:32px;display:flex;align-items:center;justify-content:center;border:none;border-radius:999px;background:#f1f5f9;color:var(--secondary-600);cursor:pointer;padding:0}.mobile-form-sheet__back svg,.mobile-form-sheet__close svg{width:16px;height:16px}.mobile-form-sheet__back:active,.mobile-form-sheet__close:active{background:#e2e8f0}.mobile-form-sheet__back{left:0}.mobile-form-sheet__close{right:0}.mobile-form-sheet__body{flex:1;overflow-y:auto;scrollbar-width:none;-ms-overflow-style:none;padding-bottom:8px}.mobile-form-sheet__body::-webkit-scrollbar{display:none}.mobile-form-sheet__form{display:block}.mobile-form-sheet__actions{padding-top:12px;border-top:1px solid rgba(148,163,184,.2);flex-shrink:0}@keyframes mobile-form-sheet-fade-in{0%{opacity:0}to{opacity:1}}@keyframes mobile-form-sheet-slide-up{0%{transform:translateY(100%)}to{transform:translateY(0)}}@media(min-width:768px){.mobile-form-sheet{inset:50% auto auto 50%;transform:translate(-50%,-50%);width:min(720px,100vw - 48px);max-height:min(85vh,720px);border-radius:20px;padding:16px 24px 20px;animation:mobile-form-sheet-dialog-in .24s cubic-bezier(.22,1,.36,1)}.mobile-form-sheet__handle{display:none}}@keyframes mobile-form-sheet-dialog-in{0%{opacity:0;transform:translate(-50%,calc(-50% + 16px))}to{opacity:1;transform:translate(-50%,-50%)}}.mobile-form-sheet__hint{margin:0 0 12px;font-size:.72rem;line-height:1.4;color:var(--secondary-500);text-align:center}.mobile-form-sheet__body{flex:1;overflow-y:auto;min-height:0}.mobile-form-sheet__actions{flex-shrink:0;padding-top:.5rem}\n"] }]
        }], propDecorators: { open: [{
                type: Input
            }], title: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], saving: [{
                type: Input
            }], saveLabel: [{
                type: Input
            }], cancelLabel: [{
                type: Input
            }], showSave: [{
                type: Input
            }], showCancel: [{
                type: Input
            }], showDefaultFooter: [{
                type: Input
            }], hint: [{
                type: Input
            }], dismissed: [{
                type: Output
            }], save: [{
                type: Output
            }], cancel: [{
                type: Output
            }] } });

class ListCreateSheetComponent {
    open = false;
    title = 'Create';
    hint;
    definition;
    initialValues = {};
    engineOptions;
    idPrefix = 'list-create';
    saveLabel = 'Create';
    saving = false;
    dismissed = new EventEmitter();
    saved = new EventEmitter();
    /** Live field edits — action forms use these to refresh definition/values. */
    valuesChange = new EventEmitter();
    createForm;
    formKey = 0;
    ngOnChanges(changes) {
        if ('open' in changes && changes['open'].currentValue === true) {
            this.formKey += 1;
        }
        if ('initialValues' in changes && changes['open']?.currentValue !== true) {
            this.formKey += 1;
        }
    }
    onDismissed() {
        this.dismissed.emit();
    }
    onSaveClick() {
        if (!this.createForm?.validateForm()) {
            return;
        }
        this.saved.emit(this.createForm.getValues());
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: ListCreateSheetComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.21", type: ListCreateSheetComponent, isStandalone: true, selector: "app-list-create-sheet", inputs: { open: "open", title: "title", hint: "hint", definition: "definition", initialValues: "initialValues", engineOptions: "engineOptions", idPrefix: "idPrefix", saveLabel: "saveLabel", saving: "saving" }, outputs: { dismissed: "dismissed", saved: "saved", valuesChange: "valuesChange" }, viewQueries: [{ propertyName: "createForm", first: true, predicate: ["createForm"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<app-mobile-form-sheet\n  [open]=\"open\"\n  [title]=\"title\"\n  [hint]=\"hint\"\n  [saving]=\"saving\"\n  [saveLabel]=\"saveLabel\"\n  (dismissed)=\"onDismissed()\"\n  (save)=\"onSaveClick()\">\n  <ng-content select=\"[listCreatePrefix]\"></ng-content>\n  <cf-form\n    *ngIf=\"definition && formKey\"\n    #createForm\n    [definition]=\"definition\"\n    [initialValues]=\"initialValues\"\n    [engineOptions]=\"engineOptions\"\n    [hideHeading]=\"true\"\n    [showSubmit]=\"false\"\n    [idPrefix]=\"idPrefix\"\n    (valuesChange)=\"valuesChange.emit($event)\">\n  </cf-form>\n  <ng-content></ng-content>\n</app-mobile-form-sheet>\n", styles: [":host{display:contents}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: MobileFormSheetComponent, selector: "app-mobile-form-sheet", inputs: ["open", "title", "ariaLabel", "saving", "saveLabel", "cancelLabel", "showSave", "showCancel", "showDefaultFooter", "hint"], outputs: ["dismissed", "save", "cancel"] }, { kind: "component", type: CfFormComponent, selector: "cf-form", inputs: ["definition", "initialValues", "engineOptions", "idPrefix", "hideHeading", "submitLabel", "showSubmit"], outputs: ["submitted", "valuesChange"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: ListCreateSheetComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-list-create-sheet', standalone: true, imports: [CommonModule, MobileFormSheetComponent, CfFormComponent], template: "<app-mobile-form-sheet\n  [open]=\"open\"\n  [title]=\"title\"\n  [hint]=\"hint\"\n  [saving]=\"saving\"\n  [saveLabel]=\"saveLabel\"\n  (dismissed)=\"onDismissed()\"\n  (save)=\"onSaveClick()\">\n  <ng-content select=\"[listCreatePrefix]\"></ng-content>\n  <cf-form\n    *ngIf=\"definition && formKey\"\n    #createForm\n    [definition]=\"definition\"\n    [initialValues]=\"initialValues\"\n    [engineOptions]=\"engineOptions\"\n    [hideHeading]=\"true\"\n    [showSubmit]=\"false\"\n    [idPrefix]=\"idPrefix\"\n    (valuesChange)=\"valuesChange.emit($event)\">\n  </cf-form>\n  <ng-content></ng-content>\n</app-mobile-form-sheet>\n", styles: [":host{display:contents}\n"] }]
        }], propDecorators: { open: [{
                type: Input
            }], title: [{
                type: Input
            }], hint: [{
                type: Input
            }], definition: [{
                type: Input
            }], initialValues: [{
                type: Input
            }], engineOptions: [{
                type: Input
            }], idPrefix: [{
                type: Input
            }], saveLabel: [{
                type: Input
            }], saving: [{
                type: Input
            }], dismissed: [{
                type: Output
            }], saved: [{
                type: Output
            }], valuesChange: [{
                type: Output
            }], createForm: [{
                type: ViewChild,
                args: ['createForm']
            }] } });

/**
 * Renders the component registered for a `rendererKey` inside a stepper custom step.
 *
 * The rendered component follows {@link ListFormCustomStepComponent}: `data` in,
 * `dataChange` out, optional `validate()` used as the step validator.
 */
class ListFormCustomStepHostComponent {
    renderers;
    rendererKey;
    data;
    dataChange = new EventEmitter();
    /** Emitted once the renderer exists so the flow host can register its validator. */
    ready = new EventEmitter();
    closed = new EventEmitter();
    container;
    componentRef;
    outputSubscription;
    viewReady = false;
    lastEmitted;
    hasEmitted = false;
    constructor(renderers) {
        this.renderers = renderers;
    }
    ngAfterViewInit() {
        this.viewReady = true;
        this.render();
    }
    ngOnChanges(changes) {
        if (!this.viewReady) {
            return;
        }
        if ('rendererKey' in changes) {
            this.render();
            return;
        }
        this.applyData();
    }
    ngOnDestroy() {
        this.outputSubscription?.unsubscribe();
        this.componentRef?.destroy();
        this.closed.emit(this);
    }
    /** False only when the renderer exists and reports invalid data. */
    validate() {
        const instance = this.componentRef?.instance;
        if (!instance || typeof instance.validate !== 'function') {
            return true;
        }
        return instance.validate() !== false;
    }
    render() {
        this.outputSubscription?.unsubscribe();
        this.outputSubscription = undefined;
        this.componentRef?.destroy();
        this.componentRef = undefined;
        this.container.clear();
        this.lastEmitted = undefined;
        this.hasEmitted = false;
        const component = this.resolveComponent();
        if (!component) {
            return;
        }
        this.componentRef = this.container.createComponent(component);
        this.applyData();
        const output = this.componentRef.instance.dataChange;
        if (output && typeof output.subscribe === 'function') {
            this.outputSubscription = output.subscribe(value => {
                this.lastEmitted = value;
                this.hasEmitted = true;
                this.dataChange.emit(value);
            });
        }
        this.ready.emit(this);
    }
    resolveComponent() {
        return this.renderers?.find(entry => entry.rendererKey === this.rendererKey)?.component;
    }
    applyData() {
        const ref = this.componentRef;
        if (!ref) {
            return;
        }
        // The flow stores what the renderer emits and hands it straight back. Pushing
        // that echo into `data` mid-edit makes renderers rebuild their rows and the
        // focused control is destroyed, so the value the renderer already owns is skipped.
        if (this.hasEmitted && Object.is(this.data, this.lastEmitted)) {
            return;
        }
        try {
            ref.setInput('data', this.data);
        }
        catch {
            // Renderer exposes no `data` input — keep the step usable and let it read
            // whatever it needs from its own providers.
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: ListFormCustomStepHostComponent, deps: [{ token: LIST_FORM_CUSTOM_STEP_RENDERERS, optional: true }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.21", type: ListFormCustomStepHostComponent, isStandalone: true, selector: "uld-list-form-custom-step-host", inputs: { rendererKey: "rendererKey", data: "data" }, outputs: { dataChange: "dataChange", ready: "ready", closed: "closed" }, viewQueries: [{ propertyName: "container", first: true, predicate: ["host"], descendants: true, read: ViewContainerRef, static: true }], usesOnChanges: true, ngImport: i0, template: '<ng-container #host></ng-container>', isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: ListFormCustomStepHostComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'uld-list-form-custom-step-host',
                    standalone: true,
                    template: '<ng-container #host></ng-container>',
                }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [LIST_FORM_CUSTOM_STEP_RENDERERS]
                }] }], propDecorators: { rendererKey: [{
                type: Input,
                args: [{ required: true }]
            }], data: [{
                type: Input
            }], dataChange: [{
                type: Output
            }], ready: [{
                type: Output
            }], closed: [{
                type: Output
            }], container: [{
                type: ViewChild,
                args: ['host', { read: ViewContainerRef, static: true }]
            }] } });

/**
 * Shared stepper sheet host for create and config-driven action/edit form flows.
 * Custom steps are rendered by {@link ListFormCustomStepHostComponent} from the
 * `rendererKey` registry.
 */
class ListCreateStepperSheetComponent {
    open = false;
    title = 'Create';
    hint;
    steps;
    buildStepDefinition;
    resolveSteps;
    validateStep;
    /** Awaited before a step is entered so its form can be loaded on demand. */
    prepareStep;
    initialValues = {};
    engineOptions;
    idPrefix = 'list-create-stepper';
    completeLabel = 'Create';
    backLabel = 'Back';
    nextLabel = 'Next';
    cancelLabel = 'Cancel';
    submittingLabel = 'Saving…';
    preparingLabel = 'Loading…';
    allowCancel = true;
    saving = false;
    /** Step id → renderer declaration for steps with `kind: 'custom'`. */
    customSteps;
    /** Step id → current data handed to the matching custom step renderer. */
    customStepData;
    dismissed = new EventEmitter();
    completed = new EventEmitter();
    stepChange = new EventEmitter();
    validationError = new EventEmitter();
    customStepDataChange = new EventEmitter();
    stepper;
    stepperKey = 0;
    /** Snapshot at open so parent getter churn cannot reset the stepper mid-flow. */
    capturedInitialValues = {};
    /** Live stepper position from `stepStateChange` (source of truth for the pinned footer). */
    stepState;
    activeCustomStepHost;
    customStepEntriesCache = [];
    customStepEntriesRef;
    ngOnChanges(changes) {
        if ('open' in changes && changes['open'].currentValue === true) {
            this.capturedInitialValues = { ...(this.initialValues ?? {}) };
            this.stepState = undefined;
            this.stepperKey += 1;
            return;
        }
        if ('initialValues' in changes && this.open) {
            // Ignore live parent re-emissions while open; values were captured on open.
            return;
        }
        if ('initialValues' in changes && !this.open) {
            this.capturedInitialValues = { ...(this.initialValues ?? {}) };
        }
    }
    registerCustomStepValidator(validator) {
        this.stepper?.registerCustomStepValidator(validator);
    }
    /** Stable array so the step template `*ngFor` does not re-create views each cycle. */
    get customStepEntries() {
        const steps = this.customSteps;
        if (!steps) {
            this.customStepEntriesRef = undefined;
            this.customStepEntriesCache = [];
            return this.customStepEntriesCache;
        }
        if (this.customStepEntriesRef !== steps) {
            this.customStepEntriesRef = steps;
            this.customStepEntriesCache = Object.entries(steps).map(([stepId, def]) => ({
                stepId,
                rendererKey: def.rendererKey,
            }));
        }
        return this.customStepEntriesCache;
    }
    trackCustomStep(_index, entry) {
        return entry.stepId;
    }
    customStepDataFor(stepId) {
        return this.customStepData ? this.customStepData[stepId] : undefined;
    }
    onCustomStepData(stepId, data) {
        this.customStepDataChange.emit({ stepId, data });
    }
    onCustomStepHostReady(host) {
        this.activeCustomStepHost = host;
        this.registerCustomStepValidator(() => host.validate());
    }
    onCustomStepHostClosed(host) {
        if (this.activeCustomStepHost === host) {
            this.activeCustomStepHost = undefined;
        }
    }
    onStepChange(event) {
        // The stepper clears the validator on every step change; re-attach the active
        // custom host (hosts created later re-register themselves via `ready`).
        const host = this.activeCustomStepHost;
        if (host) {
            this.registerCustomStepValidator(() => host.validate());
        }
        this.stepChange.emit(event);
    }
    onStepState(state) {
        this.stepState = state;
    }
    get isFirstStep() {
        return this.stepState?.isFirstStep ?? true;
    }
    get isLastStep() {
        return this.stepState?.isLastStep ?? false;
    }
    get preparing() {
        return this.stepState?.preparing ?? false;
    }
    get nextLabelText() {
        if (this.saving)
            return this.submittingLabel;
        if (this.preparing)
            return this.preparingLabel;
        return this.isLastStep ? this.completeLabel : this.nextLabel;
    }
    onBack() {
        this.stepper?.onBackOrCancel();
    }
    onNext() {
        this.stepper?.onNext();
    }
    onDismissed() {
        this.dismissed.emit();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: ListCreateStepperSheetComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.21", type: ListCreateStepperSheetComponent, isStandalone: true, selector: "app-list-create-stepper-sheet", inputs: { open: "open", title: "title", hint: "hint", steps: "steps", buildStepDefinition: "buildStepDefinition", resolveSteps: "resolveSteps", validateStep: "validateStep", prepareStep: "prepareStep", initialValues: "initialValues", engineOptions: "engineOptions", idPrefix: "idPrefix", completeLabel: "completeLabel", backLabel: "backLabel", nextLabel: "nextLabel", cancelLabel: "cancelLabel", submittingLabel: "submittingLabel", preparingLabel: "preparingLabel", allowCancel: "allowCancel", saving: "saving", customSteps: "customSteps", customStepData: "customStepData" }, outputs: { dismissed: "dismissed", completed: "completed", stepChange: "stepChange", validationError: "validationError", customStepDataChange: "customStepDataChange" }, viewQueries: [{ propertyName: "stepper", first: true, predicate: CfFormStepperComponent, descendants: true }], usesOnChanges: true, ngImport: i0, template: "<app-mobile-form-sheet\n  [open]=\"open\"\n  [title]=\"title\"\n  [hint]=\"hint\"\n  [showDefaultFooter]=\"false\"\n  (dismissed)=\"onDismissed()\">\n  <!--\n    Footer buttons project into the sheet's fixed action bar. Declared after the\n    stepper so stepStateChange from the child's reset/valuesChange is applied\n    before these bindings are evaluated in the same CD pass.\n  -->\n  <cf-form-stepper\n    *ngIf=\"open && stepperKey\"\n    [steps]=\"steps\"\n    [buildStepDefinition]=\"buildStepDefinition\"\n    [resolveSteps]=\"resolveSteps\"\n    [validateStep]=\"validateStep\"\n    [prepareStep]=\"prepareStep\"\n    [initialValues]=\"capturedInitialValues\"\n    [engineOptions]=\"engineOptions\"\n    [submitting]=\"saving\"\n    [completeLabel]=\"completeLabel\"\n    [idPrefix]=\"idPrefix\"\n    [showInlineActions]=\"false\"\n    (validationError)=\"validationError.emit($event)\"\n    (stepChange)=\"onStepChange($event)\"\n    (stepStateChange)=\"onStepState($event)\"\n    (completed)=\"completed.emit($event)\"\n    (cancelled)=\"onDismissed()\">\n    <ng-container *ngFor=\"let entry of customStepEntries; trackBy: trackCustomStep\">\n      <ng-template [cfFormStepperStep]=\"entry.stepId\">\n        <uld-list-form-custom-step-host\n          [rendererKey]=\"entry.rendererKey\"\n          [data]=\"customStepDataFor(entry.stepId)\"\n          (dataChange)=\"onCustomStepData(entry.stepId, $event)\"\n          (ready)=\"onCustomStepHostReady($event)\"\n          (closed)=\"onCustomStepHostClosed($event)\">\n        </uld-list-form-custom-step-host>\n      </ng-template>\n    </ng-container>\n    <ng-content></ng-content>\n  </cf-form-stepper>\n\n  <button\n    sheetFooterActions\n    *ngIf=\"open && stepperKey && (!isFirstStep || allowCancel)\"\n    type=\"button\"\n    class=\"app-btn app-btn--ghost\"\n    [disabled]=\"saving || preparing\"\n    (click)=\"onBack()\">\n    {{ isFirstStep ? cancelLabel : backLabel }}\n  </button>\n  <button\n    sheetFooterActions\n    *ngIf=\"open && stepperKey\"\n    type=\"button\"\n    class=\"app-btn app-btn--primary\"\n    [disabled]=\"saving || preparing\"\n    (click)=\"onNext()\">\n    {{ nextLabelText }}\n  </button>\n</app-mobile-form-sheet>\n", styles: [""], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: MobileFormSheetComponent, selector: "app-mobile-form-sheet", inputs: ["open", "title", "ariaLabel", "saving", "saveLabel", "cancelLabel", "showSave", "showCancel", "showDefaultFooter", "hint"], outputs: ["dismissed", "save", "cancel"] }, { kind: "component", type: CfFormStepperComponent, selector: "cf-form-stepper", inputs: ["steps", "buildStepDefinition", "resolveSteps", "initialValues", "engineOptions", "validateStep", "prepareStep", "idPrefix", "allowCancel", "submitting", "backLabel", "nextLabel", "cancelLabel", "completeLabel", "submittingLabel", "preparingLabel", "validationErrorTitle", "validationErrorMessage", "prepareStepErrorMessage", "showInlineActions"], outputs: ["completed", "cancelled", "stepChange", "stepStateChange", "validationError"] }, { kind: "directive", type: CfFormStepperStepDirective, selector: "ng-template[cfFormStepperStep]", inputs: ["cfFormStepperStep"] }, { kind: "component", type: ListFormCustomStepHostComponent, selector: "uld-list-form-custom-step-host", inputs: ["rendererKey", "data"], outputs: ["dataChange", "ready", "closed"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: ListCreateStepperSheetComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-list-create-stepper-sheet', standalone: true, imports: [
                        CommonModule,
                        MobileFormSheetComponent,
                        CfFormStepperComponent,
                        CfFormStepperStepDirective,
                        ListFormCustomStepHostComponent,
                    ], template: "<app-mobile-form-sheet\n  [open]=\"open\"\n  [title]=\"title\"\n  [hint]=\"hint\"\n  [showDefaultFooter]=\"false\"\n  (dismissed)=\"onDismissed()\">\n  <!--\n    Footer buttons project into the sheet's fixed action bar. Declared after the\n    stepper so stepStateChange from the child's reset/valuesChange is applied\n    before these bindings are evaluated in the same CD pass.\n  -->\n  <cf-form-stepper\n    *ngIf=\"open && stepperKey\"\n    [steps]=\"steps\"\n    [buildStepDefinition]=\"buildStepDefinition\"\n    [resolveSteps]=\"resolveSteps\"\n    [validateStep]=\"validateStep\"\n    [prepareStep]=\"prepareStep\"\n    [initialValues]=\"capturedInitialValues\"\n    [engineOptions]=\"engineOptions\"\n    [submitting]=\"saving\"\n    [completeLabel]=\"completeLabel\"\n    [idPrefix]=\"idPrefix\"\n    [showInlineActions]=\"false\"\n    (validationError)=\"validationError.emit($event)\"\n    (stepChange)=\"onStepChange($event)\"\n    (stepStateChange)=\"onStepState($event)\"\n    (completed)=\"completed.emit($event)\"\n    (cancelled)=\"onDismissed()\">\n    <ng-container *ngFor=\"let entry of customStepEntries; trackBy: trackCustomStep\">\n      <ng-template [cfFormStepperStep]=\"entry.stepId\">\n        <uld-list-form-custom-step-host\n          [rendererKey]=\"entry.rendererKey\"\n          [data]=\"customStepDataFor(entry.stepId)\"\n          (dataChange)=\"onCustomStepData(entry.stepId, $event)\"\n          (ready)=\"onCustomStepHostReady($event)\"\n          (closed)=\"onCustomStepHostClosed($event)\">\n        </uld-list-form-custom-step-host>\n      </ng-template>\n    </ng-container>\n    <ng-content></ng-content>\n  </cf-form-stepper>\n\n  <button\n    sheetFooterActions\n    *ngIf=\"open && stepperKey && (!isFirstStep || allowCancel)\"\n    type=\"button\"\n    class=\"app-btn app-btn--ghost\"\n    [disabled]=\"saving || preparing\"\n    (click)=\"onBack()\">\n    {{ isFirstStep ? cancelLabel : backLabel }}\n  </button>\n  <button\n    sheetFooterActions\n    *ngIf=\"open && stepperKey\"\n    type=\"button\"\n    class=\"app-btn app-btn--primary\"\n    [disabled]=\"saving || preparing\"\n    (click)=\"onNext()\">\n    {{ nextLabelText }}\n  </button>\n</app-mobile-form-sheet>\n" }]
        }], propDecorators: { open: [{
                type: Input
            }], title: [{
                type: Input
            }], hint: [{
                type: Input
            }], steps: [{
                type: Input,
                args: [{ required: true }]
            }], buildStepDefinition: [{
                type: Input,
                args: [{ required: true }]
            }], resolveSteps: [{
                type: Input
            }], validateStep: [{
                type: Input
            }], prepareStep: [{
                type: Input
            }], initialValues: [{
                type: Input
            }], engineOptions: [{
                type: Input
            }], idPrefix: [{
                type: Input
            }], completeLabel: [{
                type: Input
            }], backLabel: [{
                type: Input
            }], nextLabel: [{
                type: Input
            }], cancelLabel: [{
                type: Input
            }], submittingLabel: [{
                type: Input
            }], preparingLabel: [{
                type: Input
            }], allowCancel: [{
                type: Input
            }], saving: [{
                type: Input
            }], customSteps: [{
                type: Input
            }], customStepData: [{
                type: Input
            }], dismissed: [{
                type: Output
            }], completed: [{
                type: Output
            }], stepChange: [{
                type: Output
            }], validationError: [{
                type: Output
            }], customStepDataChange: [{
                type: Output
            }], stepper: [{
                type: ViewChild,
                args: [CfFormStepperComponent]
            }] } });

const DECLARATIONS = [
    ChipFilterBarComponent,
    ListRowCardComponent,
    InfiniteListRowComponent,
    FilteredInfiniteListComponent,
    ListFilterToolbarComponent,
    AppliedFilterPillsComponent,
    ListFilterSheetComponent,
    ListDetailSectionsComponent,
    ListDetailSheetComponent,
    FilteredListPageComponent,
    InfiniteScrollSentinelDirective,
    DynamicFileUploadComponent,
];
class UniversalListDashboardModule {
    static forRoot(config) {
        return {
            ngModule: UniversalListDashboardModule,
            providers: [
                { provide: ULD_ROOT_CONFIG, useValue: config },
                { provide: ULD_DOCUMENT_LIST, useValue: config.documentListComponent },
                { provide: ULD_FILE_UPLOAD, useValue: config.fileUploadComponent },
            ],
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: UniversalListDashboardModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "21.2.21", ngImport: i0, type: UniversalListDashboardModule, declarations: [ChipFilterBarComponent,
            ListRowCardComponent,
            InfiniteListRowComponent,
            FilteredInfiniteListComponent,
            ListFilterToolbarComponent,
            AppliedFilterPillsComponent,
            ListFilterSheetComponent,
            ListDetailSectionsComponent,
            ListDetailSheetComponent,
            FilteredListPageComponent,
            InfiniteScrollSentinelDirective,
            DynamicFileUploadComponent], imports: [CommonModule,
            NgComponentOutlet,
            MatCheckboxModule,
            CfFormComponent,
            MobileFormSheetComponent,
            ListCreateSheetComponent,
            ListCreateStepperSheetComponent,
            ListFormCustomStepHostComponent], exports: [ChipFilterBarComponent,
            ListRowCardComponent,
            InfiniteListRowComponent,
            FilteredInfiniteListComponent,
            ListFilterToolbarComponent,
            AppliedFilterPillsComponent,
            ListFilterSheetComponent,
            ListDetailSectionsComponent,
            ListDetailSheetComponent,
            FilteredListPageComponent,
            InfiniteScrollSentinelDirective,
            DynamicFileUploadComponent, MobileFormSheetComponent,
            ListCreateSheetComponent,
            ListCreateStepperSheetComponent,
            ListFormCustomStepHostComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: UniversalListDashboardModule, imports: [CommonModule,
            MatCheckboxModule,
            CfFormComponent,
            MobileFormSheetComponent,
            ListCreateSheetComponent,
            ListCreateStepperSheetComponent] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: UniversalListDashboardModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: DECLARATIONS,
                    imports: [
                        CommonModule,
                        NgComponentOutlet,
                        MatCheckboxModule,
                        CfFormComponent,
                        MobileFormSheetComponent,
                        ListCreateSheetComponent,
                        ListCreateStepperSheetComponent,
                        ListFormCustomStepHostComponent,
                    ],
                    exports: [
                        ...DECLARATIONS,
                        MobileFormSheetComponent,
                        ListCreateSheetComponent,
                        ListCreateStepperSheetComponent,
                        ListFormCustomStepHostComponent,
                    ],
                }]
        }] });

/**
 * `trackBy` for row editors inside custom stepper steps.
 *
 * Row editors replace edited row objects to keep state immutable, so identity
 * tracking would destroy and rebuild the row being typed into and drop focus.
 * Position is the stable identity for these lists.
 */
function trackByIndex(index) {
    return index;
}

/**
 * Orchestrates chip/filter/search/pagination state for config-driven list pages.
 * Pair with {@link FilteredListPageComponent} and a domain {@link FilteredListPageAdapter}.
 */
class FilteredListPageController {
    chips = [];
    activeChip = '';
    listItems = [];
    listLoading = false;
    listLoadingMore = false;
    listHasMore = false;
    listSearchText = '';
    listCriteria;
    appliedFilters = [];
    activeFilterCount = 0;
    filterSheetOpen = false;
    filterFormDefinition;
    filterFormInitialValues = {};
    selectedIds = [];
    adapter;
    route;
    router;
    listRouteSync;
    refData = {};
    listPageIndex = 0;
    listSub = new Subscription();
    searchDebounce;
    resolveInitialState;
    onBeforeRouteStateApply;
    onAfterListLoaded;
    onFilterOpenHook;
    init(options) {
        this.adapter = options.adapter;
        this.route = options.route;
        this.router = options.router;
        this.listRouteSync = options.listRouteSync;
        this.refData = options.refData ?? {};
        this.resolveInitialState = options.resolveInitialState;
        this.onBeforeRouteStateApply = options.onBeforeRouteStateApply;
        this.onAfterListLoaded = options.onAfterListLoaded;
        this.onFilterOpenHook = options.onFilterOpen;
        this.chips = this.adapter.buildChips();
        const routeState = this.listRouteSync.readFromParams(this.route.snapshot.queryParamMap);
        const initial = this.resolveInitialState
            ? this.resolveInitialState(routeState)
            : this.defaultInitialState(routeState);
        this.activeChip = initial.chip;
        this.listCriteria = initial.criteria;
        this.adapter.setRefData?.(this.refData);
        this.syncFilterFormState();
        this.syncAppliedFilters();
        this.subscribeToListRouteChanges();
        this.loadListPage(0, false);
    }
    destroy() {
        this.listSub.unsubscribe();
        if (this.searchDebounce) {
            clearTimeout(this.searchDebounce);
        }
    }
    setRefData(refData) {
        if (!this.adapter) {
            return;
        }
        this.refData = refData;
        this.adapter.setRefData?.(refData);
        this.syncFilterFormState();
        this.syncAppliedFilters();
    }
    onChipSelect(chipId) {
        if (!this.adapter.isValidChip(chipId)) {
            return;
        }
        let criteria = this.adapter.cloneCriteria(this.adapter.getDefaultCriteriaForChip(chipId));
        const adjusted = this.adapter.onChipSelect?.(chipId, criteria);
        if (adjusted) {
            criteria = adjusted;
        }
        this.listRouteSync.navigate(chipId, criteria);
    }
    onSearchChange(value) {
        this.listSearchText = value;
        if (this.searchDebounce) {
            clearTimeout(this.searchDebounce);
        }
        const delay = this.adapter.searchDebounceMs ?? 300;
        this.searchDebounce = setTimeout(() => this.loadListPage(0, false), delay);
    }
    onFilterOpen() {
        const continueOpen = () => {
            this.filterFormInitialValues = this.adapter.criteriaToFilterFormValues(this.activeChip, this.listCriteria);
            this.syncFilterFormState();
            this.filterSheetOpen = true;
        };
        if (this.onFilterOpenHook?.(continueOpen) === false) {
            return;
        }
        continueOpen();
    }
    onFilterSheetClose() {
        this.filterSheetOpen = false;
    }
    onFilterSheetApply(values) {
        this.clearSelection();
        this.listCriteria = this.adapter.cloneCriteria(this.adapter.filterFormValuesToCriteria(this.activeChip, values, this.listCriteria));
        this.filterSheetOpen = false;
        this.syncFilterFormState();
        this.syncAppliedFilters();
        this.syncListRoute();
        this.loadListPage(0, false);
    }
    onFilterSheetReset() {
        this.clearSelection();
        this.listCriteria = this.adapter.cloneCriteria(this.adapter.getDefaultCriteriaForChip(this.activeChip));
        this.filterFormInitialValues = this.adapter.criteriaToFilterFormValues(this.activeChip, this.listCriteria);
        this.syncFilterFormState();
        this.syncAppliedFilters();
        this.syncListRoute();
        this.loadListPage(0, false);
    }
    onPillRemove(pillId) {
        this.clearSelection();
        this.listCriteria = this.adapter.cloneCriteria(this.adapter.removeFilterById(this.listCriteria, pillId));
        this.syncFilterFormState();
        this.syncAppliedFilters();
        this.syncListRoute();
        this.loadListPage(0, false);
    }
    onLoadMore() {
        if (this.listLoading || this.listLoadingMore || !this.listHasMore) {
            return;
        }
        this.loadListPage(this.listPageIndex + 1, true);
    }
    onSelectionChange(ids) {
        this.selectedIds = ids;
    }
    clearSelection() {
        this.selectedIds = [];
    }
    updateListItem(updated) {
        this.listItems = this.listItems.map(item => (item.id === updated.id ? updated : item));
    }
    prependListItem(item) {
        this.listItems = [item, ...this.listItems];
    }
    /** Reload the first page from the data source (e.g. after create). */
    reloadList() {
        this.loadListPage(0, false);
    }
    syncListRoute() {
        this.listRouteSync.navigate(this.activeChip, this.listCriteria);
    }
    defaultInitialState(routeState) {
        const chip = this.adapter.isValidChip(routeState.chip)
            ? routeState.chip
            : this.adapter.getDefaultChip();
        let criteria = this.adapter.cloneCriteria(this.adapter.getDefaultCriteriaForChip(chip));
        if (this.adapter.buildCriteriaFromRoute) {
            criteria = this.adapter.buildCriteriaFromRoute(chip, routeState.filters, routeState);
        }
        else {
            criteria = this.listRouteSync.mergeFiltersIntoCriteria(criteria, routeState.filters);
        }
        return { chip, criteria };
    }
    subscribeToListRouteChanges() {
        this.listSub.add(this.route.queryParamMap.subscribe(params => {
            const routeState = this.listRouteSync.readFromParams(params);
            const chip = this.adapter.isValidChip(routeState.chip)
                ? routeState.chip
                : this.adapter.getDefaultChip();
            if (!this.listRouteSync.matchesState(chip, this.activeChip, this.listCriteria, routeState.filters)) {
                this.applyListRouteState(chip, routeState.filters, routeState);
            }
        }));
    }
    applyListRouteState(chipId, routeFilters, routeState) {
        this.onBeforeRouteStateApply?.();
        this.activeChip = chipId;
        this.clearSelection();
        if (this.adapter.buildCriteriaFromRoute) {
            this.listCriteria = this.adapter.buildCriteriaFromRoute(chipId, routeFilters, routeState);
        }
        else {
            this.listCriteria = this.listRouteSync.mergeFiltersIntoCriteria(this.adapter.cloneCriteria(this.adapter.getDefaultCriteriaForChip(chipId)), routeFilters);
        }
        this.syncFilterFormState();
        this.syncAppliedFilters();
        this.loadListPage(0, false);
    }
    loadListPage(pageIndex, append) {
        if (append) {
            this.listLoadingMore = true;
        }
        else {
            this.listLoading = true;
            this.listPageIndex = 0;
            this.listHasMore = false;
            this.clearSelection();
        }
        this.listSub.add(this.adapter.loadPage({
            chipId: this.activeChip,
            pageIndex,
            pageSize: this.adapter.pageSize,
            append,
            criteria: this.listCriteria,
            searchText: this.listSearchText,
        }).subscribe({
            next: page => {
                this.listPageIndex = page.pageIndex;
                this.listItems = append ? [...this.listItems, ...page.items] : page.items;
                const loadedCount = (page.pageIndex + 1) * page.pageSize;
                this.listHasMore = loadedCount < page.totalSize;
                this.listLoading = false;
                this.listLoadingMore = false;
                this.onAfterListLoaded?.();
            },
            error: () => {
                this.listLoading = false;
                this.listLoadingMore = false;
                this.listHasMore = false;
                this.onAfterListLoaded?.();
            },
        }));
    }
    syncAppliedFilters() {
        this.appliedFilters = this.adapter.buildAppliedFilters(this.listCriteria, this.refData, this.activeChip);
        this.activeFilterCount = this.adapter.countActiveSheetFilters(this.listCriteria, this.activeChip);
    }
    syncFilterFormState() {
        const nextDefinition = this.adapter.buildFilterFormDefinition(this.activeChip, this.refData, this.listCriteria);
        if (this.adapter.mergeFilterFormDefinition) {
            this.filterFormDefinition = this.adapter.mergeFilterFormDefinition(this.filterFormDefinition, nextDefinition);
        }
        else {
            this.filterFormDefinition = nextDefinition;
        }
        this.filterFormInitialValues = this.adapter.criteriaToFilterFormValues(this.activeChip, this.listCriteria);
    }
}

/**
 * Keeps a mobile list-detail bottom sheet in sync with URL query params.
 *
 * Domain dashboards own fetch/open/close logic; this helper only reads and
 * writes `?itemId=…&edit=true` while preserving other params (chip, filters).
 */
class ListDetailRouteSync {
    route;
    router;
    config;
    suppressed = false;
    constructor(route, router, config) {
        this.route = route;
        this.router = router;
        this.config = config;
    }
    /** Read a pending deep-link open request from the current route snapshot. */
    readPendingFromRoute() {
        const params = this.route.snapshot.queryParamMap;
        const aliases = this.config.idParamAliases ?? [];
        let itemId = params.get(this.config.idParam);
        for (const alias of aliases) {
            if (!itemId) {
                itemId = params.get(alias);
            }
        }
        if (!itemId?.trim()) {
            return undefined;
        }
        const editParam = params.get(this.config.editParam ?? 'edit');
        return {
            itemId: itemId.trim(),
            edit: editParam === 'true' || editParam === '1',
        };
    }
    /** Write the open sheet state into the URL (merge; replace history entry). */
    sync(itemId, mode = 'view') {
        if (this.suppressed || !itemId) {
            return;
        }
        const editParam = this.config.editParam ?? 'edit';
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
                [this.config.idParam]: itemId,
                [editParam]: mode === 'edit' ? true : null,
            },
            queryParamsHandling: 'merge',
            replaceUrl: true,
        });
    }
    /** Remove detail params from the URL while keeping list context params. */
    clear() {
        if (this.suppressed) {
            return;
        }
        const editParam = this.config.editParam ?? 'edit';
        const queryParams = {
            [this.config.idParam]: null,
            [editParam]: null,
        };
        for (const alias of this.config.idParamAliases ?? []) {
            queryParams[alias] = null;
        }
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams,
            queryParamsHandling: 'merge',
            replaceUrl: true,
        });
    }
    /** Temporarily disable URL updates (e.g. during bulk programmatic navigation). */
    setSuppressed(suppressed) {
        this.suppressed = suppressed;
    }
}

/**
 * Orchestrates detail sheet state + route sync (mirrors {@link FilteredListPageController}).
 */
class ListDetailPageController {
    open = false;
    title = 'Details';
    sections = [];
    loading = false;
    mode = 'view';
    saving = false;
    primaryActionLabel;
    editSummary = [];
    editDefinition;
    editInitialValues = {};
    editShowDocumentUpload = false;
    editDocumentError;
    editDocumentAllowedTypes = ['jpg', 'jpeg', 'png', 'pdf'];
    adapter;
    route;
    routeSync;
    refData = {};
    getListItems;
    onEntityUpdated;
    onSaveError;
    setFormValue;
    selectedEntity;
    editDocuments = [];
    existingDocumentCount = 0;
    pendingItemId;
    pendingEdit = false;
    detailSub = new Subscription();
    init(options) {
        this.adapter = options.adapter;
        this.route = options.route;
        this.routeSync = new ListDetailRouteSync(options.route, options.router, options.routeSyncConfig);
        this.refData = options.refData;
        this.getListItems = options.getListItems;
        this.onEntityUpdated = options.onEntityUpdated;
        this.onSaveError = options.onSaveError;
        this.setFormValue = options.setFormValue;
        this.editDocumentAllowedTypes = this.adapter.editDocumentAllowedTypes
            ?? this.editDocumentAllowedTypes;
        if (options.suppressRouteSync) {
            this.routeSync.setSuppressed(true);
        }
        this.queuePendingFromRoute();
    }
    destroy() {
        this.detailSub.unsubscribe();
    }
    queuePendingFromRoute() {
        const pending = this.routeSync.readPendingFromRoute();
        if (!pending) {
            return;
        }
        this.pendingItemId = pending.itemId;
        this.pendingEdit = pending.edit;
    }
    tryOpenPending() {
        const itemId = this.pendingItemId;
        if (!itemId || this.open) {
            return;
        }
        const fromList = this.adapter.findInList(this.getListItems(), itemId);
        if (fromList) {
            this.pendingItemId = undefined;
            const edit = this.pendingEdit;
            this.pendingEdit = false;
            this.openEntity(fromList, { edit, syncQuery: false });
            this.routeSync.sync(this.entityId(fromList), edit ? 'edit' : 'view');
            return;
        }
        const requestedId = itemId;
        const edit = this.pendingEdit;
        this.pendingItemId = undefined;
        this.open = true;
        this.title = requestedId;
        this.loading = true;
        this.sections = [];
        this.mode = 'view';
        this.saving = false;
        this.primaryActionLabel = undefined;
        this.selectedEntity = undefined;
        this.resetEditState();
        this.detailSub.add(this.adapter.fetchById(requestedId).pipe(catchError(() => of(undefined))).subscribe(entity => {
            this.loading = false;
            if (!entity) {
                this.pendingEdit = false;
                this.open = false;
                this.routeSync.clear();
                return;
            }
            this.pendingEdit = false;
            this.openEntity(entity, { edit, syncQuery: false, refresh: false });
            this.routeSync.sync(this.entityId(entity), edit ? 'edit' : 'view');
        }));
    }
    openEntity(entity, options = {}) {
        const { edit = false, syncQuery = true, refresh = true } = options;
        this.selectedEntity = entity;
        this.title = this.adapter.getTitle(entity);
        this.mode = 'view';
        this.loading = false;
        this.saving = false;
        this.resetEditState();
        const viewSections = this.adapter.buildViewSections(entity, this.refData);
        const loadingSection = this.adapter.buildDocumentsLoadingSection?.();
        this.sections = loadingSection ? [...viewSections, loadingSection] : viewSections;
        this.primaryActionLabel = this.adapter.resolvePrimaryActionLabel?.(entity);
        this.open = true;
        if (this.adapter.loadDocumentsSection) {
            const documentsEntityId = this.adapter.resolveDocumentsEntityId?.(entity)
                ?? this.entityId(entity);
            this.loadDocuments(documentsEntityId);
        }
        if (syncQuery) {
            this.routeSync.sync(this.entityId(entity), edit ? 'edit' : 'view');
        }
        if (refresh && this.adapter.refreshOnOpen) {
            this.refreshSelected(entity);
        }
        if (edit && this.primaryActionLabel) {
            this.enterEdit();
        }
    }
    close() {
        this.open = false;
        this.mode = 'view';
        this.loading = false;
        this.saving = false;
        this.primaryActionLabel = undefined;
        this.selectedEntity = undefined;
        this.resetEditState();
        this.detailSub.unsubscribe();
        this.detailSub = new Subscription();
        this.routeSync.clear();
    }
    /** Stepper edit flows are hosted outside this sheet (see list dashboard runtime). */
    get hasEditStepper() {
        return this.adapter?.editFlowKind === 'stepper';
    }
    enterEdit() {
        const entity = this.selectedEntity;
        if (!entity || this.hasEditStepper) {
            return;
        }
        if (!this.adapter.buildEditSummary || !this.adapter.buildEditForm) {
            return;
        }
        const context = { entity, refData: this.refData };
        this.editSummary = this.adapter.buildEditSummary(context);
        this.editInitialValues = this.adapter.entityToEditValues?.(entity) ?? {};
        this.editDefinition = this.adapter.buildEditForm(context);
        this.mode = 'edit';
        this.resetEditDocuments();
        this.existingDocumentCount = this.getExistingDocumentCount();
        this.applyEditValuesChange(this.editInitialValues);
        this.routeSync.sync(this.entityId(entity), 'edit');
        this.adapter.prepareEdit?.(context, () => this.refreshEditForm());
    }
    cancelEdit() {
        this.mode = 'view';
        if (this.selectedEntity) {
            this.routeSync.sync(this.entityId(this.selectedEntity), 'view');
        }
    }
    onEditValuesChange(values) {
        const entity = this.selectedEntity;
        if (!entity) {
            return;
        }
        this.applyEditValuesChange(values, entity);
    }
    onEditDocumentsChange(files) {
        this.editDocuments = files;
        if (files.length > 0) {
            this.editDocumentError = undefined;
        }
    }
    onEditSave(values) {
        const entity = this.selectedEntity;
        if (!entity || !this.adapter.save) {
            return;
        }
        const validationError = this.adapter.validateBeforeSave?.({
            entity,
            refData: this.refData,
            values,
            documents: this.editDocuments,
            existingDocumentCount: this.existingDocumentCount,
        });
        if (validationError) {
            this.editDocumentError = validationError;
            return;
        }
        this.saving = true;
        this.detailSub.add(this.adapter.save({
            entity,
            refData: this.refData,
            values,
            documents: this.editDocuments,
            existingDocumentCount: this.existingDocumentCount,
        }).subscribe({
            next: updated => {
                this.saving = false;
                this.applyUpdatedEntity(updated);
            },
            error: (err) => {
                this.saving = false;
                this.onSaveError?.(err);
            },
            complete: () => {
                this.saving = false;
            },
        }));
    }
    setRefData(refData) {
        this.refData = refData;
    }
    get selected() {
        return this.selectedEntity;
    }
    /** Re-renders the open sheet with the full entity; leaves list rows untouched. */
    refreshSelected(entity) {
        const requestedId = this.entityId(entity);
        this.detailSub.add(this.adapter.refreshOnOpen(entity).pipe(catchError(() => of(undefined))).subscribe(refreshed => {
            if (!refreshed || !this.open || !this.selectedEntity)
                return;
            if (this.entityId(this.selectedEntity) !== requestedId)
                return;
            this.selectedEntity = refreshed;
            this.title = this.adapter.getTitle(refreshed);
            this.primaryActionLabel = this.adapter.resolvePrimaryActionLabel?.(refreshed);
            if (this.mode !== 'view')
                return;
            const documentSections = this.sections.filter(section => section.type === 'documents');
            this.sections = [
                ...this.adapter.buildViewSections(refreshed, this.refData),
                ...documentSections,
            ];
        }));
    }
    applyUpdatedEntity(updated) {
        this.selectedEntity = updated;
        this.mode = 'view';
        const documentSections = this.sections.filter(section => section.type === 'documents');
        this.sections = [
            ...this.adapter.buildViewSections(updated, this.refData),
            ...documentSections,
        ];
        this.primaryActionLabel = this.adapter.resolvePrimaryActionLabel?.(updated);
        this.onEntityUpdated?.(updated);
        this.routeSync.sync(this.entityId(updated), 'view');
    }
    /** Deep-link id for an entity; titles are display values in most domains. */
    entityId(entity) {
        return this.adapter.getEntityId?.(entity) ?? this.adapter.getTitle(entity);
    }
    refreshEditForm() {
        const entity = this.selectedEntity;
        if (!entity || this.mode !== 'edit' || !this.adapter.refreshEditForm) {
            return;
        }
        this.editDefinition = this.adapter.refreshEditForm({ entity, refData: this.refData });
    }
    applyEditValuesChange(values, entity = this.selectedEntity) {
        if (!entity || !this.adapter.onEditValuesChange) {
            return;
        }
        const result = this.adapter.onEditValuesChange({ entity, refData: this.refData }, values, this.setFormValue);
        if (!result) {
            return;
        }
        if (result.showDocumentUpload !== undefined) {
            this.editShowDocumentUpload = result.showDocumentUpload;
        }
        if (result.clearDocuments) {
            this.editDocumentError = undefined;
            this.editDocuments = [];
        }
        if (result.documentError !== undefined) {
            this.editDocumentError = result.documentError;
        }
    }
    loadDocuments(entityId) {
        if (!this.adapter.loadDocumentsSection) {
            return;
        }
        this.detailSub.add(this.adapter.loadDocumentsSection(entityId).subscribe({
            next: section => this.replaceDocumentsSection(section),
            error: () => {
                if (this.adapter.loadDocumentsSection) {
                    this.replaceDocumentsSection({
                        type: 'documents',
                        id: 'document_list',
                        title: 'Documents',
                        documents: [],
                    });
                }
            },
        }));
    }
    replaceDocumentsSection(section) {
        const withoutDocuments = this.sections.filter(item => item.type !== 'documents');
        this.sections = [...withoutDocuments, section];
    }
    getExistingDocumentCount() {
        const documentsSection = this.sections.find(section => section.type === 'documents');
        return documentsSection?.type === 'documents' ? documentsSection.documents.length : 0;
    }
    resetEditState() {
        this.editSummary = [];
        this.editDefinition = undefined;
        this.editInitialValues = {};
        this.resetEditDocuments();
    }
    resetEditDocuments() {
        this.editDocuments = [];
        this.editDocumentError = undefined;
        this.editShowDocumentUpload = false;
        this.existingDocumentCount = 0;
    }
}

function isCreateActionOpen(value) {
    if (value === null || value === undefined) {
        return false;
    }
    const normalized = value.trim().toLowerCase();
    return normalized === '' || normalized === 'true' || normalized === '1' || normalized === 'yes';
}
/** Build query params for a deep link that opens create mode with optional presets. */
function buildCreateRouteQuery(presets = {}, actionParam = 'create') {
    const query = { [actionParam]: 'true' };
    for (const [param, value] of Object.entries(presets)) {
        const trimmed = value?.trim();
        if (trimmed) {
            query[param] = trimmed;
        }
    }
    return query;
}
/**
 * Keeps a mobile create bottom sheet in sync with URL query params.
 *
 * Example: `?create=true&forEventId=act-123`
 * Domain dashboards own open/close logic; this helper reads/writes the URL.
 */
class ListCreateRouteSync {
    route;
    router;
    config;
    suppressed = false;
    constructor(route, router, config) {
        this.route = route;
        this.router = router;
        this.config = config;
    }
    readPendingFromRoute(params = this.route.snapshot.queryParamMap) {
        const actionParam = this.config.actionParam ?? 'create';
        if (!isCreateActionOpen(params.get(actionParam))) {
            return undefined;
        }
        return {
            presets: this.readPresets(params),
        };
    }
    isOpen(params = this.route.snapshot.queryParamMap) {
        const actionParam = this.config.actionParam ?? 'create';
        return isCreateActionOpen(params.get(actionParam));
    }
    /** Open create mode in the URL (merge; preserves list/detail params). */
    sync(presets = {}) {
        if (this.suppressed) {
            return;
        }
        const actionParam = this.config.actionParam ?? 'create';
        const queryParams = {
            [actionParam]: true,
            ...this.buildPresetQueryParams(presets),
        };
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams,
            queryParamsHandling: 'merge',
            replaceUrl: true,
        });
    }
    /** Close create mode in the URL. Preset params are kept for list context. */
    clear() {
        if (this.suppressed) {
            return;
        }
        const actionParam = this.config.actionParam ?? 'create';
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { [actionParam]: null },
            queryParamsHandling: 'merge',
            replaceUrl: true,
        });
    }
    setSuppressed(suppressed) {
        this.suppressed = suppressed;
    }
    readPresets(params) {
        const presets = {};
        for (const binding of this.config.presets ?? []) {
            const raw = params.get(binding.param);
            switch (binding.type) {
                case 'string':
                    presets[binding.stateKey] = parseStringQueryParam(raw);
                    break;
                case 'boolean':
                    presets[binding.stateKey] = raw === null ? undefined : parseBooleanQueryParam(raw);
                    break;
            }
        }
        return presets;
    }
    buildPresetQueryParams(presets) {
        const queryParams = {};
        for (const binding of this.config.presets ?? []) {
            const value = presets[binding.stateKey];
            switch (binding.type) {
                case 'string':
                    queryParams[binding.param] = typeof value === 'string' && value.trim() ? value.trim() : null;
                    break;
                case 'boolean':
                    queryParams[binding.param] = value ? true : null;
                    break;
            }
        }
        return queryParams;
    }
}

/**
 * Orchestrates create sheet open/close + route sync (mirrors list/detail controllers).
 */
class ListCreatePageController {
    open = false;
    presets = {};
    route;
    routeSync;
    canOpen;
    prepareRouteOpen;
    extraPresetReaders = [];
    onBeforeOpen;
    pendingOpen = false;
    preparingRouteOpen = false;
    routeSub = new Subscription();
    init(options) {
        this.route = options.route;
        this.routeSync = new ListCreateRouteSync(options.route, options.router, options.config);
        this.canOpen = options.canOpen;
        this.prepareRouteOpen = options.prepareRouteOpen;
        this.extraPresetReaders = options.extraPresetReaders ?? [];
        this.onBeforeOpen = options.onBeforeOpen;
        this.applyPresetsFromRoute(this.route.snapshot.queryParamMap);
        this.queuePendingFromRoute();
        this.routeSub.add(this.route.queryParamMap.subscribe(params => this.syncFromRouteParams(params)));
    }
    destroy() {
        this.routeSub.unsubscribe();
    }
    queuePendingFromRoute() {
        if (!this.routeSync.readPendingFromRoute()) {
            return;
        }
        this.applyPresetsFromRoute(this.route.snapshot.queryParamMap);
        this.pendingOpen = true;
    }
    tryOpenPending() {
        if (!this.pendingOpen || this.open || !this.canOpen()) {
            return;
        }
        void this.openPendingFromRoute();
    }
    openSheet(options = { syncRoute: true }) {
        if (!this.canOpen()) {
            return;
        }
        this.pendingOpen = false;
        this.onBeforeOpen?.();
        this.open = true;
        if (options.syncRoute) {
            this.routeSync.sync(this.presets);
        }
    }
    close() {
        this.open = false;
        this.routeSync.clear();
    }
    syncFromRouteParams(params) {
        const shouldOpen = this.routeSync.isOpen(params);
        if (shouldOpen && !this.open) {
            this.applyPresetsFromRoute(params);
            this.pendingOpen = true;
            void this.openPendingFromRoute();
            return;
        }
        if (!shouldOpen && this.open) {
            this.open = false;
        }
        if (!shouldOpen) {
            this.pendingOpen = false;
        }
    }
    applyPresetsFromRoute(params = this.route.snapshot.queryParamMap) {
        const pending = this.routeSync.readPendingFromRoute(params);
        const nextPresets = { ...(pending?.presets ?? {}) };
        for (const reader of this.extraPresetReaders ?? []) {
            reader(params, nextPresets);
        }
        this.presets = { ...this.presets, ...nextPresets };
    }
    presetString(key) {
        const value = this.presets[key];
        return typeof value === 'string' ? value : undefined;
    }
    async openPendingFromRoute() {
        if (this.preparingRouteOpen || this.open || !this.pendingOpen || !this.canOpen()) {
            return;
        }
        this.preparingRouteOpen = true;
        try {
            const prepared = await this.prepareRouteOpen?.();
            if (prepared === false || this.open || !this.routeSync.isOpen() || !this.canOpen()) {
                return;
            }
            this.pendingOpen = false;
            this.openSheet({ syncRoute: false });
        }
        finally {
            this.preparingRouteOpen = false;
        }
    }
}

/**
 * Keeps primary chip + sheet filter criteria in sync with URL query params.
 * Domain dashboards supply chip normalization and filter bindings; detail
 * sheets can use {@link ListDetailRouteSync} alongside this helper.
 */
class ListRouteSync {
    router;
    route;
    chipConfig;
    filterBindings;
    constructor(router, route, chipConfig, filterBindings = []) {
        this.router = router;
        this.route = route;
        this.chipConfig = chipConfig;
        this.filterBindings = filterBindings;
    }
    readFromParams(params) {
        const chipParam = this.chipConfig.param ?? 'chip';
        const chip = this.chipConfig.normalize(params.get(chipParam)) ?? this.chipConfig.defaultChip;
        const filters = {};
        for (const binding of this.filterBindings) {
            const raw = params.get(binding.param);
            switch (binding.type) {
                case 'csv':
                    filters[binding.criteriaKey] = parseCsvQueryParam(raw);
                    break;
                case 'string':
                    filters[binding.criteriaKey] = parseStringQueryParam(raw);
                    break;
                case 'boolean':
                    filters[binding.criteriaKey] = raw != null && raw !== ''
                        ? parseBooleanQueryParam(raw)
                        : undefined;
                    break;
            }
        }
        return { chip, filters };
    }
    buildQueryParams(chip, criteria) {
        const chipParam = this.chipConfig.param ?? 'chip';
        const queryParams = {
            [chipParam]: chip === this.chipConfig.defaultChip ? null : chip,
        };
        for (const binding of this.filterBindings) {
            const value = criteria[binding.criteriaKey];
            switch (binding.type) {
                case 'csv':
                    queryParams[binding.param] = formatCsvQueryParam(value);
                    break;
                case 'string':
                    queryParams[binding.param] = typeof value === 'string' && value.trim() ? value.trim() : null;
                    break;
                case 'boolean':
                    queryParams[binding.param] = value ? true : null;
                    break;
            }
        }
        return queryParams;
    }
    /** Write chip + filter criteria to the URL (merge; preserves detail params). */
    navigate(chip, criteria) {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: this.buildQueryParams(chip, criteria),
            queryParamsHandling: 'merge',
        });
    }
    /** Overlay parsed route filters onto default criteria for the active chip. */
    mergeFiltersIntoCriteria(base, filters) {
        const next = { ...base };
        for (const binding of this.filterBindings) {
            const value = filters[binding.criteriaKey];
            const isEmptyArray = Array.isArray(value) && value.length === 0;
            const isEmptyString = typeof value === 'string' && !value.trim();
            const isFalseBoolean = binding.type === 'boolean' && !value;
            if (value === undefined || value === null || isEmptyArray || isEmptyString || isFalseBoolean) {
                delete next[binding.criteriaKey];
            }
            else {
                next[binding.criteriaKey] = value;
            }
        }
        return next;
    }
    matchesState(routeChip, activeChip, criteria, routeFilters) {
        if (routeChip !== activeChip) {
            return false;
        }
        return this.filterBindings.every(binding => this.filterValuesEqual(binding, criteria[binding.criteriaKey], routeFilters[binding.criteriaKey]));
    }
    /** Optional boolean filters: unset (`undefined`/`false`) compares equal; only `true` is active. */
    filterValuesEqual(binding, a, b) {
        if (binding.type === 'boolean') {
            return (a === true) === (b === true);
        }
        return valuesEqual(a, b);
    }
}

/**
 * Edit-only overlay state for bulk updates — drives a second {@link ListDetailSheetComponent}.
 */
class BulkEditPageController {
    open = false;
    title = 'Bulk Update';
    saving = false;
    editSummary = [];
    editDefinition;
    editInitialValues = {};
    editShowDocumentUpload = false;
    editDocumentError;
    editDocumentAllowedTypes = ['jpg', 'jpeg', 'png', 'pdf'];
    entities = [];
    config;
    refData = {};
    payableAccountOptions = [];
    editDocuments = [];
    template;
    saveSub = new Subscription();
    onSaved;
    onSaveError;
    setFormValue;
    init(options) {
        this.config = options.config;
        this.refData = options.refData;
        this.onSaved = options.onSaved;
        this.onSaveError = options.onSaveError;
        this.setFormValue = options.setFormValue;
        this.title = options.config.title ?? this.title;
        this.editDocumentAllowedTypes = options.config.documentTypes ?? this.editDocumentAllowedTypes;
    }
    destroy() {
        this.saveSub.unsubscribe();
    }
    setRefData(refData) {
        this.refData = refData;
    }
    openBulkEdit(entities) {
        const config = this.config;
        if (!config || !entities.length) {
            return false;
        }
        if (!config.validateSelection(entities)) {
            return false;
        }
        this.entities = entities;
        this.template = { ...entities[0] };
        this.editInitialValues = config.entityToEditValues(this.template);
        this.editSummary = config.buildEditSummary(entities, this.refData);
        const prepare = () => {
            this.editDefinition = this.applyLockedFields(config.buildEditForm(this.template, this.refData, this.payableAccountOptions), config.lockedFields);
            this.applyValuesChange(this.editInitialValues);
            this.open = true;
        };
        if (config.prepareEdit) {
            config.prepareEdit(accounts => {
                this.payableAccountOptions = accounts;
                prepare();
            });
        }
        else {
            prepare();
        }
        return true;
    }
    close() {
        this.open = false;
        this.saving = false;
        this.entities = [];
        this.template = undefined;
        this.editDefinition = undefined;
        this.editInitialValues = {};
        this.editSummary = [];
        this.editShowDocumentUpload = false;
        this.editDocumentError = undefined;
        this.editDocuments = [];
    }
    onEditValuesChange(values) {
        const config = this.config;
        const template = this.template;
        if (!config || !template) {
            return;
        }
        this.applyValuesChange(values, template);
        if (config.refreshEditForm) {
            this.editDefinition = this.applyLockedFields(config.refreshEditForm(template, this.refData, this.payableAccountOptions), config.lockedFields);
        }
    }
    onEditDocumentsChange(files) {
        this.editDocuments = files;
        if (files.length > 0) {
            this.editDocumentError = undefined;
        }
    }
    onEditSave(values) {
        const config = this.config;
        const template = this.template;
        if (!config || !template || !this.entities.length) {
            return;
        }
        const validationError = config.validateBeforeSave?.(template, values, this.editDocuments, this.refData);
        if (validationError) {
            this.editDocumentError = validationError;
            return;
        }
        this.saving = true;
        this.saveSub.add(config.save(this.entities, values, this.editDocuments).subscribe({
            next: updated => {
                this.saving = false;
                this.onSaved?.(updated);
                this.close();
            },
            error: (err) => {
                this.saving = false;
                this.onSaveError?.(err);
            },
            complete: () => {
                this.saving = false;
            },
        }));
    }
    applyValuesChange(values, template = this.template) {
        const config = this.config;
        if (!config?.onEditValuesChange) {
            return;
        }
        const result = config.onEditValuesChange(template, values, this.setFormValue, this.refData);
        if (!result) {
            return;
        }
        if (result.showDocumentUpload !== undefined) {
            this.editShowDocumentUpload = result.showDocumentUpload;
        }
        if (result.clearDocuments) {
            this.editDocumentError = undefined;
            this.editDocuments = [];
        }
        if (result.documentError !== undefined) {
            this.editDocumentError = result.documentError;
        }
    }
    applyLockedFields(definition, lockedFields) {
        if (!lockedFields?.length) {
            return definition;
        }
        return {
            ...definition,
            fields: definition.fields.map(field => lockedFields.includes(field.key)
                ? { ...field, enabled: false }
                : field),
        };
    }
}

/**
 * Wires list, detail, create, and optional bulk-edit controllers from a single dashboard config.
 */
class FilteredListDashboardController {
    listPage = new FilteredListPageController();
    detailPage = new ListDetailPageController();
    createPage = new ListCreatePageController();
    bulkEditPage = new BulkEditPageController();
    permissions = {};
    listPageAdapter;
    listRouteSync;
    adapters;
    config;
    refData = {};
    route;
    get detailPageAdapter() {
        return this.adapters.detailPageAdapter;
    }
    init(options) {
        this.config = options.config;
        this.refData = options.refData;
        this.route = options.route;
        this.permissions = options.config.resolvePermissions?.() ?? {};
        this.listPageAdapter = createListPageAdapter(options.config.list);
        this.adapters = {
            listPageAdapter: this.listPageAdapter,
            detailPageAdapter: createDetailPageAdapter(options.config.detail),
        };
        this.listRouteSync = new ListRouteSync(options.router, options.route, options.config.list.route.chipConfig, options.config.list.route.filterBindings);
        this.listPageAdapter.configure({
            forEventId: options.forEventId,
            listRouteSync: this.listRouteSync,
        });
        this.detailPageAdapter.configure({
            activeChip: () => this.listPage.activeChip,
            canUpdate: () => this.resolveCanUpdateEntity(),
        });
        const detailRouteSync = options.config.detailRouteSync ?? {
            idParam: 'id',
        };
        this.detailPage.init({
            adapter: this.detailPageAdapter,
            route: options.route,
            router: options.router,
            routeSyncConfig: detailRouteSync,
            refData: this.refData,
            getListItems: () => this.listPage.listItems,
            onEntityUpdated: entity => {
                options.hooks?.onEntityUpdated?.(entity);
                if (options.hooks?.mapEntityToListRow) {
                    this.listPage.updateListItem(options.hooks.mapEntityToListRow(entity));
                }
            },
            onSaveError: options.hooks?.onSaveError,
            setFormValue: options.hooks?.setFormValue,
        });
        if (options.config.create) {
            const createConfig = options.config.create;
            this.createPage.init({
                route: options.route,
                router: options.router,
                config: createConfig.route,
                canOpen: () => createConfig.canOpen(this.buildContext()),
                prepareRouteOpen: options.hooks?.prepareCreateRouteOpen,
                onBeforeOpen: createConfig.onBeforeOpen,
                extraPresetReaders: createConfig.extraPresetReaders,
            });
            if (createConfig.defaultPresets) {
                this.createPage.presets = {
                    ...this.createPage.presets,
                    ...createConfig.defaultPresets,
                };
            }
        }
        if (options.config.bulkEdit) {
            this.bulkEditPage.init({
                config: options.config.bulkEdit,
                refData: this.refData,
                onSaved: entities => options.hooks?.onBulkSaved?.(entities),
                onSaveError: options.hooks?.onBulkSaveError,
                setFormValue: options.hooks?.setFormValue,
            });
        }
        this.listPage.init({
            adapter: this.listPageAdapter,
            route: options.route,
            router: options.router,
            listRouteSync: this.listRouteSync,
            refData: this.refData,
            onBeforeRouteStateApply: () => {
                if (this.detailPage.open) {
                    this.detailPage.close();
                }
            },
            onAfterListLoaded: () => {
                this.detailPage.tryOpenPending();
                this.createPage.tryOpenPending();
            },
            onFilterOpen: options.hooks?.onFilterOpen,
        });
        for (const loader of options.config.refDataLoaders ?? []) {
            loader.ensure().subscribe(() => {
                loader.apply?.();
                this.listPage.setRefData(this.refData);
                this.detailPage.setRefData(this.refData);
                this.bulkEditPage.setRefData(this.refData);
            });
        }
    }
    destroy() {
        this.listPage.destroy();
        this.detailPage.destroy();
        this.createPage.destroy();
        this.bulkEditPage.destroy();
    }
    buildContext() {
        return {
            permissions: this.permissions,
            activeChip: this.listPage.activeChip,
        };
    }
    isListSelectable() {
        return this.config?.selectableWhen?.(this.buildContext()) ?? false;
    }
    /** FAB visibility and create-sheet eligibility — delegates to {@link FilteredListCreateConfig.canOpen}. */
    get showCreateFab() {
        return !!this.config?.create?.canOpen(this.buildContext());
    }
    openBulkEdit(entities) {
        return this.bulkEditPage.openBulkEdit(entities);
    }
    setRefData(refData) {
        this.refData = refData;
        this.createInitialValuesCache = null;
        this.createInitialValuesPresetsRef = null;
        this.listPage.setRefData(refData);
        this.detailPage.setRefData(refData);
        this.bulkEditPage.setRefData(refData);
    }
    get searchPlaceholder() {
        return this.config?.searchPlaceholder ?? 'Search by ID';
    }
    get filterSheetTitle() {
        return this.config?.filterSheetTitle ?? 'Filters';
    }
    get emptyMessage() {
        return this.config?.emptyMessage ?? 'No items match this filter.';
    }
    get hasCreateForm() {
        const create = this.config?.create;
        if (!create?.buildCreateForm) {
            return false;
        }
        const kind = create.kind ?? 'form';
        return kind === 'form';
    }
    get createDefinition() {
        const build = this.config?.create?.buildCreateForm;
        if (!build) {
            return undefined;
        }
        return build(this.refData, this.createPage.presets);
    }
    get createInitialValues() {
        const defaults = this.config?.create?.defaultCreateValues;
        if (!defaults) {
            return this.emptyCreateValues;
        }
        if (this.createInitialValuesCache
            && this.createInitialValuesPresetsRef === this.createPage.presets) {
            return this.createInitialValuesCache;
        }
        this.createInitialValuesPresetsRef = this.createPage.presets;
        this.createInitialValuesCache = defaults(this.refData, this.createPage.presets);
        return this.createInitialValuesCache;
    }
    validateBeforeCreate(values) {
        return this.config?.create?.validateBeforeCreate?.(values);
    }
    createContextExtras = {};
    createInitialValuesCache = null;
    createInitialValuesPresetsRef = null;
    emptyCreateValues = {};
    setCreateContextExtras(extras) {
        this.createContextExtras = extras;
    }
    getCreateContext() {
        return {
            refData: this.refData,
            presets: this.createPage.presets,
            ...this.createContextExtras,
        };
    }
    get hasCreateStepper() {
        const create = this.config?.create;
        return create?.kind === 'stepper'
            && !!create.steps?.length
            && !!create.buildStepDefinition;
    }
    get createSteps() {
        return this.config?.create?.steps ?? [];
    }
    buildCreateStepDefinition = (stepId, values) => {
        const build = this.config?.create?.buildStepDefinition;
        if (!build) {
            return { id: '', key: '', label: '', description: null, fields: [] };
        }
        return build(stepId, values, this.getCreateContext());
    };
    resolveCreateSteps = (values) => {
        const resolved = this.config?.create?.resolveSteps?.(values);
        if (resolved) {
            return resolved;
        }
        return this.createSteps.map(step => step.id);
    };
    validateCreateStep = (stepId, values) => this.config?.create?.validateStep?.(stepId, values, this.getCreateContext());
    prepareCreateStep = (stepId, values) => this.config?.create?.prepareStep?.(stepId, values, this.getCreateContext());
    resolveCanUpdateEntity() {
        if (this.config?.canUpdateEntity) {
            return this.config.canUpdateEntity(this.buildContext());
        }
        return !!this.permissions['canUpdateEntity'];
    }
}

const EMPTY_DEFINITION = {
    id: '',
    key: '',
    label: '',
    description: null,
    fields: [],
};
/**
 * Sheet state for one config-driven action form (`form` or `stepper`).
 * Also hosts synthetic flows built from `detail.edit` / `bulkEdit` stepper configs.
 */
class ListActionFormController {
    open = false;
    saving = false;
    loading = false;
    actionFormId;
    title = '';
    definition;
    initialValues = {};
    documents = [];
    customStepData = {};
    showDocumentUpload = false;
    documentError;
    documentAllowedTypes = ['jpg', 'jpeg', 'png', 'pdf'];
    documentUploadHint;
    saveLabel = 'Save';
    options;
    activeConfig;
    entity;
    latestValues = {};
    subscription = new Subscription();
    init(options) {
        this.options = options;
        this.close();
    }
    destroy() {
        this.subscription.unsubscribe();
        this.subscription = new Subscription();
        this.open = false;
    }
    get config() {
        return this.activeConfig;
    }
    get kind() {
        return this.activeConfig?.kind ?? 'form';
    }
    get selected() {
        return this.entity;
    }
    get steps() {
        return (this.activeConfig?.steps ?? []);
    }
    get customSteps() {
        return this.activeConfig?.customSteps;
    }
    get values() {
        return this.latestValues;
    }
    /** Opens the entry registered under `actionFormId` in the dashboard config. */
    openForm(actionFormId, entity) {
        const config = this.options?.resolveConfig(actionFormId);
        if (!config)
            return false;
        return this.openWith(actionFormId, config, entity);
    }
    /** Opens an explicit config — used for detail-edit and bulk-edit stepper flows. */
    openWith(actionFormId, config, entity) {
        if (entity === undefined)
            return false;
        this.resetState();
        this.actionFormId = actionFormId;
        this.activeConfig = config;
        this.entity = entity;
        this.title = typeof config.title === 'function' ? config.title(entity) : config.title;
        this.saveLabel = config.saveLabel ?? 'Save';
        this.documentAllowedTypes = config.documentTypes ?? this.documentAllowedTypes;
        this.documentUploadHint = config.documentUploadHint;
        this.showDocumentUpload = typeof config.showDocumentUpload === 'function'
            ? config.showDocumentUpload(entity)
            : config.showDocumentUpload ?? false;
        const values = config.defaultValues(entity, {
            refData: this.refData,
            activeChip: this.activeChip,
            preparationContext: this.preparationContext,
        });
        this.initialValues = values;
        this.latestValues = { ...values };
        this.customStepData = config.defaultCustomStepData?.(entity, {
            refData: this.refData,
            activeChip: this.activeChip,
            preparationContext: this.preparationContext,
        }) ?? {};
        this.definition = config.buildForm?.(entity, {
            refData: this.refData,
            values,
            preparationContext: this.preparationContext,
        });
        this.open = true;
        return true;
    }
    close() {
        this.subscription.unsubscribe();
        this.subscription = new Subscription();
        this.resetState();
    }
    onValuesChange(values) {
        this.latestValues = values;
        const config = this.activeConfig;
        const entity = this.entity;
        if (!config?.onValuesChange || entity === undefined)
            return;
        const result = config.onValuesChange(entity, values, {
            refData: this.refData,
            setFormValue: this.options?.setFormValue,
            preparationContext: this.preparationContext,
        });
        if (!result)
            return;
        if (isObservable(result)) {
            this.loading = true;
            this.subscription.add(result.subscribe({
                next: value => {
                    this.loading = false;
                    this.applyValuesChangeResult(value);
                },
                error: error => {
                    this.loading = false;
                    this.options?.onError?.(error, this.actionFormId ?? '');
                },
                complete: () => {
                    this.loading = false;
                },
            }));
            return;
        }
        if (result instanceof Promise) {
            this.loading = true;
            void result.then(value => {
                this.loading = false;
                this.applyValuesChangeResult(value);
            }, error => {
                this.loading = false;
                this.options?.onError?.(error, this.actionFormId ?? '');
            });
            return;
        }
        this.applyValuesChangeResult(result);
    }
    onDocumentsChange(files) {
        this.documents = files;
        if (files.length) {
            this.documentError = undefined;
        }
    }
    onCustomStepDataChange(change) {
        this.customStepData = { ...this.customStepData, [change.stepId]: change.data };
    }
    buildStepDefinition = (stepId, values) => {
        const build = this.activeConfig?.buildStepDefinition;
        if (!build)
            return EMPTY_DEFINITION;
        return build(stepId, values, this.buildContext(values));
    };
    resolveSteps = (values) => {
        const resolved = this.activeConfig?.resolveSteps?.(values);
        return resolved ?? this.steps.map(step => step.id);
    };
    validateStep = (stepId, values) => this.activeConfig?.validateStep?.(stepId, values, this.buildContext(values));
    prepareStep = (stepId, values) => this.activeConfig?.prepareStep?.(stepId, values, this.buildContext(values));
    submit(values) {
        const config = this.activeConfig;
        const entity = this.entity;
        const actionFormId = this.actionFormId;
        if (!config || entity === undefined || !actionFormId || this.saving)
            return;
        this.latestValues = values;
        const context = this.buildContext(values);
        const validationError = config.validateBeforeSave?.(context);
        if (validationError) {
            this.documentError = validationError;
            this.options?.onValidationError?.(validationError);
            return;
        }
        this.saving = true;
        this.subscription.add(config.save(context).subscribe({
            next: result => {
                this.saving = false;
                this.options?.onSaved?.({ actionFormId, config, entity, result });
            },
            error: error => {
                this.saving = false;
                this.options?.onError?.(error, actionFormId);
            },
            // Feature saves may complete empty (e.g. confirm Cancel via filter, or EMPTY after a handled error).
            complete: () => {
                this.saving = false;
            },
        }));
    }
    buildContext(values) {
        return {
            entity: this.entity,
            refData: this.refData,
            values,
            documents: this.documents,
            customStepData: this.customStepData,
            activeChip: this.activeChip,
            permissions: this.options?.permissions() ?? {},
            preparationContext: this.preparationContext,
        };
    }
    applyValuesChangeResult(result) {
        if (!result)
            return;
        if (result.definition) {
            this.definition = result.definition;
        }
        if (result.values) {
            this.initialValues = result.values;
            this.latestValues = { ...result.values };
        }
        if (result.loading !== undefined) {
            this.loading = result.loading;
        }
        if (result.showDocumentUpload !== undefined) {
            this.showDocumentUpload = result.showDocumentUpload;
        }
        if (result.clearDocuments) {
            this.documents = [];
            this.documentError = undefined;
        }
        if (result.documentError !== undefined) {
            this.documentError = result.documentError;
        }
    }
    resetState() {
        this.open = false;
        this.saving = false;
        this.loading = false;
        this.actionFormId = undefined;
        this.activeConfig = undefined;
        this.entity = undefined;
        this.title = '';
        this.definition = undefined;
        this.initialValues = {};
        this.latestValues = {};
        this.documents = [];
        this.customStepData = {};
        this.showDocumentUpload = false;
        this.documentError = undefined;
        this.documentUploadHint = undefined;
    }
    get refData() {
        return this.options?.refData() ?? {};
    }
    get activeChip() {
        return this.options?.activeChip() ?? '';
    }
    get preparationContext() {
        return this.options?.preparationContext?.();
    }
}

/**
 * Per-dashboard form cache. Host supplies one instance so tenant/route data
 * cannot leak across dashboards.
 */
class ListFormCache {
    resolver = new ListFormResolver();
    async compile(definition, context) {
        const resolved = await resolveListDashboardConfig(definition, context, this.resolver);
        return compileListDashboardConfig(resolved);
    }
    invalidate(formId) {
        this.resolver.invalidate(formId);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: ListFormCache, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: ListFormCache });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: ListFormCache, decorators: [{
            type: Injectable
        }] });

class ListPreparationService {
    loading = false;
    error;
    results = new Map();
    runner;
    context;
    generation = 0;
    activeRun;
    configure(definition, context) {
        this.cancel();
        this.context = context;
        if (definition.preparation) {
            const triggers = { ...definition.preparation.triggers };
            triggers.init ??= triggers.list;
            triggers.createOpen ??= triggers.create;
            triggers.editPrepare ??= this.mergeTriggerIds(triggers.detail, triggers.bulkEdit);
            this.runner = new ListPreparationRunner(definition.preparation.tasks, triggers);
        }
        else {
            this.runner = undefined;
        }
        this.loading = false;
        this.error = undefined;
        this.results = new Map();
    }
    async prepare(trigger) {
        this.activeRun?.abort();
        const abortController = new AbortController();
        this.activeRun = abortController;
        const run = ++this.generation;
        const runner = this.runner;
        if (!runner) {
            this.activeRun = undefined;
            return this.results;
        }
        this.loading = true;
        this.error = undefined;
        try {
            const results = await runner.run(this.canonicalTrigger(trigger), this.context, { signal: abortController.signal });
            if (run === this.generation) {
                this.results = results;
                this.loading = false;
                this.activeRun = undefined;
            }
            return results;
        }
        catch (error) {
            if (run === this.generation) {
                this.error = error;
                this.loading = false;
                this.activeRun = undefined;
            }
            throw error;
        }
    }
    /** Runs an explicit task id list — used by action forms with `preparationTasks`. */
    async prepareTasks(taskIds) {
        if (!taskIds.length)
            return this.results;
        this.activeRun?.abort();
        const abortController = new AbortController();
        this.activeRun = abortController;
        const run = ++this.generation;
        const runner = this.runner;
        if (!runner) {
            this.activeRun = undefined;
            return this.results;
        }
        this.loading = true;
        this.error = undefined;
        try {
            const results = await runner.runTasks(taskIds, this.context, {
                signal: abortController.signal,
            });
            if (run === this.generation) {
                this.results = results;
                this.loading = false;
                this.activeRun = undefined;
            }
            return results;
        }
        catch (error) {
            if (run === this.generation) {
                this.error = error;
                this.loading = false;
                this.activeRun = undefined;
            }
            throw error;
        }
    }
    cancel() {
        this.activeRun?.abort();
        this.activeRun = undefined;
        this.generation += 1;
        this.loading = false;
    }
    canonicalTrigger(trigger) {
        switch (trigger) {
            case 'list': return 'init';
            case 'create': return 'createOpen';
            case 'detail':
            case 'bulkEdit':
                return 'editPrepare';
            default:
                return trigger;
        }
    }
    mergeTriggerIds(first, second) {
        return first || second ? [...new Set([...(first ?? []), ...(second ?? [])])] : undefined;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: ListPreparationService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: ListPreparationService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: ListPreparationService, decorators: [{
            type: Injectable
        }] });

/** Synthetic action-form ids for the detail-edit and bulk-edit stepper flows. */
const LIST_DETAIL_EDIT_FORM_ID = '__detailEdit';
const LIST_BULK_EDIT_FORM_ID = '__bulkEdit';
/** Orchestration around ListDashboardConfig and FilteredListDashboardController. */
class ListDashboardRuntime {
    formCache;
    preparation;
    dashboard = new FilteredListDashboardController();
    /** Sheet state for config-driven action forms and stepper edit flows. */
    actionForm = new ListActionFormController();
    loading = false;
    error;
    initialized = false;
    destroyed = false;
    createSaving = false;
    /** Custom stepper step data collected during the create flow. */
    createCustomStepData = {};
    generation = 0;
    options;
    compiled;
    subscriptions = new Subscription();
    constructor(formCache = new ListFormCache(), preparation = new ListPreparationService()) {
        this.formCache = formCache;
        this.preparation = preparation;
    }
    get definition() {
        return this.options?.config;
    }
    async init(options) {
        const run = ++this.generation;
        if (this.initialized) {
            this.dashboard.destroy();
            this.dashboard = new FilteredListDashboardController();
        }
        this.subscriptions.unsubscribe();
        this.subscriptions = new Subscription();
        this.options = options;
        this.loading = true;
        this.error = undefined;
        this.initialized = false;
        this.destroyed = false;
        this.preparation.configure(options.config, options.preparationContext);
        try {
            const compiled = await this.formCache.compile(options.config, options.formContext);
            await this.preparation.prepare('init');
            if (run !== this.generation || this.destroyed)
                return;
            this.compiled = compiled;
            this.dashboard.init({
                route: options.route,
                router: options.router,
                refData: options.refData ?? {},
                config: compiled,
                hooks: this.buildDashboardHooks(options),
                forEventId: options.forEventId,
            });
            this.installDetailEditPreparation();
            this.initActionForm();
            this.initialized = true;
            this.loading = false;
        }
        catch (error) {
            if (run !== this.generation || this.destroyed)
                return;
            this.error = error;
            this.loading = false;
            options.hooks?.notify?.({
                level: 'error',
                message: 'Unable to load this list dashboard.',
                error,
            });
        }
    }
    retry() {
        if (!this.options)
            return Promise.resolve();
        this.formCache.invalidate();
        return this.init(this.options);
    }
    setRefData(refData) {
        this.options = this.options ? { ...this.options, refData } : this.options;
        if (this.initialized)
            this.dashboard.setRefData(refData);
    }
    async openDetail(row, edit = false) {
        const entity = row.payload;
        if (!entity)
            return;
        this.dashboard.detailPage.openEntity(entity, { edit });
    }
    async openCreate() {
        if (!(await this.prepare('createOpen')))
            return;
        this.syncCreateContextFromPreparation();
        this.dashboard.createPage.openSheet();
    }
    async openBulkEdit(entities) {
        if (!(await this.prepare('bulkEdit')))
            return false;
        if (this.hasBulkEditStepper) {
            return this.openBulkEditStepper(entities);
        }
        return this.dashboard.openBulkEdit(entities);
    }
    enterDetailEdit() {
        this.dashboard.detailPage.enterEdit();
    }
    /** True when `detail.edit` is configured as a stepper flow. */
    get hasEditStepper() {
        const edit = this.options?.config.detail.edit;
        return edit?.kind === 'stepper' && !!edit.steps?.length && !!edit.buildStepDefinition;
    }
    /** True when `bulkEdit` is configured as a stepper flow. */
    get hasBulkEditStepper() {
        const bulkEdit = this.options?.config.bulkEdit;
        return bulkEdit?.kind === 'stepper'
            && !!bulkEdit.steps?.length
            && !!bulkEdit.buildStepDefinition;
    }
    /** Opens `actionForms[actionFormId]` for an entity after its preparation runs. */
    async openActionForm(actionFormId, entity) {
        const config = this.options?.config.actionForms?.[actionFormId];
        const target = entity ?? this.dashboard.detailPage.selected;
        if (!config || target === undefined)
            return false;
        const prepared = config.preparationTasks?.length
            ? await this.runPreparationTasks(config.preparationTasks)
            : await this.runPreparation('operation');
        if (!prepared)
            return false;
        return this.actionForm.openForm(actionFormId, target);
    }
    notify(notification) {
        this.options?.hooks?.notify?.(notification);
    }
    prepare(trigger) {
        return this.runPreparation(trigger);
    }
    runOperationPreparation() {
        return this.runPreparation('operation');
    }
    runAction(run, selection = [], actionFormId) {
        if (actionFormId) {
            void this.openActionForm(actionFormId, selection[0]);
            return;
        }
        switch (run) {
            case 'openCreate':
                void this.openCreate();
                return;
            case 'openBulkEdit':
                void this.openBulkEdit([...selection]);
                return;
            case 'enterEdit':
                this.enterDetailEdit();
                return;
            case 'openDetail': {
                const entity = selection[0] ?? this.dashboard.detailPage.selected;
                if (entity) {
                    this.dashboard.detailPage.openEntity(entity);
                }
                return;
            }
            case 'openDetailEdit': {
                const entity = selection[0] ?? this.dashboard.detailPage.selected;
                if (entity) {
                    this.dashboard.detailPage.openEntity(entity);
                    this.enterDetailEdit();
                }
                return;
            }
            default: {
                const operation = this.options?.config.operations?.[run];
                operation?.(selection.length <= 1 ? selection[0] : selection, selection);
            }
        }
    }
    onCreateCustomStepDataChange(change) {
        this.createCustomStepData = {
            ...this.createCustomStepData,
            [change.stepId]: change.data,
        };
    }
    submitCreate(values) {
        const create = this.compiled?.create;
        const validationError = this.dashboard.validateBeforeCreate(values);
        if (validationError) {
            this.options?.hooks?.notify?.({ level: 'error', message: validationError });
            return;
        }
        if (!create?.createSave || this.createSaving)
            return;
        this.createSaving = true;
        const createContext = {
            ...this.dashboard.getCreateContext(),
            customStepData: this.createCustomStepData,
        };
        this.subscriptions.add(create.createSave(values, createContext).subscribe({
            next: result => {
                this.createSaving = false;
                this.createCustomStepData = {};
                this.dashboard.createPage.close();
                this.refreshCreated(result);
                this.options?.hooks?.onCreated?.(result);
                this.options?.hooks?.notify?.({
                    level: 'success',
                    message: 'Created successfully.',
                });
            },
            error: error => {
                this.createSaving = false;
                this.options?.hooks?.onCreateError?.(error);
                this.options?.hooks?.notify?.({
                    level: 'error',
                    message: 'Unable to create the item.',
                    error,
                });
            },
            // Feature saves may complete empty (e.g. IFSC confirm Cancel via filter, or EMPTY after a handled error).
            complete: () => {
                this.createSaving = false;
            },
        }));
    }
    destroy() {
        this.generation += 1;
        this.destroyed = true;
        this.loading = false;
        this.createSaving = false;
        this.actionForm.destroy();
        this.preparation.cancel();
        this.subscriptions.unsubscribe();
        if (this.initialized)
            this.dashboard.destroy();
        this.initialized = false;
    }
    mapEntityToListRow(entity) {
        const map = this.options?.config.list.mapToListRow;
        if (!map)
            return undefined;
        return map(entity, {
            refData: this.options?.refData ?? {},
            context: this.options?.preparationContext,
        });
    }
    refreshCreated(result) {
        if (!result || typeof result !== 'object')
            return;
        const row = this.mapEntityToListRow(result);
        if (row)
            this.dashboard.listPage.prependListItem(row);
    }
    buildDashboardHooks(options) {
        const hooks = options.hooks;
        return {
            ...hooks,
            mapEntityToListRow: entity => this.mapEntityToListRow(entity)
                ?? hooks?.mapEntityToListRow?.(entity)
                ?? { id: String(entity.id ?? ''), title: '' },
            onEntityUpdated: entity => {
                const row = this.mapEntityToListRow(entity);
                if (row)
                    this.dashboard.listPage.updateListItem(row);
                hooks?.onEntityUpdated?.(entity);
            },
            onBulkSaved: entities => {
                for (const entity of entities) {
                    const row = this.mapEntityToListRow(entity);
                    if (row)
                        this.dashboard.listPage.updateListItem(row);
                }
                this.dashboard.listPage.clearSelection();
                hooks?.onBulkSaved?.(entities);
            },
            onFilterOpen: continueOpen => {
                let continued = false;
                const continueOnce = () => {
                    if (continued)
                        return;
                    continued = true;
                    continueOpen();
                };
                void this.runPreparation('filterOpen').then(prepared => {
                    if (!prepared)
                        return;
                    this.syncFilterOptionsFromContext();
                    const result = hooks?.onFilterOpen?.(continueOnce);
                    if (result !== false)
                        continueOnce();
                });
                return false;
            },
            prepareCreateRouteOpen: async () => {
                const prepared = await this.runPreparation('createOpen');
                if (prepared)
                    this.syncCreateContextFromPreparation();
                return prepared;
            },
        };
    }
    syncFilterOptionsFromContext() {
        const context = this.options?.preparationContext;
        const donorOptions = context?.['donorOptions'];
        if (Array.isArray(donorOptions)) {
            this.dashboard.listPageAdapter.setAsyncFilterOptions(donorOptions);
        }
    }
    syncCreateContextFromPreparation() {
        const context = this.options?.preparationContext;
        const createOptions = context?.['createOptions'];
        if (createOptions && typeof createOptions === 'object') {
            Object.assign(this.dashboard.getCreateContext(), createOptions);
        }
    }
    installDetailEditPreparation() {
        const detailPage = this.dashboard.detailPage;
        const enterEdit = detailPage.enterEdit.bind(detailPage);
        detailPage.enterEdit = () => {
            void this.runPreparation('editPrepare').then(prepared => {
                if (!prepared)
                    return;
                if (this.hasEditStepper) {
                    this.openDetailEditStepper();
                    return;
                }
                enterEdit();
            });
        };
    }
    initActionForm() {
        this.actionForm.init({
            resolveConfig: id => this.options?.config.actionForms?.[id],
            refData: () => this.options?.refData ?? {},
            activeChip: () => this.dashboard.listPage.activeChip,
            permissions: () => this.dashboard.permissions,
            preparationContext: () => this.options?.preparationContext,
            setFormValue: this.options?.hooks?.setFormValue,
            onSaved: saved => this.applyActionFormSuccess(saved),
            onError: error => {
                this.options?.hooks?.onSaveError?.(error);
                this.notify({
                    level: 'error',
                    message: 'Unable to save this action.',
                    error,
                });
            },
            onValidationError: message => this.notify({ level: 'error', message }),
        });
    }
    applyActionFormSuccess(saved) {
        const success = saved.config.success ?? {};
        const mode = success.mode ?? 'updateEntity';
        const updated = saved.result && typeof saved.result === 'object'
            ? saved.result
            : undefined;
        this.actionForm.close();
        if (mode === 'reloadList') {
            this.dashboard.listPage.reloadList();
        }
        else if (mode === 'updateEntity' && updated) {
            const row = this.mapEntityToListRow(updated);
            if (row)
                this.dashboard.listPage.updateListItem(row);
            this.options?.hooks?.onEntityUpdated?.(updated);
        }
        if (success.reopenDetail) {
            const entity = updated ?? saved.entity;
            if (entity !== undefined)
                this.dashboard.detailPage.openEntity(entity);
        }
        if (success.message) {
            this.notify({ level: 'success', message: success.message });
        }
    }
    openDetailEditStepper() {
        const entity = this.dashboard.detailPage.selected;
        const config = this.buildDetailEditActionForm();
        if (!entity || !config)
            return false;
        return this.actionForm.openWith(LIST_DETAIL_EDIT_FORM_ID, config, entity);
    }
    openBulkEditStepper(entities) {
        const bulkEdit = this.options?.config.bulkEdit;
        if (!bulkEdit || !entities.length || !bulkEdit.validateSelection(entities))
            return false;
        const config = this.buildBulkEditActionForm(entities);
        if (!config)
            return false;
        return this.actionForm.openWith(LIST_BULK_EDIT_FORM_ID, config, entities[0]);
    }
    /** Adapts `detail.edit` stepper hooks onto the shared action-form contract. */
    buildDetailEditActionForm() {
        const detail = this.options?.config.detail;
        const edit = detail?.edit;
        if (!detail || !edit?.buildStepDefinition)
            return undefined;
        const editContext = (entity) => ({
            entity,
            refData: this.options?.refData ?? {},
        });
        return {
            kind: 'stepper',
            // Mirrors the in-sheet edit header so both edit flows read the same.
            title: entity => `${detail.getTitle(entity)} — Edit`,
            steps: edit.steps,
            customSteps: edit.customSteps,
            documentTypes: edit.documentTypes,
            buildStepDefinition: (stepId, values, ctx) => edit.buildStepDefinition(stepId, values, editContext(ctx.entity)),
            resolveSteps: edit.resolveSteps,
            validateStep: (stepId, values, ctx) => edit.validateStep?.(stepId, values, editContext(ctx.entity)),
            defaultValues: entity => edit.entityToEditValues(entity),
            validateBeforeSave: ctx => edit.validateBeforeSave?.({
                entity: ctx.entity,
                refData: ctx.refData,
                values: ctx.values,
                documents: ctx.documents,
                existingDocumentCount: 0,
                customStepData: ctx.customStepData,
            }),
            save: ctx => edit.save({
                entity: ctx.entity,
                refData: ctx.refData,
                values: ctx.values,
                documents: ctx.documents,
                existingDocumentCount: 0,
                customStepData: ctx.customStepData,
            }),
            success: { mode: 'updateEntity', reopenDetail: true },
        };
    }
    /** Adapts `bulkEdit` stepper hooks onto the shared action-form contract. */
    buildBulkEditActionForm(entities) {
        const bulkEdit = this.options?.config.bulkEdit;
        if (!bulkEdit?.buildStepDefinition)
            return undefined;
        const bulkContext = (template) => ({
            template,
            entities,
            refData: this.options?.refData ?? {},
        });
        return {
            kind: 'stepper',
            title: () => bulkEdit.title ?? 'Bulk Update',
            steps: bulkEdit.steps,
            customSteps: bulkEdit.customSteps,
            documentTypes: bulkEdit.documentTypes,
            buildStepDefinition: (stepId, values, ctx) => bulkEdit.buildStepDefinition(stepId, values, bulkContext(ctx.entity)),
            resolveSteps: bulkEdit.resolveSteps,
            validateStep: (stepId, values, ctx) => bulkEdit.validateStep?.(stepId, values, bulkContext(ctx.entity)),
            defaultValues: entity => bulkEdit.entityToEditValues(entity),
            validateBeforeSave: ctx => bulkEdit.validateBeforeSave?.(ctx.entity, ctx.values, ctx.documents, ctx.refData),
            save: ctx => bulkEdit.save(entities, ctx.values, ctx.documents, ctx.customStepData).pipe(tap((updatedEntities) => {
                for (const entity of updatedEntities) {
                    const row = this.mapEntityToListRow(entity);
                    if (row)
                        this.dashboard.listPage.updateListItem(row);
                }
                this.dashboard.listPage.clearSelection();
                this.options?.hooks?.onBulkSaved?.(updatedEntities);
            })),
            success: { mode: 'none' },
        };
    }
    async runPreparationTasks(taskIds) {
        try {
            await this.preparation.prepareTasks(taskIds);
            return !this.destroyed;
        }
        catch (error) {
            if (this.destroyed)
                return false;
            this.options?.hooks?.onPreparationError?.('operation', error);
            this.notify({
                level: 'error',
                message: 'Unable to prepare this action.',
                error,
            });
            return false;
        }
    }
    async runPreparation(trigger) {
        try {
            await this.preparation.prepare(trigger);
            return !this.destroyed;
        }
        catch (error) {
            if (this.destroyed)
                return false;
            this.options?.hooks?.onPreparationError?.(trigger, error);
            this.options?.hooks?.notify?.({
                level: 'error',
                message: `Unable to prepare ${trigger}.`,
                error,
            });
            return false;
        }
    }
}

class ListRowTemplateDirective {
    template;
    constructor(template) {
        this.template = template;
    }
    static ngTemplateContextGuard(_directive, _context) {
        return true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: ListRowTemplateDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "21.2.21", type: ListRowTemplateDirective, isStandalone: true, selector: "ng-template[listRow]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: ListRowTemplateDirective, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[listRow]', standalone: true }]
        }], ctorParameters: () => [{ type: i0.TemplateRef }] });
class ListFloatingActionsDirective {
    template;
    constructor(template) {
        this.template = template;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: ListFloatingActionsDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "21.2.21", type: ListFloatingActionsDirective, isStandalone: true, selector: "ng-template[listFloatingActions]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: ListFloatingActionsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ng-template[listFloatingActions]',
                    standalone: true,
                }]
        }], ctorParameters: () => [{ type: i0.TemplateRef }] });
class ListBulkActionsDirective {
    template;
    constructor(template) {
        this.template = template;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: ListBulkActionsDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "21.2.21", type: ListBulkActionsDirective, isStandalone: true, selector: "ng-template[listBulkActions]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: ListBulkActionsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ng-template[listBulkActions]',
                    standalone: true,
                }]
        }], ctorParameters: () => [{ type: i0.TemplateRef }] });
class ListDetailFooterActionsDirective {
    template;
    constructor(template) {
        this.template = template;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: ListDetailFooterActionsDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "21.2.21", type: ListDetailFooterActionsDirective, isStandalone: true, selector: "ng-template[listDetailFooterActions]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: ListDetailFooterActionsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ng-template[listDetailFooterActions]',
                    standalone: true,
                }]
        }], ctorParameters: () => [{ type: i0.TemplateRef }] });
/** Rendered above the detail body in view mode (avatar, badges, summary chips). */
class ListDetailHeroDirective {
    template;
    constructor(template) {
        this.template = template;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: ListDetailHeroDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "21.2.21", type: ListDetailHeroDirective, isStandalone: true, selector: "ng-template[listDetailHero]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: ListDetailHeroDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ng-template[listDetailHero]',
                    standalone: true,
                }]
        }], ctorParameters: () => [{ type: i0.TemplateRef }] });
/** Rendered below detail sections in view mode (comments, related panels, etc.). */
class ListDetailViewExtrasDirective {
    template;
    constructor(template) {
        this.template = template;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: ListDetailViewExtrasDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "21.2.21", type: ListDetailViewExtrasDirective, isStandalone: true, selector: "ng-template[listDetailViewExtras]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: ListDetailViewExtrasDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ng-template[listDetailViewExtras]',
                    standalone: true,
                }]
        }], ctorParameters: () => [{ type: i0.TemplateRef }] });
class ListOverlayDirective {
    template;
    constructor(template) {
        this.template = template;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: ListOverlayDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "21.2.21", type: ListOverlayDirective, isStandalone: true, selector: "ng-template[listOverlay]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: ListOverlayDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ng-template[listOverlay]',
                    standalone: true,
                }]
        }], ctorParameters: () => [{ type: i0.TemplateRef }] });

function toListRowLinkEvent(event) {
    return {
        item: event.item,
        linkId: event.linkId,
    };
}

class ListDashboardComponent {
    fileUploadComponent;
    config;
    refData = {};
    routeContext;
    formContext;
    forEventId;
    hooks;
    documentUploadHint = 'Upload a supporting image or PDF';
    /** Engine options (e.g. phone country codes) applied to create, edit and bulk-edit forms. */
    formEngineOptions;
    rowUpdate = new EventEmitter();
    rowLinkClick = new EventEmitter();
    createComplete = new EventEmitter();
    saveError = new EventEmitter();
    notification = new EventEmitter();
    customRowTemplate;
    floatingActions;
    bulkActions;
    detailFooterActions;
    detailHero;
    detailViewExtras;
    overlay;
    controller;
    fileUploadMaxSize = 2 * 1024 * 1024;
    constructor(route, router, cache, preparation, fileUploadComponent) {
        this.fileUploadComponent = fileUploadComponent;
        this.route = route;
        this.router = router;
        this.controller = new ListDashboardRuntime(cache, preparation);
    }
    route;
    router;
    ngOnChanges(changes) {
        if (!this.config)
            return;
        if ('refData' in changes && this.controller.initialized
            && !('config' in changes) && !('routeContext' in changes)
            && !('formContext' in changes) && !('forEventId' in changes)) {
            this.controller.setRefData(this.refData);
            return;
        }
        void this.controller.init({
            config: this.config,
            route: this.route,
            router: this.router,
            refData: this.refData,
            forEventId: this.forEventId,
            preparationContext: this.routeContext,
            formContext: this.formContext ?? {
                dashboardId: this.config.meta.id,
                data: this.asFormData(this.routeContext),
            },
            hooks: {
                ...this.hooks,
                onEntityUpdated: entity => {
                    this.hooks?.onEntityUpdated?.(entity);
                    this.rowUpdate.emit(entity);
                },
                onSaveError: error => {
                    this.hooks?.onSaveError?.(error);
                    this.saveError.emit(error);
                },
                onBulkSaveError: error => {
                    this.hooks?.onBulkSaveError?.(error);
                    this.saveError.emit(error);
                },
                onCreated: result => {
                    this.hooks?.onCreated?.(result);
                    this.createComplete.emit(result);
                },
                onCreateError: error => {
                    this.hooks?.onCreateError?.(error);
                    this.saveError.emit(error);
                },
                notify: value => {
                    this.hooks?.notify?.(value);
                    this.notification.emit(value);
                },
            },
        });
    }
    ngOnDestroy() {
        this.controller.destroy();
    }
    get selectedEntities() {
        const selected = this.controller.dashboard.listPage.selectedIds;
        return this.controller.dashboard.listPage.listItems
            .filter(item => selected.includes(item.id))
            .map(item => item.payload)
            .filter((entity) => entity !== undefined);
    }
    get visibleBulkActions() {
        return this.visibleActions(this.config.actions?.bulk);
    }
    get visibleDetailFooterActions() {
        // Footer actions always act on the selected entity, and this getter is read
        // on every change detection pass (including while the sheet is closed), so
        // `when` predicates must never run without one.
        const entity = this.controller.dashboard.detailPage.selected;
        if (entity === undefined)
            return [];
        return this.visibleActions(this.config.actions?.detailFooter, { entity });
    }
    get visibleDetailMenuActions() {
        const entity = this.controller.dashboard.detailPage.selected;
        if (entity === undefined)
            return [];
        return this.visibleActions(this.config.actions?.detailMenu, { entity });
    }
    get visibleFloatingActions() {
        return this.visibleActions(this.config.actions?.floating);
    }
    /**
     * Row overflow actions for a single row. Evaluated per row rather than via
     * {@link visibleActions} so long lists don't recompute the whole selection
     * on every change detection pass.
     */
    rowMenuActionsFor(row) {
        const actions = this.config.actions?.rowMenu;
        if (!actions?.length)
            return [];
        const entity = row.payload;
        if (entity === undefined)
            return [];
        const ctx = {
            ...this.controller.dashboard.buildContext(),
            selection: [entity],
            entity,
        };
        return actions.filter(action => action.when?.(ctx) ?? true);
    }
    hasRowMenuActions(row) {
        return this.rowMenuActionsFor(row).length > 0;
    }
    onRowMenuAction(action, row) {
        const entity = row.payload;
        this.controller.runAction(action.run, entity ? [entity] : [], action.actionFormId);
    }
    /**
     * The detail sheet steps aside while an action form (including the stepper
     * edit and bulk-edit flows) is open, so the two sheets never stack. Detail
     * state is kept, so closing the action form restores the sheet as it was.
     */
    get detailSheetOpen() {
        return this.controller.dashboard.detailPage.open && !this.controller.actionForm.open;
    }
    /** True when `detail.edit` runs as a stepper instead of the single-form sheet body. */
    get hasEditStepper() {
        return this.controller.hasEditStepper;
    }
    /** True when `bulkEdit` runs as a stepper instead of the bulk single-form sheet. */
    get hasBulkEditStepper() {
        return this.controller.hasBulkEditStepper;
    }
    onRowClick(row) {
        void this.controller.openDetail(row);
    }
    onRowLinkClick(event) {
        const linkEvent = toListRowLinkEvent(event);
        this.rowLinkClick.emit(linkEvent);
        const operation = this.config.operations?.[event.linkId];
        if (operation && linkEvent.item.payload !== undefined) {
            operation(linkEvent.item.payload, linkEvent);
        }
    }
    onCreateSave(values) {
        this.controller.submitCreate(values);
    }
    onCreateValuesChange(values) {
        this.config.create?.onValuesChange?.(values, this.controller.dashboard.getCreateContext());
    }
    onAction(action) {
        this.controller.runAction(action.run, this.selectedEntities, action.actionFormId);
    }
    onDetailAction(action) {
        const entity = this.controller.dashboard.detailPage.selected;
        this.controller.runAction(action.run, entity ? [entity] : [], action.actionFormId);
    }
    onValidationError(message) {
        this.controller.notify({ level: 'error', message });
    }
    visibleActions(actions, extra) {
        if (!actions?.length)
            return [];
        const ctx = {
            ...this.controller.dashboard.buildContext(),
            selection: this.selectedEntities,
            entity: extra?.entity,
        };
        return actions.filter(action => action.when?.(ctx) ?? true);
    }
    asFormData(context) {
        return context && typeof context === 'object'
            ? context
            : undefined;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: ListDashboardComponent, deps: [{ token: i1$1.ActivatedRoute }, { token: i1$1.Router }, { token: ListFormCache }, { token: ListPreparationService }, { token: ULD_FILE_UPLOAD }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.21", type: ListDashboardComponent, isStandalone: true, selector: "na-list-dashboard", inputs: { config: "config", refData: "refData", routeContext: "routeContext", formContext: "formContext", forEventId: "forEventId", hooks: "hooks", documentUploadHint: "documentUploadHint", formEngineOptions: "formEngineOptions" }, outputs: { rowUpdate: "rowUpdate", rowLinkClick: "rowLinkClick", createComplete: "createComplete", saveError: "saveError", notification: "notification" }, providers: [
            ListFormCache,
            ListPreparationService,
        ], queries: [{ propertyName: "customRowTemplate", first: true, predicate: ListRowTemplateDirective, descendants: true }, { propertyName: "floatingActions", first: true, predicate: ListFloatingActionsDirective, descendants: true }, { propertyName: "bulkActions", first: true, predicate: ListBulkActionsDirective, descendants: true }, { propertyName: "detailFooterActions", first: true, predicate: ListDetailFooterActionsDirective, descendants: true }, { propertyName: "detailHero", first: true, predicate: ListDetailHeroDirective, descendants: true }, { propertyName: "detailViewExtras", first: true, predicate: ListDetailViewExtrasDirective, descendants: true }, { propertyName: "overlay", first: true, predicate: ListOverlayDirective, descendants: true }], usesOnChanges: true, ngImport: i0, template: "<section class=\"list-dashboard\" [attr.aria-busy]=\"controller.loading || controller.preparation.loading\">\n  <div *ngIf=\"controller.loading\" class=\"list-dashboard__state\" role=\"status\">\n    Loading {{ config.meta.title || 'list' }}\u2026\n  </div>\n\n  <div *ngIf=\"controller.error && !controller.loading\" class=\"list-dashboard__state list-dashboard__state--error\" role=\"alert\">\n    <p>Unable to load {{ config.meta.title || 'this list' }}.</p>\n    <button type=\"button\" class=\"app-btn app-btn--primary\" (click)=\"controller.retry()\">\n      Retry\n    </button>\n  </div>\n\n  <ng-container *ngIf=\"controller.initialized\">\n    <app-filtered-list-page\n      [controller]=\"controller.dashboard.listPage\"\n      [searchPlaceholder]=\"controller.dashboard.searchPlaceholder\"\n      [filterSheetTitle]=\"controller.dashboard.filterSheetTitle\"\n      [emptyMessage]=\"controller.dashboard.emptyMessage\"\n      [selectable]=\"controller.dashboard.isListSelectable()\"\n      (rowClick)=\"onRowClick($event)\"\n      (rowLinkClick)=\"onRowLinkClick($event)\">\n      <ng-template #rowTemplate let-row>\n        <ng-container\n          *ngIf=\"customRowTemplate; else defaultRow\"\n          [ngTemplateOutlet]=\"customRowTemplate.template\"\n          [ngTemplateOutletContext]=\"{ $implicit: row, entity: row.payload }\">\n        </ng-container>\n        <ng-template #defaultRow>\n          <app-infinite-list-row\n            [item]=\"row\"\n            (rowLinkClick)=\"onRowLinkClick($event)\">\n          </app-infinite-list-row>\n        </ng-template>\n      </ng-template>\n\n      <ng-template #rowTrailing let-row>\n        <button\n          *ngIf=\"hasRowMenuActions(row)\"\n          type=\"button\"\n          class=\"list-dashboard__row-menu-btn\"\n          aria-label=\"More actions\"\n          [matMenuTriggerFor]=\"rowActionsMenu\"\n          [matMenuTriggerData]=\"{ row: row }\"\n          (click)=\"$event.stopPropagation()\">\n          <mat-icon>more_vert</mat-icon>\n        </button>\n      </ng-template>\n\n      <div bulkActions *ngIf=\"bulkActions || visibleBulkActions.length\">\n        <ng-container\n          *ngIf=\"bulkActions\"\n          [ngTemplateOutlet]=\"bulkActions.template\"\n          [ngTemplateOutletContext]=\"{\n            $implicit: selectedEntities,\n            controller: controller\n          }\">\n        </ng-container>\n        <ng-container *ngIf=\"!bulkActions\">\n          <button\n            *ngFor=\"let action of visibleBulkActions\"\n            type=\"button\"\n            class=\"app-btn\"\n            [class.app-btn--primary]=\"action.appearance !== 'secondary'\"\n            (click)=\"onAction(action)\">\n            {{ action.label }}\n          </button>\n        </ng-container>\n      </div>\n\n      <div listOverlays *ngIf=\"overlay\">\n        <ng-container\n          [ngTemplateOutlet]=\"overlay.template\"\n          [ngTemplateOutletContext]=\"{ $implicit: controller }\">\n        </ng-container>\n      </div>\n    </app-filtered-list-page>\n\n    <mat-menu #rowActionsMenu=\"matMenu\" xPosition=\"before\">\n      <ng-template matMenuContent let-row=\"row\">\n        <button\n          *ngFor=\"let action of rowMenuActionsFor(row)\"\n          type=\"button\"\n          mat-menu-item\n          (click)=\"onRowMenuAction(action, row)\">\n          <mat-icon *ngIf=\"action.icon\">{{ action.icon }}</mat-icon>\n          <span>{{ action.label }}</span>\n        </button>\n      </ng-template>\n    </mat-menu>\n\n    <div class=\"list-dashboard__floating-actions\">\n      <ng-container\n        *ngIf=\"floatingActions\"\n        [ngTemplateOutlet]=\"floatingActions.template\"\n        [ngTemplateOutletContext]=\"{\n          $implicit: selectedEntities,\n          controller: controller\n        }\">\n      </ng-container>\n      <ng-container *ngIf=\"!floatingActions\">\n        <button\n          *ngFor=\"let action of visibleFloatingActions\"\n          type=\"button\"\n          class=\"app-btn\"\n          [class.app-btn--primary]=\"action.appearance !== 'secondary'\"\n          [class.list-dashboard__fab]=\"action.appearance === 'fab'\"\n          [attr.aria-label]=\"action.label\"\n          [attr.title]=\"action.label\"\n          (click)=\"onAction(action)\">\n          <mat-icon *ngIf=\"action.appearance === 'fab'\">{{ action.icon || 'add' }}</mat-icon>\n          <span *ngIf=\"action.appearance !== 'fab'\">{{ action.label }}</span>\n        </button>\n        <button\n          *ngIf=\"!visibleFloatingActions.length && controller.dashboard.showCreateFab\"\n          type=\"button\"\n          class=\"app-btn app-btn--primary\"\n          (click)=\"controller.openCreate()\">\n          Create\n        </button>\n      </ng-container>\n    </div>\n\n    <app-list-detail-sheet\n      [open]=\"detailSheetOpen\"\n      [mode]=\"controller.dashboard.detailPage.mode\"\n      [title]=\"controller.dashboard.detailPage.title\"\n      [sections]=\"controller.dashboard.detailPage.sections\"\n      [loading]=\"controller.dashboard.detailPage.loading\"\n      [saving]=\"controller.dashboard.detailPage.saving\"\n      [primaryActionLabel]=\"controller.dashboard.detailPage.primaryActionLabel\"\n      [editSummary]=\"controller.dashboard.detailPage.editSummary\"\n      [editDefinition]=\"controller.dashboard.detailPage.editDefinition\"\n      [editInitialValues]=\"controller.dashboard.detailPage.editInitialValues\"\n      [editEngineOptions]=\"formEngineOptions\"\n      [editShowDocumentUpload]=\"controller.dashboard.detailPage.editShowDocumentUpload\"\n      [editDocumentUploadHint]=\"documentUploadHint\"\n      [editDocumentUploadError]=\"controller.dashboard.detailPage.editDocumentError\"\n      [editDocumentAllowedTypes]=\"controller.dashboard.detailPage.editDocumentAllowedTypes\"\n      [hasFooterActions]=\"!!detailFooterActions || !!visibleDetailFooterActions.length\"\n      (closed)=\"controller.dashboard.detailPage.close()\"\n      (primaryAction)=\"controller.enterDetailEdit()\"\n      (editCancel)=\"controller.dashboard.detailPage.cancelEdit()\"\n      (editSave)=\"controller.dashboard.detailPage.onEditSave($event)\"\n      (editValuesChange)=\"controller.dashboard.detailPage.onEditValuesChange($event)\"\n      (editDocumentsChange)=\"controller.dashboard.detailPage.onEditDocumentsChange($event)\">\n      <div detailHero *ngIf=\"detailHero\">\n        <ng-container\n          [ngTemplateOutlet]=\"detailHero.template\"\n          [ngTemplateOutletContext]=\"{\n            $implicit: controller.dashboard.detailPage.selected,\n            controller: controller\n          }\">\n        </ng-container>\n      </div>\n\n      <div detailViewExtras *ngIf=\"detailViewExtras\">\n        <ng-container\n          [ngTemplateOutlet]=\"detailViewExtras.template\"\n          [ngTemplateOutletContext]=\"{\n            $implicit: controller.dashboard.detailPage.selected,\n            controller: controller\n          }\">\n        </ng-container>\n      </div>\n\n      <div\n        detailHeaderActions\n        class=\"list-dashboard__detail-header-actions\"\n        *ngIf=\"controller.dashboard.detailPage.mode === 'view' && visibleDetailMenuActions.length\">\n        <button\n          type=\"button\"\n          class=\"list-dashboard__detail-menu-btn\"\n          aria-label=\"More actions\"\n          [matMenuTriggerFor]=\"detailActionsMenu\">\n          <mat-icon>more_vert</mat-icon>\n        </button>\n      </div>\n\n      <div\n        detailFooterActions\n        class=\"list-dashboard__detail-footer-actions\"\n        *ngIf=\"detailFooterActions || visibleDetailFooterActions.length\">\n        <ng-container\n          *ngIf=\"detailFooterActions\"\n          [ngTemplateOutlet]=\"detailFooterActions.template\"\n          [ngTemplateOutletContext]=\"{\n            $implicit: controller.dashboard.detailPage.selected,\n            controller: controller\n          }\">\n        </ng-container>\n        <ng-container *ngIf=\"!detailFooterActions\">\n          <button\n            *ngFor=\"let action of visibleDetailFooterActions\"\n            type=\"button\"\n            class=\"app-btn\"\n            [class.app-btn--primary]=\"action.appearance !== 'secondary'\"\n            [class.app-btn--secondary]=\"action.appearance === 'secondary'\"\n            (click)=\"onDetailAction(action)\">\n            {{ action.label }}\n          </button>\n        </ng-container>\n      </div>\n    </app-list-detail-sheet>\n\n    <mat-menu #detailActionsMenu=\"matMenu\" xPosition=\"before\">\n      <button\n        *ngFor=\"let action of visibleDetailMenuActions\"\n        type=\"button\"\n        mat-menu-item\n        (click)=\"onDetailAction(action)\">\n        <mat-icon *ngIf=\"action.icon\">{{ action.icon }}</mat-icon>\n        <span>{{ action.label }}</span>\n      </button>\n    </mat-menu>\n\n    <app-list-create-sheet\n      *ngIf=\"controller.dashboard.hasCreateForm\"\n      [open]=\"controller.dashboard.createPage.open\"\n      [title]=\"config.meta.title ? 'Create ' + config.meta.title : 'Create'\"\n      [definition]=\"controller.dashboard.createDefinition\"\n      [initialValues]=\"controller.dashboard.createInitialValues\"\n      [engineOptions]=\"formEngineOptions\"\n      [saveLabel]=\"config.create?.saveLabel ?? 'Create'\"\n      [saving]=\"controller.createSaving\"\n      (dismissed)=\"controller.dashboard.createPage.close()\"\n      (valuesChange)=\"onCreateValuesChange($event)\"\n      (saved)=\"onCreateSave($event)\">\n    </app-list-create-sheet>\n\n    <app-list-create-stepper-sheet\n      *ngIf=\"controller.dashboard.hasCreateStepper\"\n      [open]=\"controller.dashboard.createPage.open\"\n      [title]=\"config.meta.title ? 'Create ' + config.meta.title : 'Create'\"\n      [steps]=\"controller.dashboard.createSteps\"\n      [buildStepDefinition]=\"controller.dashboard.buildCreateStepDefinition\"\n      [resolveSteps]=\"controller.dashboard.resolveCreateSteps\"\n      [validateStep]=\"controller.dashboard.validateCreateStep\"\n      [prepareStep]=\"controller.dashboard.prepareCreateStep\"\n      [initialValues]=\"controller.dashboard.createInitialValues\"\n      [engineOptions]=\"formEngineOptions\"\n      [saving]=\"controller.createSaving\"\n      [customSteps]=\"config.create?.customSteps\"\n      [customStepData]=\"controller.createCustomStepData\"\n      (customStepDataChange)=\"controller.onCreateCustomStepDataChange($event)\"\n      (dismissed)=\"controller.dashboard.createPage.close()\"\n      (validationError)=\"onValidationError($event)\"\n      (completed)=\"onCreateSave($event)\">\n    </app-list-create-stepper-sheet>\n\n    <app-list-detail-sheet\n      [open]=\"controller.dashboard.bulkEditPage.open\"\n      mode=\"edit\"\n      [title]=\"controller.dashboard.bulkEditPage.title\"\n      [saving]=\"controller.dashboard.bulkEditPage.saving\"\n      [editSummary]=\"controller.dashboard.bulkEditPage.editSummary\"\n      [editDefinition]=\"controller.dashboard.bulkEditPage.editDefinition\"\n      [editInitialValues]=\"controller.dashboard.bulkEditPage.editInitialValues\"\n      [editEngineOptions]=\"formEngineOptions\"\n      [editShowDocumentUpload]=\"controller.dashboard.bulkEditPage.editShowDocumentUpload\"\n      [editDocumentUploadHint]=\"documentUploadHint\"\n      [editDocumentUploadError]=\"controller.dashboard.bulkEditPage.editDocumentError\"\n      [editDocumentAllowedTypes]=\"controller.dashboard.bulkEditPage.editDocumentAllowedTypes\"\n      (editCancel)=\"controller.dashboard.bulkEditPage.close()\"\n      (editSave)=\"controller.dashboard.bulkEditPage.onEditSave($event)\"\n      (editValuesChange)=\"controller.dashboard.bulkEditPage.onEditValuesChange($event)\"\n      (editDocumentsChange)=\"controller.dashboard.bulkEditPage.onEditDocumentsChange($event)\">\n    </app-list-detail-sheet>\n\n    <!--\n      Action forms (config `actionForms`) plus the detail-edit and bulk-edit\n      stepper flows all render through the shared action-form controller.\n    -->\n    <app-list-create-sheet\n      *ngIf=\"controller.actionForm.open && controller.actionForm.kind === 'form'\"\n      [open]=\"controller.actionForm.open\"\n      [title]=\"controller.actionForm.title\"\n      [definition]=\"controller.actionForm.definition\"\n      [initialValues]=\"controller.actionForm.initialValues\"\n      [engineOptions]=\"formEngineOptions\"\n      [saving]=\"controller.actionForm.saving || controller.actionForm.loading\"\n      [saveLabel]=\"controller.actionForm.saveLabel\"\n      idPrefix=\"list-action-form\"\n      (valuesChange)=\"controller.actionForm.onValuesChange($event)\"\n      (dismissed)=\"controller.actionForm.close()\"\n      (saved)=\"controller.actionForm.submit($event)\">\n      <section *ngIf=\"controller.actionForm.showDocumentUpload\" class=\"list-dashboard__upload\">\n        <p class=\"list-dashboard__upload-hint\">\n          {{ controller.actionForm.documentUploadHint || documentUploadHint }}\n        </p>\n        <uld-dynamic-file-upload\n          [component]=\"fileUploadComponent\"\n          [allowedFileTypes]=\"controller.actionForm.documentAllowedTypes\"\n          [maxFileSize]=\"fileUploadMaxSize\"\n          (files)=\"controller.actionForm.onDocumentsChange($event)\">\n        </uld-dynamic-file-upload>\n        <div\n          *ngIf=\"controller.actionForm.documentError\"\n          class=\"cf-field-error mat-mdc-form-field-error\"\n          role=\"alert\">\n          {{ controller.actionForm.documentError }}\n        </div>\n      </section>\n    </app-list-create-sheet>\n\n    <app-list-create-stepper-sheet\n      *ngIf=\"controller.actionForm.open && controller.actionForm.kind === 'stepper'\"\n      [open]=\"controller.actionForm.open\"\n      [title]=\"controller.actionForm.title\"\n      [steps]=\"controller.actionForm.steps\"\n      [buildStepDefinition]=\"controller.actionForm.buildStepDefinition\"\n      [resolveSteps]=\"controller.actionForm.resolveSteps\"\n      [validateStep]=\"controller.actionForm.validateStep\"\n      [prepareStep]=\"controller.actionForm.prepareStep\"\n      [initialValues]=\"controller.actionForm.initialValues\"\n      [customSteps]=\"controller.actionForm.customSteps\"\n      [customStepData]=\"controller.actionForm.customStepData\"\n      [engineOptions]=\"formEngineOptions\"\n      [saving]=\"controller.actionForm.saving\"\n      [completeLabel]=\"controller.actionForm.saveLabel\"\n      idPrefix=\"list-action-form-stepper\"\n      (customStepDataChange)=\"controller.actionForm.onCustomStepDataChange($event)\"\n      (validationError)=\"onValidationError($event)\"\n      (dismissed)=\"controller.actionForm.close()\"\n      (completed)=\"controller.actionForm.submit($event)\">\n    </app-list-create-stepper-sheet>\n  </ng-container>\n</section>\n", styles: [":host{display:block}.list-dashboard{min-height:8rem;position:relative}.list-dashboard__state{align-items:center;display:flex;flex-direction:column;gap:.75rem;justify-content:center;min-height:8rem;padding:1.5rem;text-align:center}.list-dashboard__state--error{color:var(--mat-sys-error, #b3261e)}.list-dashboard__upload{display:flex;flex-direction:column;gap:.5rem;margin-top:1rem}.list-dashboard__upload-hint{color:var(--mat-sys-on-surface-variant, #4b5563);font-size:.8125rem;margin:0}.list-dashboard__floating-actions{bottom:var(--uld-fab-bottom, 32px);display:flex;gap:.5rem;justify-content:flex-end;pointer-events:none;position:fixed;right:var(--uld-fab-right, 32px);z-index:var(--uld-fab-z-index, 220)}@media(max-width:767px){.list-dashboard__floating-actions{bottom:var(--uld-fab-bottom-mobile, calc(72px + env(safe-area-inset-bottom, 0px)) );right:var(--uld-fab-right-mobile, 16px)}}.list-dashboard__floating-actions>*{pointer-events:auto}.list-dashboard__fab{align-items:center;background:var(--primary-500, #f97316);border:0;border-radius:50%;box-shadow:0 6px 18px #0f172a33;color:#fff;cursor:pointer;display:inline-flex;font-size:var(--uld-fab-icon-size, 22px);height:var(--uld-fab-size, 48px);justify-content:center;line-height:1;min-width:0;padding:0;transition:background .2s ease,box-shadow .2s ease;width:var(--uld-fab-size, 48px)}.list-dashboard__fab:hover{background:var(--primary-600, #ea580c);box-shadow:0 8px 24px #0f172a47}.list-dashboard__fab mat-icon{font-size:var(--uld-fab-icon-size, 22px);height:var(--uld-fab-icon-size, 22px);line-height:var(--uld-fab-icon-size, 22px);width:var(--uld-fab-icon-size, 22px)}.list-dashboard__row-menu-btn,.list-dashboard__detail-menu-btn{align-items:center;background:transparent;border:none;border-radius:999px;color:var(--secondary-600, #475569);cursor:pointer;display:inline-flex;height:32px;justify-content:center;padding:0;width:32px}.list-dashboard__row-menu-btn:hover,.list-dashboard__row-menu-btn:focus-visible,.list-dashboard__detail-menu-btn:hover,.list-dashboard__detail-menu-btn:focus-visible{background:#f1f5f9}.list-dashboard__row-menu-btn mat-icon,.list-dashboard__detail-menu-btn mat-icon{font-size:20px;height:20px;line-height:20px;width:20px}.list-dashboard__detail-header-actions{display:flex;align-items:center}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i5.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: MatMenuModule }, { kind: "component", type: i6.MatMenu, selector: "mat-menu", inputs: ["backdropClass", "aria-label", "aria-labelledby", "aria-describedby", "xPosition", "yPosition", "overlapTrigger", "hasBackdrop", "class", "classList"], outputs: ["closed", "close"], exportAs: ["matMenu"] }, { kind: "component", type: i6.MatMenuItem, selector: "[mat-menu-item]", inputs: ["role", "disabled", "disableRipple"], exportAs: ["matMenuItem"] }, { kind: "directive", type: i6.MatMenuContent, selector: "ng-template[matMenuContent]" }, { kind: "directive", type: i6.MatMenuTrigger, selector: "[mat-menu-trigger-for], [matMenuTriggerFor]", inputs: ["mat-menu-trigger-for", "matMenuTriggerFor", "matMenuTriggerData", "matMenuTriggerRestoreFocus"], outputs: ["menuOpened", "onMenuOpen", "menuClosed", "onMenuClose"], exportAs: ["matMenuTrigger"] }, { kind: "ngmodule", type: UniversalListDashboardModule }, { kind: "component", type: InfiniteListRowComponent, selector: "app-infinite-list-row", inputs: ["item"], outputs: ["rowLinkClick"] }, { kind: "component", type: ListDetailSheetComponent, selector: "app-list-detail-sheet", inputs: ["open", "mode", "title", "sections", "loading", "saving", "primaryActionLabel", "editSummary", "editDefinition", "editInitialValues", "editEngineOptions", "editTitle", "editShowDocumentUpload", "editDocumentUploadLabel", "editDocumentUploadHint", "editDocumentUploadError", "editDocumentAllowedTypes", "hasFooterActions", "allowEditCancel", "allowDismiss", "hideEditForm", "hideEditActions"], outputs: ["closed", "primaryAction", "editSave", "editCancel", "editValuesChange", "editDocumentsChange"] }, { kind: "component", type: FilteredListPageComponent, selector: "app-filtered-list-page", inputs: ["controller", "searchPlaceholder", "emptyMessage", "showToolbar", "selectable", "filterSheetTitle"], outputs: ["rowClick", "rowLinkClick"] }, { kind: "component", type: DynamicFileUploadComponent, selector: "uld-dynamic-file-upload", inputs: ["component", "allowedFileTypes", "maxFileSize"], outputs: ["files"] }, { kind: "component", type: ListCreateSheetComponent, selector: "app-list-create-sheet", inputs: ["open", "title", "hint", "definition", "initialValues", "engineOptions", "idPrefix", "saveLabel", "saving"], outputs: ["dismissed", "saved", "valuesChange"] }, { kind: "component", type: ListCreateStepperSheetComponent, selector: "app-list-create-stepper-sheet", inputs: ["open", "title", "hint", "steps", "buildStepDefinition", "resolveSteps", "validateStep", "prepareStep", "initialValues", "engineOptions", "idPrefix", "completeLabel", "backLabel", "nextLabel", "cancelLabel", "submittingLabel", "preparingLabel", "allowCancel", "saving", "customSteps", "customStepData"], outputs: ["dismissed", "completed", "stepChange", "validationError", "customStepDataChange"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: ListDashboardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'na-list-dashboard', standalone: true, imports: [
                        CommonModule,
                        MatIconModule,
                        MatMenuModule,
                        UniversalListDashboardModule,
                    ], providers: [
                        ListFormCache,
                        ListPreparationService,
                    ], template: "<section class=\"list-dashboard\" [attr.aria-busy]=\"controller.loading || controller.preparation.loading\">\n  <div *ngIf=\"controller.loading\" class=\"list-dashboard__state\" role=\"status\">\n    Loading {{ config.meta.title || 'list' }}\u2026\n  </div>\n\n  <div *ngIf=\"controller.error && !controller.loading\" class=\"list-dashboard__state list-dashboard__state--error\" role=\"alert\">\n    <p>Unable to load {{ config.meta.title || 'this list' }}.</p>\n    <button type=\"button\" class=\"app-btn app-btn--primary\" (click)=\"controller.retry()\">\n      Retry\n    </button>\n  </div>\n\n  <ng-container *ngIf=\"controller.initialized\">\n    <app-filtered-list-page\n      [controller]=\"controller.dashboard.listPage\"\n      [searchPlaceholder]=\"controller.dashboard.searchPlaceholder\"\n      [filterSheetTitle]=\"controller.dashboard.filterSheetTitle\"\n      [emptyMessage]=\"controller.dashboard.emptyMessage\"\n      [selectable]=\"controller.dashboard.isListSelectable()\"\n      (rowClick)=\"onRowClick($event)\"\n      (rowLinkClick)=\"onRowLinkClick($event)\">\n      <ng-template #rowTemplate let-row>\n        <ng-container\n          *ngIf=\"customRowTemplate; else defaultRow\"\n          [ngTemplateOutlet]=\"customRowTemplate.template\"\n          [ngTemplateOutletContext]=\"{ $implicit: row, entity: row.payload }\">\n        </ng-container>\n        <ng-template #defaultRow>\n          <app-infinite-list-row\n            [item]=\"row\"\n            (rowLinkClick)=\"onRowLinkClick($event)\">\n          </app-infinite-list-row>\n        </ng-template>\n      </ng-template>\n\n      <ng-template #rowTrailing let-row>\n        <button\n          *ngIf=\"hasRowMenuActions(row)\"\n          type=\"button\"\n          class=\"list-dashboard__row-menu-btn\"\n          aria-label=\"More actions\"\n          [matMenuTriggerFor]=\"rowActionsMenu\"\n          [matMenuTriggerData]=\"{ row: row }\"\n          (click)=\"$event.stopPropagation()\">\n          <mat-icon>more_vert</mat-icon>\n        </button>\n      </ng-template>\n\n      <div bulkActions *ngIf=\"bulkActions || visibleBulkActions.length\">\n        <ng-container\n          *ngIf=\"bulkActions\"\n          [ngTemplateOutlet]=\"bulkActions.template\"\n          [ngTemplateOutletContext]=\"{\n            $implicit: selectedEntities,\n            controller: controller\n          }\">\n        </ng-container>\n        <ng-container *ngIf=\"!bulkActions\">\n          <button\n            *ngFor=\"let action of visibleBulkActions\"\n            type=\"button\"\n            class=\"app-btn\"\n            [class.app-btn--primary]=\"action.appearance !== 'secondary'\"\n            (click)=\"onAction(action)\">\n            {{ action.label }}\n          </button>\n        </ng-container>\n      </div>\n\n      <div listOverlays *ngIf=\"overlay\">\n        <ng-container\n          [ngTemplateOutlet]=\"overlay.template\"\n          [ngTemplateOutletContext]=\"{ $implicit: controller }\">\n        </ng-container>\n      </div>\n    </app-filtered-list-page>\n\n    <mat-menu #rowActionsMenu=\"matMenu\" xPosition=\"before\">\n      <ng-template matMenuContent let-row=\"row\">\n        <button\n          *ngFor=\"let action of rowMenuActionsFor(row)\"\n          type=\"button\"\n          mat-menu-item\n          (click)=\"onRowMenuAction(action, row)\">\n          <mat-icon *ngIf=\"action.icon\">{{ action.icon }}</mat-icon>\n          <span>{{ action.label }}</span>\n        </button>\n      </ng-template>\n    </mat-menu>\n\n    <div class=\"list-dashboard__floating-actions\">\n      <ng-container\n        *ngIf=\"floatingActions\"\n        [ngTemplateOutlet]=\"floatingActions.template\"\n        [ngTemplateOutletContext]=\"{\n          $implicit: selectedEntities,\n          controller: controller\n        }\">\n      </ng-container>\n      <ng-container *ngIf=\"!floatingActions\">\n        <button\n          *ngFor=\"let action of visibleFloatingActions\"\n          type=\"button\"\n          class=\"app-btn\"\n          [class.app-btn--primary]=\"action.appearance !== 'secondary'\"\n          [class.list-dashboard__fab]=\"action.appearance === 'fab'\"\n          [attr.aria-label]=\"action.label\"\n          [attr.title]=\"action.label\"\n          (click)=\"onAction(action)\">\n          <mat-icon *ngIf=\"action.appearance === 'fab'\">{{ action.icon || 'add' }}</mat-icon>\n          <span *ngIf=\"action.appearance !== 'fab'\">{{ action.label }}</span>\n        </button>\n        <button\n          *ngIf=\"!visibleFloatingActions.length && controller.dashboard.showCreateFab\"\n          type=\"button\"\n          class=\"app-btn app-btn--primary\"\n          (click)=\"controller.openCreate()\">\n          Create\n        </button>\n      </ng-container>\n    </div>\n\n    <app-list-detail-sheet\n      [open]=\"detailSheetOpen\"\n      [mode]=\"controller.dashboard.detailPage.mode\"\n      [title]=\"controller.dashboard.detailPage.title\"\n      [sections]=\"controller.dashboard.detailPage.sections\"\n      [loading]=\"controller.dashboard.detailPage.loading\"\n      [saving]=\"controller.dashboard.detailPage.saving\"\n      [primaryActionLabel]=\"controller.dashboard.detailPage.primaryActionLabel\"\n      [editSummary]=\"controller.dashboard.detailPage.editSummary\"\n      [editDefinition]=\"controller.dashboard.detailPage.editDefinition\"\n      [editInitialValues]=\"controller.dashboard.detailPage.editInitialValues\"\n      [editEngineOptions]=\"formEngineOptions\"\n      [editShowDocumentUpload]=\"controller.dashboard.detailPage.editShowDocumentUpload\"\n      [editDocumentUploadHint]=\"documentUploadHint\"\n      [editDocumentUploadError]=\"controller.dashboard.detailPage.editDocumentError\"\n      [editDocumentAllowedTypes]=\"controller.dashboard.detailPage.editDocumentAllowedTypes\"\n      [hasFooterActions]=\"!!detailFooterActions || !!visibleDetailFooterActions.length\"\n      (closed)=\"controller.dashboard.detailPage.close()\"\n      (primaryAction)=\"controller.enterDetailEdit()\"\n      (editCancel)=\"controller.dashboard.detailPage.cancelEdit()\"\n      (editSave)=\"controller.dashboard.detailPage.onEditSave($event)\"\n      (editValuesChange)=\"controller.dashboard.detailPage.onEditValuesChange($event)\"\n      (editDocumentsChange)=\"controller.dashboard.detailPage.onEditDocumentsChange($event)\">\n      <div detailHero *ngIf=\"detailHero\">\n        <ng-container\n          [ngTemplateOutlet]=\"detailHero.template\"\n          [ngTemplateOutletContext]=\"{\n            $implicit: controller.dashboard.detailPage.selected,\n            controller: controller\n          }\">\n        </ng-container>\n      </div>\n\n      <div detailViewExtras *ngIf=\"detailViewExtras\">\n        <ng-container\n          [ngTemplateOutlet]=\"detailViewExtras.template\"\n          [ngTemplateOutletContext]=\"{\n            $implicit: controller.dashboard.detailPage.selected,\n            controller: controller\n          }\">\n        </ng-container>\n      </div>\n\n      <div\n        detailHeaderActions\n        class=\"list-dashboard__detail-header-actions\"\n        *ngIf=\"controller.dashboard.detailPage.mode === 'view' && visibleDetailMenuActions.length\">\n        <button\n          type=\"button\"\n          class=\"list-dashboard__detail-menu-btn\"\n          aria-label=\"More actions\"\n          [matMenuTriggerFor]=\"detailActionsMenu\">\n          <mat-icon>more_vert</mat-icon>\n        </button>\n      </div>\n\n      <div\n        detailFooterActions\n        class=\"list-dashboard__detail-footer-actions\"\n        *ngIf=\"detailFooterActions || visibleDetailFooterActions.length\">\n        <ng-container\n          *ngIf=\"detailFooterActions\"\n          [ngTemplateOutlet]=\"detailFooterActions.template\"\n          [ngTemplateOutletContext]=\"{\n            $implicit: controller.dashboard.detailPage.selected,\n            controller: controller\n          }\">\n        </ng-container>\n        <ng-container *ngIf=\"!detailFooterActions\">\n          <button\n            *ngFor=\"let action of visibleDetailFooterActions\"\n            type=\"button\"\n            class=\"app-btn\"\n            [class.app-btn--primary]=\"action.appearance !== 'secondary'\"\n            [class.app-btn--secondary]=\"action.appearance === 'secondary'\"\n            (click)=\"onDetailAction(action)\">\n            {{ action.label }}\n          </button>\n        </ng-container>\n      </div>\n    </app-list-detail-sheet>\n\n    <mat-menu #detailActionsMenu=\"matMenu\" xPosition=\"before\">\n      <button\n        *ngFor=\"let action of visibleDetailMenuActions\"\n        type=\"button\"\n        mat-menu-item\n        (click)=\"onDetailAction(action)\">\n        <mat-icon *ngIf=\"action.icon\">{{ action.icon }}</mat-icon>\n        <span>{{ action.label }}</span>\n      </button>\n    </mat-menu>\n\n    <app-list-create-sheet\n      *ngIf=\"controller.dashboard.hasCreateForm\"\n      [open]=\"controller.dashboard.createPage.open\"\n      [title]=\"config.meta.title ? 'Create ' + config.meta.title : 'Create'\"\n      [definition]=\"controller.dashboard.createDefinition\"\n      [initialValues]=\"controller.dashboard.createInitialValues\"\n      [engineOptions]=\"formEngineOptions\"\n      [saveLabel]=\"config.create?.saveLabel ?? 'Create'\"\n      [saving]=\"controller.createSaving\"\n      (dismissed)=\"controller.dashboard.createPage.close()\"\n      (valuesChange)=\"onCreateValuesChange($event)\"\n      (saved)=\"onCreateSave($event)\">\n    </app-list-create-sheet>\n\n    <app-list-create-stepper-sheet\n      *ngIf=\"controller.dashboard.hasCreateStepper\"\n      [open]=\"controller.dashboard.createPage.open\"\n      [title]=\"config.meta.title ? 'Create ' + config.meta.title : 'Create'\"\n      [steps]=\"controller.dashboard.createSteps\"\n      [buildStepDefinition]=\"controller.dashboard.buildCreateStepDefinition\"\n      [resolveSteps]=\"controller.dashboard.resolveCreateSteps\"\n      [validateStep]=\"controller.dashboard.validateCreateStep\"\n      [prepareStep]=\"controller.dashboard.prepareCreateStep\"\n      [initialValues]=\"controller.dashboard.createInitialValues\"\n      [engineOptions]=\"formEngineOptions\"\n      [saving]=\"controller.createSaving\"\n      [customSteps]=\"config.create?.customSteps\"\n      [customStepData]=\"controller.createCustomStepData\"\n      (customStepDataChange)=\"controller.onCreateCustomStepDataChange($event)\"\n      (dismissed)=\"controller.dashboard.createPage.close()\"\n      (validationError)=\"onValidationError($event)\"\n      (completed)=\"onCreateSave($event)\">\n    </app-list-create-stepper-sheet>\n\n    <app-list-detail-sheet\n      [open]=\"controller.dashboard.bulkEditPage.open\"\n      mode=\"edit\"\n      [title]=\"controller.dashboard.bulkEditPage.title\"\n      [saving]=\"controller.dashboard.bulkEditPage.saving\"\n      [editSummary]=\"controller.dashboard.bulkEditPage.editSummary\"\n      [editDefinition]=\"controller.dashboard.bulkEditPage.editDefinition\"\n      [editInitialValues]=\"controller.dashboard.bulkEditPage.editInitialValues\"\n      [editEngineOptions]=\"formEngineOptions\"\n      [editShowDocumentUpload]=\"controller.dashboard.bulkEditPage.editShowDocumentUpload\"\n      [editDocumentUploadHint]=\"documentUploadHint\"\n      [editDocumentUploadError]=\"controller.dashboard.bulkEditPage.editDocumentError\"\n      [editDocumentAllowedTypes]=\"controller.dashboard.bulkEditPage.editDocumentAllowedTypes\"\n      (editCancel)=\"controller.dashboard.bulkEditPage.close()\"\n      (editSave)=\"controller.dashboard.bulkEditPage.onEditSave($event)\"\n      (editValuesChange)=\"controller.dashboard.bulkEditPage.onEditValuesChange($event)\"\n      (editDocumentsChange)=\"controller.dashboard.bulkEditPage.onEditDocumentsChange($event)\">\n    </app-list-detail-sheet>\n\n    <!--\n      Action forms (config `actionForms`) plus the detail-edit and bulk-edit\n      stepper flows all render through the shared action-form controller.\n    -->\n    <app-list-create-sheet\n      *ngIf=\"controller.actionForm.open && controller.actionForm.kind === 'form'\"\n      [open]=\"controller.actionForm.open\"\n      [title]=\"controller.actionForm.title\"\n      [definition]=\"controller.actionForm.definition\"\n      [initialValues]=\"controller.actionForm.initialValues\"\n      [engineOptions]=\"formEngineOptions\"\n      [saving]=\"controller.actionForm.saving || controller.actionForm.loading\"\n      [saveLabel]=\"controller.actionForm.saveLabel\"\n      idPrefix=\"list-action-form\"\n      (valuesChange)=\"controller.actionForm.onValuesChange($event)\"\n      (dismissed)=\"controller.actionForm.close()\"\n      (saved)=\"controller.actionForm.submit($event)\">\n      <section *ngIf=\"controller.actionForm.showDocumentUpload\" class=\"list-dashboard__upload\">\n        <p class=\"list-dashboard__upload-hint\">\n          {{ controller.actionForm.documentUploadHint || documentUploadHint }}\n        </p>\n        <uld-dynamic-file-upload\n          [component]=\"fileUploadComponent\"\n          [allowedFileTypes]=\"controller.actionForm.documentAllowedTypes\"\n          [maxFileSize]=\"fileUploadMaxSize\"\n          (files)=\"controller.actionForm.onDocumentsChange($event)\">\n        </uld-dynamic-file-upload>\n        <div\n          *ngIf=\"controller.actionForm.documentError\"\n          class=\"cf-field-error mat-mdc-form-field-error\"\n          role=\"alert\">\n          {{ controller.actionForm.documentError }}\n        </div>\n      </section>\n    </app-list-create-sheet>\n\n    <app-list-create-stepper-sheet\n      *ngIf=\"controller.actionForm.open && controller.actionForm.kind === 'stepper'\"\n      [open]=\"controller.actionForm.open\"\n      [title]=\"controller.actionForm.title\"\n      [steps]=\"controller.actionForm.steps\"\n      [buildStepDefinition]=\"controller.actionForm.buildStepDefinition\"\n      [resolveSteps]=\"controller.actionForm.resolveSteps\"\n      [validateStep]=\"controller.actionForm.validateStep\"\n      [prepareStep]=\"controller.actionForm.prepareStep\"\n      [initialValues]=\"controller.actionForm.initialValues\"\n      [customSteps]=\"controller.actionForm.customSteps\"\n      [customStepData]=\"controller.actionForm.customStepData\"\n      [engineOptions]=\"formEngineOptions\"\n      [saving]=\"controller.actionForm.saving\"\n      [completeLabel]=\"controller.actionForm.saveLabel\"\n      idPrefix=\"list-action-form-stepper\"\n      (customStepDataChange)=\"controller.actionForm.onCustomStepDataChange($event)\"\n      (validationError)=\"onValidationError($event)\"\n      (dismissed)=\"controller.actionForm.close()\"\n      (completed)=\"controller.actionForm.submit($event)\">\n    </app-list-create-stepper-sheet>\n  </ng-container>\n</section>\n", styles: [":host{display:block}.list-dashboard{min-height:8rem;position:relative}.list-dashboard__state{align-items:center;display:flex;flex-direction:column;gap:.75rem;justify-content:center;min-height:8rem;padding:1.5rem;text-align:center}.list-dashboard__state--error{color:var(--mat-sys-error, #b3261e)}.list-dashboard__upload{display:flex;flex-direction:column;gap:.5rem;margin-top:1rem}.list-dashboard__upload-hint{color:var(--mat-sys-on-surface-variant, #4b5563);font-size:.8125rem;margin:0}.list-dashboard__floating-actions{bottom:var(--uld-fab-bottom, 32px);display:flex;gap:.5rem;justify-content:flex-end;pointer-events:none;position:fixed;right:var(--uld-fab-right, 32px);z-index:var(--uld-fab-z-index, 220)}@media(max-width:767px){.list-dashboard__floating-actions{bottom:var(--uld-fab-bottom-mobile, calc(72px + env(safe-area-inset-bottom, 0px)) );right:var(--uld-fab-right-mobile, 16px)}}.list-dashboard__floating-actions>*{pointer-events:auto}.list-dashboard__fab{align-items:center;background:var(--primary-500, #f97316);border:0;border-radius:50%;box-shadow:0 6px 18px #0f172a33;color:#fff;cursor:pointer;display:inline-flex;font-size:var(--uld-fab-icon-size, 22px);height:var(--uld-fab-size, 48px);justify-content:center;line-height:1;min-width:0;padding:0;transition:background .2s ease,box-shadow .2s ease;width:var(--uld-fab-size, 48px)}.list-dashboard__fab:hover{background:var(--primary-600, #ea580c);box-shadow:0 8px 24px #0f172a47}.list-dashboard__fab mat-icon{font-size:var(--uld-fab-icon-size, 22px);height:var(--uld-fab-icon-size, 22px);line-height:var(--uld-fab-icon-size, 22px);width:var(--uld-fab-icon-size, 22px)}.list-dashboard__row-menu-btn,.list-dashboard__detail-menu-btn{align-items:center;background:transparent;border:none;border-radius:999px;color:var(--secondary-600, #475569);cursor:pointer;display:inline-flex;height:32px;justify-content:center;padding:0;width:32px}.list-dashboard__row-menu-btn:hover,.list-dashboard__row-menu-btn:focus-visible,.list-dashboard__detail-menu-btn:hover,.list-dashboard__detail-menu-btn:focus-visible{background:#f1f5f9}.list-dashboard__row-menu-btn mat-icon,.list-dashboard__detail-menu-btn mat-icon{font-size:20px;height:20px;line-height:20px;width:20px}.list-dashboard__detail-header-actions{display:flex;align-items:center}\n"] }]
        }], ctorParameters: () => [{ type: i1$1.ActivatedRoute }, { type: i1$1.Router }, { type: ListFormCache }, { type: ListPreparationService }, { type: i0.Type, decorators: [{
                    type: Inject,
                    args: [ULD_FILE_UPLOAD]
                }] }], propDecorators: { config: [{
                type: Input,
                args: [{ required: true }]
            }], refData: [{
                type: Input
            }], routeContext: [{
                type: Input
            }], formContext: [{
                type: Input
            }], forEventId: [{
                type: Input
            }], hooks: [{
                type: Input
            }], documentUploadHint: [{
                type: Input
            }], formEngineOptions: [{
                type: Input
            }], rowUpdate: [{
                type: Output
            }], rowLinkClick: [{
                type: Output
            }], createComplete: [{
                type: Output
            }], saveError: [{
                type: Output
            }], notification: [{
                type: Output
            }], customRowTemplate: [{
                type: ContentChild,
                args: [ListRowTemplateDirective]
            }], floatingActions: [{
                type: ContentChild,
                args: [ListFloatingActionsDirective]
            }], bulkActions: [{
                type: ContentChild,
                args: [ListBulkActionsDirective]
            }], detailFooterActions: [{
                type: ContentChild,
                args: [ListDetailFooterActionsDirective]
            }], detailHero: [{
                type: ContentChild,
                args: [ListDetailHeroDirective]
            }], detailViewExtras: [{
                type: ContentChild,
                args: [ListDetailViewExtrasDirective]
            }], overlay: [{
                type: ContentChild,
                args: [ListOverlayDirective]
            }] } });

/**
 * Public API for the Universal List Dashboard (Angular).
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AppliedFilterPillsComponent, BulkEditPageController, ChipFilterBarComponent, DynamicFileUploadComponent, FilteredInfiniteListComponent, FilteredListDashboardController, FilteredListPageComponent, FilteredListPageController, InfiniteListRowComponent, InfiniteScrollSentinelDirective, LIST_BULK_EDIT_FORM_ID, LIST_DETAIL_EDIT_FORM_ID, LIST_FORM_CUSTOM_STEP_RENDERERS, ListActionFormController, ListBulkActionsDirective, ListCreatePageController, ListCreateRouteSync, ListCreateSheetComponent, ListCreateStepperSheetComponent, ListDashboardComponent, ListDashboardRuntime, ListDetailFooterActionsDirective, ListDetailHeroDirective, ListDetailPageController, ListDetailRouteSync, ListDetailSectionsComponent, ListDetailSheetComponent, ListDetailViewExtrasDirective, ListFilterSheetComponent, ListFilterToolbarComponent, ListFloatingActionsDirective, ListFormCache, ListFormCustomStepHostComponent, ListCreateStepperSheetComponent as ListFormStepperSheetComponent, ListOverlayDirective, ListPreparationService, ListRouteSync, ListRowCardComponent, ListRowTemplateDirective, MobileFormSheetComponent, ULD_DOCUMENT_LIST, ULD_FILE_UPLOAD, ULD_ROOT_CONFIG, UniversalListDashboardModule, buildCreateRouteQuery, isCreateActionOpen, provideListFormCustomStepRenderer, setMobileSheetOpen, toListRowLinkEvent, trackByIndex };
//# sourceMappingURL=web-toolkit-list-dashboard-angular.mjs.map
