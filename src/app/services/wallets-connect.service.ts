
import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
// import algosdk, { Algodv2, Indexer, IntDecoding, BaseHTTPClient, getApplicationAddress, Transaction, waitForConfirmation, TransactionType } from 'algosdk';
// import { getAlgodClient, getAppLocalStateByKey, getTransactionParams, singlePayTxn, waitForTransaction } from './utils.algo';
import {ActivatedRoute, Router} from "@angular/router";
import {SessionWallet} from "algorand-session-wallet";


// const client = getAlgodClient()
// const myAlgoConnect = new MyAlgoConnect();


@Injectable({
  providedIn: 'root'
})
export class WalletsConnectService {

  public sessionWallet: any | undefined;
  public myAlgoAddress: any | undefined;
  public myAlgoName: any | undefined;

  constructor(private router: Router, private route: ActivatedRoute) {
    if (localStorage.getItem('wallet')) {
      sessionStorage.setItem('acct-list', JSON.stringify([localStorage.getItem('wallet')]));
      if (this.sessionWallet === undefined || !this.sessionWallet) {
        this.connectOnDefault('my-algo-connect').then(response => response);
      }
    }
    // console.log(this.route, 'sss')
  }


  connect = async (choice: string) => {
    console.log('choice', choice);
    const sw = new SessionWallet("TestNet", undefined, choice);

    if (!await sw.connect()) return alert("Couldnt connect")

    this.myAlgoAddress = sw.accountList()
    console.log("AlgoAddress: " + this.myAlgoAddress)
    let index = localStorage.getItem('walletIndex');
    let finalIndex = +index!;
    if (localStorage.getItem('walletsOfUser')) {
      localStorage.setItem('wallet', JSON.parse(localStorage.getItem('walletsOfUser')!)[finalIndex]);
    } else {
      localStorage.setItem('wallet', this.myAlgoAddress[finalIndex]);
    }
    this.myAlgoName = this.myAlgoAddress.map((value: { name: any; }) => value.name)

    sw.wallet.defaultAccount = finalIndex;
    const finalSw = sw;
    this.sessionWallet = finalSw!;
    // check
    if (sessionStorage.getItem('acct-list')!.length) {
      let wallets = sessionStorage.getItem('acct-list');
      let fWallets = JSON.parse(wallets!);
      if (!localStorage.getItem('walletsOfUser')) {
        localStorage.setItem('walletsOfUser', sessionStorage.getItem('acct-list')!);
      }
    }
    let parsedWallets = localStorage.getItem('walletsOfUser');

    this.sessionWallet.wallet.accounts = JSON.parse(parsedWallets!);
    // check
    localStorage.setItem('sessionWallet', JSON.stringify(this.sessionWallet));
    // localStorage.setItem('walletsOfUser', JSON.stringify(this.sessionWallet.wallet.accounts));
    console.log(this.sessionWallet, 'esaaa');

    this.router.navigateByUrl('/selection', { skipLocationChange: true }).then(() => {
      this.router.navigate(['selection']);
    });
  }

  connectOnDefault = async (choice: string) => {
    console.log('choice', choice);
    const sw = new SessionWallet("TestNet", undefined, choice);


    if (!await sw.connect()) return alert("Couldnt connect")

    this.myAlgoAddress = sw.accountList()
    console.log("AlgoAddress: " + this.myAlgoAddress)
    let index = localStorage.getItem('walletIndex');
    let finalIndex = +index!;
    if (localStorage.getItem('walletsOfUser')) {
      localStorage.setItem('wallet', JSON.parse(localStorage.getItem('walletsOfUser')!)[finalIndex]);
    } else {
      localStorage.setItem('wallet', this.myAlgoAddress[finalIndex]);
    }
    this.myAlgoName = this.myAlgoAddress.map((value: { name: any; }) => value.name)

    sw.wallet.defaultAccount = finalIndex;
    const finalSw = sw;
    this.sessionWallet = finalSw!;
    let userWallets = localStorage.getItem('walletsOfUser');
    let finalWalletOfUser = JSON.parse(userWallets!);
    this.sessionWallet.wallet.accounts = finalWalletOfUser;
    localStorage.setItem('sessionWallet', JSON.stringify(this.sessionWallet))
    console.log(this.sessionWallet, 'esaaa 22222');
  }


  disconnect(): void{
    localStorage.removeItem('walletIndex');
    localStorage.removeItem('walletsOfUser');
    this.sessionWallet!.disconnect()
    this.sessionWallet = undefined;
    //setConnected(false)
    this.myAlgoAddress = []
    localStorage.setItem('reload', 'true');
    if (localStorage.getItem('reload')) {
      location.reload();
      setTimeout(() => {
        localStorage.removeItem('reload');
      }, 300)
    } else {
      return
    }
  }
}
