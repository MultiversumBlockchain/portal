import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DatabaseService } from '../../services/database.service';
import { FactoryService } from '../../services/factory.service';
import { NetworkService } from '../../services/network.service';


declare let require: any;
declare let window: any;

@Component({
  selector: 'app-new-table-dialog',
  templateUrl: './new-table-dialog.component.html',
  styleUrls: ['./new-table-dialog.component.css']
})
export class NewTableDialogComponent implements OnInit {

  @ViewChild('stepper', {static: true})
  stepper : any;

  name : string = "";
  fields : Array<string> = new Array<string>();
  approveTransaction : any = null;
  createTransaction : any = null;
  transactionTimer : any = null;

  database : any = null;
  allowance : number = 0;
  db_allowanceHumanReadle : number = 0;
  priceCreateTable : number = 0;
  priceCreateTableHumanReadable : number = 0;

  constructor(
    private databaseService : DatabaseService,
    private factoryService : FactoryService,
    private networkService : NetworkService,
    private dialogRef : MatDialogRef<NewTableDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.database = data.database;
  }

  ngOnInit(): void {
    this.factoryService.getCreateTablePrice().then(
      (price) => {
        this.priceCreateTable = price;
        this.priceCreateTableHumanReadable = price / 1e18;

      }
    );
    this.databaseService.getAllowance().then(
      (allowance) => {
        this.db_allowanceHumanReadle = allowance;
      }
    );
  }

  create() {
    this.databaseService.createTable(this.name, this.fields).then(
      (t) => {
        this.createTransaction = t;
        this.transactionTimer = setInterval(() => {
          this.networkService.getTransaction(t).then(
            (transaction) => {
              this.createTransaction = transaction;
              if (this.createTransaction.blockHash) {
                  clearInterval(this.transactionTimer);
              }
            }
          );
        },1000);
      }
    );
  }

  approve() {
    if (this.approveTransaction && this.approveTransaction.blockHash) {
      this.next();
      return;
    }

    this.databaseService.setAllowance(this.priceCreateTable).then(
      (t) => {
        this.approveTransaction = t;
        this.transactionTimer = setInterval(() => {
          this.networkService.getTransaction(t).then(
            (transaction) => {
              this.approveTransaction = transaction;

              if (this.approveTransaction.blockHash) {
                  clearInterval(this.transactionTimer);
                  this.next();
              }
            }
          );
        },1000);
      }
    )
  }

  addField() {
    this.fields.push("");
  }

  remove (i : number) {

    this.fields.splice(i,1);
  }

  trackByFn(index, item) {
    return index;
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

  toEtherScan(hash : string) {
    window.open(`https://ropsten.etherscan.io/tx/${hash}`, '_blank');
  }
}
