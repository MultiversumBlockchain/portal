import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { DatabaseService } from '../../services/database.service';

import { InsertRowComponent } from '../../shared/insert-row/insert-row.component';
import { EditRowComponent } from '../../shared/edit-row/edit-row.component';
import { DeleteComponent } from '../../shared/delete/delete.component';

declare let require: any;
declare let window : any;

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  displayedColumns : Array<string> = [ 'index', 'name'];
  dataColumns : Array<string> = [];

  name : string = "";
  index : number = 0;

  fields : Array<any> = new Array<any>();

  data: Array<string> = new Array<string>();
  rows: Array<any> = new Array<any>();

  counter : Number = 0;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private databaseService : DatabaseService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {

      this.index = parseInt(params['index']);
      this.databaseService.setDatabase(params['address']);

      this.fetchTableColumns();
    });
  }

  fetchTableColumns() {
    this.route.params.subscribe((params) => {
      this.databaseService.fetchTableColumns(this.index).then(
        (fields) => {
          this.fields = fields;
        }
      )
    });
  }

  loadData($event) {

    switch($event.index) {
      case 0:
        this.fetchTableColumns();
      break;
      case 1:
      this.databaseService.rowsTableCount(this.index).then(
        (counter) => {
          if (counter > 0)
            this.fetchTableData();
        }
      );
      break;
    }
  }

  fetchTableData() {
    this.databaseService.selectAll(this.index, 0, 50).then(
      (results) => {

        this.dataColumns = new Array<string>();
        this.dataColumns.push("index");

        for (let field of this.fields) {
          this.dataColumns.push(field.name);
        }

        this.dataColumns.push("actions");

        this.rows = new Array<any>();

        for(let i = 0; i < results.length; i++) {
          let row = {
            index : i
          };

          if (results[i].length > 0) {
            for (let field of this.fields) {
              if(typeof results[i][field.index] === 'undefined')
                row[field.name] = "";
              else
                if (results[i][field.index].length > 0)
                  row[field.name] = results[i][field.index];
                else
                  row[field.name] = ""
            }

            this.rows.push(row);
          }
        }
      }
    );

    this.databaseService.rowsTableCount(this.index).then(
      (results) => {
        debugger;
        this.counter = results;
      }
    );

  }

  insert() {
    const dialogRef = this.dialog.open(InsertRowComponent, {
      width: '800px',
      height: '480px',
      disableClose: true,
      data : {
        fields : this.fields,
        table : this.index
      }
    });

    dialogRef.afterClosed().subscribe(result => {
       this.fetchTableData();
    });
  }

  edit(row : any) {
    const dialogRef = this.dialog.open(EditRowComponent, {
      width: '800px',
      height: '480px',
      disableClose: true,
      data : {
        fields : this.fields,
        table : this.index,
        row : row,
        columns : this.dataColumns,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
       this.fetchTableData();
    });
  }

  delete(row : any) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '800px',
      height: '480px',
      disableClose: true,
      data : {
        table : this.index,
        row : row,
        columns : this.dataColumns,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
       this.fetchTableData();
    });
  }


  trackByFn(index, item) {
    return index;
  }
}
