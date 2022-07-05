import { addrToB64, sendWait, getSuggested, getTransaction, getLogicFromTransaction, getGlobalState, readLocalState, StateToObj, getAlgodClient, getIndexer, isOptedIntoApp, isOptedIntoAsset } from "./algorand"
import {
    get_app_optin_txn,
    get_verse_app_call_txn,
    get_pay_txn,
    encodeParam,
    get_app_closeout_txn,
    get_app_call_txn,
    get_asa_xfer_txn,
    get_asa_optin_txn
} from "./transactions"
import algosdk, { Algodv2, getApplicationAddress, Transaction } from 'algosdk';
import { platform_settings as ps } from "./platform-conf";
import { SessionWallet } from "algorand-session-wallet"
import { Injectable } from "@angular/core";
import { getAppLocalStateByKey } from "../services/utils.algo";

declare const AlgoSigner: any;

@Injectable({
    providedIn: 'root',
  })

export class UpgradeApp {

    constructor(){
    }

    async optInAsset(wallet: SessionWallet, assetId: number): Promise<any> {
        const suggested = await getSuggested(10)
        const addr = wallet.getDefaultAccount()
        const optin = new Transaction(get_asa_optin_txn(suggested, addr, assetId))
        const [signed] = await wallet.signTxn([optin])
        const result = await sendWait([signed])

        return result
    }

    async upgrade(wallet: SessionWallet, assetId: number, higherAssetId: number, rarity: number): Promise<boolean> {
        const suggested = await getSuggested(10)
        const addr = wallet.getDefaultAccount()
        
        let amount = 2
        if(rarity == 2) {
            amount = 3
        }

        const transferTxn = new Transaction(get_asa_xfer_txn(suggested, addr, ps.platform.burn_addr, assetId, amount))

        const pay = new Transaction(get_pay_txn(suggested, addr, ps.platform.fee_addr, ps.platform.flat_upgrade_fee))

        suggested.fee = 2 * algosdk.ALGORAND_MIN_TX_FEE
        suggested.flatFee = true
        const args = [new Uint8Array(Buffer.from("upgrade")), algosdk.encodeUint64(rarity)]
        const assets = [higherAssetId]
        const upgradeTxn = new Transaction(get_app_call_txn(suggested, addr, ps.platform.upgrade_id, args, undefined, assets, undefined))
        
        const grouped = [transferTxn, pay, upgradeTxn]

        algosdk.assignGroupID(grouped)

        const signed = await wallet.signTxn(grouped)
        const result = await sendWait(signed)

        return result
    }
}