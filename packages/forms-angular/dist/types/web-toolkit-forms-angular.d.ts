import * as i0 from '@angular/core';
import { InjectionToken, Type, OnChanges, EventEmitter, ChangeDetectorRef, SimpleChanges, TemplateRef, QueryList, EnvironmentProviders } from '@angular/core';
import * as _web_toolkit_forms_core from '@web-toolkit/forms-core';
import { FormDefinition, FormValues, FormEngineOptions, ResolvedField, FormStep, FormValidationResult, CustomFieldType, CustomFieldValueParsed, FieldOption, DateRangeValue } from '@web-toolkit/forms-core';

declare class FormEngineService {
    private engine;
    init(definition: FormDefinition, initialValues?: FormValues, options?: FormEngineOptions): void;
    private requireEngine;
    getValues(): FormValues;
    setValue(key: string, value: FormValues[string]): void;
    setValues(values: FormValues): void;
    updateDefinition(definition: FormDefinition): void;
    setFieldError(key: string, message: string): void;
    clearFieldError(key: string): void;
    getResolvedFields(): ResolvedField[];
    getVisibleFields(): ResolvedField[];
    getConditionHiddenKeys(): string[];
    getSteps(): FormStep[];
    validate(): FormValidationResult;
    getFieldErrors(): Record<string, string>;
    getSubmitValues(): FormValues;
    reset(initialValues?: FormValues): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormEngineService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FormEngineService>;
}

interface CfFormClassNames {
    root?: string;
    field?: string;
    label?: string;
    control?: string;
    error?: string;
    requiredMark?: string;
    submit?: string;
    phoneGroup?: string;
    phoneCountry?: string;
    phoneNational?: string;
}
interface CfFieldRenderer {
    fieldType: CustomFieldType;
}
declare const CUSTOM_FORM_FIELD_RENDERERS: InjectionToken<Partial<Record<"number" | "boolean" | "text" | "textarea" | "email" | "phone" | "toggle" | "date" | "date_range" | "select" | "multiselect" | "autocomplete" | "password", Type<CfFieldRenderer>>>>;
declare const CF_FORM_CLASS_NAMES: InjectionToken<CfFormClassNames>;

declare class CfFormComponent implements OnChanges {
    private readonly engine;
    classNames: CfFormClassNames | null;
    private readonly cdr;
    definition: FormDefinition;
    initialValues?: FormValues;
    engineOptions?: FormEngineOptions;
    idPrefix: string;
    hideHeading: boolean;
    submitLabel: string;
    showSubmit: boolean;
    submitted: EventEmitter<FormValues>;
    valuesChange: EventEmitter<FormValues>;
    submitting: boolean;
    private engineReady;
    /** Stable reference for child fields — updated only when engine values change. */
    formValuesSnapshot: FormValues;
    constructor(engine: FormEngineService, classNames: CfFormClassNames | null, cdr: ChangeDetectorRef);
    /** Live visible steps — always read from the engine (conditional fields). */
    get steps(): FormStep[];
    /** Live field values — includes conditionally hidden fields. */
    get values(): FormValues;
    /** Live validation errors from the engine. */
    get fieldErrors(): Record<string, string>;
    ngOnChanges(changes: SimpleChanges): void;
    setValuesSilent(partial: FormValues): void;
    setValue(key: string, value: FormValues[string]): void;
    setFieldError(key: string, message: string): void;
    clearFieldError(key: string): void;
    onSubmit(event: Event): Promise<void>;
    /** Visible field values — for embedded/filter forms without using submit. */
    getVisibleValues(): FormValues;
    /** All field values held by the engine (includes conditionally hidden fields). */
    getValues(): FormValues;
    /** Keys hidden by an unmet condition — drop these before submitting. */
    getConditionHiddenKeys(): string[];
    /** Run validation and refresh field errors (for embedded save actions). */
    validateForm(): boolean;
    /** Reset the form engine and re-render fields. */
    resetForm(initialValues?: FormValues): void;
    private initEngine;
    private refreshFormValuesSnapshot;
    private hasSameDefinitionStructure;
    private hasSameFormValues;
    static ɵfac: i0.ɵɵFactoryDeclaration<CfFormComponent, [null, { optional: true; }, null]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CfFormComponent, "cf-form", never, { "definition": { "alias": "definition"; "required": true; }; "initialValues": { "alias": "initialValues"; "required": false; }; "engineOptions": { "alias": "engineOptions"; "required": false; }; "idPrefix": { "alias": "idPrefix"; "required": false; }; "hideHeading": { "alias": "hideHeading"; "required": false; }; "submitLabel": { "alias": "submitLabel"; "required": false; }; "showSubmit": { "alias": "showSubmit"; "required": false; }; }, { "submitted": "submitted"; "valuesChange": "valuesChange"; }, never, never, true, never>;
}

