import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { NewTableDialogComponent } from '../../shared/new-table-dialog/new-table-dialog.component';
import { AllowanceDialogComponent } from '../../shared/allowance-dialog/allowance-dialog.component';

import { DatabaseService } from '../../services/database.service';
import { switchMap } from 'rxjs/operators';

declare let require: any;
declare let window: any;


@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent implements OnInit {

  displayedTableColumns = ['index', 'name', 'records', 'action'];

  tables : Array<any> = new Array<any>();

  database : any = {
    name : "",
    address : "",
  }

  db_allowance : string = "";

  constructor(
    private route: ActivatedRoute,
    private databaseService : DatabaseService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.database.address = params['address'];
      this.databaseService.setDatabase(params['address']);
      this.loadDatabaseInfo();
    });
  }

  loadDatabaseInfo() {
    this.databaseService.fetchTables().then(
      (tables) => {
        this.tables = tables;
      }
    )

    this.databaseService.getAllowance().then(
      (allowance) => {
        this.db_allowance = "" + allowance;
      }
    );
  }

  getTableRows(index : number){
    return "unkwon";
    //this.databasesService.rowsTableCount(index);
  }

  newTable(): void {
     const dialogRef = this.dialog.open(NewTableDialogComponent, {
       width: '800px',
       height: '600px',
       disableClose: true,
       data: { database: this.database }
     });

     dialogRef.afterClosed().subscribe(result => {
       this.databaseService.fetchTables().then(
         (tables) => {
           this.tables = tables;
         }
       );
     });
  }

  setDatabaseAllowance() {
    const dialogRef = this.dialog.open(AllowanceDialogComponent, {
      width: '480px',
      height: '360px',
      disableClose: true,
      data: { database: this.database }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadDatabaseInfo();
    });
  }

  toHumanReadable(amount : number) {
    return window.web3.utils.fromWei(amount, 'ether');
  }
}
