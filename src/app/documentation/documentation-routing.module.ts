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
    {
    path: 'card-data-view',
    loadChildren: () =>
      import('../views/card-data-view/cdv.module').then((m)=>m.CDVModule),
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentationRoutingModule {}
