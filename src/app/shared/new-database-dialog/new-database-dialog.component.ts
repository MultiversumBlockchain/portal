import { Component, OnInit, Inject, ViewChild } from '@angular/core';

import { FactoryService } from '../../services/factory.service';
import { EMTVService } from '../../services/emtv.service';
import { NetworkService } from '../../services/network.service';

import { ConfirmTransactionDialogComponent } from '../confirm-transaction-dialog/confirm-transaction-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

declare let require: any;
declare let window: any;

@Component({
  selector: 'app-new-database-dialog',
  templateUrl: './new-database-dialog.component.html',
  styleUrls: ['./new-database-dialog.component.css']
})
export class NewDatabaseDialogComponent implements OnInit {


  @ViewChild('stepper', {static: true})
  stepper : any;

  allowance : 0;
  approveTransaction : any = null;
  createTransaction : any = null;
  name : string = "";
  step = 0;
  transactionTimer : any = null;
  price = 0;
  priceHumanRedeable = 0;
  db_allowanceHumanReadle = 0;

  constructor(
    public dialogRef: MatDialogRef<NewDatabaseDialogComponent>,
    private factoryService : FactoryService,
    private networkService : NetworkService,
    private eMTVService : EMTVService,
    private matDialog : MatDialog
  ) {

  }

  ngOnInit(): void {
    this.factoryService.getCreateDatabasePrice().then(
      (price) => {
        this.price = price;
        this.priceHumanRedeable = window.web3.utils.fromWei(price, 'ether');
      }
    );

    this.eMTVService.getUserAllowance().then(
      (allowance) => {
        this.allowance = allowance;
        this.db_allowanceHumanReadle = window.web3.utils.fromWei(allowance, 'ether');
      });
  }

  approve() {
    if (this.approveTransaction && this.approveTransaction.blockHash) {
      this.next();
      return;
    }

    this.factoryService.setAllowance(this.price).then(
      (t) => {
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

  create() {
    this.factoryService.createDatabase(this.name).then(
        (t) => {
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

  cancel() {
    this.dialogRef.close();
  }
}
