import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { MyAlgoWallet } from '@randlabs/wallet-myalgo-js';

// algo
const myAlgoWallet = new MyAlgoWallet();
// #algo

@Injectable({
  providedIn: 'root',
})
export class WalletsConnectService {
  constructor(private router: Router) {}
  // algo
  public myAlgoAddress: any | undefined;
  public myAlgoName: any | undefined;
  // #algo

  // algo
  // რჩება
  connectToMyAlgo = async () => {
    try {
      const accounts = await myAlgoWallet.connect();
      this.myAlgoAddress = accounts.map((value) => value.address);
      localStorage.setItem('wallet', this.myAlgoAddress);
      // @ts-ignore
      this.myAlgoName = accounts.map((value) => value.name);
    } catch (err) {
      console.error(err);
    }
  };
  // #algo
}
