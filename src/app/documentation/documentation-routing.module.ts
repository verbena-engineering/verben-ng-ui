import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentationComponent } from './documentation.component';

const routes: Routes = [
  { path: '', component: DocumentationComponent },
  {
    path: 'data-table',
    loadChildren: () =>
      import('./data-table/data-table.module').then((m) => m.DataTableModule),
  },
  {
    path: 'verbena-component',
    loadChildren: () =>
      import('./verbena-component/verbena-component.module').then((m) => m.VerbenaComponentModule),
  },
  {

    path: 'dropdown',
    loadChildren: () =>
      import('./dropdown-sample/dropdown-sample.module').then(
        (m) => m.DropdownSampleModule
      ),
  },
  {
    path: 'chip',
    loadChildren: () =>
      import('./chip/chip.module').then((m) => m.ChipExampleModule),

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentationRoutingModule {}
