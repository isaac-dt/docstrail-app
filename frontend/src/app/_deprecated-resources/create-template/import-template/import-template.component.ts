import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-import-template',
  templateUrl: './import-template.component.html',
  styleUrls: ['./import-template.component.scss'],
})
export class ImportTemplateComponent {
  constructor(readonly router: Router) {}
  navToTemplateList() {
    this.router.navigate(['template', 'list']);
  }
  navToCreateTemplate() {
    this.router.navigate(['template', 'create']);
  }
}
