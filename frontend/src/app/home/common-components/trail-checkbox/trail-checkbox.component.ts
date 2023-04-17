import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BugFixTrailDataController } from '../../../_deprecated-resources/compose/compose-trail-bugfix/compose-trail-bugfix-controller';

@Component({
  selector: 'app-trail-checkbox',
  templateUrl: './trail-checkbox.component.html',
  styleUrls: ['./trail-checkbox.component.scss'],
})
export class TrailCheckboxComponent {
  @Input('label') label!: string;
  @Input('default') default?: boolean;
  @Output('onCheck') onCheck = new EventEmitter<boolean>();
  @Output('onUncheck') onUncheck = new EventEmitter<boolean>();

  isSelected: boolean = false;

  ngOnInit() {
    this.isSelected = !!this.default;
  }

  toggleSelect() {
    this.isSelected = !this.isSelected;
    if (this.isSelected) {
      this.onCheck.emit();
    } else {
      this.onUncheck.emit();
    }
  }
}
