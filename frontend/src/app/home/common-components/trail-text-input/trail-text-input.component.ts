import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { debounce, uniqueId } from 'lodash';
import { BugFixTrailDataController } from '../../../_deprecated-resources/compose/compose-trail-bugfix/compose-trail-bugfix-controller';

@Component({
  selector: 'app-trail-text-input',
  templateUrl: './trail-text-input.component.html',
  styleUrls: ['./trail-text-input.component.scss'],
})
export class TrailTextInputComponent {
  @Input('placeholder') placeholder: string = '';
  @Input('label') label?: string;
  @Input('type') type: string = 'text';
  @Input('default') defaultText?: string = '';
  @Input('fontSize') fontSize: string = '1em';
  @Output('onSave') entryEmitter = new EventEmitter<string>();
  @Output('onClear') clearEmitter = new EventEmitter<void>();
  @Output('onEmitInputContext') inputContextEmitter =
    new EventEmitter<TextInputContext>();

  readonly debouncedSave = debounce(this.save.bind(this), 1000);
  readonly inputDataControl = new FormControl<string>('');

  ngAfterViewInit() {
    if (this.defaultText) {
      this.inputDataControl.setValue(this.defaultText);
    }
    this.inputContextEmitter.emit({
      getIsInputValid: () => this.inputDataControl.valid,
      save: () => this.save(),
      clearErrorAfterDelay: () => this.clearErrorAfterDelay(),
      control: this.inputDataControl,
      addValidators: (args: ValidatorFn[] | ValidatorFn) => {
        setTimeout(() => {
          // Short delay to avoid change while running diff check.
          this.inputDataControl.addValidators(args);
        }, 100);
      },
    });
  }

  save() {
    if (this.inputDataControl.value) {
      this.entryEmitter.emit(this.inputDataControl.value);
      this.defaultText = this.inputDataControl.value;
    }
    this.clearErrorAfterDelay();
  }

  clearErrorAfterDelay() {
    const delayMs = 500;
    setTimeout(() => {
      this.inputDataControl.setErrors(null);
    }, delayMs);
  }
}

/** Exposes input component resources for direct access by a parent component. */
export interface TextInputContext {
  control: FormControl;
  getIsInputValid: () => boolean;
  save: () => void;
  clearErrorAfterDelay: () => void;
  addValidators: (args: ValidatorFn[] | ValidatorFn) => void;
}
