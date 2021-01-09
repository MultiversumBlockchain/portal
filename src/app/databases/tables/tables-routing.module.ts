import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables.component';

const tablesRoutes: Routes = [
  {
    path: ':index',
    component : TablesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(tablesRoutes)],
  exports: [RouterModule]
})
export class TablesRouting {

}
