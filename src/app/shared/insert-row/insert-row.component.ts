import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DatabaseService } from '../../services/database.service';
import { FactoryService } from '../../services/factory.service';
import { NetworkService } from '../../services/network.service';

declare let require: any;
declare let window: any;

@Component({
  selector: 'app-insert-row',
  templateUrl: './insert-row.component.html',
  styleUrls: ['./insert-row.component.css']
})
export class InsertRowComponent implements OnInit {

  @ViewChild('stepper', {static: true})
  stepper : any;

  row : Array<any>;
  fields : Array<any>;
  table : any ;

  db_allowance : 0;

  priceInsertInto : 0;
  approveTransaction : any;
  insertTransaction : any;

  priceInsertIntoHumanReadable : number  = 0;
  db_allowanceHumanReadle : number = 0;
  transactionTimer : any;
  step = 0;

  constructor(
    private databaseService : DatabaseService,
    private factoryService : FactoryService,
    private networkService : NetworkService,
    private dialogRef : MatDialogRef<InsertRowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.fields = data.fields;
    this.table = data.table;
    this.row = new Array<any>(this.fields.length);
  }

  ngOnInit(): void {
    this.factoryService.getInsertIntoPrice().then(
      (price) => {
        this.priceInsertInto = price;
        this.priceInsertIntoHumanReadable = window.web3.utils.fromWei(price, 'ether');
      }
    );

    this.databaseService.getAllowance().then(
      (allowance) => {
        this.db_allowance = allowance;
        this.db_allowanceHumanReadle = window.web3.utils.fromWei(allowance, 'ether');
      }
    );
  }

  insert() {
    this.databaseService.insert(this.table, this.row).then(
      (t) => {
        this.transactionTimer = setInterval(() => {
          this.networkService.getTransaction(t).then(
            (transaction) => {
              this.insertTransaction = transaction;

              if (this.insertTransaction.blockHash) {
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

    this.databaseService.setAllowance(this.priceInsertInto).then(
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
