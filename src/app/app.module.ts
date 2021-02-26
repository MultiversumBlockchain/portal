import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InjectionToken } from '@angular/core';

import { EMTVService} from './services/emtv.service';
import { NetworkService} from './services/network.service';
import { FactoryService} from './services/factory.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { MatIconModule} from '@angular/material/icon';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatTreeModule } from '@angular/material/tree';

import { CommonModule } from '@angular/common';

import { SharedModule } from './shared/shared.module';
import { DatabasesModule } from './databases/databases.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatTreeModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatTooltipModule,
    MatExpansionModule,
    MatToolbarModule,
    MatListModule,
    MatBottomSheetModule,

    SharedModule,
    DatabasesModule,
  ],
  providers: [
    { provide: Window, useValue: window },
    EMTVService,
    FactoryService,
    NetworkService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
