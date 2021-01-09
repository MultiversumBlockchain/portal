import { Injectable } from '@angular/core';
const Web3 = require('web3');

import { environment } from '../../environments/environment';

import { FactoryABI } from '../../assets/ABI/factoryABI';

import { EMTVService } from './emtv.service';
import { NetworkService } from './network.service';

declare let require: any;
declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class FactoryService {

  private account: any = null;
  private readonly web3: any;
  private enable: any;
  private eMTVContract : any;

  constructor(
    private networkService : NetworkService,
    private eMTVService : EMTVService
  ) {
    this.eMTVContract = new window.web3.eth.Contract(FactoryABI, environment.FACTORY_ADDRESS);
  }

  public async createDatabase(name : string) : Promise<any> {
    const account = await this.networkService.getAccount();
    return new Promise((resolve, reject) => {

      this.eMTVContract.methods.create(window.web3.utils.toHex(name)).send({ from: account },
        function(err, transaction) {
        if (!err) {
          resolve(transaction);
        } else {
          reject(transaction);
        }
      });
    }) as Promise<any>;
  }

  public async fetchDatabases() : Promise<any> {
    const account = await this.networkService.getAccount();
    return new Promise((resolve, reject) => {

      this.eMTVContract.methods.databases(account).call(
        function(err, databases) {
          const _addresses =databases['_addresses'];
          const _names = databases['_names'];

          let newDatabases = new Array<any>();

          for (let i = 0; i < _addresses.length; i++) {
            let name = window.web3.utils.hexToUtf8(_names[i]);
            if (!name) {
              name = _addresses[i];
            }

            newDatabases.push({ address: _addresses[i], name: name, type: 'database' });
          }
        if (!err) {
          resolve(newDatabases);
        } else {
          reject(err);
        }
      });
    }) as Promise<any>;
  }


  getCreateDatabasePrice () : Promise<any> {
    return new Promise((resolve, reject) => {

      this.eMTVContract.methods.CreateDatabasePrice().call(
        function(err, price) {

        if (!err) {
          resolve(price);
        } else {
          reject(err);
        }
      });
    }) as Promise<any>;
  }

  getCreateTablePrice () : Promise<any> {
    return new Promise((resolve, reject) => {
      this.eMTVContract.methods.CreateTablePrice().call(
        function(err, price) {
        if (!err) {
          resolve(price);
        } else {
          reject(err);
        }
      });
    }) as Promise<any>;
  }

  getInsertIntoPrice () : Promise<any> {
    return new Promise((resolve, reject) => {
      this.eMTVContract.methods.InsertIntoPrice().call(
        function(err, price) {
        if (!err) {
          resolve(price);
        } else {
          reject(err);
        }
      });
    }) as Promise<any>;
  }

  getDeletePrice () : Promise<any> {
    return new Promise((resolve, reject) => {
      this.eMTVContract.methods.DeleteFromPrice().call(
        function(err, price) {
        if (!err) {
          resolve(price);
        } else {
          reject(err);
        }
      });
    }) as Promise<any>;
  }

  getUpdatePrice () : Promise<any> {
    return new Promise((resolve, reject) => {
      this.eMTVContract.methods.UpdatePrice().call(
        function(err, price) {
        if (!err) {
          resolve(price);
        } else {
          reject(err);
        }
      });
    }) as Promise<any>;
  }


  public setAllowance(amount : number) : Promise<any> {
    return this.eMTVService.setDatabaseAllowance(environment.FACTORY_ADDRESS, amount);
  }
}
