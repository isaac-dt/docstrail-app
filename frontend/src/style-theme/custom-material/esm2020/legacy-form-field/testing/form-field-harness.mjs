/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { HarnessPredicate, parallel } from '@angular/cdk/testing';
import { MatDatepickerInputHarness, MatDateRangeInputHarness, } from '@angular/material/datepicker/testing';
import { _MatFormFieldHarnessBase, } from '@angular/material/form-field/testing';
import { MatLegacyInputHarness } from '@angular/material/legacy-input/testing';
import { MatLegacySelectHarness } from '@angular/material/legacy-select/testing';
import { MatLegacyErrorHarness } from './error-harness';
/**
 * Harness for interacting with a standard Material form-field's in tests.
 * @deprecated Use `MatFormFieldHarness` from `@angular/material/form-field/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyFormFieldHarness extends _MatFormFieldHarnessBase {
    constructor() {
        super(...arguments);
        this._prefixContainer = this.locatorForOptional('.mat-form-field-prefix');
        this._suffixContainer = this.locatorForOptional('.mat-form-field-suffix');
        this._label = this.locatorForOptional('.mat-form-field-label');
        this._errors = this.locatorForAll('.mat-error');
        this._hints = this.locatorForAll('mat-hint, .mat-hint');
        this._inputControl = this.locatorForOptional(MatLegacyInputHarness);
        this._selectControl = this.locatorForOptional(MatLegacySelectHarness);
        this._datepickerInputControl = this.locatorForOptional(MatDatepickerInputHarness);
        this._dateRangeInputControl = this.locatorForOptional(MatDateRangeInputHarness);
        this._errorHarness = MatLegacyErrorHarness;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatFormFieldHarness` that meets
     * certain criteria.
     * @param options Options for filtering which form field instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatLegacyFormFieldHarness, options)
            .addOption('floatingLabelText', options.floatingLabelText, async (harness, text) => HarnessPredicate.stringMatches(await harness.getLabel(), text))
            .addOption('hasErrors', options.hasErrors, async (harness, hasErrors) => (await harness.hasErrors()) === hasErrors);
    }
    /** Gets the appearance of the form-field. */
    async getAppearance() {
        const hostClasses = await (await this.host()).getAttribute('class');
        if (hostClasses !== null) {
            const appearanceMatch = hostClasses.match(/mat-form-field-appearance-(legacy|standard|fill|outline)(?:$| )/);
            if (appearanceMatch) {
                return appearanceMatch[1];
            }
        }
        throw Error('Could not determine appearance of form-field.');
    }
    /** Whether the form-field has a label. */
    async hasLabel() {
        return (await this.host()).hasClass('mat-form-field-has-label');
    }
    /** Whether the label is currently floating. */
    async isLabelFloating() {
        const host = await this.host();
        const [hasLabel, shouldFloat] = await parallel(() => [
            this.hasLabel(),
            host.hasClass('mat-form-field-should-float'),
        ]);
        // If there is no label, the label conceptually can never float. The `should-float` class
        // is just always set regardless of whether the label is displayed or not.
        return hasLabel && shouldFloat;
    }
}
MatLegacyFormFieldHarness.hostSelector = '.mat-form-field';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC1oYXJuZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2xlZ2FjeS1mb3JtLWZpZWxkL3Rlc3RpbmcvZm9ybS1maWVsZC1oYXJuZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxRQUFRLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNoRSxPQUFPLEVBQ0wseUJBQXlCLEVBQ3pCLHdCQUF3QixHQUN6QixNQUFNLHNDQUFzQyxDQUFDO0FBQzlDLE9BQU8sRUFFTCx3QkFBd0IsR0FDekIsTUFBTSxzQ0FBc0MsQ0FBQztBQUM5QyxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQztBQUM3RSxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQUMvRSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQWN0RDs7OztHQUlHO0FBQ0gsTUFBTSxPQUFPLHlCQUEwQixTQUFRLHdCQUc5QztJQUhEOztRQXdCWSxxQkFBZ0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUNyRSxxQkFBZ0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUNyRSxXQUFNLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDMUQsWUFBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDM0MsV0FBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNuRCxrQkFBYSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQy9ELG1CQUFjLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDakUsNEJBQXVCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDN0UsMkJBQXNCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDM0Usa0JBQWEsR0FBRyxxQkFBcUIsQ0FBQztJQWdDbEQsQ0FBQztJQTNEQzs7Ozs7T0FLRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBbUMsRUFBRTtRQUMvQyxPQUFPLElBQUksZ0JBQWdCLENBQUMseUJBQXlCLEVBQUUsT0FBTyxDQUFDO2FBQzVELFNBQVMsQ0FBQyxtQkFBbUIsRUFBRSxPQUFPLENBQUMsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUNqRixnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsTUFBTSxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQy9EO2FBQ0EsU0FBUyxDQUNSLFdBQVcsRUFDWCxPQUFPLENBQUMsU0FBUyxFQUNqQixLQUFLLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLFNBQVMsQ0FDeEUsQ0FBQztJQUNOLENBQUM7SUFhRCw2Q0FBNkM7SUFDN0MsS0FBSyxDQUFDLGFBQWE7UUFDakIsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BFLElBQUksV0FBVyxLQUFLLElBQUksRUFBRTtZQUN4QixNQUFNLGVBQWUsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUN2QyxpRUFBaUUsQ0FDbEUsQ0FBQztZQUNGLElBQUksZUFBZSxFQUFFO2dCQUNuQixPQUFPLGVBQWUsQ0FBQyxDQUFDLENBQStDLENBQUM7YUFDekU7U0FDRjtRQUNELE1BQU0sS0FBSyxDQUFDLCtDQUErQyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELDBDQUEwQztJQUMxQyxLQUFLLENBQUMsUUFBUTtRQUNaLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRCwrQ0FBK0M7SUFDL0MsS0FBSyxDQUFDLGVBQWU7UUFDbkIsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDL0IsTUFBTSxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsR0FBRyxNQUFNLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNuRCxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyw2QkFBNkIsQ0FBQztTQUM3QyxDQUFDLENBQUM7UUFDSCx5RkFBeUY7UUFDekYsMEVBQTBFO1FBQzFFLE9BQU8sUUFBUSxJQUFJLFdBQVcsQ0FBQztJQUNqQyxDQUFDOztBQTVETSxzQ0FBWSxHQUFHLGlCQUFpQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SGFybmVzc1ByZWRpY2F0ZSwgcGFyYWxsZWx9IGZyb20gJ0Bhbmd1bGFyL2Nkay90ZXN0aW5nJztcbmltcG9ydCB7XG4gIE1hdERhdGVwaWNrZXJJbnB1dEhhcm5lc3MsXG4gIE1hdERhdGVSYW5nZUlucHV0SGFybmVzcyxcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGF0ZXBpY2tlci90ZXN0aW5nJztcbmltcG9ydCB7XG4gIEZvcm1GaWVsZEhhcm5lc3NGaWx0ZXJzLFxuICBfTWF0Rm9ybUZpZWxkSGFybmVzc0Jhc2UsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2Zvcm0tZmllbGQvdGVzdGluZyc7XG5pbXBvcnQge01hdExlZ2FjeUlucHV0SGFybmVzc30gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvbGVnYWN5LWlucHV0L3Rlc3RpbmcnO1xuaW1wb3J0IHtNYXRMZWdhY3lTZWxlY3RIYXJuZXNzfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9sZWdhY3ktc2VsZWN0L3Rlc3RpbmcnO1xuaW1wb3J0IHtNYXRMZWdhY3lFcnJvckhhcm5lc3N9IGZyb20gJy4vZXJyb3ItaGFybmVzcyc7XG5cbi8vIFRPRE8oZGV2dmVyc2lvbik6IHN1cHBvcnQgc3VwcG9ydCBjaGlwIGxpc3QgaGFybmVzc1xuLyoqXG4gKiBQb3NzaWJsZSBoYXJuZXNzZXMgb2YgY29udHJvbHMgd2hpY2ggY2FuIGJlIGJvdW5kIHRvIGEgZm9ybS1maWVsZC5cbiAqIEBkZXByZWNhdGVkIFVzZSBgRm9ybUZpZWxkQ29udHJvbEhhcm5lc3NgIGZyb20gYEBhbmd1bGFyL21hdGVyaWFsL2Zvcm0tZmllbGQvdGVzdGluZ2AgaW5zdGVhZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9ndWlkZS9tZGMtbWlncmF0aW9uIGZvciBpbmZvcm1hdGlvbiBhYm91dCBtaWdyYXRpbmcuXG4gKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICovXG5leHBvcnQgdHlwZSBMZWdhY3lGb3JtRmllbGRDb250cm9sSGFybmVzcyA9XG4gIHwgTWF0TGVnYWN5SW5wdXRIYXJuZXNzXG4gIHwgTWF0TGVnYWN5U2VsZWN0SGFybmVzc1xuICB8IE1hdERhdGVwaWNrZXJJbnB1dEhhcm5lc3NcbiAgfCBNYXREYXRlUmFuZ2VJbnB1dEhhcm5lc3M7XG5cbi8qKlxuICogSGFybmVzcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCBhIHN0YW5kYXJkIE1hdGVyaWFsIGZvcm0tZmllbGQncyBpbiB0ZXN0cy5cbiAqIEBkZXByZWNhdGVkIFVzZSBgTWF0Rm9ybUZpZWxkSGFybmVzc2AgZnJvbSBgQGFuZ3VsYXIvbWF0ZXJpYWwvZm9ybS1maWVsZC90ZXN0aW5nYCBpbnN0ZWFkLiBTZWUgaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyLmlvL2d1aWRlL21kYy1taWdyYXRpb24gZm9yIGluZm9ybWF0aW9uIGFib3V0IG1pZ3JhdGluZy5cbiAqIEBicmVha2luZy1jaGFuZ2UgMTcuMC4wXG4gKi9cbmV4cG9ydCBjbGFzcyBNYXRMZWdhY3lGb3JtRmllbGRIYXJuZXNzIGV4dGVuZHMgX01hdEZvcm1GaWVsZEhhcm5lc3NCYXNlPFxuICBMZWdhY3lGb3JtRmllbGRDb250cm9sSGFybmVzcyxcbiAgdHlwZW9mIE1hdExlZ2FjeUVycm9ySGFybmVzc1xuPiB7XG4gIHN0YXRpYyBob3N0U2VsZWN0b3IgPSAnLm1hdC1mb3JtLWZpZWxkJztcblxuICAvKipcbiAgICogR2V0cyBhIGBIYXJuZXNzUHJlZGljYXRlYCB0aGF0IGNhbiBiZSB1c2VkIHRvIHNlYXJjaCBmb3IgYSBgTWF0Rm9ybUZpZWxkSGFybmVzc2AgdGhhdCBtZWV0c1xuICAgKiBjZXJ0YWluIGNyaXRlcmlhLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciBmaWx0ZXJpbmcgd2hpY2ggZm9ybSBmaWVsZCBpbnN0YW5jZXMgYXJlIGNvbnNpZGVyZWQgYSBtYXRjaC5cbiAgICogQHJldHVybiBhIGBIYXJuZXNzUHJlZGljYXRlYCBjb25maWd1cmVkIHdpdGggdGhlIGdpdmVuIG9wdGlvbnMuXG4gICAqL1xuICBzdGF0aWMgd2l0aChvcHRpb25zOiBGb3JtRmllbGRIYXJuZXNzRmlsdGVycyA9IHt9KTogSGFybmVzc1ByZWRpY2F0ZTxNYXRMZWdhY3lGb3JtRmllbGRIYXJuZXNzPiB7XG4gICAgcmV0dXJuIG5ldyBIYXJuZXNzUHJlZGljYXRlKE1hdExlZ2FjeUZvcm1GaWVsZEhhcm5lc3MsIG9wdGlvbnMpXG4gICAgICAuYWRkT3B0aW9uKCdmbG9hdGluZ0xhYmVsVGV4dCcsIG9wdGlvbnMuZmxvYXRpbmdMYWJlbFRleHQsIGFzeW5jIChoYXJuZXNzLCB0ZXh0KSA9PlxuICAgICAgICBIYXJuZXNzUHJlZGljYXRlLnN0cmluZ01hdGNoZXMoYXdhaXQgaGFybmVzcy5nZXRMYWJlbCgpLCB0ZXh0KSxcbiAgICAgIClcbiAgICAgIC5hZGRPcHRpb24oXG4gICAgICAgICdoYXNFcnJvcnMnLFxuICAgICAgICBvcHRpb25zLmhhc0Vycm9ycyxcbiAgICAgICAgYXN5bmMgKGhhcm5lc3MsIGhhc0Vycm9ycykgPT4gKGF3YWl0IGhhcm5lc3MuaGFzRXJyb3JzKCkpID09PSBoYXNFcnJvcnMsXG4gICAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9wcmVmaXhDb250YWluZXIgPSB0aGlzLmxvY2F0b3JGb3JPcHRpb25hbCgnLm1hdC1mb3JtLWZpZWxkLXByZWZpeCcpO1xuICBwcm90ZWN0ZWQgX3N1ZmZpeENvbnRhaW5lciA9IHRoaXMubG9jYXRvckZvck9wdGlvbmFsKCcubWF0LWZvcm0tZmllbGQtc3VmZml4Jyk7XG4gIHByb3RlY3RlZCBfbGFiZWwgPSB0aGlzLmxvY2F0b3JGb3JPcHRpb25hbCgnLm1hdC1mb3JtLWZpZWxkLWxhYmVsJyk7XG4gIHByb3RlY3RlZCBfZXJyb3JzID0gdGhpcy5sb2NhdG9yRm9yQWxsKCcubWF0LWVycm9yJyk7XG4gIHByb3RlY3RlZCBfaGludHMgPSB0aGlzLmxvY2F0b3JGb3JBbGwoJ21hdC1oaW50LCAubWF0LWhpbnQnKTtcbiAgcHJvdGVjdGVkIF9pbnB1dENvbnRyb2wgPSB0aGlzLmxvY2F0b3JGb3JPcHRpb25hbChNYXRMZWdhY3lJbnB1dEhhcm5lc3MpO1xuICBwcm90ZWN0ZWQgX3NlbGVjdENvbnRyb2wgPSB0aGlzLmxvY2F0b3JGb3JPcHRpb25hbChNYXRMZWdhY3lTZWxlY3RIYXJuZXNzKTtcbiAgcHJvdGVjdGVkIF9kYXRlcGlja2VySW5wdXRDb250cm9sID0gdGhpcy5sb2NhdG9yRm9yT3B0aW9uYWwoTWF0RGF0ZXBpY2tlcklucHV0SGFybmVzcyk7XG4gIHByb3RlY3RlZCBfZGF0ZVJhbmdlSW5wdXRDb250cm9sID0gdGhpcy5sb2NhdG9yRm9yT3B0aW9uYWwoTWF0RGF0ZVJhbmdlSW5wdXRIYXJuZXNzKTtcbiAgcHJvdGVjdGVkIF9lcnJvckhhcm5lc3MgPSBNYXRMZWdhY3lFcnJvckhhcm5lc3M7XG5cbiAgLyoqIEdldHMgdGhlIGFwcGVhcmFuY2Ugb2YgdGhlIGZvcm0tZmllbGQuICovXG4gIGFzeW5jIGdldEFwcGVhcmFuY2UoKTogUHJvbWlzZTwnbGVnYWN5JyB8ICdzdGFuZGFyZCcgfCAnZmlsbCcgfCAnb3V0bGluZSc+IHtcbiAgICBjb25zdCBob3N0Q2xhc3NlcyA9IGF3YWl0IChhd2FpdCB0aGlzLmhvc3QoKSkuZ2V0QXR0cmlidXRlKCdjbGFzcycpO1xuICAgIGlmIChob3N0Q2xhc3NlcyAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgYXBwZWFyYW5jZU1hdGNoID0gaG9zdENsYXNzZXMubWF0Y2goXG4gICAgICAgIC9tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLShsZWdhY3l8c3RhbmRhcmR8ZmlsbHxvdXRsaW5lKSg/OiR8ICkvLFxuICAgICAgKTtcbiAgICAgIGlmIChhcHBlYXJhbmNlTWF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIGFwcGVhcmFuY2VNYXRjaFsxXSBhcyAnbGVnYWN5JyB8ICdzdGFuZGFyZCcgfCAnZmlsbCcgfCAnb3V0bGluZSc7XG4gICAgICB9XG4gICAgfVxuICAgIHRocm93IEVycm9yKCdDb3VsZCBub3QgZGV0ZXJtaW5lIGFwcGVhcmFuY2Ugb2YgZm9ybS1maWVsZC4nKTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBmb3JtLWZpZWxkIGhhcyBhIGxhYmVsLiAqL1xuICBhc3luYyBoYXNMYWJlbCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5oYXNDbGFzcygnbWF0LWZvcm0tZmllbGQtaGFzLWxhYmVsJyk7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgbGFiZWwgaXMgY3VycmVudGx5IGZsb2F0aW5nLiAqL1xuICBhc3luYyBpc0xhYmVsRmxvYXRpbmcoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgaG9zdCA9IGF3YWl0IHRoaXMuaG9zdCgpO1xuICAgIGNvbnN0IFtoYXNMYWJlbCwgc2hvdWxkRmxvYXRdID0gYXdhaXQgcGFyYWxsZWwoKCkgPT4gW1xuICAgICAgdGhpcy5oYXNMYWJlbCgpLFxuICAgICAgaG9zdC5oYXNDbGFzcygnbWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0JyksXG4gICAgXSk7XG4gICAgLy8gSWYgdGhlcmUgaXMgbm8gbGFiZWwsIHRoZSBsYWJlbCBjb25jZXB0dWFsbHkgY2FuIG5ldmVyIGZsb2F0LiBUaGUgYHNob3VsZC1mbG9hdGAgY2xhc3NcbiAgICAvLyBpcyBqdXN0IGFsd2F5cyBzZXQgcmVnYXJkbGVzcyBvZiB3aGV0aGVyIHRoZSBsYWJlbCBpcyBkaXNwbGF5ZWQgb3Igbm90LlxuICAgIHJldHVybiBoYXNMYWJlbCAmJiBzaG91bGRGbG9hdDtcbiAgfVxufVxuIl19