declare class CfFieldComponent implements OnChanges {
    private readonly cdr;
    field: ResolvedField;
    fieldId: string;
    value: CustomFieldValueParsed;
    error?: string;
    classNames?: {
        field?: string;
        label?: string;
        control?: string;
        error?: string;
        requiredMark?: string;
        phoneGroup?: string;
        phoneCountry?: string;
        phoneNational?: string;
    };
    engineOptions?: FormEngineOptions;
    formValues: FormValues;
    valueChange: EventEmitter<CustomFieldValueParsed>;
    private static readonly MAX_AUTOCOMPLETE_OPTIONS;
    filteredAutocompleteOptions: FieldOption[];
    private autocompleteQuery;
    /** Prevents the panel from reopening while a selection is being applied. */
    private autocompleteSuppressPanelOpen;
    private autocompleteTrigger?;
    dateModel: Date | null;
    dateRangeStartModel: Date | null;
    dateRangeEndModel: Date | null;
    dateMinModel: Date | null;
    dateMaxModel: Date | null;
    dateEndMinModel: Date | null;
    dateEndMaxModel: Date | null;
    dateFilterFn: ((date: Date | null) => boolean) | undefined;
    private cachedDateBounds;
    constructor(cdr: ChangeDetectorRef);
    ngOnChanges(changes: SimpleChanges): void;
    get phoneCountryOptions(): _web_toolkit_forms_core.PhoneCountryCodeOption[];
    get phoneParsed(): _web_toolkit_forms_core.ParsedPhoneValue;
    get visible(): boolean;
    get isReadOnly(): boolean;
    /** Resolved Material hint text; empty/null hides the hint. */
    get fieldHint(): string;
    get fieldPlaceholder(): string;
    get textValue(): string;
    get autocompleteInputText(): string;
    get multiValue(): string[];
    get boolValue(): boolean;
    get dateRangeValue(): DateRangeValue;
    get inputType(): string;
    onTextNgModelChange(value: string): void;
    onPhoneCountryCodeChange(code: string): void;
    onPhoneNationalNgModel(national: string): void;
    onDateChange(value: Date | null): void;
    onDateRangeStartChange(value: Date | null): void;
    onDateRangeEndChange(value: Date | null): void;
    displayAutocomplete: (key: string) => string;
    onAutocompleteFocus(): void;
    onAutocompletePanelOpened(): void;
    onAutocompleteInput(text: string): void;
    onAutocompleteOptionSelected(key: string): void;
    private syncAutocompleteOptions;
    private get autocompleteOptions();
    private openAutocompletePanelIfNeeded;
    private closeAutocompletePanel;
    private syncDateConstraints;
    private sameDateBounds;
    private sameCalendarDay;
    private syncDateModel;
    private syncDateRangeModels;
    private datesEqual;
    static ɵfac: i0.ɵɵFactoryDeclaration<CfFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CfFieldComponent, "cf-field", never, { "field": { "alias": "field"; "required": true; }; "fieldId": { "alias": "fieldId"; "required": false; }; "value": { "alias": "value"; "required": false; }; "error": { "alias": "error"; "required": false; }; "classNames": { "alias": "classNames"; "required": false; }; "engineOptions": { "alias": "engineOptions"; "required": false; }; "formValues": { "alias": "formValues"; "required": false; }; }, { "valueChange": "valueChange"; }, never, never, true, never>;
}

