import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss'],
})
export class PackageComponent {
  readonly packages = new Array(3);
  constructor(readonly router: Router) {}
  navToCreatePackage() {
    this.router.navigate(['package', 'build']);
  }
}
