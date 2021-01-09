import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseComponent } from './database/database.component';

import { DatabaseRouting } from './databases-routing.module';
import { DatabasesComponent } from './databases.component'
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    DatabaseComponent,
    DatabasesComponent
  ],
  imports: [
    CommonModule,
    DatabaseRouting,
    MatTabsModule,
    MatExpansionModule,
    MatButtonModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
  ]
})
export class DatabasesModule { }
