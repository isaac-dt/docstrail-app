import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  CoreDefinition,
  CoreDefinitionCategory,
} from 'src/app/generated/types/catalog/core-definition/core-definition.pb';
import { Product } from 'src/app/generated/types/catalog/product/product.pb';
import { Price } from 'src/app/generated/types/shared.pb';

@Component({
  selector: 'app-build-package',
  templateUrl: './build-package.component.html',
  styleUrls: ['./build-package.component.scss'],
})
export class BuildPackageComponent {
  categories = Object.keys(CoreDefinitionCategory)
    .filter((category) => category !== CoreDefinitionCategory.UNRECOGNIZED)
    .map((category) =>
      category === CoreDefinitionCategory.E_GIFT ? 'e gift' : category
    )
    .sort((a: string, b: string) => a.localeCompare(b));

  coreDefinitions = [
    CoreDefinition.fromPartial({
      id: '1',
      name: 'Pencil',
      description:
        'With a long description attached to it a long description attached to it',
      category: CoreDefinitionCategory.OFFICE,
    }),
    CoreDefinition.fromPartial({
      id: '2',
      name: 'Cookies',
      description: 'a description is required',
    }),
    CoreDefinition.fromPartial({
      id: '2',
      name: 'Cookies',
      description: 'a description is required',
    }),
    CoreDefinition.fromPartial({
      id: '2',
      name: 'Cookies',
      description: 'a description is required',
    }),
  ];

  constructor(readonly router: Router) {}
  submitPackageForm() {}
  navToPackageList() {
    this.router.navigate(['package', 'list']);
  }
}
