import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { NetworkService } from '../../services/network.service';

@Component({
  selector: 'app-confirm-transaction-dialog',
  templateUrl: './confirm-transaction-dialog.component.html',
  styleUrls: ['./confirm-transaction-dialog.component.css']
})
export class ConfirmTransactionDialogComponent implements OnInit {

  txHash = "";
  transaction :any = {};

  timer : any = null;

  constructor(
    private matDialog : MatDialog,
    private networkService : NetworkService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.txHash = data.txHash
  }

  ngOnInit(): void {

    this.timer = setInterval(() => {
      this.networkService.getTransaction(this.txHash).then(
        (transaction) => {
          this.transaction = transaction;
          if (this.transaction.blockHash) {
              clearInterval(this.timer);
          }
        }
      );
    },1000);
  }

  close() {
    
  }
}
