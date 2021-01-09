import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { NewDatabaseDialogComponent } from './shared/new-database-dialog/new-database-dialog.component';
import { AccountChangedDialogComponent } from './shared/account-changed-dialog/account-changed-dialog.component';
import { WrongNetworkDialogComponent } from './shared/wrong-network-dialog/wrong-network-dialog.component';
import { ConfirmTransactionDialogComponent } from './shared/confirm-transaction-dialog/confirm-transaction-dialog.component';
import { WizardComponent } from './shared/wizard/wizard.component';
import { LastTransactionsComponent } from './shared/last-transactions/last-transactions.component';

import { FormControl } from '@angular/forms';


import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { EMTVService } from './services/emtv.service';
import { FactoryService } from './services/factory.service';
import { NetworkService } from './services/network.service';
import { DatabaseService } from './services/database.service';


import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {BehaviorSubject} from 'rxjs';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';

import { environment } from '../environments/environment';

declare let window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  user = {
    balance : 0,
    account : "",
    address : "",
    eth : 0,
    eMTV : 0,
    allowance : 0,
  };

  displayedColumns: string[] = ['index', 'name'];

  tables = new Array<any>();
  columns = new Array<any>();
  databases = new Array<any>();
  database : any = null;
  networkVersion : number = 0;

  treeControl = new NestedTreeControl<any>(node => node.children);
  dataSource = new MatTreeNestedDataSource<any>();

  constructor(
    private bottomSheet: MatBottomSheet,
    private eMTVService : EMTVService,
    private factoryService : FactoryService,
    private networkService : NetworkService,
    private databaseService : DatabaseService,
    private dialog: MatDialog,
    private router: Router,
  ) {


  }

  ngOnInit() {
    // const that = this;
    // window.ethereum.on('accountsChanged', function (accounts) {
    //   const dialogRef = that.dialog.open(AccountChangedDialogComponent, {
    //     width: '400px',
    //     height: '300px',
    //     disableClose: true,
    //   });
    // })

    // console.log(`networkVersion:` + this.getNetworkVersion() + "->" + typeof(this.getNetworkVersion()));

    if (this.getNetworkVersion() === environment.REQUIRED_NETWORK) {
      this.getAccountAndBalance();
      this.getEMTVBalance();

      this.getNetworkVersion();
      this.fetchDatabases();
    } else {
      const dialogRef = this.dialog.open(WrongNetworkDialogComponent, {
        width: '400px',
        height: '300px',
      //  disableClose: true,
      });
    }
  }


  hasChild = (_: number, node: any) => {
    return !!node.children && node.children.length > 0;
  };

  // @HostListener('mousemove', ['$event']) onMouseMove(event) {
  //   console.log(event.clientX, event.clientY);
  // }

  fetchDatabases() {
    this.factoryService.fetchDatabases().then(
      (databases) => {
        this.databases = databases;

        for (let d of databases) {
          d.children = [];
        }

        this.dataSource.data = this.databases;
      }
    )
  }

  fetchBalances() {
    this.getAccountAndBalance();
    this.getEMTVBalance();
  }

  getNetworkVersion() {
    return  this.networkVersion = this.networkService.getNetworkVersion();
  }

  newDatabase(): void {
     const dialogRef = this.dialog.open(NewDatabaseDialogComponent, {
       width: '640px',
       height: '480px',
       disableClose: true,
     });

     dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.fetchDatabases();
        }
     });
  }

  toEtherScan(address : string) {
    window.open(`${environment.etherscan_url}/${address}`, '_blank');
  }

  fetchDatabaseTable(database : any) {
    this.databaseService.setDatabase(database.address);

    this.databaseService.fetchTables().then(
      (tables) => {
        database.children = tables;
        this.dataSource.data = null;
        this.dataSource.data = this.databases;
      }
    );
  }



  help(): void {
     const dialogRef = this.dialog.open(WizardComponent, {
       width: '800px',
       height: '600px',
     });
  }

  getEMTVBalance = () => {
    const that = this;

    this.eMTVService.getEMTVBalance().then(
      function(retAccount: any) {
        that.user.address = retAccount.account;
        that.user.eMTV = retAccount.emtv;
    }).catch(function(error) {
      console.log(error);
    });
  }

  getAccountAndBalance = () => {
    const that = this;
    this.eMTVService.getUserBalance().
    then(function(retAccount: any) {
      that.user.address = retAccount.account;
      that.user.eth = retAccount.balance;
    }).catch(function(error) {
      console.log(error);
    });
  }

  // fetchTableColumns(index : number) {
  //   this.databaseService.fetchTableColumns(window.web3.utils.toHex(index)).then(
  //     (columns) => {
  //       this.columns = columns;
  //     }
  //   );
  // }

  dropTable(index : number) {
      this.databaseService.dropTable(window.web3.utils.toHex(index)).then(
        (response) => {
          this.fetchDatabaseTable(this.database);
        }
      );
  }

  getNetworkName() {
    return environment.NETWORKS[this.networkService.getNetworkVersion()];
  }

  getEmtvToken() {
    window.open(`${environment.faucet_url}`, '_blank');
  }

  open(node: any){
    if (node.type == 'database') {
      this.router.navigate([`/databases/${node.address}`]);
    } else if (node.type == 'table') {
      this.router.navigate([`/databases/${node.database}/t/${node.index}`]);
    }
  }


}
