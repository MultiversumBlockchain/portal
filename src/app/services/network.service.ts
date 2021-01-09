import { Injectable } from '@angular/core';

import { EMTVService } from './emtv.service';

const Web3 = require('web3');

declare let require: any;
declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private account: any = null;
  private readonly web3: any;
  private enable: any;

  constructor(
  ) {
    if (window.ethereum === undefined) {
      alert('Non-Ethereum browser detected. Install MetaMask');
    } else {
      if (typeof window.web3 !== 'undefined') {
        this.web3 = window.web3.currentProvider;
      } else {
        this.web3 = new Web3.providers.HttpProvider('http://localhost:8545');
      }
      window.web3 = new Web3(window.ethereum);
      this.enable = this.enableMetaMaskAccount();

    }
  }

  private async enableMetaMaskAccount(): Promise<any> {
    let enable = false;
    await new Promise((resolve, reject) => {
      enable = window.ethereum.request({ method: 'eth_requestAccounts' }); //ethereum.enable();
    });
    return Promise.resolve(enable);
  }

  public  async getAccount(): Promise<any> {
    if (this.account == null) {
      this.account = await new Promise((resolve, reject) => {
        window.web3.eth.getAccounts((err, retAccount) => {
          if (retAccount.length > 0) {
            this.account = retAccount[0];
            resolve(this.account);
          } else {
            reject('No accounts found.');
          }
          if (err != null) {
            reject('Error retrieving account');
          }
        });
      }) as Promise<any>;
    }
    return Promise.resolve(this.account);
  }

  getTransaction(txHash : string) : Promise<any> {
    return new Promise((resolve, reject) => {
      window.web3.eth.getTransaction(txHash,
        function(err, transaction) {
          if (!err) {
            resolve(transaction);
          } else {
            reject(err);
          }
        });
    }) as Promise<any>;
  }

  getNetworkVersion() : number {
    const account = this.getAccount();
    return parseInt(window.ethereum.networkVersion);
  }
}
