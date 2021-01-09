import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatabasesComponent } from './databases.component';
import { DatabaseComponent } from './database/database.component';

const databasesRoutes: Routes = [
  {
    path: '',
    component : DatabasesComponent,
    children: [
      {
        path: ':address',
        component: DatabaseComponent,
      },
      {
        path: ':address/t',
        loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule)
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(databasesRoutes)],
  exports: [RouterModule]
})
export class DatabaseRouting {

}
