import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss'],
})
export class TemplatesComponent {
  isSidenavVisible: boolean = false;
  templates = new Array<number>(4);

  constructor(readonly router: Router) {}

  toggleSidenav() {
    this.isSidenavVisible = !this.isSidenavVisible;
  }

  navToCreateTemplate() {
    this.router.navigate(['template', 'create']);
  }
}
