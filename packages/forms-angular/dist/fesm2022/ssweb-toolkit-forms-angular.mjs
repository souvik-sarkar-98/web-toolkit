import * as i0 from '@angular/core';
import { EventEmitter, ViewChild, Output, Input, Component, Injectable, InjectionToken, Optional, Inject, Directive, ContentChildren, makeEnvironmentProviders } from '@angular/core';
import * as i2$1 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import { resolvePhoneCountryCodeOptions, parsePhoneFieldValue, isDateRangeValue, formatPhoneFieldValue, formatIsoDate, mergeDateRangePart, resolveEffectiveDateBounds, hasDateConstraints, createDatePickerFilter, parseIsoDate, FormEngine } from '@ssweb-toolkit/forms-core';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import * as i1 from '@angular/forms';
import { FormsModule } from '@angular/forms';
import * as i6 from '@angular/material/autocomplete';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import * as i5 from '@angular/material/checkbox';
import { MatCheckboxModule } from '@angular/material/checkbox';
import * as i7 from '@angular/material/slide-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatNativeDateModule } from '@angular/material/core';
import * as i8 from '@angular/material/datepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import * as i2 from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import * as i3 from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';
import * as i4 from '@angular/material/select';
import { MatSelectModule } from '@angular/material/select';
import { provideAnimations } from '@angular/platform-browser/animations';