/** Marks a projected ng-template as content for a custom stepper step. */
declare class CfFormStepperStepDirective {
    readonly template: TemplateRef<unknown>;
    stepId: string;
    constructor(template: TemplateRef<unknown>);
    static ɵfac: i0.ɵɵFactoryDeclaration<CfFormStepperStepDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<CfFormStepperStepDirective, "ng-template[cfFormStepperStep]", never, { "stepId": { "alias": "cfFormStepperStep"; "required": true; }; }, {}, never, never, true, never>;
}

interface CfFormStepperStep<T extends string = string> {
    id: T;
    label: string;
    kind: 'form' | 'custom';
}
interface CfFormStepperStepChange<T extends string = string> {
    stepId: T;
    values: FormValues;
}
/** Live position of the stepper for hosts that render a pinned footer. */
interface CfFormStepperState<T extends string = string> {
    stepId: T;
    stepIndex: number;
    totalSteps: number;
    isFirstStep: boolean;
    isLastStep: boolean;
    /** True while {@link CfFormStepperPrepareStep} is resolving the next step. */
    preparing: boolean;
}
type CfFormStepperBuildDefinition<T extends string = string> = (stepId: T, values: FormValues) => FormDefinition;
type CfFormStepperResolveSteps<T extends string = string> = (values: FormValues) => T[];
type CfFormStepperValidateStep<T extends string = string> = (stepId: T, values: FormValues) => string | undefined;
/**
 * Runs before a step is entered, so a step can load what its definition needs
 * (e.g. a form schema chosen on a previous step) instead of preloading everything.
 */
type CfFormStepperPrepareStep<T extends string = string> = (stepId: T, values: FormValues) => Promise<void> | void;
interface CfFormStepperCustomStepContext<T extends string = string> {
    stepId: T;
    values: FormValues;
}
type CfFormStepperCustomStepValidator = () => boolean;

