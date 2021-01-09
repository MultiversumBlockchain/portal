import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatIconModule} from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {ScrollingModule} from '@angular/cdk/scrolling';

import { FormsModule } from '@angular/forms';


import { NewDatabaseDialogComponent } from './new-database-dialog/new-database-dialog.component';
import { AllowanceDialogComponent } from './allowance-dialog/allowance-dialog.component';
import { NewTableDialogComponent } from './new-table-dialog/new-table-dialog.component';
import { WrongNetworkDialogComponent } from './wrong-network-dialog/wrong-network-dialog.component';
import { LastTransactionsComponent } from './last-transactions/last-transactions.component';
import { ConfirmTransactionDialogComponent } from './confirm-transaction-dialog/confirm-transaction-dialog.component';
import { AccountChangedDialogComponent } from './account-changed-dialog/account-changed-dialog.component';
import { WizardComponent } from './wizard/wizard.component';
import { InsertRowComponent } from './insert-row/insert-row.component';
import { EditRowComponent } from './edit-row/edit-row.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { DeleteComponent } from './delete/delete.component';

@NgModule({
  declarations: [
    NewDatabaseDialogComponent,
    AllowanceDialogComponent,
    NewTableDialogComponent,
    WrongNetworkDialogComponent,
    LastTransactionsComponent,
    ConfirmTransactionDialogComponent,
    AccountChangedDialogComponent,
    WizardComponent,
    InsertRowComponent,
    EditRowComponent,
    ConfirmComponent,
    DeleteComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    ScrollingModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatExpansionModule,
    MatListModule,
    MatStepperModule,
    MatCardModule,
    MatProgressBarModule,
  ],
  exports : [
    NewDatabaseDialogComponent,
    AllowanceDialogComponent,
    NewTableDialogComponent,
    LastTransactionsComponent,
    WizardComponent,
    InsertRowComponent,
    EditRowComponent,
    ConfirmComponent,
  ],
  entryComponents: [
    NewDatabaseDialogComponent,
    AllowanceDialogComponent,
    NewTableDialogComponent,
    LastTransactionsComponent,
    WizardComponent,
    InsertRowComponent,
    EditRowComponent,
    ConfirmComponent,
  ]
})
export class SharedModule { }