class CfFieldComponent {
    cdr;
    field;
    fieldId = '';
    value = null;
    error;
    classNames;
    engineOptions;
    formValues = {};
    valueChange = new EventEmitter();
    static MAX_AUTOCOMPLETE_OPTIONS = 100;
    filteredAutocompleteOptions = [];
    autocompleteQuery = '';
    /** Prevents the panel from reopening while a selection is being applied. */
    autocompleteSuppressPanelOpen = false;
    autocompleteTrigger;
    dateModel = null;
    dateRangeStartModel = null;
    dateRangeEndModel = null;
    dateMinModel = null;
    dateMaxModel = null;
    dateEndMinModel = null;
    dateEndMaxModel = null;
    dateFilterFn;
    cachedDateBounds = null;
    constructor(cdr) {
        this.cdr = cdr;
    }
    ngOnChanges(changes) {
        if (changes['value'] || changes['field'] || changes['formValues']) {
            if (this.field.definition.fieldType === 'date') {
                this.syncDateConstraints();
                this.syncDateModel();
            }
            if (this.field.definition.fieldType === 'date_range') {
                this.syncDateConstraints();
                this.syncDateRangeModels();
            }
            if (this.field.definition.fieldType === 'autocomplete') {
                if (changes['value']) {
                    this.autocompleteQuery = '';
                }
                this.syncAutocompleteOptions(this.autocompleteQuery);
            }
        }
    }
    get phoneCountryOptions() {
        return resolvePhoneCountryCodeOptions(this.engineOptions);
    }
    get phoneParsed() {
        return parsePhoneFieldValue(this.value, this.engineOptions);
    }
    get visible() {
        return this.field.visible;
    }
    get isReadOnly() {
        return this.field.definition.readOnly === true;
    }
    /** Resolved Material hint text; empty/null hides the hint. */
    get fieldHint() {
        const hint = this.field.definition.hint;
        if (hint == null)
            return '';
        if (typeof hint === 'function') {
            return hint(this.formValues)?.trim() || '';
        }
        return hint.trim();
    }
    get fieldPlaceholder() {
        const def = this.field.definition;
        if (def.placeholder?.trim())
            return def.placeholder.trim();
        const label = def.label.trim().toLowerCase();
        if (def.fieldType === 'autocomplete') {
            return def.placeholder?.trim() || `Search ${label}`;
        }
        if (def.fieldType === 'select' || def.fieldType === 'multiselect') {
            return `Select ${label}`;
        }
        if (def.fieldType === 'date') {
            return def.placeholder?.trim() || 'DD/MM/YYYY';
        }
        return `Enter ${label}`;
    }
    get textValue() {
        if (this.value === null || this.value === undefined)
            return '';
        if (typeof this.value === 'boolean')
            return '';
        if (typeof this.value === 'number')
            return String(this.value);
        if (Array.isArray(this.value))
            return this.value.join(',');
        if (isDateRangeValue(this.value))
            return '';
        return this.value;
    }
    get autocompleteInputText() {
        if (this.autocompleteQuery) {
            return this.autocompleteQuery;
        }
        return this.displayAutocomplete(this.textValue);
    }
    get multiValue() {
        return Array.isArray(this.value) ? this.value : [];
    }
    get boolValue() {
        return Boolean(this.value);
    }
    get dateRangeValue() {
        return isDateRangeValue(this.value) ? this.value : {};
    }
    get inputType() {
        switch (this.field.definition.fieldType) {
            case 'email':
                return 'email';
            case 'phone':
                return 'tel';
            case 'number':
                return 'number';
            case 'date':
                return 'text';
            case 'password':
                return 'password';
            default:
                return 'text';
        }
    }
    onTextNgModelChange(value) {
        if (this.isReadOnly) {
            return;
        }
        if (this.field.definition.fieldType === 'number') {
            this.valueChange.emit(value === '' ? '' : Number(value));
            return;
        }
        this.valueChange.emit(value);
    }
    onPhoneCountryCodeChange(code) {
        this.valueChange.emit(formatPhoneFieldValue(code, this.phoneParsed.nationalNumber));
    }
    onPhoneNationalNgModel(national) {
        this.valueChange.emit(formatPhoneFieldValue(this.phoneParsed.countryCode, national));
    }
    onDateChange(value) {
        if (this.datesEqual(this.dateModel, value)) {
            return;
        }
        this.dateModel = value;
        this.valueChange.emit(formatIsoDate(value) || '');
    }
    onDateRangeStartChange(value) {
        if (this.datesEqual(this.dateRangeStartModel, value)) {
            return;
        }
        this.dateRangeStartModel = value;
        const next = mergeDateRangePart(this.dateRangeValue, { startDate: formatIsoDate(value) });
        if (next.startDate === this.dateRangeValue.startDate
            && next.endDate === this.dateRangeValue.endDate) {
            return;
        }
        this.valueChange.emit(next);
    }
    onDateRangeEndChange(value) {
        if (this.datesEqual(this.dateRangeEndModel, value)) {
            return;
        }
        this.dateRangeEndModel = value;
        const next = mergeDateRangePart(this.dateRangeValue, { endDate: formatIsoDate(value) });
        if (next.startDate === this.dateRangeValue.startDate
            && next.endDate === this.dateRangeValue.endDate) {
            return;
        }
        this.valueChange.emit(next);
    }
    displayAutocomplete = (key) => {
        if (!key) {
            return '';
        }
        return this.autocompleteOptions.find(option => option.key === key)?.label ?? key;
    };
    onAutocompleteFocus() {
        this.syncAutocompleteOptions(this.autocompleteQuery);
        this.openAutocompletePanelIfNeeded();
    }
    onAutocompletePanelOpened() {
        if (!this.autocompleteQuery.trim() && this.textValue) {
            this.closeAutocompletePanel();
            return;
        }
        if (this.autocompleteQuery.trim()) {
            return;
        }
        this.filteredAutocompleteOptions = this.autocompleteOptions.slice(0, CfFieldComponent.MAX_AUTOCOMPLETE_OPTIONS);
    }
    onAutocompleteInput(text) {
        if (this.autocompleteSuppressPanelOpen) {
            return;
        }
        this.autocompleteQuery = text;
        this.syncAutocompleteOptions(text);
        const normalized = text.trim().toLowerCase();
        const matched = this.autocompleteOptions.find(option => option.key === text || option.label.toLowerCase() === normalized);
        this.valueChange.emit(matched?.key ?? '');
        if (matched && (matched.key === text || matched.label.toLowerCase() === normalized)) {
            this.autocompleteQuery = '';
            this.closeAutocompletePanel();
            return;
        }
        this.openAutocompletePanelIfNeeded();
    }
    onAutocompleteOptionSelected(key) {
        this.autocompleteSuppressPanelOpen = true;
        this.autocompleteQuery = '';
        this.syncAutocompleteOptions('');
        this.valueChange.emit(key);
        this.closeAutocompletePanel();
        queueMicrotask(() => {
            this.closeAutocompletePanel();
            this.autocompleteSuppressPanelOpen = false;
        });
    }
    syncAutocompleteOptions(query) {
        const options = this.autocompleteOptions;
        const normalized = query.trim().toLowerCase();
        if (!normalized) {
            this.filteredAutocompleteOptions = options.slice(0, CfFieldComponent.MAX_AUTOCOMPLETE_OPTIONS);
            return;
        }
        if (options.some(option => option.key === query)) {
            this.filteredAutocompleteOptions = options.slice(0, CfFieldComponent.MAX_AUTOCOMPLETE_OPTIONS);
            return;
        }
        const filtered = [];
        for (const option of options) {
            if (option.label.toLowerCase().includes(normalized)) {
                filtered.push(option);
                if (filtered.length >= CfFieldComponent.MAX_AUTOCOMPLETE_OPTIONS) {
                    break;
                }
            }
        }
        this.filteredAutocompleteOptions = filtered;
        this.cdr.markForCheck();
    }
    get autocompleteOptions() {
        if (this.field.availableOptions.length > 0) {
            return this.field.availableOptions;
        }
        const { fieldOptions } = this.field.definition;
        return typeof fieldOptions === 'function'
            ? fieldOptions(this.formValues)
            : fieldOptions;
    }
    openAutocompletePanelIfNeeded() {
        if (this.autocompleteSuppressPanelOpen) {
            return;
        }
        queueMicrotask(() => {
            if (this.autocompleteSuppressPanelOpen) {
                return;
            }
            const isSearching = this.autocompleteQuery.trim().length > 0;
            const hasNoSelection = !this.textValue;
            if ((isSearching || hasNoSelection) && this.filteredAutocompleteOptions.length > 0) {
                this.autocompleteTrigger?.openPanel();
            }
        });
    }
    closeAutocompletePanel() {
        this.autocompleteTrigger?.closePanel();
    }
    syncDateConstraints() {
        const selfValue = this.field.definition.fieldType === 'date_range'
            ? this.dateRangeValue
            : undefined;
        const bounds = resolveEffectiveDateBounds(this.field.definition.dateConstraints, this.formValues, new Date(), selfValue);
        if (this.cachedDateBounds && this.sameDateBounds(this.cachedDateBounds, bounds)) {
            return;
        }
        this.cachedDateBounds = bounds;
        this.dateMinModel = bounds.min;
        this.dateMaxModel = bounds.max;
        this.dateEndMinModel = bounds.endMin;
        this.dateEndMaxModel = bounds.endMax;
        this.dateFilterFn = hasDateConstraints(bounds)
            ? createDatePickerFilter(bounds)
            : undefined;
    }
    sameDateBounds(left, right) {
        return (this.sameCalendarDay(left.min, right.min)
            && this.sameCalendarDay(left.max, right.max)
            && this.sameCalendarDay(left.endMin, right.endMin)
            && this.sameCalendarDay(left.endMax, right.endMax)
            && left.disabledWeekdays.length === right.disabledWeekdays.length
            && left.disabledWeekdays.every((day, index) => day === right.disabledWeekdays[index]));
    }
    sameCalendarDay(left, right) {
        if (left === right) {
            return true;
        }
        if (!left || !right) {
            return !left && !right;
        }
        return left.getTime() === right.getTime();
    }
    syncDateModel() {
        const next = parseIsoDate(this.textValue || undefined);
        if (!this.datesEqual(this.dateModel, next)) {
            this.dateModel = next;
        }
    }
    syncDateRangeModels() {
        const nextStart = parseIsoDate(this.dateRangeValue.startDate);
        const nextEnd = parseIsoDate(this.dateRangeValue.endDate);
        if (!this.datesEqual(this.dateRangeStartModel, nextStart)) {
            this.dateRangeStartModel = nextStart;
        }
        if (!this.datesEqual(this.dateRangeEndModel, nextEnd)) {
            this.dateRangeEndModel = nextEnd;
        }
    }
    datesEqual(left, right) {
        if (left === right) {
            return true;
        }
        if (!left || !right) {
            return !left && !right;
        }
        return left.getTime() === right.getTime();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: CfFieldComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.21", type: CfFieldComponent, isStandalone: true, selector: "cf-field", inputs: { field: "field", fieldId: "fieldId", value: "value", error: "error", classNames: "classNames", engineOptions: "engineOptions", formValues: "formValues" }, outputs: { valueChange: "valueChange" }, viewQueries: [{ propertyName: "autocompleteTrigger", first: true, predicate: ["autocompleteTrigger"], descendants: true }], usesOnChanges: true, ngImport: i0, template: `
    @if (visible) {
      @switch (field.definition.fieldType) {
        @case ('boolean') {
          <div
            class="cf-boolean-field"
            [ngClass]="classNames?.field"
            [attr.data-cf-field]="field.definition.key"
            [attr.data-cf-type]="field.definition.fieldType"
          >
            <mat-checkbox
              [id]="fieldId"
              [ngModel]="boolValue"
              (ngModelChange)="valueChange.emit($event)"
            >
              {{ field.definition.label }}
              @if (field.effectiveMandatory) {
                <span class="cf-required-mark" aria-hidden="true"> *</span>
              }
            </mat-checkbox>
            @if (fieldHint) {
              <div class="cf-field-hint">{{ fieldHint }}</div>
            }
            @if (error) {
              <div class="mat-mdc-form-field-error" role="alert">{{ error }}</div>
            }
          </div>
        }
        @case ('phone') {
          <div
            class="cf-field-block"
            [attr.data-cf-field]="field.definition.key"
            [attr.data-cf-type]="field.definition.fieldType"
          >
            <label [for]="fieldId" class="cf-field-label" [ngClass]="classNames?.label">
              {{ field.definition.label }}
              @if (field.effectiveMandatory) {
                <span class="cf-required-mark" aria-hidden="true"> *</span>
              }
            </label>
            <div class="cf-phone-group" [ngClass]="classNames?.phoneGroup">
              @if (phoneCountryOptions.length > 1) {
                <mat-form-field
                  appearance="outline"
                  class="cf-field cf-phone-country-field"
                  [ngClass]="classNames?.phoneCountry"
                  subscriptSizing="dynamic"
                  [class.cf-field--invalid]="!!error"
                >
                  <mat-select
                    class="cf-phone-country-select"
                    [id]="fieldId + '-country'"
                    [ngModel]="phoneParsed.countryCode"
                    (ngModelChange)="onPhoneCountryCodeChange($event)"
                    aria-label="Country code"
                  >
                    <mat-select-trigger>{{ phoneParsed.countryCode }}</mat-select-trigger>
                    @for (opt of phoneCountryOptions; track opt.code) {
                      <mat-option [value]="opt.code">{{ opt.label ?? opt.code }}</mat-option>
                    }
                  </mat-select>
                </mat-form-field>
              }
              <mat-form-field
                appearance="outline"
                class="cf-field cf-phone-field"
                [ngClass]="classNames?.field"
                subscriptSizing="dynamic"
                [class.cf-field--invalid]="!!error"
              >
                @if (phoneCountryOptions.length <= 1) {
                  <span matTextPrefix class="cf-phone-prefix">{{ phoneParsed.countryCode }}</span>
                }
                <input
                  matInput
                  type="tel"
                  inputmode="tel"
                  autocomplete="tel-national"
                  [id]="fieldId"
                  [name]="field.definition.key"
                  [ngClass]="classNames?.phoneNational"
                  [ngModel]="phoneParsed.nationalNumber"
                  (ngModelChange)="onPhoneNationalNgModel($event)"
                  [placeholder]="fieldPlaceholder"
                />
                @if (fieldHint) {
                  <mat-hint>{{ fieldHint }}</mat-hint>
                }
              </mat-form-field>
            </div>
            @if (error) {
              <div class="cf-field-error mat-mdc-form-field-error" role="alert">{{ error }}</div>
            }
          </div>
        }
        @case ('textarea') {
          <div
            class="cf-field-block"
            [attr.data-cf-field]="field.definition.key"
            [attr.data-cf-type]="field.definition.fieldType"
          >
            <label [for]="fieldId" class="cf-field-label" [ngClass]="classNames?.label">
              {{ field.definition.label }}
              @if (field.effectiveMandatory) {
                <span class="cf-required-mark" aria-hidden="true"> *</span>
              }
            </label>
            <mat-form-field
              appearance="outline"
              class="cf-field"
              [ngClass]="classNames?.field"
              subscriptSizing="dynamic"
              [class.cf-field--invalid]="!!error"
            >
              <textarea
                matInput
                [id]="fieldId"
                [name]="field.definition.key"
                rows="4"
                [placeholder]="fieldPlaceholder"
                [ngModel]="textValue"
                [readonly]="isReadOnly"
                (ngModelChange)="onTextNgModelChange($event)"
              ></textarea>
              @if (fieldHint) {
                <mat-hint>{{ fieldHint }}</mat-hint>
              }
            </mat-form-field>
            @if (error) {
              <div class="cf-field-error mat-mdc-form-field-error" role="alert">{{ error }}</div>
            }
          </div>
        }
        @case ('select') {
          <div
            class="cf-field-block"
            [attr.data-cf-field]="field.definition.key"
            [attr.data-cf-type]="field.definition.fieldType"
          >
            <label [for]="fieldId" class="cf-field-label" [ngClass]="classNames?.label">
              {{ field.definition.label }}
              @if (field.effectiveMandatory) {
                <span class="cf-required-mark" aria-hidden="true"> *</span>
              }
            </label>
            <mat-form-field
              appearance="outline"
              class="cf-field"
              [ngClass]="classNames?.field"
              subscriptSizing="dynamic"
              [class.cf-field--invalid]="!!error"
            >
              <mat-select
                [id]="fieldId"
                [name]="field.definition.key"
                [placeholder]="fieldPlaceholder"
                [ngModel]="textValue"
                (ngModelChange)="valueChange.emit($event)"
              >
                @for (opt of field.availableOptions; track opt.key) {
                  <mat-option [value]="opt.key">{{ opt.label }}</mat-option>
                }
              </mat-select>
              @if (fieldHint) {
                <mat-hint>{{ fieldHint }}</mat-hint>
              }
            </mat-form-field>
            @if (error) {
              <div class="cf-field-error mat-mdc-form-field-error" role="alert">{{ error }}</div>
            }
          </div>
        }
        @case ('multiselect') {
          <div
            class="cf-field-block"
            [attr.data-cf-field]="field.definition.key"
            [attr.data-cf-type]="field.definition.fieldType"
          >
            <label [for]="fieldId" class="cf-field-label" [ngClass]="classNames?.label">
              {{ field.definition.label }}
              @if (field.effectiveMandatory) {
                <span class="cf-required-mark" aria-hidden="true"> *</span>
              }
            </label>
            <mat-form-field
              appearance="outline"
              class="cf-field"
              [ngClass]="classNames?.field"
              subscriptSizing="dynamic"
              [class.cf-field--invalid]="!!error"
            >
              <mat-select
                multiple
                [id]="fieldId"
                [name]="field.definition.key"
                [placeholder]="fieldPlaceholder"
                [ngModel]="multiValue"
                (ngModelChange)="valueChange.emit($event)"
              >
                @for (opt of field.availableOptions; track opt.key) {
                  <mat-option [value]="opt.key">{{ opt.label }}</mat-option>
                }
              </mat-select>
              @if (fieldHint) {
                <mat-hint>{{ fieldHint }}</mat-hint>
              }
            </mat-form-field>
            @if (error) {
              <div class="cf-field-error mat-mdc-form-field-error" role="alert">{{ error }}</div>
            }
          </div>
        }
        @case ('toggle') {
          <div
            class="cf-toggle-field"
            [ngClass]="classNames?.field"
            [attr.data-cf-field]="field.definition.key"
            [attr.data-cf-type]="field.definition.fieldType"
          >
            <mat-slide-toggle
              [ngModel]="boolValue"
              (ngModelChange)="valueChange.emit($event)"
            >
              {{ field.definition.label }}
            </mat-slide-toggle>
            @if (fieldHint) {
              <div class="cf-field-hint">{{ fieldHint }}</div>
            }
            @if (error) {
              <div class="mat-mdc-form-field-error" role="alert">{{ error }}</div>
            }
          </div>
        }
        @case ('autocomplete') {
          <div
            class="cf-field-block"
            [attr.data-cf-field]="field.definition.key"
            [attr.data-cf-type]="field.definition.fieldType"
          >
            <label [for]="fieldId" class="cf-field-label" [ngClass]="classNames?.label">
              {{ field.definition.label }}
              @if (field.effectiveMandatory) {
                <span class="cf-required-mark" aria-hidden="true"> *</span>
              }
            </label>
            <mat-form-field
              appearance="outline"
              class="cf-field cf-autocomplete-field"
              [ngClass]="classNames?.field"
              subscriptSizing="dynamic"
              [class.cf-field--invalid]="!!error"
            >
              <input
                matInput
                type="text"
                [id]="fieldId"
                [name]="field.definition.key"
                [placeholder]="fieldPlaceholder"
                [ngModel]="autocompleteInputText"
                (ngModelChange)="onAutocompleteInput($event)"
                (focus)="onAutocompleteFocus()"
                [matAutocomplete]="autocompletePanel"
                #autocompleteTrigger="matAutocompleteTrigger"
              />
              <mat-autocomplete
                #autocompletePanel="matAutocomplete"
                [displayWith]="displayAutocomplete"
                autoActiveFirstOption
                panelClass="cf-autocomplete-panel"
                (opened)="onAutocompletePanelOpened()"
                (optionSelected)="onAutocompleteOptionSelected($event.option.value)"
              >
                @for (opt of filteredAutocompleteOptions; track opt.key) {
                  <mat-option [value]="opt.key">{{ opt.label }}</mat-option>
                }
              </mat-autocomplete>
              @if (fieldHint) {
                <mat-hint>{{ fieldHint }}</mat-hint>
              }
            </mat-form-field>
            @if (error) {
              <div class="cf-field-error mat-mdc-form-field-error" role="alert">{{ error }}</div>
            }
          </div>
        }
        @case ('date') {
          <div
            class="cf-field-block"
            [attr.data-cf-field]="field.definition.key"
            [attr.data-cf-type]="field.definition.fieldType"
          >
            <label [for]="fieldId" class="cf-field-label" [ngClass]="classNames?.label">
              {{ field.definition.label }}
              @if (field.effectiveMandatory) {
                <span class="cf-required-mark" aria-hidden="true"> *</span>
              }
            </label>
            <mat-form-field
              appearance="outline"
              class="cf-field cf-date-field"
              [ngClass]="classNames?.field"
              subscriptSizing="dynamic"
              [class.cf-field--invalid]="!!error"
            >
              <input
                matInput
                [id]="fieldId"
                [name]="field.definition.key"
                [matDatepicker]="datePicker"
                [matDatepickerFilter]="dateFilterFn"
                [min]="dateMinModel"
                [max]="dateMaxModel"
                [ngModel]="dateModel"
                [placeholder]="fieldPlaceholder"
                (dateChange)="onDateChange($event.value)"
                readonly
                (click)="datePicker.open()"
              />
              <mat-datepicker-toggle matIconSuffix [for]="datePicker" />
              <mat-datepicker #datePicker />
              @if (fieldHint) {
                <mat-hint>{{ fieldHint }}</mat-hint>
              }
            </mat-form-field>
            @if (error) {
              <div class="cf-field-error mat-mdc-form-field-error" role="alert">{{ error }}</div>
            }
          </div>
        }
        @case ('date_range') {
          <div
            class="cf-field-block"
            [attr.data-cf-field]="field.definition.key"
            [attr.data-cf-type]="field.definition.fieldType"
          >
            <span class="cf-field-label" [ngClass]="classNames?.label">
              {{ field.definition.label }}
              @if (field.effectiveMandatory) {
                <span class="cf-required-mark" aria-hidden="true"> *</span>
              }
            </span>
            <mat-form-field
              appearance="outline"
              class="cf-field cf-date-range-field"
              [ngClass]="classNames?.field"
              subscriptSizing="dynamic"
              [class.cf-field--invalid]="!!error"
            >
              <mat-date-range-input [rangePicker]="dateRangePicker">
                <input
                  matStartDate
                  placeholder="Start date"
                  [min]="dateMinModel"
                  [max]="dateMaxModel"
                  [ngModel]="dateRangeStartModel"
                  (dateChange)="onDateRangeStartChange($event.value)"
                />
                <input
                  matEndDate
                  placeholder="End date"
                  [min]="dateEndMinModel"
                  [max]="dateEndMaxModel"
                  [ngModel]="dateRangeEndModel"
                  (dateChange)="onDateRangeEndChange($event.value)"
                />
              </mat-date-range-input>
              <mat-datepicker-toggle matIconSuffix [for]="dateRangePicker" />
              <mat-date-range-picker #dateRangePicker />
              @if (fieldHint) {
                <mat-hint>{{ fieldHint }}</mat-hint>
              }
            </mat-form-field>
            @if (error) {
              <div class="cf-field-error mat-mdc-form-field-error" role="alert">{{ error }}</div>
            }
          </div>
        }
        @default {
          <div
            class="cf-field-block"
            [attr.data-cf-field]="field.definition.key"
            [attr.data-cf-type]="field.definition.fieldType"
          >
            <label [for]="fieldId" class="cf-field-label" [ngClass]="classNames?.label">
              {{ field.definition.label }}
              @if (field.effectiveMandatory) {
                <span class="cf-required-mark" aria-hidden="true"> *</span>
              }
            </label>
            <mat-form-field
              appearance="outline"
              class="cf-field"
              [ngClass]="classNames?.field"
              subscriptSizing="dynamic"
              [class.cf-field--invalid]="!!error"
            >
              <input
                matInput
                [id]="fieldId"
                [name]="field.definition.key"
                [type]="inputType"
                [placeholder]="fieldPlaceholder"
                [ngModel]="textValue"
                [readonly]="isReadOnly"
                (ngModelChange)="onTextNgModelChange($event)"
              />
              @if (fieldHint) {
                <mat-hint>{{ fieldHint }}</mat-hint>
              }
            </mat-form-field>
            @if (error) {
              <div class="cf-field-error mat-mdc-form-field-error" role="alert">{{ error }}</div>
            }
          </div>
        }
      }
    }
  `, isInline: true, styles: [":host{display:block}.cf-field-block{display:flex;flex-direction:column;gap:.5rem}.cf-field-label{display:block;margin:0;font-size:.875rem;font-weight:500;line-height:1.25rem;color:#374151}.cf-required-mark{color:#f97316}.cf-field-hint{color:#6b7280;font-size:.75rem;line-height:1rem;margin-top:.25rem}.mat-mdc-form-field.cf-field{width:100%;display:block}.cf-field-block .cf-field-error,.cf-boolean-field .mat-mdc-form-field-error,.cf-toggle-field .mat-mdc-form-field-error{font-size:.75rem;line-height:1rem;margin-top:-.25rem;color:var(--mat-form-field-error-text-color, #ba1a1a)}.mat-mdc-form-field.cf-field.cf-field--invalid .mdc-notched-outline__leading,.mat-mdc-form-field.cf-field.cf-field--invalid .mdc-notched-outline__notch,.mat-mdc-form-field.cf-field.cf-field--invalid .mdc-notched-outline__trailing{border-color:var(--mat-form-field-error-text-color, #ba1a1a)!important}.cf-boolean-field{display:block;margin-bottom:.25rem}.cf-toggle-field{display:block}.cf-boolean-field .mat-mdc-form-field-error,.cf-toggle-field .mat-mdc-form-field-error{font-size:.75rem;margin-top:.25rem}.cf-phone-group{display:flex;align-items:flex-start;gap:.5rem;width:100%}.mat-mdc-form-field.cf-field.cf-phone-country-field{flex:0 0 6rem;width:6rem}.cf-phone-group .cf-field.cf-phone-field{flex:1 1 auto;min-width:0}.cf-phone-field .cf-phone-prefix{margin-inline-end:.5rem;color:#6b7280;white-space:nowrap}.cf-date-range-field .mat-date-range-input{width:100%}.cf-date-field .mat-mdc-form-field-icon-suffix{z-index:1}.cf-date-field .mat-datepicker-toggle{margin-inline-end:-6px}.cf-date-field input[matInput]{cursor:pointer;font-size:.875rem}.cf-date-range-field input{font-size:.875rem}.cf-date-range-field input::placeholder{color:#9ca3af}::ng-deep .cf-autocomplete-panel{z-index:400!important;background:#fff}\n"], dependencies: [{ kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: MatFormFieldModule }, { kind: "component", type: i2.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i2.MatHint, selector: "mat-hint", inputs: ["align", "id"] }, { kind: "directive", type: i2.MatPrefix, selector: "[matPrefix], [matIconPrefix], [matTextPrefix]", inputs: ["matTextPrefix"] }, { kind: "directive", type: i2.MatSuffix, selector: "[matSuffix], [matIconSuffix], [matTextSuffix]", inputs: ["matTextSuffix"] }, { kind: "ngmodule", type: MatInputModule }, { kind: "directive", type: i3.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly", "disabledInteractive"], exportAs: ["matInput"] }, { kind: "ngmodule", type: MatSelectModule }, { kind: "component", type: i4.MatSelect, selector: "mat-select", inputs: ["aria-describedby", "panelClass", "disabled", "disableRipple", "tabIndex", "hideSingleSelectionIndicator", "placeholder", "required", "multiple", "disableOptionCentering", "compareWith", "value", "aria-label", "aria-labelledby", "errorStateMatcher", "typeaheadDebounceInterval", "sortComparator", "id", "panelWidth", "canSelectNullableOptions"], outputs: ["openedChange", "opened", "closed", "selectionChange", "valueChange"], exportAs: ["matSelect"] }, { kind: "directive", type: i4.MatSelectTrigger, selector: "mat-select-trigger" }, { kind: "component", type: i4.MatOption, selector: "mat-option", inputs: ["value", "id", "disabled"], outputs: ["onSelectionChange"], exportAs: ["matOption"] }, { kind: "ngmodule", type: MatCheckboxModule }, { kind: "component", type: i5.MatCheckbox, selector: "mat-checkbox", inputs: ["aria-label", "aria-labelledby", "aria-describedby", "aria-expanded", "aria-controls", "aria-owns", "id", "required", "labelPosition", "name", "value", "disableRipple", "tabIndex", "color", "disabledInteractive", "checked", "disabled", "indeterminate"], outputs: ["change", "indeterminateChange"], exportAs: ["matCheckbox"] }, { kind: "ngmodule", type: MatAutocompleteModule }, { kind: "component", type: i6.MatAutocomplete, selector: "mat-autocomplete", inputs: ["aria-label", "aria-labelledby", "displayWith", "autoActiveFirstOption", "autoSelectActiveOption", "requireSelection", "panelWidth", "disableRipple", "class", "hideSingleSelectionIndicator"], outputs: ["optionSelected", "opened", "closed", "optionActivated"], exportAs: ["matAutocomplete"] }, { kind: "directive", type: i6.MatAutocompleteTrigger, selector: "input[matAutocomplete], textarea[matAutocomplete]", inputs: ["matAutocomplete", "matAutocompletePosition", "matAutocompleteConnectedTo", "autocomplete", "matAutocompleteDisabled"], exportAs: ["matAutocompleteTrigger"] }, { kind: "ngmodule", type: MatSlideToggleModule }, { kind: "component", type: i7.MatSlideToggle, selector: "mat-slide-toggle", inputs: ["name", "id", "labelPosition", "aria-label", "aria-labelledby", "aria-describedby", "required", "color", "disabled", "disableRipple", "tabIndex", "checked", "hideIcon", "disabledInteractive"], outputs: ["change", "toggleChange"], exportAs: ["matSlideToggle"] }, { kind: "ngmodule", type: MatDatepickerModule }, { kind: "component", type: i8.MatDatepicker, selector: "mat-datepicker", exportAs: ["matDatepicker"] }, { kind: "directive", type: i8.MatDatepickerInput, selector: "input[matDatepicker]", inputs: ["matDatepicker", "min", "max", "matDatepickerFilter"], exportAs: ["matDatepickerInput"] }, { kind: "component", type: i8.MatDatepickerToggle, selector: "mat-datepicker-toggle", inputs: ["for", "tabIndex", "aria-label", "disabled", "disableRipple"], exportAs: ["matDatepickerToggle"] }, { kind: "component", type: i8.MatDateRangeInput, selector: "mat-date-range-input", inputs: ["rangePicker", "required", "dateFilter", "min", "max", "disabled", "separator", "comparisonStart", "comparisonEnd"], exportAs: ["matDateRangeInput"] }, { kind: "directive", type: i8.MatStartDate, selector: "input[matStartDate]", outputs: ["dateChange", "dateInput"] }, { kind: "directive", type: i8.MatEndDate, selector: "input[matEndDate]", outputs: ["dateChange", "dateInput"] }, { kind: "component", type: i8.MatDateRangePicker, selector: "mat-date-range-picker", exportAs: ["matDateRangePicker"] }, { kind: "ngmodule", type: MatNativeDateModule }, { kind: "ngmodule", type: MatButtonModule }, { kind: "ngmodule", type: MatIconModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: CfFieldComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cf-field', standalone: true, imports: [
                        NgClass,
                        FormsModule,
                        MatFormFieldModule,
                        MatInputModule,
                        MatSelectModule,
                        MatCheckboxModule,
                        MatAutocompleteModule,
                        MatSlideToggleModule,
                        MatDatepickerModule,
                        MatNativeDateModule,
                        MatButtonModule,
                        MatIconModule,
                    ], template: `
    @if (visible) {
      @switch (field.definition.fieldType) {
        @case ('boolean') {
          <div
            class="cf-boolean-field"
            [ngClass]="classNames?.field"
            [attr.data-cf-field]="field.definition.key"
            [attr.data-cf-type]="field.definition.fieldType"
          >
            <mat-checkbox
              [id]="fieldId"
              [ngModel]="boolValue"
              (ngModelChange)="valueChange.emit($event)"
            >
              {{ field.definition.label }}
              @if (field.effectiveMandatory) {
                <span class="cf-required-mark" aria-hidden="true"> *</span>
              }
            </mat-checkbox>
            @if (fieldHint) {
              <div class="cf-field-hint">{{ fieldHint }}</div>
            }
            @if (error) {
              <div class="mat-mdc-form-field-error" role="alert">{{ error }}</div>
            }
          </div>
        }
        @case ('phone') {
          <div
            class="cf-field-block"
            [attr.data-cf-field]="field.definition.key"
            [attr.data-cf-type]="field.definition.fieldType"
          >
            <label [for]="fieldId" class="cf-field-label" [ngClass]="classNames?.label">
              {{ field.definition.label }}
              @if (field.effectiveMandatory) {
                <span class="cf-required-mark" aria-hidden="true"> *</span>
              }
            </label>
            <div class="cf-phone-group" [ngClass]="classNames?.phoneGroup">
              @if (phoneCountryOptions.length > 1) {
                <mat-form-field
                  appearance="outline"
                  class="cf-field cf-phone-country-field"
                  [ngClass]="classNames?.phoneCountry"
                  subscriptSizing="dynamic"
                  [class.cf-field--invalid]="!!error"
                >
                  <mat-select
                    class="cf-phone-country-select"
                    [id]="fieldId + '-country'"
                    [ngModel]="phoneParsed.countryCode"
                    (ngModelChange)="onPhoneCountryCodeChange($event)"
                    aria-label="Country code"
                  >
                    <mat-select-trigger>{{ phoneParsed.countryCode }}</mat-select-trigger>
                    @for (opt of phoneCountryOptions; track opt.code) {
                      <mat-option [value]="opt.code">{{ opt.label ?? opt.code }}</mat-option>
                    }
                  </mat-select>
                </mat-form-field>
              }
              <mat-form-field
                appearance="outline"
                class="cf-field cf-phone-field"
                [ngClass]="classNames?.field"
                subscriptSizing="dynamic"
                [class.cf-field--invalid]="!!error"
              >
                @if (phoneCountryOptions.length <= 1) {
                  <span matTextPrefix class="cf-phone-prefix">{{ phoneParsed.countryCode }}</span>
                }
                <input
                  matInput
                  type="tel"
                  inputmode="tel"
                  autocomplete="tel-national"
                  [id]="fieldId"
                  [name]="field.definition.key"
                  [ngClass]="classNames?.phoneNational"
                  [ngModel]="phoneParsed.nationalNumber"
                  (ngModelChange)="onPhoneNationalNgModel($event)"
                  [placeholder]="fieldPlaceholder"
                />
                @if (fieldHint) {
                  <mat-hint>{{ fieldHint }}</mat-hint>
                }
              </mat-form-field>
            </div>
            @if (error) {
              <div class="cf-field-error mat-mdc-form-field-error" role="alert">{{ error }}</div>
            }
          </div>
        }
        @case ('textarea') {
          <div
            class="cf-field-block"
            [attr.data-cf-field]="field.definition.key"
            [attr.data-cf-type]="field.definition.fieldType"
          >
            <label [for]="fieldId" class="cf-field-label" [ngClass]="classNames?.label">
              {{ field.definition.label }}
              @if (field.effectiveMandatory) {
                <span class="cf-required-mark" aria-hidden="true"> *</span>
              }
            </label>
            <mat-form-field
              appearance="outline"
              class="cf-field"
              [ngClass]="classNames?.field"
              subscriptSizing="dynamic"
              [class.cf-field--invalid]="!!error"
            >
              <textarea
                matInput
                [id]="fieldId"
                [name]="field.definition.key"
                rows="4"
                [placeholder]="fieldPlaceholder"
                [ngModel]="textValue"
                [readonly]="isReadOnly"
                (ngModelChange)="onTextNgModelChange($event)"
              ></textarea>
              @if (fieldHint) {
                <mat-hint>{{ fieldHint }}</mat-hint>
              }
            </mat-form-field>
            @if (error) {
              <div class="cf-field-error mat-mdc-form-field-error" role="alert">{{ error }}</div>
            }
          </div>
        }
        @case ('select') {
          <div
            class="cf-field-block"
            [attr.data-cf-field]="field.definition.key"
            [attr.data-cf-type]="field.definition.fieldType"
          >
            <label [for]="fieldId" class="cf-field-label" [ngClass]="classNames?.label">
              {{ field.definition.label }}
              @if (field.effectiveMandatory) {
                <span class="cf-required-mark" aria-hidden="true"> *</span>
              }
            </label>
            <mat-form-field
              appearance="outline"
              class="cf-field"
              [ngClass]="classNames?.field"
              subscriptSizing="dynamic"
              [class.cf-field--invalid]="!!error"
            >
              <mat-select
                [id]="fieldId"
                [name]="field.definition.key"
                [placeholder]="fieldPlaceholder"
                [ngModel]="textValue"
                (ngModelChange)="valueChange.emit($event)"
              >
                @for (opt of field.availableOptions; track opt.key) {
                  <mat-option [value]="opt.key">{{ opt.label }}</mat-option>
                }
              </mat-select>
              @if (fieldHint) {
                <mat-hint>{{ fieldHint }}</mat-hint>
              }
            </mat-form-field>
            @if (error) {
              <div class="cf-field-error mat-mdc-form-field-error" role="alert">{{ error }}</div>
            }
          </div>
        }
        @case ('multiselect') {
          <div
            class="cf-field-block"
            [attr.data-cf-field]="field.definition.key"
            [attr.data-cf-type]="field.definition.fieldType"
          >
            <label [for]="fieldId" class="cf-field-label" [ngClass]="classNames?.label">
              {{ field.definition.label }}
              @if (field.effectiveMandatory) {
                <span class="cf-required-mark" aria-hidden="true"> *</span>
              }
            </label>
            <mat-form-field
              appearance="outline"
              class="cf-field"
              [ngClass]="classNames?.field"
              subscriptSizing="dynamic"
              [class.cf-field--invalid]="!!error"
            >
              <mat-select
                multiple
                [id]="fieldId"
                [name]="field.definition.key"
                [placeholder]="fieldPlaceholder"
                [ngModel]="multiValue"
                (ngModelChange)="valueChange.emit($event)"
              >
                @for (opt of field.availableOptions; track opt.key) {
                  <mat-option [value]="opt.key">{{ opt.label }}</mat-option>
                }
              </mat-select>
              @if (fieldHint) {
                <mat-hint>{{ fieldHint }}</mat-hint>
              }
            </mat-form-field>
            @if (error) {
              <div class="cf-field-error mat-mdc-form-field-error" role="alert">{{ error }}</div>
            }
          </div>
        }
        @case ('toggle') {
          <div
            class="cf-toggle-field"
            [ngClass]="classNames?.field"
            [attr.data-cf-field]="field.definition.key"
            [attr.data-cf-type]="field.definition.fieldType"
          >
            <mat-slide-toggle
              [ngModel]="boolValue"
              (ngModelChange)="valueChange.emit($event)"
            >
              {{ field.definition.label }}
            </mat-slide-toggle>
            @if (fieldHint) {
              <div class="cf-field-hint">{{ fieldHint }}</div>
            }
            @if (error) {
              <div class="mat-mdc-form-field-error" role="alert">{{ error }}</div>
            }
          </div>
        }
        @case ('autocomplete') {
          <div
            class="cf-field-block"
            [attr.data-cf-field]="field.definition.key"
            [attr.data-cf-type]="field.definition.fieldType"
          >
            <label [for]="fieldId" class="cf-field-label" [ngClass]="classNames?.label">
              {{ field.definition.label }}
              @if (field.effectiveMandatory) {
                <span class="cf-required-mark" aria-hidden="true"> *</span>
              }
            </label>
            <mat-form-field
              appearance="outline"
              class="cf-field cf-autocomplete-field"
              [ngClass]="classNames?.field"
              subscriptSizing="dynamic"
              [class.cf-field--invalid]="!!error"
            >
              <input
                matInput
                type="text"
                [id]="fieldId"
                [name]="field.definition.key"
                [placeholder]="fieldPlaceholder"
                [ngModel]="autocompleteInputText"
                (ngModelChange)="onAutocompleteInput($event)"
                (focus)="onAutocompleteFocus()"
                [matAutocomplete]="autocompletePanel"
                #autocompleteTrigger="matAutocompleteTrigger"
              />
              <mat-autocomplete
                #autocompletePanel="matAutocomplete"
                [displayWith]="displayAutocomplete"
                autoActiveFirstOption
                panelClass="cf-autocomplete-panel"
                (opened)="onAutocompletePanelOpened()"
                (optionSelected)="onAutocompleteOptionSelected($event.option.value)"
              >
                @for (opt of filteredAutocompleteOptions; track opt.key) {
                  <mat-option [value]="opt.key">{{ opt.label }}</mat-option>
                }
              </mat-autocomplete>
              @if (fieldHint) {
                <mat-hint>{{ fieldHint }}</mat-hint>
              }
            </mat-form-field>
            @if (error) {
              <div class="cf-field-error mat-mdc-form-field-error" role="alert">{{ error }}</div>
            }
          </div>
        }
        @case ('date') {
          <div
            class="cf-field-block"
            [attr.data-cf-field]="field.definition.key"
            [attr.data-cf-type]="field.definition.fieldType"
          >
            <label [for]="fieldId" class="cf-field-label" [ngClass]="classNames?.label">
              {{ field.definition.label }}
              @if (field.effectiveMandatory) {
                <span class="cf-required-mark" aria-hidden="true"> *</span>
              }
            </label>
            <mat-form-field
              appearance="outline"
              class="cf-field cf-date-field"
              [ngClass]="classNames?.field"
              subscriptSizing="dynamic"
              [class.cf-field--invalid]="!!error"
            >
              <input
                matInput
                [id]="fieldId"
                [name]="field.definition.key"
                [matDatepicker]="datePicker"
                [matDatepickerFilter]="dateFilterFn"
                [min]="dateMinModel"
                [max]="dateMaxModel"
                [ngModel]="dateModel"
                [placeholder]="fieldPlaceholder"
                (dateChange)="onDateChange($event.value)"
                readonly
                (click)="datePicker.open()"
              />
              <mat-datepicker-toggle matIconSuffix [for]="datePicker" />
              <mat-datepicker #datePicker />
              @if (fieldHint) {
                <mat-hint>{{ fieldHint }}</mat-hint>
              }
            </mat-form-field>
            @if (error) {
              <div class="cf-field-error mat-mdc-form-field-error" role="alert">{{ error }}</div>
            }
          </div>
        }
        @case ('date_range') {
          <div
            class="cf-field-block"
            [attr.data-cf-field]="field.definition.key"
            [attr.data-cf-type]="field.definition.fieldType"
          >
            <span class="cf-field-label" [ngClass]="classNames?.label">
              {{ field.definition.label }}
              @if (field.effectiveMandatory) {
                <span class="cf-required-mark" aria-hidden="true"> *</span>
              }
            </span>
            <mat-form-field
              appearance="outline"
              class="cf-field cf-date-range-field"
              [ngClass]="classNames?.field"
              subscriptSizing="dynamic"
              [class.cf-field--invalid]="!!error"
            >
              <mat-date-range-input [rangePicker]="dateRangePicker">
                <input
                  matStartDate
                  placeholder="Start date"
                  [min]="dateMinModel"
                  [max]="dateMaxModel"
                  [ngModel]="dateRangeStartModel"
                  (dateChange)="onDateRangeStartChange($event.value)"
                />
                <input
                  matEndDate
                  placeholder="End date"
                  [min]="dateEndMinModel"
                  [max]="dateEndMaxModel"
                  [ngModel]="dateRangeEndModel"
                  (dateChange)="onDateRangeEndChange($event.value)"
                />
              </mat-date-range-input>
              <mat-datepicker-toggle matIconSuffix [for]="dateRangePicker" />
              <mat-date-range-picker #dateRangePicker />
              @if (fieldHint) {
                <mat-hint>{{ fieldHint }}</mat-hint>
              }
            </mat-form-field>
            @if (error) {
              <div class="cf-field-error mat-mdc-form-field-error" role="alert">{{ error }}</div>
            }
          </div>
        }
        @default {
          <div
            class="cf-field-block"
            [attr.data-cf-field]="field.definition.key"
            [attr.data-cf-type]="field.definition.fieldType"
          >
            <label [for]="fieldId" class="cf-field-label" [ngClass]="classNames?.label">
              {{ field.definition.label }}
              @if (field.effectiveMandatory) {
                <span class="cf-required-mark" aria-hidden="true"> *</span>
              }
            </label>
            <mat-form-field
              appearance="outline"
              class="cf-field"
              [ngClass]="classNames?.field"
              subscriptSizing="dynamic"
              [class.cf-field--invalid]="!!error"
            >
              <input
                matInput
                [id]="fieldId"
                [name]="field.definition.key"
                [type]="inputType"
                [placeholder]="fieldPlaceholder"
                [ngModel]="textValue"
                [readonly]="isReadOnly"
                (ngModelChange)="onTextNgModelChange($event)"
              />
              @if (fieldHint) {
                <mat-hint>{{ fieldHint }}</mat-hint>
              }
            </mat-form-field>
            @if (error) {
              <div class="cf-field-error mat-mdc-form-field-error" role="alert">{{ error }}</div>
            }
          </div>
        }
      }
    }
  `, styles: [":host{display:block}.cf-field-block{display:flex;flex-direction:column;gap:.5rem}.cf-field-label{display:block;margin:0;font-size:.875rem;font-weight:500;line-height:1.25rem;color:#374151}.cf-required-mark{color:#f97316}.cf-field-hint{color:#6b7280;font-size:.75rem;line-height:1rem;margin-top:.25rem}.mat-mdc-form-field.cf-field{width:100%;display:block}.cf-field-block .cf-field-error,.cf-boolean-field .mat-mdc-form-field-error,.cf-toggle-field .mat-mdc-form-field-error{font-size:.75rem;line-height:1rem;margin-top:-.25rem;color:var(--mat-form-field-error-text-color, #ba1a1a)}.mat-mdc-form-field.cf-field.cf-field--invalid .mdc-notched-outline__leading,.mat-mdc-form-field.cf-field.cf-field--invalid .mdc-notched-outline__notch,.mat-mdc-form-field.cf-field.cf-field--invalid .mdc-notched-outline__trailing{border-color:var(--mat-form-field-error-text-color, #ba1a1a)!important}.cf-boolean-field{display:block;margin-bottom:.25rem}.cf-toggle-field{display:block}.cf-boolean-field .mat-mdc-form-field-error,.cf-toggle-field .mat-mdc-form-field-error{font-size:.75rem;margin-top:.25rem}.cf-phone-group{display:flex;align-items:flex-start;gap:.5rem;width:100%}.mat-mdc-form-field.cf-field.cf-phone-country-field{flex:0 0 6rem;width:6rem}.cf-phone-group .cf-field.cf-phone-field{flex:1 1 auto;min-width:0}.cf-phone-field .cf-phone-prefix{margin-inline-end:.5rem;color:#6b7280;white-space:nowrap}.cf-date-range-field .mat-date-range-input{width:100%}.cf-date-field .mat-mdc-form-field-icon-suffix{z-index:1}.cf-date-field .mat-datepicker-toggle{margin-inline-end:-6px}.cf-date-field input[matInput]{cursor:pointer;font-size:.875rem}.cf-date-range-field input{font-size:.875rem}.cf-date-range-field input::placeholder{color:#9ca3af}::ng-deep .cf-autocomplete-panel{z-index:400!important;background:#fff}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }], propDecorators: { field: [{
                type: Input,
                args: [{ required: true }]
            }], fieldId: [{
                type: Input
            }], value: [{
                type: Input
            }], error: [{
                type: Input
            }], classNames: [{
                type: Input
            }], engineOptions: [{
                type: Input
            }], formValues: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], autocompleteTrigger: [{
                type: ViewChild,
                args: ['autocompleteTrigger']
            }] } });

class FormEngineService {
    engine = null;
    init(definition, initialValues, options) {
        this.engine = new FormEngine(definition, initialValues, options);
    }
    requireEngine() {
        if (!this.engine) {
            throw new Error('FormEngineService not initialized');
        }
        return this.engine;
    }
    getValues() {
        return this.requireEngine().getValues();
    }
    setValue(key, value) {
        this.requireEngine().setValue(key, value);
    }
    setValues(values) {
        this.requireEngine().setValues(values);
    }
    updateDefinition(definition) {
        this.requireEngine().updateDefinition(definition);
    }
    setFieldError(key, message) {
        this.requireEngine().setFieldError(key, message);
    }
    clearFieldError(key) {
        this.requireEngine().clearFieldError(key);
    }
    getResolvedFields() {
        return this.requireEngine().getResolvedFields();
    }
    getVisibleFields() {
        return this.requireEngine().getVisibleFields();
    }
    getConditionHiddenKeys() {
        return this.requireEngine().getConditionHiddenKeys();
    }
    getSteps() {
        return this.requireEngine().getSteps();
    }
    validate() {
        return this.requireEngine().validate();
    }
    getFieldErrors() {
        return this.requireEngine().getFieldErrors();
    }
    getSubmitValues() {
        const engine = this.requireEngine();
        const visibleKeys = new Set(engine.getVisibleFields().map((f) => f.definition.key));
        const all = engine.getValues();
        const out = {};
        for (const [key, value] of Object.entries(all)) {
            if (visibleKeys.has(key))
                out[key] = value;
        }
        return out;
    }
    reset(initialValues) {
        this.requireEngine().reset(initialValues);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: FormEngineService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: FormEngineService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: FormEngineService, decorators: [{
            type: Injectable
        }] });

const CUSTOM_FORM_FIELD_RENDERERS = new InjectionToken('CUSTOM_FORM_FIELD_RENDERERS');
const CF_FORM_CLASS_NAMES = new InjectionToken('CF_FORM_CLASS_NAMES');

function isSameFormValue(current, next) {
    if (current === next) {
        return true;
    }
    if (isDateRangeValue(current) && isDateRangeValue(next)) {
        return current.startDate === next.startDate && current.endDate === next.endDate;
    }
    if (Array.isArray(current) && Array.isArray(next)) {
        return current.length === next.length && current.every((item, index) => item === next[index]);
    }
    return false;
}
class CfFormComponent {
    engine;
    classNames;
    cdr;
    definition;
    initialValues;
    engineOptions;
    idPrefix = 'cf';
    hideHeading = false;
    submitLabel = 'Submit';
    showSubmit = true;
    submitted = new EventEmitter();
    valuesChange = new EventEmitter();
    submitting = false;
    engineReady = false;
    /** Stable reference for child fields — updated only when engine values change. */
    formValuesSnapshot = {};
    constructor(engine, classNames, cdr) {
        this.engine = engine;
        this.classNames = classNames;
        this.cdr = cdr;
        this.classNames = this.classNames ?? {};
    }
    /** Live visible steps — always read from the engine (conditional fields). */
    get steps() {
        return this.engineReady ? this.engine.getSteps() : [];
    }
    /** Live field values — includes conditionally hidden fields. */
    get values() {
        return this.engineReady ? this.engine.getValues() : {};
    }
    /** Live validation errors from the engine. */
    get fieldErrors() {
        return this.engineReady ? this.engine.getFieldErrors() : {};
    }
    ngOnChanges(changes) {
        if (!this.definition) {
            return;
        }
        const definitionChanged = !!changes['definition'];
        const initialValuesChanged = !!changes['initialValues'];
        const engineOptionsChanged = !!changes['engineOptions'];
        // Same values must not skip a concurrent definition change (stepper step swaps).
        if (initialValuesChanged
            && !changes['initialValues'].firstChange
            && !definitionChanged
            && !engineOptionsChanged) {
            const previous = changes['initialValues'].previousValue;
            if (this.engineReady && previous && this.hasSameFormValues(previous, this.initialValues ?? {})) {
                return;
            }
        }
        if (initialValuesChanged || engineOptionsChanged) {
            this.initEngine(this.initialValues);
            return;
        }
        if (definitionChanged) {
            const previous = changes['definition'].previousValue;
            const preserveValues = this.engineReady && previous && this.hasSameDefinitionStructure(previous, this.definition);
            if (preserveValues) {
                this.engine.updateDefinition(this.definition);
                this.cdr.markForCheck();
                return;
            }
            this.initEngine(this.engineReady ? this.engine.getValues() : this.initialValues);
        }
    }
    setValuesSilent(partial) {
        if (!this.engineReady) {
            return;
        }
        this.engine.setValues(partial);
        this.refreshFormValuesSnapshot();
        this.cdr.markForCheck();
    }
    setValue(key, value) {
        const current = this.engine.getValues()[key];
        if (isSameFormValue(current, value)) {
            return;
        }
        this.engine.setValue(key, value);
        this.refreshFormValuesSnapshot();
        this.valuesChange.emit(this.formValuesSnapshot);
        this.cdr.markForCheck();
    }
    setFieldError(key, message) {
        if (!this.engineReady) {
            return;
        }
        this.engine.setFieldError(key, message);
        this.cdr.markForCheck();
    }
    clearFieldError(key) {
        if (!this.engineReady) {
            return;
        }
        this.engine.clearFieldError(key);
        this.cdr.markForCheck();
    }
    async onSubmit(event) {
        event.preventDefault();
        const result = this.engine.validate();
        if (!result.valid) {
            this.cdr.detectChanges();
            return;
        }
        this.submitting = true;
        try {
            this.submitted.emit(this.engine.getSubmitValues());
            this.engine.reset();
            this.cdr.markForCheck();
        }
        finally {
            this.submitting = false;
        }
    }
    /** Visible field values — for embedded/filter forms without using submit. */
    getVisibleValues() {
        return this.engine.getSubmitValues();
    }
    /** All field values held by the engine (includes conditionally hidden fields). */
    getValues() {
        return this.engine.getValues();
    }
    /** Keys hidden by an unmet condition — drop these before submitting. */
    getConditionHiddenKeys() {
        return this.engineReady ? this.engine.getConditionHiddenKeys() : [];
    }
    /** Run validation and refresh field errors (for embedded save actions). */
    validateForm() {
        const result = this.engine.validate();
        this.cdr.detectChanges();
        return result.valid;
    }
    /** Reset the form engine and re-render fields. */
    resetForm(initialValues) {
        this.engine.reset(initialValues);
        this.refreshFormValuesSnapshot();
        this.cdr.markForCheck();
    }
    initEngine(initialValues) {
        this.engine.init(this.definition, initialValues, this.engineOptions);
        this.engineReady = true;
        this.refreshFormValuesSnapshot();
        this.cdr.markForCheck();
    }
    refreshFormValuesSnapshot() {
        this.formValuesSnapshot = this.engineReady ? this.engine.getValues() : {};
    }
    hasSameDefinitionStructure(previous, next) {
        if (previous.fields.length !== next.fields.length) {
            return false;
        }
        return previous.fields.every((field, index) => {
            const other = next.fields[index];
            return field.key === other.key && field.fieldType === other.fieldType;
        });
    }
    hasSameFormValues(previous, next) {
        const keys = new Set([...Object.keys(previous), ...Object.keys(next)]);
        for (const key of keys) {
            if (!isSameFormValue(previous[key], next[key])) {
                return false;
            }
        }
        return true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: CfFormComponent, deps: [{ token: FormEngineService }, { token: CF_FORM_CLASS_NAMES, optional: true }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.21", type: CfFormComponent, isStandalone: true, selector: "cf-form", inputs: { definition: "definition", initialValues: "initialValues", engineOptions: "engineOptions", idPrefix: "idPrefix", hideHeading: "hideHeading", submitLabel: "submitLabel", showSubmit: "showSubmit" }, outputs: { submitted: "submitted", valuesChange: "valuesChange" }, providers: [FormEngineService], usesOnChanges: true, ngImport: i0, template: `
    <form
      class="cf-form mat-typography"
      [class]="classNames?.root"
      (submit)="onSubmit($event)"
      novalidate
      [attr.data-cf-form]="definition.key"
    >
      @if (!hideHeading && definition.label) {
        <h2 class="mat-headline-6 cf-form-title">{{ definition.label }}</h2>
      }
      @if (!hideHeading && definition.description) {
        <p class="cf-form-description">{{ definition.description }}</p>
      }

      @for (step of steps; track step.stepId) {
        <div class="cf-form-step" [attr.data-cf-step]="step.stepId || null">
          @if (step.stepName) {
            <h3 class="mat-title-medium cf-form-step-title">{{ step.stepName }}</h3>
          }
          @for (field of step.fields; track field.definition.id) {
            <cf-field
              [field]="field"
              [fieldId]="idPrefix + '-' + field.definition.key"
              [value]="formValuesSnapshot[field.definition.key] ?? null"
              [formValues]="formValuesSnapshot"
              [error]="fieldErrors[field.definition.key]"
              [classNames]="classNames ?? undefined"
              [engineOptions]="engineOptions"
              (valueChange)="setValue(field.definition.key, $event)"
            />
          }
        </div>
      }

      @if (showSubmit) {
        <button
          mat-flat-button
          color="primary"
          type="submit"
          class="cf-form-submit"
          [class]="classNames?.submit"
          [disabled]="submitting"
        >
          {{ submitting ? 'Submitting…' : submitLabel }}
        </button>
      }
    </form>
  `, isInline: true, styles: [".cf-form{display:flex;flex-direction:column}.cf-form-step{display:flex;flex-direction:column;gap:1.25rem}.cf-form-title{margin:0 0 .25rem}.cf-form-description{margin:0 0 1.25rem;color:#0009}.cf-form-step-title{margin:1.25rem 0 .75rem}.cf-form-submit{margin-top:1rem}\n"], dependencies: [{ kind: "component", type: CfFieldComponent, selector: "cf-field", inputs: ["field", "fieldId", "value", "error", "classNames", "engineOptions", "formValues"], outputs: ["valueChange"] }, { kind: "ngmodule", type: MatButtonModule }, { kind: "component", type: i2$1.MatButton, selector: "    button[matButton], a[matButton], button[mat-button], button[mat-raised-button],    button[mat-flat-button], button[mat-stroked-button], a[mat-button], a[mat-raised-button],    a[mat-flat-button], a[mat-stroked-button]  ", inputs: ["matButton"], exportAs: ["matButton", "matAnchor"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: CfFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cf-form', standalone: true, imports: [CfFieldComponent, MatButtonModule], providers: [FormEngineService], template: `
    <form
      class="cf-form mat-typography"
      [class]="classNames?.root"
      (submit)="onSubmit($event)"
      novalidate
      [attr.data-cf-form]="definition.key"
    >
      @if (!hideHeading && definition.label) {
        <h2 class="mat-headline-6 cf-form-title">{{ definition.label }}</h2>
      }
      @if (!hideHeading && definition.description) {
        <p class="cf-form-description">{{ definition.description }}</p>
      }

      @for (step of steps; track step.stepId) {
        <div class="cf-form-step" [attr.data-cf-step]="step.stepId || null">
          @if (step.stepName) {
            <h3 class="mat-title-medium cf-form-step-title">{{ step.stepName }}</h3>
          }
          @for (field of step.fields; track field.definition.id) {
            <cf-field
              [field]="field"
              [fieldId]="idPrefix + '-' + field.definition.key"
              [value]="formValuesSnapshot[field.definition.key] ?? null"
              [formValues]="formValuesSnapshot"
              [error]="fieldErrors[field.definition.key]"
              [classNames]="classNames ?? undefined"
              [engineOptions]="engineOptions"
              (valueChange)="setValue(field.definition.key, $event)"
            />
          }
        </div>
      }

      @if (showSubmit) {
        <button
          mat-flat-button
          color="primary"
          type="submit"
          class="cf-form-submit"
          [class]="classNames?.submit"
          [disabled]="submitting"
        >
          {{ submitting ? 'Submitting…' : submitLabel }}
        </button>
      }
    </form>
  `, styles: [".cf-form{display:flex;flex-direction:column}.cf-form-step{display:flex;flex-direction:column;gap:1.25rem}.cf-form-title{margin:0 0 .25rem}.cf-form-description{margin:0 0 1.25rem;color:#0009}.cf-form-step-title{margin:1.25rem 0 .75rem}.cf-form-submit{margin-top:1rem}\n"] }]
        }], ctorParameters: () => [{ type: FormEngineService }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [CF_FORM_CLASS_NAMES]
                }] }, { type: i0.ChangeDetectorRef }], propDecorators: { definition: [{
                type: Input,
                args: [{ required: true }]
            }], initialValues: [{
                type: Input
            }], engineOptions: [{
                type: Input
            }], idPrefix: [{
                type: Input
            }], hideHeading: [{
                type: Input
            }], submitLabel: [{
                type: Input
            }], showSubmit: [{
                type: Input
            }], submitted: [{
                type: Output
            }], valuesChange: [{
                type: Output
            }] } });

/** Marks a projected ng-template as content for a custom stepper step. */
class CfFormStepperStepDirective {
    template;
    stepId;
    constructor(template) {
        this.template = template;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: CfFormStepperStepDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "21.2.21", type: CfFormStepperStepDirective, isStandalone: true, selector: "ng-template[cfFormStepperStep]", inputs: { stepId: ["cfFormStepperStep", "stepId"] }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: CfFormStepperStepDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ng-template[cfFormStepperStep]',
                    standalone: true,
                }]
        }], ctorParameters: () => [{ type: i0.TemplateRef }], propDecorators: { stepId: [{
                type: Input,
                args: [{ alias: 'cfFormStepperStep', required: true }]
            }] } });

class CfFormStepperComponent {
    cdr;
    steps;
    buildStepDefinition;
    resolveSteps;
    initialValues = {};
    engineOptions;
    validateStep;
    /** Awaited before a step is entered so its definition can be loaded on demand. */
    prepareStep;
    idPrefix = 'cf-stepper';
    allowCancel = true;
    submitting = false;
    backLabel = 'Back';
    nextLabel = 'Next';
    cancelLabel = 'Cancel';
    completeLabel = 'Save';
    submittingLabel = 'Saving…';
    preparingLabel = 'Loading…';
    validationErrorTitle = 'Validation';
    validationErrorMessage = 'Please fill all required fields before continuing.';
    prepareStepErrorMessage = 'Could not load the next step. Please try again.';
    /** When false, the action bar is not rendered inline; hosts project {@link actionsTemplate}. */
    showInlineActions = true;
    completed = new EventEmitter();
    cancelled = new EventEmitter();
    stepChange = new EventEmitter();
    stepStateChange = new EventEmitter();
    validationError = new EventEmitter();
    stepForm;
    /** `descendants` lets hosts declare step templates inside `*ngFor`/`*ngIf` blocks. */
    customStepTemplates;
    /** Optional validator registered by custom step content. */
    customStepValidator = null;
    currentStepId;
    stepDefinition = { id: '', key: '', label: '', description: null, fields: [] };
    stepInitialValues = {};
    formValues = {};
    /** Live edits on the active form step (merged into resolveSteps before Next/Back). */
    liveStepValues = {};
    lastEmittedStateKey = '';
    /** Bumped on each step refresh so cf-form is destroyed/recreated (starts at 0 = not mounted). */
    stepFormKey = 0;
    /** True while {@link prepareStep} resolves the step the user is moving to. */
    preparing = false;
    constructor(cdr) {
        this.cdr = cdr;
    }
    get effectiveValues() {
        return { ...this.formValues, ...this.liveStepValues };
    }
    get activeStepIds() {
        if (this.resolveSteps) {
            return this.resolveSteps(this.effectiveValues);
        }
        return this.steps.map(step => step.id);
    }
    get stepIndex() {
        return this.activeStepIds.indexOf(this.currentStepId);
    }
    get isFirstStep() {
        return this.stepIndex <= 0;
    }
    get isLastStep() {
        return this.stepIndex >= this.activeStepIds.length - 1;
    }
    get currentStepLabel() {
        return this.steps.find(step => step.id === this.currentStepId)?.label ?? '';
    }
    get nextButtonLabel() {
        if (this.submitting)
            return this.submittingLabel;
        if (this.preparing)
            return this.preparingLabel;
        return this.isLastStep ? this.completeLabel : this.nextLabel;
    }
    get currentStepKind() {
        return this.steps.find(step => step.id === this.currentStepId)?.kind ?? 'form';
    }
    get customStepTemplate() {
        return this.customStepTemplates?.find(t => t.stepId === this.currentStepId)?.template;
    }
    ngOnChanges(changes) {
        if (changes['initialValues'] && !changes['initialValues'].firstChange) {
            const previous = changes['initialValues'].previousValue;
            const current = changes['initialValues'].currentValue;
            if (previous && current && this.hasSameFormValues(previous, current)) {
                return;
            }
            this.resetSteps();
            return;
        }
        if (changes['steps'] || changes['initialValues']) {
            this.resetSteps();
        }
    }
    /** Register a validator from custom step content (cleared on step change). */
    registerCustomStepValidator(validator) {
        this.customStepValidator = validator;
    }
    onBackOrCancel() {
        if (this.preparing) {
            return;
        }
        if (this.isFirstStep) {
            if (this.allowCancel) {
                this.cancelled.emit();
            }
            return;
        }
        this.mergeCurrentStepValues();
        void this.goToStep(this.activeStepIds[this.stepIndex - 1]);
    }
    async onNext() {
        if (this.preparing || !this.validateCurrentStep()) {
            return;
        }
        this.mergeCurrentStepValues();
        const crossFieldError = this.validateStep?.(this.currentStepId, this.formValues);
        if (crossFieldError) {
            this.validationError.emit(crossFieldError);
            return;
        }
        if (this.isLastStep) {
            this.emitStepState();
            this.completed.emit(this.formValues);
            return;
        }
        await this.goToStep(this.activeStepIds[this.stepIndex + 1]);
    }
    getValues() {
        return { ...this.formValues };
    }
    onStepValuesChange(values) {
        this.liveStepValues = { ...values };
        this.ensureCurrentStepInActiveIds();
        this.emitStepState();
    }
    async goToStep(stepId) {
        if (this.prepareStep) {
            this.preparing = true;
            this.emitStepState();
            this.cdr.markForCheck();
            try {
                await this.prepareStep(stepId, { ...this.formValues });
            }
            catch {
                this.validationError.emit(this.prepareStepErrorMessage);
                return;
            }
            finally {
                this.preparing = false;
                this.emitStepState();
                this.cdr.markForCheck();
            }
        }
        this.currentStepId = stepId;
        this.refreshStepDefinition();
        this.stepChange.emit({ stepId: this.currentStepId, values: { ...this.formValues } });
        this.emitStepState();
    }
    validateCurrentStep() {
        if (this.currentStepKind === 'form') {
            if (!this.stepForm?.validateForm()) {
                this.validationError.emit(this.validationErrorMessage);
                return false;
            }
            return true;
        }
        if (this.customStepValidator && !this.customStepValidator()) {
            this.validationError.emit(this.validationErrorMessage);
            return false;
        }
        return true;
    }
    mergeCurrentStepValues() {
        this.customStepValidator = null;
        if (this.currentStepKind === 'form' && this.stepForm) {
            // Values from earlier steps are kept even when the current step does not
            // declare them, but condition-hidden fields must not reach the payload.
            const merged = { ...this.formValues, ...this.stepForm.getValues() };
            for (const key of this.stepForm.getConditionHiddenKeys()) {
                delete merged[key];
            }
            this.formValues = merged;
        }
        this.liveStepValues = {};
    }
    resetSteps() {
        this.preparing = false;
        this.formValues = { ...this.initialValues };
        this.liveStepValues = {};
        const ids = this.activeStepIds;
        this.currentStepId = ids[0] ?? this.steps[0]?.id;
        this.refreshStepDefinition();
        this.emitStepState();
    }
    refreshStepDefinition() {
        this.customStepValidator = null;
        this.liveStepValues = {};
        if (this.currentStepKind === 'form') {
            this.stepDefinition = this.buildStepDefinition(this.currentStepId, this.formValues);
            this.stepInitialValues = { ...this.formValues };
            // Start at 0 so the first mount happens only after stepDefinition is set (same CD).
            // Later bumps recreate the form when the step changes.
            this.stepFormKey += 1;
        }
        else {
            this.stepFormKey = 0;
        }
        this.cdr.markForCheck();
    }
    ensureCurrentStepInActiveIds() {
        const ids = this.activeStepIds;
        if (!ids.length || ids.includes(this.currentStepId)) {
            return;
        }
        this.currentStepId = ids[0];
        this.refreshStepDefinition();
    }
    emitStepState() {
        const ids = this.activeStepIds;
        const stepIndex = Math.max(0, ids.indexOf(this.currentStepId));
        const totalSteps = Math.max(ids.length, 1);
        const state = {
            stepId: this.currentStepId,
            stepIndex,
            totalSteps,
            isFirstStep: stepIndex <= 0,
            isLastStep: stepIndex >= totalSteps - 1,
            preparing: this.preparing,
        };
        const key = `${state.stepId}|${state.stepIndex}|${state.totalSteps}`
            + `|${state.isFirstStep}|${state.isLastStep}|${state.preparing}`;
        if (key === this.lastEmittedStateKey) {
            return;
        }
        this.lastEmittedStateKey = key;
        this.stepStateChange.emit(state);
    }
    hasSameFormValues(a, b) {
        const aKeys = Object.keys(a);
        const bKeys = Object.keys(b);
        if (aKeys.length !== bKeys.length) {
            return false;
        }
        return aKeys.every(key => Object.is(a[key], b[key]));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: CfFormStepperComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.21", type: CfFormStepperComponent, isStandalone: true, selector: "cf-form-stepper", inputs: { steps: "steps", buildStepDefinition: "buildStepDefinition", resolveSteps: "resolveSteps", initialValues: "initialValues", engineOptions: "engineOptions", validateStep: "validateStep", prepareStep: "prepareStep", idPrefix: "idPrefix", allowCancel: "allowCancel", submitting: "submitting", backLabel: "backLabel", nextLabel: "nextLabel", cancelLabel: "cancelLabel", completeLabel: "completeLabel", submittingLabel: "submittingLabel", preparingLabel: "preparingLabel", validationErrorTitle: "validationErrorTitle", validationErrorMessage: "validationErrorMessage", prepareStepErrorMessage: "prepareStepErrorMessage", showInlineActions: "showInlineActions" }, outputs: { completed: "completed", cancelled: "cancelled", stepChange: "stepChange", stepStateChange: "stepStateChange", validationError: "validationError" }, queries: [{ propertyName: "customStepTemplates", predicate: CfFormStepperStepDirective, descendants: true }], viewQueries: [{ propertyName: "stepForm", first: true, predicate: ["stepForm"], descendants: true }], usesOnChanges: true, ngImport: i0, template: `
    <div class="cf-form-stepper">
      <div class="cf-form-stepper__header">
        <h3 class="cf-form-stepper__title">{{ currentStepLabel }}</h3>
        <span class="cf-form-stepper__progress">
          Step {{ stepIndex + 1 }} of {{ activeStepIds.length }}
        </span>
      </div>

      @if (currentStepKind === 'form' && stepFormKey > 0) {
        <!--
          Remount via @for track when stepFormKey changes. Safe now that create initialValues
          are snapshotted/cached — avoids empty first paint (key starts at 0 until definition is ready).
        -->
        @for (renderKey of [stepFormKey]; track renderKey) {
          <cf-form
            #stepForm
            class="cf-form-stepper__form"
            [definition]="stepDefinition"
            [initialValues]="stepInitialValues"
            [engineOptions]="engineOptions"
            [hideHeading]="true"
            [showSubmit]="false"
            [idPrefix]="idPrefix + '-' + currentStepId"
            (valuesChange)="onStepValuesChange($event)">
          </cf-form>
        }
      }

      @if (currentStepKind === 'custom') {
        <div class="cf-form-stepper__custom">
          @if (customStepTemplate; as tpl) {
            <ng-container *ngTemplateOutlet="tpl"></ng-container>
          }
        </div>
      }

      @if (showInlineActions) {
        <ng-container *ngTemplateOutlet="actionsTpl"></ng-container>
      }
    </div>

    <!--
      Action bar template. Rendered inline by default; hosts that pin actions in a
      sheet footer set showInlineActions=false and project actionsTemplate instead.
    -->
    <ng-template #actionsTpl>
      <div class="cf-form-stepper__actions app-btn-group">
        @if (!isFirstStep || allowCancel) {
          <button
            type="button"
            class="app-btn app-btn--ghost cf-form-stepper__back"
            [disabled]="submitting || preparing"
            (click)="onBackOrCancel()">
            {{ isFirstStep ? cancelLabel : backLabel }}
          </button>
        }
        <button
          type="button"
          class="app-btn app-btn--primary cf-form-stepper__next"
          [disabled]="submitting || preparing"
          (click)="onNext()">
          {{ nextButtonLabel }}
        </button>
      </div>
    </ng-template>
  `, isInline: true, styles: [".cf-form-stepper{display:flex;flex-direction:column;gap:1rem}.cf-form-stepper__header{display:flex;flex-direction:column;gap:.25rem}.cf-form-stepper__title{margin:0;font-size:1rem;font-weight:600}.cf-form-stepper__progress{font-size:.8125rem;color:#64748b}.cf-form-stepper__actions{display:flex;gap:.75rem;flex-wrap:wrap;padding-top:.5rem;justify-content:stretch}.cf-form-stepper__actions>.app-btn{flex:1}\n"], dependencies: [{ kind: "component", type: CfFormComponent, selector: "cf-form", inputs: ["definition", "initialValues", "engineOptions", "idPrefix", "hideHeading", "submitLabel", "showSubmit"], outputs: ["submitted", "valuesChange"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.21", ngImport: i0, type: CfFormStepperComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cf-form-stepper', standalone: true, imports: [CfFormComponent, NgTemplateOutlet], template: `
    <div class="cf-form-stepper">
      <div class="cf-form-stepper__header">
        <h3 class="cf-form-stepper__title">{{ currentStepLabel }}</h3>
        <span class="cf-form-stepper__progress">
          Step {{ stepIndex + 1 }} of {{ activeStepIds.length }}
        </span>
      </div>

      @if (currentStepKind === 'form' && stepFormKey > 0) {
        <!--
          Remount via @for track when stepFormKey changes. Safe now that create initialValues
          are snapshotted/cached — avoids empty first paint (key starts at 0 until definition is ready).
        -->
        @for (renderKey of [stepFormKey]; track renderKey) {
          <cf-form
            #stepForm
            class="cf-form-stepper__form"
            [definition]="stepDefinition"
            [initialValues]="stepInitialValues"
            [engineOptions]="engineOptions"
            [hideHeading]="true"
            [showSubmit]="false"
            [idPrefix]="idPrefix + '-' + currentStepId"
            (valuesChange)="onStepValuesChange($event)">
          </cf-form>
        }
      }

      @if (currentStepKind === 'custom') {
        <div class="cf-form-stepper__custom">
          @if (customStepTemplate; as tpl) {
            <ng-container *ngTemplateOutlet="tpl"></ng-container>
          }
        </div>
      }

      @if (showInlineActions) {
        <ng-container *ngTemplateOutlet="actionsTpl"></ng-container>
      }
    </div>

    <!--
      Action bar template. Rendered inline by default; hosts that pin actions in a
      sheet footer set showInlineActions=false and project actionsTemplate instead.
    -->
    <ng-template #actionsTpl>
      <div class="cf-form-stepper__actions app-btn-group">
        @if (!isFirstStep || allowCancel) {
          <button
            type="button"
            class="app-btn app-btn--ghost cf-form-stepper__back"
            [disabled]="submitting || preparing"
            (click)="onBackOrCancel()">
            {{ isFirstStep ? cancelLabel : backLabel }}
          </button>
        }
        <button
          type="button"
          class="app-btn app-btn--primary cf-form-stepper__next"
          [disabled]="submitting || preparing"
          (click)="onNext()">
          {{ nextButtonLabel }}
        </button>
      </div>
    </ng-template>
  `, styles: [".cf-form-stepper{display:flex;flex-direction:column;gap:1rem}.cf-form-stepper__header{display:flex;flex-direction:column;gap:.25rem}.cf-form-stepper__title{margin:0;font-size:1rem;font-weight:600}.cf-form-stepper__progress{font-size:.8125rem;color:#64748b}.cf-form-stepper__actions{display:flex;gap:.75rem;flex-wrap:wrap;padding-top:.5rem;justify-content:stretch}.cf-form-stepper__actions>.app-btn{flex:1}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }], propDecorators: { steps: [{
                type: Input,
                args: [{ required: true }]
            }], buildStepDefinition: [{
                type: Input,
                args: [{ required: true }]
            }], resolveSteps: [{
                type: Input
            }], initialValues: [{
                type: Input
            }], engineOptions: [{
                type: Input
            }], validateStep: [{
                type: Input
            }], prepareStep: [{
                type: Input
            }], idPrefix: [{
                type: Input
            }], allowCancel: [{
                type: Input
            }], submitting: [{
                type: Input
            }], backLabel: [{
                type: Input
            }], nextLabel: [{
                type: Input
            }], cancelLabel: [{
                type: Input
            }], completeLabel: [{
                type: Input
            }], submittingLabel: [{
                type: Input
            }], preparingLabel: [{
                type: Input
            }], validationErrorTitle: [{
                type: Input
            }], validationErrorMessage: [{
                type: Input
            }], prepareStepErrorMessage: [{
                type: Input
            }], showInlineActions: [{
                type: Input
            }], completed: [{
                type: Output
            }], cancelled: [{
                type: Output
            }], stepChange: [{
                type: Output
            }], stepStateChange: [{
                type: Output
            }], validationError: [{
                type: Output
            }], stepForm: [{
                type: ViewChild,
                args: ['stepForm']
            }], customStepTemplates: [{
                type: ContentChildren,
                args: [CfFormStepperStepDirective, { descendants: true }]
            }] } });

/** Register animations required by Angular Material form controls in `cf-form` / `cf-field`. */
function provideCfFormMaterial() {
    return makeEnvironmentProviders([provideAnimations()]);
}

/**
 * Generated bundle index. Do not edit.
 */

export { CF_FORM_CLASS_NAMES, CUSTOM_FORM_FIELD_RENDERERS, CfFieldComponent, CfFormComponent, CfFormStepperComponent, CfFormStepperStepDirective, FormEngineService, provideCfFormMaterial };
//# sourceMappingURL=ssweb-toolkit-forms-angular.mjs.map