declare class CfFormStepperComponent<T extends string = string> implements OnChanges {
    private readonly cdr;
    steps: CfFormStepperStep<T>[];
    buildStepDefinition: CfFormStepperBuildDefinition<T>;
    resolveSteps?: CfFormStepperResolveSteps<T>;
    initialValues: FormValues;
    engineOptions?: FormEngineOptions;
    validateStep?: CfFormStepperValidateStep<T>;
    /** Awaited before a step is entered so its definition can be loaded on demand. */
    prepareStep?: CfFormStepperPrepareStep<T>;
    idPrefix: string;
    allowCancel: boolean;
    submitting: boolean;
    backLabel: string;
    nextLabel: string;
    cancelLabel: string;
    completeLabel: string;
    submittingLabel: string;
    preparingLabel: string;
    validationErrorTitle: string;
    validationErrorMessage: string;
    prepareStepErrorMessage: string;
    /** When false, the action bar is not rendered inline; hosts project {@link actionsTemplate}. */
    showInlineActions: boolean;
    completed: EventEmitter<FormValues>;
    cancelled: EventEmitter<void>;
    stepChange: EventEmitter<CfFormStepperStepChange<T>>;
    stepStateChange: EventEmitter<CfFormStepperState<T>>;
    validationError: EventEmitter<string>;
    stepForm?: CfFormComponent;
    /** `descendants` lets hosts declare step templates inside `*ngFor`/`*ngIf` blocks. */
    customStepTemplates: QueryList<CfFormStepperStepDirective>;
    /** Optional validator registered by custom step content. */
    customStepValidator: CfFormStepperCustomStepValidator | null;
    protected currentStepId: T;
    protected stepDefinition: FormDefinition;
    protected stepInitialValues: FormValues;
    protected formValues: FormValues;
    /** Live edits on the active form step (merged into resolveSteps before Next/Back). */
    private liveStepValues;
    private lastEmittedStateKey;
    /** Bumped on each step refresh so cf-form is destroyed/recreated (starts at 0 = not mounted). */
    protected stepFormKey: number;
    /** True while {@link prepareStep} resolves the step the user is moving to. */
    protected preparing: boolean;
    constructor(cdr: ChangeDetectorRef);
    private get effectiveValues();
    protected get activeStepIds(): T[];
    protected get stepIndex(): number;
    protected get isFirstStep(): boolean;
    protected get isLastStep(): boolean;
    protected get currentStepLabel(): string;
    protected get nextButtonLabel(): string;
    protected get currentStepKind(): 'form' | 'custom';
    protected get customStepTemplate(): i0.TemplateRef<unknown>;
    ngOnChanges(changes: SimpleChanges): void;
    /** Register a validator from custom step content (cleared on step change). */
    registerCustomStepValidator(validator: CfFormStepperCustomStepValidator | null): void;
    onBackOrCancel(): void;
    onNext(): Promise<void>;
    getValues(): FormValues;
    protected onStepValuesChange(values: FormValues): void;
    private goToStep;
    private validateCurrentStep;
    private mergeCurrentStepValues;
    private resetSteps;
    private refreshStepDefinition;
    private ensureCurrentStepInActiveIds;
    private emitStepState;
    private hasSameFormValues;
    static ɵfac: i0.ɵɵFactoryDeclaration<CfFormStepperComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CfFormStepperComponent<any>, "cf-form-stepper", never, { "steps": { "alias": "steps"; "required": true; }; "buildStepDefinition": { "alias": "buildStepDefinition"; "required": true; }; "resolveSteps": { "alias": "resolveSteps"; "required": false; }; "initialValues": { "alias": "initialValues"; "required": false; }; "engineOptions": { "alias": "engineOptions"; "required": false; }; "validateStep": { "alias": "validateStep"; "required": false; }; "prepareStep": { "alias": "prepareStep"; "required": false; }; "idPrefix": { "alias": "idPrefix"; "required": false; }; "allowCancel": { "alias": "allowCancel"; "required": false; }; "submitting": { "alias": "submitting"; "required": false; }; "backLabel": { "alias": "backLabel"; "required": false; }; "nextLabel": { "alias": "nextLabel"; "required": false; }; "cancelLabel": { "alias": "cancelLabel"; "required": false; }; "completeLabel": { "alias": "completeLabel"; "required": false; }; "submittingLabel": { "alias": "submittingLabel"; "required": false; }; "preparingLabel": { "alias": "preparingLabel"; "required": false; }; "validationErrorTitle": { "alias": "validationErrorTitle"; "required": false; }; "validationErrorMessage": { "alias": "validationErrorMessage"; "required": false; }; "prepareStepErrorMessage": { "alias": "prepareStepErrorMessage"; "required": false; }; "showInlineActions": { "alias": "showInlineActions"; "required": false; }; }, { "completed": "completed"; "cancelled": "cancelled"; "stepChange": "stepChange"; "stepStateChange": "stepStateChange"; "validationError": "validationError"; }, ["customStepTemplates"], never, true, never>;
}

/** Register animations required by Angular Material form controls in `cf-form` / `cf-field`. */
declare function provideCfFormMaterial(): EnvironmentProviders;

export { CF_FORM_CLASS_NAMES, CUSTOM_FORM_FIELD_RENDERERS, CfFieldComponent, CfFormComponent, CfFormStepperComponent, CfFormStepperStepDirective, FormEngineService, provideCfFormMaterial };
export type { CfFieldRenderer, CfFormClassNames, CfFormStepperBuildDefinition, CfFormStepperCustomStepContext, CfFormStepperCustomStepValidator, CfFormStepperPrepareStep, CfFormStepperResolveSteps, CfFormStepperState, CfFormStepperStep, CfFormStepperStepChange, CfFormStepperValidateStep };
