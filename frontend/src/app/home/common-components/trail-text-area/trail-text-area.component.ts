import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { debounce, uniqueId } from 'lodash';
import { BugFixTrailDataController } from '../../../_deprecated-resources/compose/compose-trail-bugfix/compose-trail-bugfix-controller';

@Component({
  selector: 'app-trail-text-area',
  templateUrl: './trail-text-area.component.html',
  styleUrls: ['./trail-text-area.component.scss'],
})
export class TrailTextAreaComponent {
  @Input('placeholder') placeholder: string = '';
  @Input('label') label?: string;
  @Input('type') type: string = 'text';
  @Input('default') defaultText?: string = '';
  @Input('isToggle') isToggle: boolean = false;
  @Input('shadow') hasShadow: boolean = true;
  @Input('heightPx') heightPx: number = 60;
  @Input('fontSize') fontSize: string = '1em';
  @Output('onSave') entryEmitter = new EventEmitter<string>();
  @Output('onClear') clearEmitter = new EventEmitter<void>();
  @Output('onEmitInputContext') inputContextEmitter =
    new EventEmitter<TextAreaContext>();
  @ViewChild('textArea')
  textAreaEl!: ElementRef;

  readonly debouncedSave = debounce(this.save.bind(this), 1000);
  readonly inputDataControl = new FormControl<string>('');
  readonly uid = uniqueId();

  isVisible: boolean = true;

  ngAfterViewInit() {
    this.expandTextAreaOnInput();
    if (this.defaultText) {
      this.inputDataControl.setValue(this.defaultText);
    }
    this.isVisible = this.isToggle ? false : true;
    this.isVisible = this.isVisible || !!this.defaultText;

    this.inputContextEmitter.emit({
      getUid: () => this.uid,
      getIsInputValid: () => this.inputDataControl.valid,
      save: () => this.save(),
      clearErrorAfterDelay: () => this.clearErrorAfterDelay(),
      control: this.inputDataControl,
    });
  }

  expandTextAreaOnInput() {
    const e = this.textAreaEl.nativeElement;
    const adjustHeight = function () {
      (e as any).style.height = ''; /* Reset the height*/
      (e as any).style.height = Math.min((e as any).scrollHeight) + 'px';
    };
    (e as any).oninput = adjustHeight;
    new ResizeObserver(adjustHeight).observe(e);
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

  toggleIsVisible() {
    this.isVisible = !this.isVisible;
    if (this.isVisible) {
      setTimeout(() => {
        this.expandTextAreaOnInput();
      }, 100);
    }
  }
}

/** Exposes input component resources for direct access by a parent component. */
export interface TextAreaContext {
  control: FormControl;
  getUid: () => string;
  getIsInputValid: () => boolean;
  save: () => void;
  clearErrorAfterDelay: () => void;
}
