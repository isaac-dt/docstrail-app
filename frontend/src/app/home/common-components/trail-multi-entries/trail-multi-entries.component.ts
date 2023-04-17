import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BugFixTrailDataController } from '../../../_deprecated-resources/compose/compose-trail-bugfix/compose-trail-bugfix-controller';

@Component({
  selector: 'app-trail-multi-entries',
  templateUrl: './trail-multi-entries.component.html',
  styleUrls: ['./trail-multi-entries.component.scss'],
})
export class TrailMultiEntriesComponent {
  @Input('placeholder') placeholder?: string;
  @Input('label') label: string = '';
  @Input('type') type: string = 'text';
  @Input('trailController') trailController?: BugFixTrailDataController;
  @Input('default') default?: string[];
  @Output('onAdd') onAddEmitter = new EventEmitter<string>();
  @Output('onRemove') onRemoveEmitter = new EventEmitter<string>();
  @Output('onSet') onSetEmitter = new EventEmitter<string[]>();
  @Output('onEmitContext') contextEmitter =
    new EventEmitter<MultiEntriesContext>();

  readonly inputDataControl = new FormControl<string>('');

  entries: string[] = [];

  ngOnInit() {
    this.entries = this.default || [];
    this.contextEmitter.emit({
      control: this.inputDataControl,
      getEntries: () => this.entries,
      isEmpty: () => !this.entries.length,
      clearEntries: this.clearEntries.bind(this),
    });
  }

  add() {
    if (this.inputDataControl.value) {
      this.entries.push(this.inputDataControl.value);
      this.onSetEmitter.emit(this.entries);
      this.onAddEmitter.emit(this.inputDataControl.value);
      this.inputDataControl.reset();
    }
  }

  remove(entry: string) {
    const index = this.entries.findIndex((e) => e === entry);
    if (index >= 0) {
      this.entries.splice(index, 1);
      this.onSetEmitter.emit(this.entries);
      this.onRemoveEmitter.emit(entry);
    }
  }

  clearEntries() {
    this.entries = [];
  }
}

/** Exposes component resources for direct access by a parent component. */
export interface MultiEntriesContext {
  control: FormControl;
  getEntries: () => string[];
  isEmpty: () => boolean;
  clearEntries: () => void;
}
