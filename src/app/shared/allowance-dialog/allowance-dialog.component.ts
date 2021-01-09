import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { EMTVService } from '../../services/emtv.service';
import { DatabaseService } from '../../services/database.service';
import { FactoryService } from '../../services/factory.service';
import { NetworkService } from '../../services/network.service';

declare let require: any;
declare let window: any;

@Component({
  selector: 'app-allowance-dialog',
  templateUrl: './allowance-dialog.component.html',
  styleUrls: ['./allowance-dialog.component.css']
})
export class AllowanceDialogComponent implements OnInit {

  @ViewChild('stepper', {static: true})
  stepper : any;


  approveTransaction : any;
  deleteTransaction : any;

  transactionTimer : any;

  current_allowance : number = 0;

  allowance : number = 0;

  constructor(
    private databaseService : DatabaseService,
    private eMTVService : EMTVService,
    private networkService : NetworkService,
    private dialogRef : MatDialogRef<AllowanceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
      this.databaseService.getAllowance().then(
        (allowance) => {
          this.current_allowance = allowance;
        }
      )
  }

  ngOnInit(): void {

  }

  approve() {
    this.databaseService.setAllowance(this.allowance).then(
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

  cancel() {
    this.dialogRef.close();
  }

  fromWei() {
    console.log("CA: " + this.current_allowance);
    return window.web3.utils.fromWei(""+ this.current_allowance, 'ether');
  }

}
