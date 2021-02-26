import { Injectable } from '@angular/core';

import { DatabaseABI } from '../../assets/ABI/DatabaseABI';

import { EMTVService } from './emtv.service';
import { NetworkService } from './network.service';

import { environment } from '../../environments/environment';

const Web3 = require('web3');

declare let require: any;
declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private account: any = null;
  private readonly web3: any;

  private db_address : any = null;
  private databaseContract;

  constructor(
    private networkService : NetworkService,
    private eMTVService : EMTVService
  ) {

  }

  setDatabase(db_address : any) {
    this.db_address = db_address;
    this.databaseContract = new window.web3.eth.Contract(DatabaseABI, this.db_address);
  }

  public async fetchTables() : Promise<any> {
    const that = this;
    return new Promise((resolve, reject) => {

      this.databaseContract.methods.showTables().call(
        function(err, data) {
            let tables = new Array<any>();

            for (let i = 0; i < data.length; i+=2) {
              tables.push({
                  name : window.web3.utils.hexToUtf8(data[i+1]),
                  index : window.web3.utils.hexToNumber(data[i]),
                  type : 'table',
                  database : that.db_address,
              });
            }

          if (!err) {
            resolve(tables);
          } else {
            reject(err);
          }
      });
    }) as Promise<any>;
  }

  public async fetchTableColumns(table : number) : Promise<any> {

    return new Promise((resolve, reject) => {

      this.databaseContract.methods.desc(table).call(
        function(err, data) {
            let columns = new Array<any>();

            for (let i = 0; i < data.length; i+=2) {
              columns.push({
                name : window.web3.utils.hexToUtf8(data[i+1]),
                index : window.web3.utils.hexToNumber(data[i])
              });
            }

          if (!err) {
            resolve(columns);
          } else {
            reject(err);
          }
      });
    }) as Promise<any>;
  }

  public async selectAll(index: number, offset: number, limit: number) : Promise<any> {
    return new Promise((resolve, reject) => {

      this.databaseContract.methods.selectAll(index, offset, limit).call(
        function(err, raw) {

          if (!err) {
            resolve(raw);
          } else {
            reject(err);
          }
      });
    }) as Promise<any>;
  }

  public async rowsTableCount(index: number) : Promise<any> {
    return new Promise((resolve, reject) => {

      this.databaseContract.methods.rowsCount(index).call(
        function(err, raw) {

          if (!err) {
            resolve(raw);
          } else {
            reject(err);
          }
      });
    }) as Promise<any>;
  }

  public async createTable(name : string, columns : Array<string>) : Promise<any> {
    const account = await this.networkService.getAccount();

    return new Promise((resolve, reject) => {

      let cls = new Array<any>();
      let i = 0;

      for (let i = 0; i < columns.length; i++) {
        cls.push(window.web3.utils.padLeft(window.web3.utils.numberToHex(i), 64, '0'))
        cls.push(window.web3.utils.toHex(columns[i]));
      }

      this.databaseContract.methods.createTable(window.web3.utils.toHex(name), cls).
        send({ from: account },
        function(err, data) {
          if (!err) {
            resolve(data);
          } else {
            reject(err);
          }
      });
    }) as Promise<any>;
  }

  public async insert(index : number, data : Array<any>) : Promise<any> {
    const account = await this.networkService.getAccount();

    let values = new Array<string>();

    for (let i = 0; i < data.length; i++) {
      values.push(data[i]);
    }

    return new Promise((resolve, reject) => {
      this.databaseContract.methods.insert(window.web3.utils.toHex(index), values).send({ from: account },
        function(err, data) {
          if (!err) {
            resolve(data);
          } else {
            reject(err);
          }
      });
    }) as Promise<any>;
  }

  public async updateRow(table : number, row: number, columns : Array<number>, data : Array<any>) : Promise<any> {
    const account = await this.networkService.getAccount();


    console.log(columns);

    let values = new Array<string>();

    for (let i = 0; i < data.length; i++) {
      values.push(data[i]);
    }

    for (let i = 0; i < columns.length; i++) {
      columns[i] = window.web3.utils.toHex(columns[i]);
    }

    return new Promise((resolve, reject) => {

      this.databaseContract.methods.updateDirect(window.web3.utils.toHex(table), window.web3.utils.toHex(row), columns, values).send({ from: account },
        function(err, data) {
          if (!err) {
            resolve(data);
          } else {
            reject(err);
          }
      });
    }) as Promise<any>;
  }


  public async dropTable(index : number) : Promise<any> {
    const account = await this.networkService.getAccount();

    return new Promise((resolve, reject) => {

      this.databaseContract.methods.dropTable(window.web3.utils.toHex(index)).send({ from: account },
        function(err, data) {
          if (!err) {
            resolve(data);
          } else {
            reject(err);
          }
      });
    }) as Promise<any>;
  }

  public async deleteRow(table : number, index: number) : Promise<any> {
    const account = await this.networkService.getAccount();

    return new Promise((resolve, reject) => {

      this.databaseContract.methods.deleteDirect(
        window.web3.utils.toHex(table),
        window.web3.utils.toHex(index)).send({ from: account },
        function(err, data) {
          if (!err) {
            resolve(data);
          } else {
            reject(err);
          }
      });
    }) as Promise<any>;
  }

  public getCurrentDatabase() {
    return this.db_address;
  }

  public setAllowance(amount : number) : Promise<any> {
    return this.eMTVService.setDatabaseAllowance(this.db_address, amount);
  }

  public getAllowance() : Promise<any> {
    return this.eMTVService.getAllowance(this.db_address);
  }
}
