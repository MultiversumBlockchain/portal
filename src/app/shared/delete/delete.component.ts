import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DatabaseService } from '../../services/database.service';
import { FactoryService } from '../../services/factory.service';
import { NetworkService } from '../../services/network.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  @ViewChild('stepper', {static: true})
  stepper : any;

  row : Array<any> = new Array<any>();

  table : any;

  deletePrice : 0;
  approveTransaction : any;
  deleteTransaction : any;

  transactionTimer : any;
  step = 0;

  db_allowance : 0;

  headerColumns : Array<string> = [];

  constructor(
    private databaseService : DatabaseService,
    private factoryService : FactoryService,
    private networkService : NetworkService,
    private dialogRef : MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.table = data.table;
    this.headerColumns = data.columns;
    this.row = [data.row];
  }

  ngOnInit(): void {
    this.factoryService.getDeletePrice().then(
      (price) => {
        this.deletePrice = price;
      }
    );
  }

  delete() {
    this.databaseService.deleteRow(this.table, this.row[0].index).then(
      (t) => {
        this.deleteTransaction = t;
        this.transactionTimer = setInterval(() => {
          this.networkService.getTransaction(t).then(
            (transaction) => {
              this.deleteTransaction = transaction;

              if (this.deleteTransaction.blockHash) {
                  clearInterval(this.transactionTimer);
              }
            }
          );
        },1000);
      }
    )
  }

  approve() {
    this.databaseService.setAllowance(this.deletePrice).then(
      (t) => {
        this.approveTransaction = t;
        this.transactionTimer = setInterval(() => {
          this.networkService.getTransaction(t).then(
            (transaction) => {
              this.approveTransaction = transaction;

              if (this.approveTransaction.blockHash) {
                  clearInterval(this.transactionTimer);
                  // this.next();
              }
            }
          );
        },1000);
      }
    )
  }

  next() {
    this.stepper.next();
  }

  previous() {
    this.stepper.previous();
  }

  cancel() {
    this.dialogRef.close();
  }

  trackByFn(index, item) {
    return index;
  }
}
