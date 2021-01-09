import { Injectable } from '@angular/core';
const Web3 = require('web3');

import { environment } from '../../environments/environment';

import { NetworkService } from './network.service';

import { eMTVABI } from '../../assets/ABI/eMTVABI';

declare let require: any;
declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class EMTVService {

  private account: any = null;
  private readonly web3: any;
  private enable: any;
  private eMTVContract : any;
  private networkVersion : 0;

  constructor(
    private networkService : NetworkService,
  ) {

  }

  public async getUserBalance(): Promise<any> {
    const account = await this.networkService.getAccount();
    return new Promise((resolve, reject) => {
      window.web3.eth.getBalance(account, function(err, balance) {
        if (!err) {
          const retVal = {
            account: account,
            balance: window.web3.utils.fromWei(balance, 'ether')
          };
          resolve(retVal);
        } else {
          reject({account: 'error', balance: 0});
        }
      });
    }) as Promise<any>;
  }

  public async getEMTVBalance() : Promise<any> {
    const account = await this.networkService.getAccount();

     return new Promise((resolve, reject) => {
      this.eMTVContract = new window.web3.eth.Contract(eMTVABI, environment.EMTV_ADDRESS);

      this.eMTVContract.methods.balanceOf(account).call(
        function(err, balance) {
          if (!err) {
            const retVal = {
              account: account,
              emtv: window.web3.utils.fromWei(balance, 'ether')
            };
            resolve(retVal);
          } else {
            reject({account: 'error', balance: 0});
          }
        }
      )
    }) as Promise<any>;
    // let price = await this.contract.methods.CreateDatabasePrice().call();
    // price = this.web3.utils.fromWei(price, 'ether');
  }

  public async getUserAllowance(): Promise<any> {
    const account = await this.networkService.getAccount();
    return new Promise((resolve, reject) => {
     this.eMTVContract = new window.web3.eth.Contract(eMTVABI, environment.EMTV_ADDRESS);

     this.eMTVContract.methods.allowance(account, environment.FACTORY_ADDRESS).call(
       function(err, balance) {

         if (!err) {
           const allowance =window.web3.utils.fromWei(balance, 'ether');

           resolve(allowance);
         } else {
           reject(err);
         }
       }
     )
   }) as Promise<any>;
  }

  public async getAllowance(address : string): Promise<any> {
    const account = await this.networkService.getAccount();

    return new Promise((resolve, reject) => {
     this.eMTVContract = new window.web3.eth.Contract(eMTVABI, environment.EMTV_ADDRESS);

     this.eMTVContract.methods.allowance(account, address).call(
       function(err, balance) {

         if (!err) {
           const allowance = window.web3.utils.fromWei(balance, 'ether');

           resolve(allowance);
         } else {
           reject(err);
         }
       }
     )
   }) as Promise<any>;
  }

  public async setAllowance(amount : number) : Promise<any> {
    const account = await this.networkService.getAccount();




     return new Promise((resolve, reject) => {
      this.eMTVContract = new window.web3.eth.Contract(eMTVABI, environment.EMTV_ADDRESS);

      this.eMTVContract.methods.approve(environment.FACTORY_ADDRESS, window.web3.utils.toWei(`${amount}`, 'ether')).send({ from: account },
        function(err, transaction) {
          if (!err) {
            resolve(transaction);
          } else {
            reject(transaction);
          }
        }
      )
    }) as Promise<any>;
  }

  public async setDatabaseAllowance(address : string, amount : number) : Promise<any> {
    const account = await this.networkService.getAccount();

     return new Promise((resolve, reject) => {
      this.eMTVContract.methods.approve(address, window.web3.utils.toWei(`${amount}`, 'ether')).send({ from: account },
        function(err, transaction) {
          if (!err) {
            resolve(transaction);
          } else {
            reject(transaction);
          }
        }
      )
    }) as Promise<any>;
  }
}
