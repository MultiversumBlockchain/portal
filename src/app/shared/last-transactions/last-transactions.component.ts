import { Component, OnInit } from '@angular/core';

import { DatabaseService } from '../../services/database.service';

import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { environment } from '../../../environments/environment';

let window : any;

@Component({
  selector: 'app-last-transactions',
  templateUrl: './last-transactions.component.html',
  styleUrls: ['./last-transactions.component.css']
})
export class LastTransactionsComponent implements OnInit {

  transactions : Array<any> = new Array<any>();

  constructor(
    private bottomSheetRef: MatBottomSheetRef<LastTransactionsComponent>,
    private databaseService : DatabaseService,
  ) {
    // this.databaseService.getLastTransactions().then(
    //   (transactions) => {
    //     this.transactions = transactions;
    //     console.log("EVENTS: " + this.transactions);
    //   });
  }

  ngOnInit(): void {

  }
  
  openLink(event: MouseEvent): void {
   this.bottomSheetRef.dismiss();
   event.preventDefault();
  }

  toEtherScan(hash : string, event: MouseEvent): void {
   this.bottomSheetRef.dismiss();
   event.preventDefault();
    window.open(`${environment.etherscan_url}/${hash}`, '_blank');
  }
}
