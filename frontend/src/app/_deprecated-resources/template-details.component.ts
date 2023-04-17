import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-template-details',
  templateUrl: './template-details.component.html',
  styleUrls: ['./template-details.component.scss'],
})
export class TemplateDetailsComponent {
  @Output('close') closeCreateTemplate = new EventEmitter<void>();
  close() {
    this.closeCreateTemplate.emit();
  }
}
