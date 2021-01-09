import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DatabaseService } from '../../services/database.service';
import { FactoryService } from '../../services/factory.service';
import { NetworkService } from '../../services/network.service';

declare let require: any;
declare let window: any;

@Component({
  selector: 'app-insert-row',
  templateUrl: './edit-row.component.html',
  styleUrls: ['./edit-row.component.css']
})
export class EditRowComponent implements OnInit {

  @ViewChild('stepper', {static: true})
  stepper : any;

  row : Array<any>;

  fields : Array<any>;
  table : any ;

  row_index : number;

  db_allowance : 0;

  priceUpdate : 0;

  approveTransaction : any;
  updateTransaction : any;

  priceUpdateHumanReadable : number  = 0;
  db_allowanceHumanReadle : number = 0;
  transactionTimer : any;

  constructor(
    private databaseService : DatabaseService,
    private factoryService : FactoryService,
    private networkService : NetworkService,
    private dialogRef : MatDialogRef<EditRowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.fields = data.fields;
    this.table = data.table;
    this.row = data.row;
    this.row_index = data.row['index'];

    let d = new Array();

    for (let f of data.fields) {
      d.push(data.row[f.name]);
    }

    this.row = d;
  }

  ngOnInit(): void {
    this.factoryService.getUpdatePrice().then(
      (price) => {
        this.priceUpdate = price;
        this.priceUpdateHumanReadable = window.web3.utils.fromWei(price, 'ether');
      }
    );

    this.databaseService.getAllowance().then(
      (allowance) => {
        this.db_allowance = allowance;
        this.db_allowanceHumanReadle = window.web3.utils.fromWei(allowance, 'ether');
      }
    );
  }

  update() {
    let c = new Array<number>();

    for (let i = 0; i < this.row.length; i++) {
      c.push(i);
    }

    this.databaseService.updateRow(this.table, this.row_index, c, this.row).then(
      (t) => {
        this.transactionTimer = setInterval(() => {
          this.networkService.getTransaction(t).then(
            (transaction) => {
              this.updateTransaction = transaction;

              if (this.updateTransaction.blockHash) {
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

    this.databaseService.setAllowance(this.priceUpdate).then(
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
