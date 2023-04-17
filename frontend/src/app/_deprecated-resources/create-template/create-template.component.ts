import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.scss'],
})
export class CreateTemplateComponent {
  constructor(readonly router: Router) {}
  navToTemplateList() {
    this.router.navigate(['template', 'list']);
  }

  navToBuildTemplate() {
    this.router.navigate(['template', 'build']);
  }

  navToImportTemplate() {
    this.router.navigate(['template', 'import']);
  }
}
