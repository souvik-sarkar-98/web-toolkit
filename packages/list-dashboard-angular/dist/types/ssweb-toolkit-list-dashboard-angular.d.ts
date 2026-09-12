import * as _ssweb_toolkit_list_dashboard_core from '@ssweb-toolkit/list-dashboard-core';
import { ChipFilter, ListRowIconTone, ListRowItem, AppliedListFilter, ListDetailSection, ListDetailKeyValueSection, ListDetailContentSection, ListDetailItemListSection, ListDetailItemListItem, ListDetailSheetMode, ListDetailField, ListFileUpload, ListRouteChipConfig, ListRouteFilterBinding, ListRouteState, ListFilterCriteria, FilteredListPageAdapter, RefDataMap, ListFormCustomStepDef, ListDetailPageAdapter, BulkEditPageConfig, FilteredListDashboardPermissions, ConfiguredListPageAdapter, FilteredListDashboardConfig, FilteredListDashboardContext, FilteredListCreateContext, ListActionFormConfig, ListFormFlowKind, ListDashboardOperations, ListDashboardConfig, ListFormResolverContext, ListPreparationTrigger, ListActionDef } from '@ssweb-toolkit/list-dashboard-core';
export * from '@ssweb-toolkit/list-dashboard-core';
export { ListRouteChipConfig, ListRouteFilterBinding, ListRouteState, readRouteRefData } from '@ssweb-toolkit/list-dashboard-core';
import * as i0 from '@angular/core';
import { InjectionToken, Type, Provider, EventEmitter, OnInit, OnChanges, TemplateRef, SimpleChanges, OnDestroy, AfterViewInit, ElementRef, ModuleWithProviders } from '@angular/core';
import * as i15 from '@ssweb-toolkit/forms-angular';
import { CfFormComponent, CfFormStepperStep, CfFormStepperBuildDefinition, CfFormStepperResolveSteps, CfFormStepperValidateStep, CfFormStepperPrepareStep, CfFormStepperStepChange, CfFormStepperComponent, CfFormStepperState, CfFormStepperCustomStepValidator } from '@ssweb-toolkit/forms-angular';
import { FormDefinition, FormValues, FormEngineOptions } from '@ssweb-toolkit/forms-core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as i13 from '@angular/common';
import * as i14 from '@angular/material/checkbox';

/** Host component contract for {@link ULD_DOCUMENT_LIST}. */
interface UldDocumentListComponent {
    documents: readonly unknown[];
    showHeading?: boolean;
}
/** Host component contract for {@link ULD_FILE_UPLOAD}. */
interface UldFileUploadComponent {
    allowedFileTypes?: string[];
    maxFileSize?: number;
    files: unknown;
}
declare const ULD_DOCUMENT_LIST: InjectionToken<Type<UldDocumentListComponent>>;
declare const ULD_FILE_UPLOAD: InjectionToken<Type<UldFileUploadComponent>>;
interface UniversalListDashboardRootConfig {
    documentListComponent: Type<UldDocumentListComponent>;
    fileUploadComponent: Type<UldFileUploadComponent>;
}
declare const ULD_ROOT_CONFIG: InjectionToken<UniversalListDashboardRootConfig>;
/** Minimal `EventEmitter`/`Observable` shape consumed by the custom step host. */
interface ListFormCustomStepOutput<TData = unknown> {
    subscribe(listener: (value: TData) => void): {
        unsubscribe(): void;
    };
}
/**
 * Component contract for a custom stepper step registered through
 * {@link LIST_FORM_CUSTOM_STEP_RENDERERS}:
 *
 * - `@Input() data` — receives the current custom-step data for its step id
 * - `@Output() dataChange` — emits the edited data back to the flow
 * - `validate(): boolean` — optional gate for Next/Save; a missing method is
 *   treated as always valid
 */
interface ListFormCustomStepComponent<TData = unknown> {
    data?: TData;
    dataChange?: ListFormCustomStepOutput<TData>;
    validate?(): boolean;
}
interface ListFormCustomStepRenderer<TData = unknown> {
    /** Matches `customSteps[stepId].rendererKey` in the flow config. */
    rendererKey: string;
    component: Type<ListFormCustomStepComponent<TData>>;
}
/** Multi-provider registry mapping a framework-neutral renderer key to a component. */
declare const LIST_FORM_CUSTOM_STEP_RENDERERS: InjectionToken<readonly ListFormCustomStepRenderer<unknown>[]>;
declare function provideListFormCustomStepRenderer<TData>(rendererKey: string, component: Type<ListFormCustomStepComponent<TData>>): Provider;

