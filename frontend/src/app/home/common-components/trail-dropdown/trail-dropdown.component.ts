import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BugFixTrailDataController } from '../../../_deprecated-resources/compose/compose-trail-bugfix/compose-trail-bugfix-controller';

@Component({
  selector: 'app-trail-dropdown',
  templateUrl: './trail-dropdown.component.html',
  styleUrls: ['./trail-dropdown.component.scss'],
})
export class TrailDropdownComponent implements OnInit {
  @Input('default') default?: any;
  @Input('placeholder') placeholder: string = '';
  @Input('prefix') prefix?: string;
  @Input('optionsMap') optionsMap: { label: string; value: any }[] = [];
  @Input('optionsPairs') set optionsPairs(pairs: string[][]) {
    this.optionsMap = getKeyLabelFromEntries(pairs);
  }
  @Output('onEmitContext') contextEmitter = new EventEmitter<DropdownContext>();
  @Output('onChange') onChangeEmitter = new EventEmitter<any>();

  readonly selectionControl = new FormControl<any>(undefined);

  isContentVisible: boolean = false;
  selectedLabel?: string;

  onChange() {
    this.onChangeEmitter.emit(this.selectionControl.value);
    this.selectedLabel = this.getSelectedLabel();
  }

  ngOnInit() {
    if (this.default !== undefined) {
      this.selectionControl.setValue(this.default);
      this.selectedLabel = this.getSelectedLabel();
    }
    this.contextEmitter.emit({
      control: this.selectionControl,
      setValue: (value: any) => {
        this.selectionControl.setValue(value);
        this.onChange();
      },
    });
  }

  toggleIsContentVisible() {
    this.isContentVisible = !this.isContentVisible;
  }

  private getSelectedLabel() {
    const value = this.selectionControl.value;
    return this.optionsMap.find((entry) => entry.value === value)?.label;
  }
}

/** Transform `pairs: string[][]` into `{label:string, value:string}[]`. */
function getKeyLabelFromEntries(pairs: string[][]) {
  return pairs.map((pair) => ({ value: pair[0], label: pair[1] }));
}

/** Packages data for use in parent components. */
export interface DropdownContext {
  control: FormControl;
  setValue: (value: any) => void;
}