declare class ChipFilterBarComponent {
    chips: ChipFilter[];
    activeId: string;
    chipSelect: EventEmitter<string>;
    get visibleChips(): ChipFilter[];
    selectChip(chipId: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ChipFilterBarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ChipFilterBarComponent, "app-chip-filter-bar", never, { "chips": { "alias": "chips"; "required": true; }; "activeId": { "alias": "activeId"; "required": false; }; }, { "chipSelect": "chipSelect"; }, never, never, false, never>;
}

declare class ListRowCardComponent {
    iconTone: ListRowIconTone;
    avatar: boolean;
    badgeTone: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
    get iconToneClass(): string;
    get badgeToneClass(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ListRowCardComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ListRowCardComponent, "app-list-row-card", never, { "iconTone": { "alias": "iconTone"; "required": false; }; "avatar": { "alias": "avatar"; "required": false; }; "badgeTone": { "alias": "badgeTone"; "required": false; }; }, {}, never, ["[listRowIcon]", "[listRowTitle]", "[listRowSubtitle]", "[listRowMetaLeft]", "[listRowBadge]", "[listRowMetaRight]"], false, never>;
}

declare class InfiniteListRowComponent {
    item: ListRowItem;
    rowLinkClick: EventEmitter<{
        item: ListRowItem;
        linkId: string;
    }>;
    onLinkClick(event: Event, linkId: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<InfiniteListRowComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<InfiniteListRowComponent, "app-infinite-list-row", never, { "item": { "alias": "item"; "required": true; }; }, { "rowLinkClick": "rowLinkClick"; }, never, never, false, never>;
}

type ListSelectionInteraction = 'checkbox' | 'tap' | 'responsive';
declare class FilteredInfiniteListComponent implements OnInit, OnChanges {
    chips: ChipFilter[];
    activeChipId: string;
    items: ListRowItem[];
    loading: boolean;
    loadingMore: boolean;
    hasMore: boolean;
    emptyMessage: string;
    showToolbar: boolean;
    searchText: string;
    searchPlaceholder: string;
    filterCount: number;
    appliedFilters: AppliedListFilter[];
    selectable: boolean;
    selectedIds: readonly string[];
    /** checkbox: always show checkboxes. tap: selection mode + row tap. responsive: tap below 640px. */
    selectionInteraction: ListSelectionInteraction;
    /** Optional override when the list is wrapped (e.g. by {@link FilteredListPageComponent}). */
    rowTemplateRef?: TemplateRef<{
        $implicit: ListRowItem;
    }>;
    rowTrailingTemplateRef?: TemplateRef<{
        $implicit: ListRowItem;
    }>;
    rowTemplate?: TemplateRef<{
        $implicit: ListRowItem;
    }>;
    rowTrailingTemplate?: TemplateRef<{
        $implicit: ListRowItem;
    }>;
    chipSelect: EventEmitter<string>;
    loadMore: EventEmitter<void>;
    rowClick: EventEmitter<ListRowItem<unknown>>;
    rowLinkClick: EventEmitter<{
        item: ListRowItem;
        linkId: string;
    }>;
    filterOpen: EventEmitter<void>;
    searchChange: EventEmitter<string>;
    pillRemove: EventEmitter<string>;
    selectedIdsChange: EventEmitter<string[]>;
    selectionModeChange: EventEmitter<boolean>;
    protected selectionModeActive: boolean;
    protected useTapInteraction: boolean;
    private longPressTimer?;
    private longPressHandled;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    onWindowResize(): void;
    get selectedCount(): number;
    get allSelected(): boolean;
    get isIndeterminate(): boolean;
    get resolvedRowTemplate(): TemplateRef<{
        $implicit: ListRowItem;
    }> | undefined;
    get resolvedRowTrailingTemplate(): TemplateRef<{
        $implicit: ListRowItem;
    }> | undefined;
    /** First fetch with no rows yet — panel-scoped centered spinner. */
    get initialLoading(): boolean;
    /** Chip/filter/search reload — keep stale rows, show top refresh bar. */
    get refreshing(): boolean;
    isSelected(id: string): boolean;
    toggleSelection(item: ListRowItem, checked: boolean): void;
    toggleAll(checked: boolean): void;
    clearSelection(): void;
    enterSelectionMode(): void;
    exitSelectionMode(clearSelected?: boolean): void;
    onRowClick(item: ListRowItem): void;
    onRowPointerDown(item: ListRowItem): void;
    onRowPointerUp(): void;
    private syncInteractionMode;
    static ɵfac: i0.ɵɵFactoryDeclaration<FilteredInfiniteListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FilteredInfiniteListComponent, "app-filtered-infinite-list", never, { "chips": { "alias": "chips"; "required": true; }; "activeChipId": { "alias": "activeChipId"; "required": false; }; "items": { "alias": "items"; "required": true; }; "loading": { "alias": "loading"; "required": false; }; "loadingMore": { "alias": "loadingMore"; "required": false; }; "hasMore": { "alias": "hasMore"; "required": false; }; "emptyMessage": { "alias": "emptyMessage"; "required": false; }; "showToolbar": { "alias": "showToolbar"; "required": false; }; "searchText": { "alias": "searchText"; "required": false; }; "searchPlaceholder": { "alias": "searchPlaceholder"; "required": false; }; "filterCount": { "alias": "filterCount"; "required": false; }; "appliedFilters": { "alias": "appliedFilters"; "required": false; }; "selectable": { "alias": "selectable"; "required": false; }; "selectedIds": { "alias": "selectedIds"; "required": false; }; "selectionInteraction": { "alias": "selectionInteraction"; "required": false; }; "rowTemplateRef": { "alias": "rowTemplateRef"; "required": false; }; "rowTrailingTemplateRef": { "alias": "rowTrailingTemplateRef"; "required": false; }; }, { "chipSelect": "chipSelect"; "loadMore": "loadMore"; "rowClick": "rowClick"; "rowLinkClick": "rowLinkClick"; "filterOpen": "filterOpen"; "searchChange": "searchChange"; "pillRemove": "pillRemove"; "selectedIdsChange": "selectedIdsChange"; "selectionModeChange": "selectionModeChange"; }, ["rowTemplate", "rowTrailingTemplate"], ["[bulkActions]"], false, never>;
}

declare class ListFilterToolbarComponent {
    searchText: string;
    searchPlaceholder: string;
    filterCount: number;
    searchChange: EventEmitter<string>;
    filterOpen: EventEmitter<void>;
    onSearchInput(value: string): void;
    onFilterClick(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ListFilterToolbarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ListFilterToolbarComponent, "app-list-filter-toolbar", never, { "searchText": { "alias": "searchText"; "required": false; }; "searchPlaceholder": { "alias": "searchPlaceholder"; "required": false; }; "filterCount": { "alias": "filterCount"; "required": false; }; }, { "searchChange": "searchChange"; "filterOpen": "filterOpen"; }, never, never, false, never>;
}

declare class AppliedFilterPillsComponent {
    filters: AppliedListFilter[];
    remove: EventEmitter<string>;
    onRemove(id: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AppliedFilterPillsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AppliedFilterPillsComponent, "app-applied-filter-pills", never, { "filters": { "alias": "filters"; "required": true; }; }, { "remove": "remove"; }, never, never, false, never>;
}

declare class ListFilterSheetComponent implements OnChanges, OnDestroy {
    open: boolean;
    title: string;
    definition: FormDefinition;
    initialValues: FormValues;
    closed: EventEmitter<void>;
    reset: EventEmitter<void>;
    applied: EventEmitter<FormValues>;
    cfForm?: CfFormComponent;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    onBackdropClick(): void;
    onReset(): void;
    onApply(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ListFilterSheetComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ListFilterSheetComponent, "app-list-filter-sheet", never, { "open": { "alias": "open"; "required": false; }; "title": { "alias": "title"; "required": false; }; "definition": { "alias": "definition"; "required": false; }; "initialValues": { "alias": "initialValues"; "required": false; }; }, { "closed": "closed"; "reset": "reset"; "applied": "applied"; }, never, never, false, never>;
}

declare class ListDetailSectionsComponent {
    readonly documentListComponent: Type<UldDocumentListComponent>;
    sections: ListDetailSection[];
    constructor(documentListComponent: Type<UldDocumentListComponent>);
    toggleSection(section: ListDetailKeyValueSection | ListDetailContentSection | ListDetailItemListSection): void;
    trackSection(_index: number, section: ListDetailSection): string;
    trackField(_index: number, field: {
        label: string;
    }): string;
    trackItemListItem(index: number, item: ListDetailItemListItem): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ListDetailSectionsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ListDetailSectionsComponent, "app-list-detail-sections", never, { "sections": { "alias": "sections"; "required": false; }; }, {}, never, never, false, never>;
}

declare class ListDetailSheetComponent implements OnChanges, OnDestroy {
    readonly fileUploadComponent: Type<UldFileUploadComponent>;
    open: boolean;
    mode: ListDetailSheetMode;
    title: string;
    sections: ListDetailSection[];
    loading: boolean;
    saving: boolean;
    primaryActionLabel?: string;
    /** Read-only context shown above the edit form. */
    editSummary: ListDetailField[];
    editDefinition?: FormDefinition;
    editInitialValues: FormValues;
    editEngineOptions?: FormEngineOptions;
    editTitle?: string;
    /** Optional payment-proof upload shown below the edit form (e.g. paid donations). */
    editShowDocumentUpload: boolean;
    editDocumentUploadLabel: string;
    editDocumentUploadHint: string;
    editDocumentUploadError?: string;
    editDocumentAllowedTypes: string[];
    hasFooterActions: boolean;
    allowEditCancel: boolean;
    allowDismiss: boolean;
    hideEditForm: boolean;
    hideEditActions: boolean;
    closed: EventEmitter<void>;
    primaryAction: EventEmitter<void>;
    editSave: EventEmitter<FormValues>;
    editCancel: EventEmitter<void>;
    editValuesChange: EventEmitter<FormValues>;
    editDocumentsChange: EventEmitter<ListFileUpload[]>;
    cfForm?: CfFormComponent;
    readonly fileUploadMaxSize: number;
    constructor(fileUploadComponent: Type<UldFileUploadComponent>);
    get sheetTitle(): string;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    onDismissClick(): void;
    onBackdropClick(): void;
    onPrimaryAction(): void;
    onCancelEdit(): void;
    onSaveEdit(): void;
    onEditValuesChange(values: FormValues): void;
    onEditDocumentsChange(files: ListFileUpload[]): void;
    onFileUpload: (files: ListFileUpload[]) => void;
    trackSummaryField(_index: number, field: ListDetailField): string;
    private syncBodyLock;
    static ɵfac: i0.ɵɵFactoryDeclaration<ListDetailSheetComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ListDetailSheetComponent, "app-list-detail-sheet", never, { "open": { "alias": "open"; "required": false; }; "mode": { "alias": "mode"; "required": false; }; "title": { "alias": "title"; "required": false; }; "sections": { "alias": "sections"; "required": false; }; "loading": { "alias": "loading"; "required": false; }; "saving": { "alias": "saving"; "required": false; }; "primaryActionLabel": { "alias": "primaryActionLabel"; "required": false; }; "editSummary": { "alias": "editSummary"; "required": false; }; "editDefinition": { "alias": "editDefinition"; "required": false; }; "editInitialValues": { "alias": "editInitialValues"; "required": false; }; "editEngineOptions": { "alias": "editEngineOptions"; "required": false; }; "editTitle": { "alias": "editTitle"; "required": false; }; "editShowDocumentUpload": { "alias": "editShowDocumentUpload"; "required": false; }; "editDocumentUploadLabel": { "alias": "editDocumentUploadLabel"; "required": false; }; "editDocumentUploadHint": { "alias": "editDocumentUploadHint"; "required": false; }; "editDocumentUploadError": { "alias": "editDocumentUploadError"; "required": false; }; "editDocumentAllowedTypes": { "alias": "editDocumentAllowedTypes"; "required": false; }; "hasFooterActions": { "alias": "hasFooterActions"; "required": false; }; "allowEditCancel": { "alias": "allowEditCancel"; "required": false; }; "allowDismiss": { "alias": "allowDismiss"; "required": false; }; "hideEditForm": { "alias": "hideEditForm"; "required": false; }; "hideEditActions": { "alias": "hideEditActions"; "required": false; }; }, { "closed": "closed"; "primaryAction": "primaryAction"; "editSave": "editSave"; "editCancel": "editCancel"; "editValuesChange": "editValuesChange"; "editDocumentsChange": "editDocumentsChange"; }, never, ["[detailHeaderActions]", "[detailHero]", "[detailViewExtras]", "[detailEditExtras]", "[detailFooterActions]"], false, never>;
}

/**
 * Keeps primary chip + sheet filter criteria in sync with URL query params.
 * Domain dashboards supply chip normalization and filter bindings; detail
 * sheets can use {@link ListDetailRouteSync} alongside this helper.
 */
declare class ListRouteSync {
    private readonly router;
    private readonly route;
    private readonly chipConfig;
    private readonly filterBindings;
    constructor(router: Router, route: ActivatedRoute, chipConfig: ListRouteChipConfig, filterBindings?: ListRouteFilterBinding[]);
    readFromParams(params: ParamMap): ListRouteState;
    buildQueryParams(chip: string, criteria: Record<string, unknown>): Record<string, string | boolean | null>;
    /** Write chip + filter criteria to the URL (merge; preserves detail params). */
    navigate(chip: string, criteria: Record<string, unknown>): void;
    /** Overlay parsed route filters onto default criteria for the active chip. */
    mergeFiltersIntoCriteria<T extends Record<string, unknown>>(base: T, filters: Record<string, unknown>): T;
    matchesState(routeChip: string, activeChip: string, criteria: Record<string, unknown>, routeFilters: Record<string, unknown>): boolean;
    /** Optional boolean filters: unset (`undefined`/`false`) compares equal; only `true` is active. */
    private filterValuesEqual;
}

interface FilteredListPageInitOptions<TCriteria extends ListFilterCriteria> {
    adapter: FilteredListPageAdapter<TCriteria>;
    route: ActivatedRoute;
    router: Router;
    listRouteSync: ListRouteSync;
    refData?: RefDataMap;
    resolveInitialState?: (routeState: ListRouteState) => {
        chip: string;
        criteria: TCriteria;
    };
    /** e.g. close detail sheet before chip/filter route apply */
    onBeforeRouteStateApply?: () => void;
    /** e.g. open pending detail/create after list load */
    onAfterListLoaded?: () => void;
    /**
     * Prefetch async filter options before the sheet opens.
     * Call `continueOpen()` when ready; return `false` to defer the default open.
     */
    onFilterOpen?: (continueOpen: () => void) => void | false;
}
/**
 * Orchestrates chip/filter/search/pagination state for config-driven list pages.
 * Pair with {@link FilteredListPageComponent} and a domain {@link FilteredListPageAdapter}.
 */
declare class FilteredListPageController<TCriteria extends ListFilterCriteria = ListFilterCriteria> {
    chips: ChipFilter[];
    activeChip: string;
    listItems: ListRowItem[];
    listLoading: boolean;
    listLoadingMore: boolean;
    listHasMore: boolean;
    listSearchText: string;
    listCriteria: TCriteria;
    appliedFilters: AppliedListFilter[];
    activeFilterCount: number;
    filterSheetOpen: boolean;
    filterFormDefinition: FormDefinition | undefined;
    filterFormInitialValues: FormValues;
    selectedIds: string[];
    private adapter;
    private route;
    private router;
    private listRouteSync;
    private refData;
    private listPageIndex;
    private listSub;
    private searchDebounce?;
    private resolveInitialState?;
    private onBeforeRouteStateApply?;
    private onAfterListLoaded?;
    private onFilterOpenHook?;
    init(options: FilteredListPageInitOptions<TCriteria>): void;
    destroy(): void;
    setRefData(refData: RefDataMap): void;
    onChipSelect(chipId: string): void;
    onSearchChange(value: string): void;
    onFilterOpen(): void;
    onFilterSheetClose(): void;
    onFilterSheetApply(values: FormValues): void;
    onFilterSheetReset(): void;
    onPillRemove(pillId: string): void;
    onLoadMore(): void;
    onSelectionChange(ids: string[]): void;
    clearSelection(): void;
    updateListItem(updated: ListRowItem): void;
    prependListItem(item: ListRowItem): void;
    /** Reload the first page from the data source (e.g. after create). */
    reloadList(): void;
    syncListRoute(): void;
    private defaultInitialState;
    private subscribeToListRouteChanges;
    private applyListRouteState;
    private loadListPage;
    private syncAppliedFilters;
    private syncFilterFormState;
}

declare class FilteredListPageComponent<TCriteria extends ListFilterCriteria = ListFilterCriteria> {
    controller: FilteredListPageController<TCriteria>;
    searchPlaceholder: string;
    emptyMessage: string;
    showToolbar: boolean;
    selectable: boolean;
    filterSheetTitle: string;
    rowTemplate?: TemplateRef<{
        $implicit: ListRowItem;
    }>;
    rowTrailing?: TemplateRef<{
        $implicit: ListRowItem;
    }>;
    rowClick: EventEmitter<ListRowItem<unknown>>;
    rowLinkClick: EventEmitter<{
        item: ListRowItem;
        linkId: string;
    }>;
    static ɵfac: i0.ɵɵFactoryDeclaration<FilteredListPageComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FilteredListPageComponent<any>, "app-filtered-list-page", never, { "controller": { "alias": "controller"; "required": true; }; "searchPlaceholder": { "alias": "searchPlaceholder"; "required": false; }; "emptyMessage": { "alias": "emptyMessage"; "required": false; }; "showToolbar": { "alias": "showToolbar"; "required": false; }; "selectable": { "alias": "selectable"; "required": false; }; "filterSheetTitle": { "alias": "filterSheetTitle"; "required": false; }; }, { "rowClick": "rowClick"; "rowLinkClick": "rowLinkClick"; }, ["rowTemplate", "rowTrailing"], ["[bulkActions]", "[listOverlays]"], false, never>;
}

declare class InfiniteScrollSentinelDirective implements AfterViewInit, OnDestroy {
    private elementRef;
    visible: EventEmitter<void>;
    private observer?;
    constructor(elementRef: ElementRef<HTMLElement>);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<InfiniteScrollSentinelDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<InfiniteScrollSentinelDirective, "[appInfiniteScrollSentinel]", never, {}, { "visible": "visible"; }, never, never, false, never>;
}

declare class DynamicFileUploadComponent implements AfterViewInit, OnChanges, OnDestroy {
    component?: Type<UldFileUploadComponent>;
    allowedFileTypes?: string[];
    maxFileSize?: number;
    files: EventEmitter<ListFileUpload[]>;
    private host;
    private componentRef?;
    private outputSubscription?;
    private viewReady;
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private render;
    private applyInputs;
    static ɵfac: i0.ɵɵFactoryDeclaration<DynamicFileUploadComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DynamicFileUploadComponent, "uld-dynamic-file-upload", never, { "component": { "alias": "component"; "required": true; }; "allowedFileTypes": { "alias": "allowedFileTypes"; "required": false; }; "maxFileSize": { "alias": "maxFileSize"; "required": false; }; }, { "files": "files"; }, never, never, false, never>;
}

declare class MobileFormSheetComponent implements OnChanges, OnDestroy {
    open: boolean;
    title: string;
    ariaLabel?: string;
    saving: boolean;
    saveLabel: string;
    cancelLabel: string;
    showSave: boolean;
    showCancel: boolean;
    showDefaultFooter: boolean;
    hint?: string;
    dismissed: EventEmitter<void>;
    save: EventEmitter<void>;
    cancel: EventEmitter<void>;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    onBackdropClick(): void;
    onCloseClick(): void;
    onCancelClick(): void;
    onSaveClick(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MobileFormSheetComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MobileFormSheetComponent, "app-mobile-form-sheet", never, { "open": { "alias": "open"; "required": false; }; "title": { "alias": "title"; "required": false; }; "ariaLabel": { "alias": "ariaLabel"; "required": false; }; "saving": { "alias": "saving"; "required": false; }; "saveLabel": { "alias": "saveLabel"; "required": false; }; "cancelLabel": { "alias": "cancelLabel"; "required": false; }; "showSave": { "alias": "showSave"; "required": false; }; "showCancel": { "alias": "showCancel"; "required": false; }; "showDefaultFooter": { "alias": "showDefaultFooter"; "required": false; }; "hint": { "alias": "hint"; "required": false; }; }, { "dismissed": "dismissed"; "save": "save"; "cancel": "cancel"; }, never, ["*", "[sheetFooterActions]"], true, never>;
}

declare class ListCreateSheetComponent implements OnChanges {
    open: boolean;
    title: string;
    hint?: string;
    definition?: FormDefinition;
    initialValues: FormValues;
    engineOptions?: FormEngineOptions;
    idPrefix: string;
    saveLabel: string;
    saving: boolean;
    dismissed: EventEmitter<void>;
    saved: EventEmitter<FormValues>;
    /** Live field edits — action forms use these to refresh definition/values. */
    valuesChange: EventEmitter<FormValues>;
    createForm?: CfFormComponent;
    protected formKey: number;
    ngOnChanges(changes: SimpleChanges): void;
    protected onDismissed(): void;
    protected onSaveClick(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ListCreateSheetComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ListCreateSheetComponent, "app-list-create-sheet", never, { "open": { "alias": "open"; "required": false; }; "title": { "alias": "title"; "required": false; }; "hint": { "alias": "hint"; "required": false; }; "definition": { "alias": "definition"; "required": false; }; "initialValues": { "alias": "initialValues"; "required": false; }; "engineOptions": { "alias": "engineOptions"; "required": false; }; "idPrefix": { "alias": "idPrefix"; "required": false; }; "saveLabel": { "alias": "saveLabel"; "required": false; }; "saving": { "alias": "saving"; "required": false; }; }, { "dismissed": "dismissed"; "saved": "saved"; "valuesChange": "valuesChange"; }, never, ["[listCreatePrefix]", "*"], true, never>;
}

/**
 * Renders the component registered for a `rendererKey` inside a stepper custom step.
 *
 * The rendered component follows {@link ListFormCustomStepComponent}: `data` in,
 * `dataChange` out, optional `validate()` used as the step validator.
 */
declare class ListFormCustomStepHostComponent implements AfterViewInit, OnChanges, OnDestroy {
    private readonly renderers;
    rendererKey: string;
    data: unknown;
    dataChange: EventEmitter<unknown>;
    /** Emitted once the renderer exists so the flow host can register its validator. */
    ready: EventEmitter<ListFormCustomStepHostComponent>;
    closed: EventEmitter<ListFormCustomStepHostComponent>;
    private container;
    private componentRef?;
    private outputSubscription?;
    private viewReady;
    private lastEmitted?;
    private hasEmitted;
    constructor(renderers: readonly ListFormCustomStepRenderer[] | null);
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    /** False only when the renderer exists and reports invalid data. */
    validate(): boolean;
    private render;
    private resolveComponent;
    private applyData;
    static ɵfac: i0.ɵɵFactoryDeclaration<ListFormCustomStepHostComponent, [{ optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ListFormCustomStepHostComponent, "uld-list-form-custom-step-host", never, { "rendererKey": { "alias": "rendererKey"; "required": true; }; "data": { "alias": "data"; "required": false; }; }, { "dataChange": "dataChange"; "ready": "ready"; "closed": "closed"; }, never, never, true, never>;
}

interface ListFormCustomStepDataChange {
    stepId: string;
    data: unknown;
}
interface ListFormCustomStepEntry {
    stepId: string;
    rendererKey: string;
}
/**
 * Shared stepper sheet host for create and config-driven action/edit form flows.
 * Custom steps are rendered by {@link ListFormCustomStepHostComponent} from the
 * `rendererKey` registry.
 */
declare class ListCreateStepperSheetComponent implements OnChanges {
    open: boolean;
    title: string;
    hint?: string;
    steps: CfFormStepperStep[];
    buildStepDefinition: CfFormStepperBuildDefinition;
    resolveSteps?: CfFormStepperResolveSteps;
    validateStep?: CfFormStepperValidateStep;
    /** Awaited before a step is entered so its form can be loaded on demand. */
    prepareStep?: CfFormStepperPrepareStep;
    initialValues: FormValues;
    engineOptions?: FormEngineOptions;
    idPrefix: string;
    completeLabel: string;
    backLabel: string;
    nextLabel: string;
    cancelLabel: string;
    submittingLabel: string;
    preparingLabel: string;
    allowCancel: boolean;
    saving: boolean;
    /** Step id → renderer declaration for steps with `kind: 'custom'`. */
    customSteps?: Record<string, ListFormCustomStepDef>;
    /** Step id → current data handed to the matching custom step renderer. */
    customStepData?: Record<string, unknown>;
    dismissed: EventEmitter<void>;
    completed: EventEmitter<FormValues>;
    stepChange: EventEmitter<CfFormStepperStepChange<string>>;
    validationError: EventEmitter<string>;
    customStepDataChange: EventEmitter<ListFormCustomStepDataChange>;
    stepper?: CfFormStepperComponent;
    protected stepperKey: number;
    /** Snapshot at open so parent getter churn cannot reset the stepper mid-flow. */
    protected capturedInitialValues: FormValues;
    /** Live stepper position from `stepStateChange` (source of truth for the pinned footer). */
    protected stepState?: CfFormStepperState;
    private activeCustomStepHost?;
    private customStepEntriesCache;
    private customStepEntriesRef?;
    ngOnChanges(changes: SimpleChanges): void;
    registerCustomStepValidator(validator: CfFormStepperCustomStepValidator | null): void;
    /** Stable array so the step template `*ngFor` does not re-create views each cycle. */
    protected get customStepEntries(): ListFormCustomStepEntry[];
    protected trackCustomStep(_index: number, entry: ListFormCustomStepEntry): string;
    protected customStepDataFor(stepId: string): unknown;
    protected onCustomStepData(stepId: string, data: unknown): void;
    protected onCustomStepHostReady(host: ListFormCustomStepHostComponent): void;
    protected onCustomStepHostClosed(host: ListFormCustomStepHostComponent): void;
    protected onStepChange(event: CfFormStepperStepChange): void;
    protected onStepState(state: CfFormStepperState): void;
    protected get isFirstStep(): boolean;
    protected get isLastStep(): boolean;
    protected get preparing(): boolean;
    protected get nextLabelText(): string;
    protected onBack(): void;
    protected onNext(): void;
    protected onDismissed(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ListCreateStepperSheetComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ListCreateStepperSheetComponent, "app-list-create-stepper-sheet", never, { "open": { "alias": "open"; "required": false; }; "title": { "alias": "title"; "required": false; }; "hint": { "alias": "hint"; "required": false; }; "steps": { "alias": "steps"; "required": true; }; "buildStepDefinition": { "alias": "buildStepDefinition"; "required": true; }; "resolveSteps": { "alias": "resolveSteps"; "required": false; }; "validateStep": { "alias": "validateStep"; "required": false; }; "prepareStep": { "alias": "prepareStep"; "required": false; }; "initialValues": { "alias": "initialValues"; "required": false; }; "engineOptions": { "alias": "engineOptions"; "required": false; }; "idPrefix": { "alias": "idPrefix"; "required": false; }; "completeLabel": { "alias": "completeLabel"; "required": false; }; "backLabel": { "alias": "backLabel"; "required": false; }; "nextLabel": { "alias": "nextLabel"; "required": false; }; "cancelLabel": { "alias": "cancelLabel"; "required": false; }; "submittingLabel": { "alias": "submittingLabel"; "required": false; }; "preparingLabel": { "alias": "preparingLabel"; "required": false; }; "allowCancel": { "alias": "allowCancel"; "required": false; }; "saving": { "alias": "saving"; "required": false; }; "customSteps": { "alias": "customSteps"; "required": false; }; "customStepData": { "alias": "customStepData"; "required": false; }; }, { "dismissed": "dismissed"; "completed": "completed"; "stepChange": "stepChange"; "validationError": "validationError"; "customStepDataChange": "customStepDataChange"; }, never, ["*"], true, never>;
}

declare class UniversalListDashboardModule {
    static forRoot(config: UniversalListDashboardRootConfig): ModuleWithProviders<UniversalListDashboardModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UniversalListDashboardModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<UniversalListDashboardModule, [typeof ChipFilterBarComponent, typeof ListRowCardComponent, typeof InfiniteListRowComponent, typeof FilteredInfiniteListComponent, typeof ListFilterToolbarComponent, typeof AppliedFilterPillsComponent, typeof ListFilterSheetComponent, typeof ListDetailSectionsComponent, typeof ListDetailSheetComponent, typeof FilteredListPageComponent, typeof InfiniteScrollSentinelDirective, typeof DynamicFileUploadComponent], [typeof i13.CommonModule, typeof i13.NgComponentOutlet, typeof i14.MatCheckboxModule, typeof i15.CfFormComponent, typeof MobileFormSheetComponent, typeof ListCreateSheetComponent, typeof ListCreateStepperSheetComponent, typeof ListFormCustomStepHostComponent], [typeof ChipFilterBarComponent, typeof ListRowCardComponent, typeof InfiniteListRowComponent, typeof FilteredInfiniteListComponent, typeof ListFilterToolbarComponent, typeof AppliedFilterPillsComponent, typeof ListFilterSheetComponent, typeof ListDetailSectionsComponent, typeof ListDetailSheetComponent, typeof FilteredListPageComponent, typeof InfiniteScrollSentinelDirective, typeof DynamicFileUploadComponent, typeof MobileFormSheetComponent, typeof ListCreateSheetComponent, typeof ListCreateStepperSheetComponent, typeof ListFormCustomStepHostComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<UniversalListDashboardModule>;
}

/** Hides the mobile bottom nav while a full-screen drawer/sheet is open. */
declare function setMobileSheetOpen(open: boolean): void;

/**
 * `trackBy` for row editors inside custom stepper steps.
 *
 * Row editors replace edited row objects to keep state immutable, so identity
 * tracking would destroy and rebuild the row being typed into and drop focus.
 * Position is the stable identity for these lists.
 */
declare function trackByIndex(index: number): number;

type ListDetailRouteMode = 'view' | 'edit';
interface ListDetailRouteSyncConfig {
    /** Primary query param for the selected item id, e.g. `donationId`. */
    idParam: string;
    /** Optional aliases checked when the primary param is absent, e.g. `['id']`. */
    idParamAliases?: string[];
    /** Query param toggling edit mode. Defaults to `edit`. */
    editParam?: string;
}
interface ListDetailRoutePending {
    itemId: string;
    edit: boolean;
}
/**
 * Keeps a mobile list-detail bottom sheet in sync with URL query params.
 *
 * Domain dashboards own fetch/open/close logic; this helper only reads and
 * writes `?itemId=…&edit=true` while preserving other params (chip, filters).
 */
declare class ListDetailRouteSync {
    private readonly route;
    private readonly router;
    private readonly config;
    private suppressed;
    constructor(route: ActivatedRoute, router: Router, config: ListDetailRouteSyncConfig);
    /** Read a pending deep-link open request from the current route snapshot. */
    readPendingFromRoute(): ListDetailRoutePending | undefined;
    /** Write the open sheet state into the URL (merge; replace history entry). */
    sync(itemId: string | undefined, mode?: ListDetailRouteMode): void;
    /** Remove detail params from the URL while keeping list context params. */
    clear(): void;
    /** Temporarily disable URL updates (e.g. during bulk programmatic navigation). */
    setSuppressed(suppressed: boolean): void;
}

interface ListDetailPageInitOptions<TEntity> {
    adapter: ListDetailPageAdapter<TEntity>;
    route: ActivatedRoute;
    router: Router;
    routeSyncConfig: ListDetailRouteSyncConfig;
    refData: RefDataMap;
    getListItems: () => ListRowItem[];
    onEntityUpdated?: (entity: TEntity) => void;
    onSaveError?: (error: unknown) => void;
    setFormValue?: (key: string, value: unknown) => void;
    /** When true, detail open/edit/close does not read or write URL query params. */
    suppressRouteSync?: boolean;
}
/**
 * Orchestrates detail sheet state + route sync (mirrors {@link FilteredListPageController}).
 */
declare class ListDetailPageController<TEntity> {
    open: boolean;
    title: string;
    sections: ListDetailSection[];
    loading: boolean;
    mode: ListDetailSheetMode;
    saving: boolean;
    primaryActionLabel?: string;
    editSummary: ListDetailField[];
    editDefinition: FormDefinition | undefined;
    editInitialValues: FormValues;
    editShowDocumentUpload: boolean;
    editDocumentError?: string;
    editDocumentAllowedTypes: string[];
    private adapter;
    private route;
    private routeSync;
    private refData;
    private getListItems;
    private onEntityUpdated?;
    private onSaveError?;
    private setFormValue?;
    private selectedEntity?;
    private editDocuments;
    private existingDocumentCount;
    private pendingItemId?;
    private pendingEdit;
    private detailSub;
    init(options: ListDetailPageInitOptions<TEntity>): void;
    destroy(): void;
    queuePendingFromRoute(): void;
    tryOpenPending(): void;
    openEntity(entity: TEntity, options?: {
        edit?: boolean;
        syncQuery?: boolean;
        refresh?: boolean;
    }): void;
    close(): void;
    /** Stepper edit flows are hosted outside this sheet (see list dashboard runtime). */
    get hasEditStepper(): boolean;
    enterEdit(): void;
    cancelEdit(): void;
    onEditValuesChange(values: FormValues): void;
    onEditDocumentsChange(files: ListFileUpload[]): void;
    onEditSave(values: FormValues): void;
    setRefData(refData: RefDataMap): void;
    get selected(): TEntity | undefined;
    /** Re-renders the open sheet with the full entity; leaves list rows untouched. */
    private refreshSelected;
    private applyUpdatedEntity;
    /** Deep-link id for an entity; titles are display values in most domains. */
    private entityId;
    private refreshEditForm;
    private applyEditValuesChange;
    private loadDocuments;
    private replaceDocumentsSection;
    private getExistingDocumentCount;
    private resetEditState;
    private resetEditDocuments;
}

type ListCreateRoutePresetType = 'string' | 'boolean';
/** Maps URL query params to create-flow preset state on the dashboard. */
interface ListCreateRoutePresetBinding {
    param: string;
    stateKey: string;
    type: ListCreateRoutePresetType;
}
interface ListCreateRouteSyncConfig {
    /** Query param that opens create mode. Defaults to `create`. */
    actionParam?: string;
    presets?: ListCreateRoutePresetBinding[];
}
interface ListCreateRoutePending {
    presets: Record<string, unknown>;
}
declare function isCreateActionOpen(value: string | null | undefined): boolean;
/** Build query params for a deep link that opens create mode with optional presets. */
declare function buildCreateRouteQuery(presets?: Record<string, string | undefined>, actionParam?: string): Record<string, string>;
/**
 * Keeps a mobile create bottom sheet in sync with URL query params.
 *
 * Example: `?create=true&forEventId=act-123`
 * Domain dashboards own open/close logic; this helper reads/writes the URL.
 */
declare class ListCreateRouteSync {
    private readonly route;
    private readonly router;
    private readonly config;
    private suppressed;
    constructor(route: ActivatedRoute, router: Router, config: ListCreateRouteSyncConfig);
    readPendingFromRoute(params?: ParamMap): ListCreateRoutePending | undefined;
    isOpen(params?: ParamMap): boolean;
    /** Open create mode in the URL (merge; preserves list/detail params). */
    sync(presets?: Record<string, unknown>): void;
    /** Close create mode in the URL. Preset params are kept for list context. */
    clear(): void;
    setSuppressed(suppressed: boolean): void;
    private readPresets;
    private buildPresetQueryParams;
}

interface ListCreatePageInitOptions {
    route: ActivatedRoute;
    router: Router;
    config: ListCreateRouteSyncConfig;
    canOpen: () => boolean;
    /** Await async preparation before create is opened from a deep link. */
    prepareRouteOpen?: () => boolean | Promise<boolean>;
    /** Extra preset keys read from route outside create-route bindings (e.g. forEventId). */
    extraPresetReaders?: Array<(params: ParamMap, presets: Record<string, unknown>) => void>;
    onBeforeOpen?: () => void;
}
/**
 * Orchestrates create sheet open/close + route sync (mirrors list/detail controllers).
 */
declare class ListCreatePageController {
    open: boolean;
    presets: Record<string, unknown>;
    private route;
    private routeSync;
    private canOpen;
    private prepareRouteOpen?;
    private extraPresetReaders;
    private onBeforeOpen?;
    private pendingOpen;
    private preparingRouteOpen;
    private routeSub;
    init(options: ListCreatePageInitOptions): void;
    destroy(): void;
    queuePendingFromRoute(): void;
    tryOpenPending(): void;
    openSheet(options?: {
        syncRoute: boolean;
    }): void;
    close(): void;
    syncFromRouteParams(params: ParamMap): void;
    applyPresetsFromRoute(params?: ParamMap): void;
    presetString(key: string): string | undefined;
    private openPendingFromRoute;
}

/**
 * Edit-only overlay state for bulk updates — drives a second {@link ListDetailSheetComponent}.
 */
declare class BulkEditPageController<TEntity> {
    open: boolean;
    title: string;
    saving: boolean;
    editSummary: ListDetailField[];
    editDefinition?: FormDefinition;
    editInitialValues: FormValues;
    editShowDocumentUpload: boolean;
    editDocumentError?: string;
    editDocumentAllowedTypes: string[];
    private entities;
    private config?;
    private refData;
    private payableAccountOptions;
    private editDocuments;
    private template?;
    private saveSub;
    private onSaved?;
    private onSaveError?;
    private setFormValue?;
    init(options: {
        config: BulkEditPageConfig<TEntity>;
        refData: RefDataMap;
        onSaved?: (entities: TEntity[]) => void;
        onSaveError?: (error: unknown) => void;
        setFormValue?: (key: string, value: unknown) => void;
    }): void;
    destroy(): void;
    setRefData(refData: RefDataMap): void;
    openBulkEdit(entities: TEntity[]): boolean;
    close(): void;
    onEditValuesChange(values: FormValues): void;
    onEditDocumentsChange(files: ListFileUpload[]): void;
    onEditSave(values: FormValues): void;
    private applyValuesChange;
    private applyLockedFields;
}

interface FilteredListDashboardInitHooks<TEntity> {
    onSaveError?: (error: unknown) => void;
    setFormValue?: (key: string, value: unknown) => void;
    onEntityUpdated?: (entity: TEntity) => void;
    onBulkSaved?: (entities: TEntity[]) => void;
    onBulkSaveError?: (error: unknown) => void;
    mapEntityToListRow?: (entity: TEntity) => ListRowItem;
    /** Prefetch async filter options before the filter sheet opens. */
    onFilterOpen?: (continueOpen: () => void) => void | false;
    /** Prepare async create data before a route deep link opens create mode. */
    prepareCreateRouteOpen?: () => boolean | Promise<boolean>;
}
interface FilteredListDashboardInitOptions<TEntity, TCriteria extends ListFilterCriteria> {
    route: ActivatedRoute;
    router: Router;
    refData: RefDataMap;
    config: FilteredListDashboardConfig<TEntity, TCriteria>;
    hooks?: FilteredListDashboardInitHooks<TEntity>;
    forEventId?: string;
}
/**
 * Wires list, detail, create, and optional bulk-edit controllers from a single dashboard config.
 */
declare class FilteredListDashboardController<TEntity, TCriteria extends ListFilterCriteria = ListFilterCriteria> {
    readonly listPage: FilteredListPageController<TCriteria>;
    readonly detailPage: ListDetailPageController<TEntity>;
    readonly createPage: ListCreatePageController;
    readonly bulkEditPage: BulkEditPageController<TEntity>;
    permissions: FilteredListDashboardPermissions;
    listPageAdapter: ConfiguredListPageAdapter<TCriteria>;
    private listRouteSync;
    private adapters;
    private config?;
    private refData;
    private route;
    get detailPageAdapter(): _ssweb_toolkit_list_dashboard_core.ConfiguredDetailPageAdapter<TEntity>;
    init(options: FilteredListDashboardInitOptions<TEntity, TCriteria>): void;
    destroy(): void;
    buildContext(): FilteredListDashboardContext;
    isListSelectable(): boolean;
    /** FAB visibility and create-sheet eligibility — delegates to {@link FilteredListCreateConfig.canOpen}. */
    get showCreateFab(): boolean;
    openBulkEdit(entities: TEntity[]): boolean;
    setRefData(refData: RefDataMap): void;
    get searchPlaceholder(): string;
    get filterSheetTitle(): string;
    get emptyMessage(): string;
    get hasCreateForm(): boolean;
    get createDefinition(): FormDefinition | undefined;
    get createInitialValues(): FormValues;
    validateBeforeCreate(values: FormValues): string | undefined;
    private createContextExtras;
    private createInitialValuesCache;
    private createInitialValuesPresetsRef;
    private readonly emptyCreateValues;
    setCreateContextExtras(extras: Partial<FilteredListCreateContext>): void;
    getCreateContext(): FilteredListCreateContext;
    get hasCreateStepper(): boolean;
    get createSteps(): CfFormStepperStep[];
    buildCreateStepDefinition: (stepId: string, values: FormValues) => FormDefinition;
    resolveCreateSteps: (values: FormValues) => string[];
    validateCreateStep: (stepId: string, values: FormValues) => string | undefined;
    prepareCreateStep: (stepId: string, values: FormValues) => Promise<void> | void;
    private resolveCanUpdateEntity;
}

interface ListActionFormSaved<TEntity> {
    actionFormId: string;
    config: ListActionFormConfig<TEntity>;
    entity: TEntity;
    result: unknown;
}
interface ListActionFormInitOptions<TEntity> {
    /** Resolves a named entry from `ListDashboardConfig.actionForms`. */
    resolveConfig: (actionFormId: string) => ListActionFormConfig<TEntity> | undefined;
    refData: () => RefDataMap;
    activeChip: () => string;
    permissions: () => Record<string, boolean | undefined>;
    preparationContext?: () => unknown;
    setFormValue?: (key: string, value: unknown) => void;
    onSaved?: (saved: ListActionFormSaved<TEntity>) => void;
    onError?: (error: unknown, actionFormId: string) => void;
    onValidationError?: (message: string) => void;
}
/**
 * Sheet state for one config-driven action form (`form` or `stepper`).
 * Also hosts synthetic flows built from `detail.edit` / `bulkEdit` stepper configs.
 */
declare class ListActionFormController<TEntity> {
    open: boolean;
    saving: boolean;
    loading: boolean;
    actionFormId?: string;
    title: string;
    definition?: FormDefinition;
    initialValues: FormValues;
    documents: ListFileUpload[];
    customStepData: Record<string, unknown>;
    showDocumentUpload: boolean;
    documentError?: string;
    documentAllowedTypes: string[];
    documentUploadHint?: string;
    saveLabel: string;
    private options?;
    private activeConfig?;
    private entity?;
    private latestValues;
    private subscription;
    init(options: ListActionFormInitOptions<TEntity>): void;
    destroy(): void;
    get config(): ListActionFormConfig<TEntity> | undefined;
    get kind(): ListFormFlowKind;
    get selected(): TEntity | undefined;
    get steps(): CfFormStepperStep[];
    get customSteps(): Record<string, ListFormCustomStepDef> | undefined;
    get values(): FormValues;
    /** Opens the entry registered under `actionFormId` in the dashboard config. */
    openForm(actionFormId: string, entity: TEntity | undefined): boolean;
    /** Opens an explicit config — used for detail-edit and bulk-edit stepper flows. */
    openWith(actionFormId: string, config: ListActionFormConfig<TEntity>, entity: TEntity | undefined): boolean;
    close(): void;
    onValuesChange(values: FormValues): void;
    onDocumentsChange(files: ListFileUpload[]): void;
    onCustomStepDataChange(change: {
        stepId: string;
        data: unknown;
    }): void;
    buildStepDefinition: (stepId: string, values: FormValues) => FormDefinition;
    resolveSteps: (values: FormValues) => string[];
    validateStep: (stepId: string, values: FormValues) => string | undefined;
    prepareStep: (stepId: string, values: FormValues) => Promise<void> | void;
    submit(values: FormValues): void;
    private buildContext;
    private applyValuesChangeResult;
    private resetState;
    private get refData();
    private get activeChip();
    private get preparationContext();
}

/**
 * Per-dashboard form cache. Host supplies one instance so tenant/route data
 * cannot leak across dashboards.
 */
declare class ListFormCache {
    private readonly resolver;
    compile<TEntity, TCriteria extends ListFilterCriteria, TContext, TOperations extends ListDashboardOperations>(definition: ListDashboardConfig<TEntity, TCriteria, TContext, TOperations>, context: ListFormResolverContext): Promise<FilteredListDashboardConfig<TEntity, TCriteria>>;
    invalidate(formId?: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ListFormCache, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ListFormCache>;
}

declare class ListPreparationService {
    loading: boolean;
    error: unknown;
    results: ReadonlyMap<string, unknown>;
    private runner?;
    private context?;
    private generation;
    private activeRun?;
    configure<TEntity, TCriteria extends ListFilterCriteria, TContext>(definition: ListDashboardConfig<TEntity, TCriteria, TContext>, context: TContext): void;
    prepare(trigger: ListPreparationTrigger): Promise<ReadonlyMap<string, unknown>>;
    /** Runs an explicit task id list — used by action forms with `preparationTasks`. */
    prepareTasks(taskIds: readonly string[]): Promise<ReadonlyMap<string, unknown>>;
    cancel(): void;
    private canonicalTrigger;
    private mergeTriggerIds;
    static ɵfac: i0.ɵɵFactoryDeclaration<ListPreparationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ListPreparationService>;
}

/** Synthetic action-form ids for the detail-edit and bulk-edit stepper flows. */
declare const LIST_DETAIL_EDIT_FORM_ID = "__detailEdit";
declare const LIST_BULK_EDIT_FORM_ID = "__bulkEdit";
type ListDashboardNotificationLevel = 'success' | 'error' | 'info';
interface ListDashboardNotification {
    level: ListDashboardNotificationLevel;
    message: string;
    error?: unknown;
}
interface ListDashboardRuntimeHooks<TEntity> extends FilteredListDashboardInitHooks<TEntity> {
    onCreated?: (result: unknown) => void;
    onCreateError?: (error: unknown) => void;
    onPreparationError?: (trigger: ListPreparationTrigger, error: unknown) => void;
    notify?: (notification: ListDashboardNotification) => void;
}
interface ListDashboardRuntimeInitOptions<TEntity, TCriteria extends ListFilterCriteria, TContext, TOperations extends ListDashboardOperations> {
    config: ListDashboardConfig<TEntity, TCriteria, TContext, TOperations>;
    formContext: ListFormResolverContext;
    preparationContext: TContext;
    route: ActivatedRoute;
    router: Router;
    refData?: RefDataMap;
    forEventId?: string;
    hooks?: ListDashboardRuntimeHooks<TEntity>;
}
/** Orchestration around ListDashboardConfig and FilteredListDashboardController. */
declare class ListDashboardRuntime<TEntity, TCriteria extends ListFilterCriteria = ListFilterCriteria, TContext = unknown, TOperations extends ListDashboardOperations = ListDashboardOperations> {
    private readonly formCache;
    readonly preparation: ListPreparationService;
    dashboard: FilteredListDashboardController<TEntity, TCriteria>;
    /** Sheet state for config-driven action forms and stepper edit flows. */
    readonly actionForm: ListActionFormController<TEntity>;
    loading: boolean;
    error: unknown;
    initialized: boolean;
    destroyed: boolean;
    createSaving: boolean;
    /** Custom stepper step data collected during the create flow. */
    createCustomStepData: Record<string, unknown>;
    private generation;
    private options?;
    private compiled?;
    private subscriptions;
    constructor(formCache?: ListFormCache, preparation?: ListPreparationService);
    get definition(): ListDashboardConfig<TEntity, TCriteria, TContext, TOperations> | undefined;
    init(options: ListDashboardRuntimeInitOptions<TEntity, TCriteria, TContext, TOperations>): Promise<void>;
    retry(): Promise<void>;
    setRefData(refData: RefDataMap): void;
    openDetail(row: ListRowItem<TEntity>, edit?: boolean): Promise<void>;
    openCreate(): Promise<void>;
    openBulkEdit(entities: TEntity[]): Promise<boolean>;
    enterDetailEdit(): void;
    /** True when `detail.edit` is configured as a stepper flow. */
    get hasEditStepper(): boolean;
    /** True when `bulkEdit` is configured as a stepper flow. */
    get hasBulkEditStepper(): boolean;
    /** Opens `actionForms[actionFormId]` for an entity after its preparation runs. */
    openActionForm(actionFormId: string, entity?: TEntity): Promise<boolean>;
    notify(notification: ListDashboardNotification): void;
    prepare(trigger: ListPreparationTrigger): Promise<boolean>;
    runOperationPreparation(): Promise<boolean>;
    runAction(run: string, selection?: readonly TEntity[], actionFormId?: string): void;
    onCreateCustomStepDataChange(change: {
        stepId: string;
        data: unknown;
    }): void;
    submitCreate(values: FormValues): void;
    destroy(): void;
    private mapEntityToListRow;
    private refreshCreated;
    private buildDashboardHooks;
    private syncFilterOptionsFromContext;
    private syncCreateContextFromPreparation;
    private installDetailEditPreparation;
    private initActionForm;
    private applyActionFormSuccess;
    private openDetailEditStepper;
    private openBulkEditStepper;
    /** Adapts `detail.edit` stepper hooks onto the shared action-form contract. */
    private buildDetailEditActionForm;
    /** Adapts `bulkEdit` stepper hooks onto the shared action-form contract. */
    private buildBulkEditActionForm;
    private runPreparationTasks;
    private runPreparation;
}

interface ListRowTemplateContext<TEntity> {
    $implicit: ListRowItem<TEntity>;
    entity: TEntity | undefined;
}
interface ListActionsTemplateContext<TEntity, TCriteria extends ListFilterCriteria = ListFilterCriteria, TContext = unknown, TOperations extends ListDashboardOperations = ListDashboardOperations> {
    $implicit: readonly TEntity[];
    controller: ListDashboardRuntime<TEntity, TCriteria, TContext, TOperations>;
}
interface ListDetailActionsTemplateContext<TEntity, TCriteria extends ListFilterCriteria = ListFilterCriteria, TContext = unknown, TOperations extends ListDashboardOperations = ListDashboardOperations> {
    $implicit: TEntity | undefined;
    controller: ListDashboardRuntime<TEntity, TCriteria, TContext, TOperations>;
}
interface ListOverlayTemplateContext<TEntity, TCriteria extends ListFilterCriteria = ListFilterCriteria, TContext = unknown, TOperations extends ListDashboardOperations = ListDashboardOperations> {
    $implicit: ListDashboardRuntime<TEntity, TCriteria, TContext, TOperations>;
}
declare class ListRowTemplateDirective<TEntity> {
    readonly template: TemplateRef<ListRowTemplateContext<TEntity>>;
    constructor(template: TemplateRef<ListRowTemplateContext<TEntity>>);
    static ngTemplateContextGuard<T>(_directive: ListRowTemplateDirective<T>, _context: unknown): _context is ListRowTemplateContext<T>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ListRowTemplateDirective<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ListRowTemplateDirective<any>, "ng-template[listRow]", never, {}, {}, never, never, true, never>;
}
declare class ListFloatingActionsDirective<TEntity, TCriteria extends ListFilterCriteria = ListFilterCriteria, TContext = unknown, TOperations extends ListDashboardOperations = ListDashboardOperations> {
    readonly template: TemplateRef<ListActionsTemplateContext<TEntity, TCriteria, TContext, TOperations>>;
    constructor(template: TemplateRef<ListActionsTemplateContext<TEntity, TCriteria, TContext, TOperations>>);
    static ɵfac: i0.ɵɵFactoryDeclaration<ListFloatingActionsDirective<any, any, any, any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ListFloatingActionsDirective<any, any, any, any>, "ng-template[listFloatingActions]", never, {}, {}, never, never, true, never>;
}
declare class ListBulkActionsDirective<TEntity, TCriteria extends ListFilterCriteria = ListFilterCriteria, TContext = unknown, TOperations extends ListDashboardOperations = ListDashboardOperations> {
    readonly template: TemplateRef<ListActionsTemplateContext<TEntity, TCriteria, TContext, TOperations>>;
    constructor(template: TemplateRef<ListActionsTemplateContext<TEntity, TCriteria, TContext, TOperations>>);
    static ɵfac: i0.ɵɵFactoryDeclaration<ListBulkActionsDirective<any, any, any, any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ListBulkActionsDirective<any, any, any, any>, "ng-template[listBulkActions]", never, {}, {}, never, never, true, never>;
}
declare class ListDetailFooterActionsDirective<TEntity, TCriteria extends ListFilterCriteria = ListFilterCriteria, TContext = unknown, TOperations extends ListDashboardOperations = ListDashboardOperations> {
    readonly template: TemplateRef<ListDetailActionsTemplateContext<TEntity, TCriteria, TContext, TOperations>>;
    constructor(template: TemplateRef<ListDetailActionsTemplateContext<TEntity, TCriteria, TContext, TOperations>>);
    static ɵfac: i0.ɵɵFactoryDeclaration<ListDetailFooterActionsDirective<any, any, any, any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ListDetailFooterActionsDirective<any, any, any, any>, "ng-template[listDetailFooterActions]", never, {}, {}, never, never, true, never>;
}
/** Rendered above the detail body in view mode (avatar, badges, summary chips). */
declare class ListDetailHeroDirective<TEntity, TCriteria extends ListFilterCriteria = ListFilterCriteria, TContext = unknown, TOperations extends ListDashboardOperations = ListDashboardOperations> {
    readonly template: TemplateRef<ListDetailActionsTemplateContext<TEntity, TCriteria, TContext, TOperations>>;
    constructor(template: TemplateRef<ListDetailActionsTemplateContext<TEntity, TCriteria, TContext, TOperations>>);
    static ɵfac: i0.ɵɵFactoryDeclaration<ListDetailHeroDirective<any, any, any, any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ListDetailHeroDirective<any, any, any, any>, "ng-template[listDetailHero]", never, {}, {}, never, never, true, never>;
}
/** Rendered below detail sections in view mode (comments, related panels, etc.). */
declare class ListDetailViewExtrasDirective<TEntity, TCriteria extends ListFilterCriteria = ListFilterCriteria, TContext = unknown, TOperations extends ListDashboardOperations = ListDashboardOperations> {
    readonly template: TemplateRef<ListDetailActionsTemplateContext<TEntity, TCriteria, TContext, TOperations>>;
    constructor(template: TemplateRef<ListDetailActionsTemplateContext<TEntity, TCriteria, TContext, TOperations>>);
    static ɵfac: i0.ɵɵFactoryDeclaration<ListDetailViewExtrasDirective<any, any, any, any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ListDetailViewExtrasDirective<any, any, any, any>, "ng-template[listDetailViewExtras]", never, {}, {}, never, never, true, never>;
}
declare class ListOverlayDirective<TEntity, TCriteria extends ListFilterCriteria = ListFilterCriteria, TContext = unknown, TOperations extends ListDashboardOperations = ListDashboardOperations> {
    readonly template: TemplateRef<ListOverlayTemplateContext<TEntity, TCriteria, TContext, TOperations>>;
    constructor(template: TemplateRef<ListOverlayTemplateContext<TEntity, TCriteria, TContext, TOperations>>);
    static ɵfac: i0.ɵɵFactoryDeclaration<ListOverlayDirective<any, any, any, any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ListOverlayDirective<any, any, any, any>, "ng-template[listOverlay]", never, {}, {}, never, never, true, never>;
}

interface ListRowLinkEvent<TEntity> {
    item: ListRowItem<TEntity>;
    linkId: string;
}
declare function toListRowLinkEvent<TEntity>(event: {
    item: ListRowItem;
    linkId: string;
}): ListRowLinkEvent<TEntity>;

declare class ListDashboardComponent<TEntity, TCriteria extends ListFilterCriteria = ListFilterCriteria, TContext = unknown, TOperations extends ListDashboardOperations = ListDashboardOperations> implements OnChanges, OnDestroy {
    readonly fileUploadComponent: Type<UldFileUploadComponent>;
    config: ListDashboardConfig<TEntity, TCriteria, TContext, TOperations>;
    refData: RefDataMap;
    routeContext?: TContext;
    formContext?: ListFormResolverContext;
    forEventId?: string;
    hooks?: ListDashboardRuntimeHooks<TEntity>;
    documentUploadHint: string;
    /** Engine options (e.g. phone country codes) applied to create, edit and bulk-edit forms. */
    formEngineOptions?: FormEngineOptions;
    rowUpdate: EventEmitter<TEntity>;
    rowLinkClick: EventEmitter<ListRowLinkEvent<TEntity>>;
    createComplete: EventEmitter<unknown>;
    saveError: EventEmitter<unknown>;
    notification: EventEmitter<ListDashboardNotification>;
    customRowTemplate?: ListRowTemplateDirective<TEntity>;
    floatingActions?: ListFloatingActionsDirective<TEntity, TCriteria, TContext, TOperations>;
    bulkActions?: ListBulkActionsDirective<TEntity, TCriteria, TContext, TOperations>;
    detailFooterActions?: ListDetailFooterActionsDirective<TEntity, TCriteria, TContext, TOperations>;
    detailHero?: ListDetailHeroDirective<TEntity, TCriteria, TContext, TOperations>;
    detailViewExtras?: ListDetailViewExtrasDirective<TEntity, TCriteria, TContext, TOperations>;
    overlay?: ListOverlayDirective<TEntity, TCriteria, TContext, TOperations>;
    readonly controller: ListDashboardRuntime<TEntity, TCriteria, TContext, TOperations>;
    readonly fileUploadMaxSize: number;
    constructor(route: ActivatedRoute, router: Router, cache: ListFormCache, preparation: ListPreparationService, fileUploadComponent: Type<UldFileUploadComponent>);
    private readonly route;
    private readonly router;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    get selectedEntities(): TEntity[];
    get visibleBulkActions(): ListActionDef[];
    get visibleDetailFooterActions(): ListActionDef[];
    get visibleDetailMenuActions(): ListActionDef[];
    get visibleFloatingActions(): ListActionDef[];
    /**
     * Row overflow actions for a single row. Evaluated per row rather than via
     * {@link visibleActions} so long lists don't recompute the whole selection
     * on every change detection pass.
     */
    rowMenuActionsFor(row: ListRowItem): ListActionDef[];
    hasRowMenuActions(row: ListRowItem): boolean;
    onRowMenuAction(action: ListActionDef, row: ListRowItem): void;
    /**
     * The detail sheet steps aside while an action form (including the stepper
     * edit and bulk-edit flows) is open, so the two sheets never stack. Detail
     * state is kept, so closing the action form restores the sheet as it was.
     */
    get detailSheetOpen(): boolean;
    /** True when `detail.edit` runs as a stepper instead of the single-form sheet body. */
    get hasEditStepper(): boolean;
    /** True when `bulkEdit` runs as a stepper instead of the bulk single-form sheet. */
    get hasBulkEditStepper(): boolean;
    onRowClick(row: ListRowItem): void;
    onRowLinkClick(event: {
        item: ListRowItem;
        linkId: string;
    }): void;
    onCreateSave(values: FormValues): void;
    onCreateValuesChange(values: FormValues): void;
    onAction(action: ListActionDef): void;
    onDetailAction(action: ListActionDef): void;
    onValidationError(message: string): void;
    private visibleActions;
    private asFormData;
    static ɵfac: i0.ɵɵFactoryDeclaration<ListDashboardComponent<any, any, any, any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ListDashboardComponent<any, any, any, any>, "na-list-dashboard", never, { "config": { "alias": "config"; "required": true; }; "refData": { "alias": "refData"; "required": false; }; "routeContext": { "alias": "routeContext"; "required": false; }; "formContext": { "alias": "formContext"; "required": false; }; "forEventId": { "alias": "forEventId"; "required": false; }; "hooks": { "alias": "hooks"; "required": false; }; "documentUploadHint": { "alias": "documentUploadHint"; "required": false; }; "formEngineOptions": { "alias": "formEngineOptions"; "required": false; }; }, { "rowUpdate": "rowUpdate"; "rowLinkClick": "rowLinkClick"; "createComplete": "createComplete"; "saveError": "saveError"; "notification": "notification"; }, ["customRowTemplate", "floatingActions", "bulkActions", "detailFooterActions", "detailHero", "detailViewExtras", "overlay"], never, true, never>;
}

export { AppliedFilterPillsComponent, BulkEditPageController, ChipFilterBarComponent, DynamicFileUploadComponent, FilteredInfiniteListComponent, FilteredListDashboardController, FilteredListPageComponent, FilteredListPageController, InfiniteListRowComponent, InfiniteScrollSentinelDirective, LIST_BULK_EDIT_FORM_ID, LIST_DETAIL_EDIT_FORM_ID, LIST_FORM_CUSTOM_STEP_RENDERERS, ListActionFormController, ListBulkActionsDirective, ListCreatePageController, ListCreateRouteSync, ListCreateSheetComponent, ListCreateStepperSheetComponent, ListDashboardComponent, ListDashboardRuntime, ListDetailFooterActionsDirective, ListDetailHeroDirective, ListDetailPageController, ListDetailRouteSync, ListDetailSectionsComponent, ListDetailSheetComponent, ListDetailViewExtrasDirective, ListFilterSheetComponent, ListFilterToolbarComponent, ListFloatingActionsDirective, ListFormCache, ListFormCustomStepHostComponent, ListCreateStepperSheetComponent as ListFormStepperSheetComponent, ListOverlayDirective, ListPreparationService, ListRouteSync, ListRowCardComponent, ListRowTemplateDirective, MobileFormSheetComponent, ULD_DOCUMENT_LIST, ULD_FILE_UPLOAD, ULD_ROOT_CONFIG, UniversalListDashboardModule, buildCreateRouteQuery, isCreateActionOpen, provideListFormCustomStepRenderer, setMobileSheetOpen, toListRowLinkEvent, trackByIndex };
export type { FilteredListDashboardInitHooks, FilteredListDashboardInitOptions, ListActionFormInitOptions, ListActionFormSaved, ListActionsTemplateContext, ListCreateRoutePending, ListCreateRoutePresetBinding, ListCreateRouteSyncConfig, ListDashboardNotification, ListDashboardNotificationLevel, ListDashboardRuntimeHooks, ListDashboardRuntimeInitOptions, ListDetailActionsTemplateContext, ListDetailRouteMode, ListDetailRoutePending, ListDetailRouteSyncConfig, ListFormCustomStepComponent, ListFormCustomStepDataChange, ListFormCustomStepOutput, ListFormCustomStepRenderer, ListOverlayTemplateContext, ListRowLinkEvent, ListRowTemplateContext, UldDocumentListComponent, UldFileUploadComponent, UniversalListDashboardRootConfig };
