import { addrToB64, sendWait, getSuggested, getTransaction, getLogicFromTransaction, getGlobalState, readLocalState, StateToObj, getAlgodClient, getIndexer, isOptedIntoApp, isOptedIntoAsset } from "./algorand"
import {
    get_pay_txn,
    get_app_call_txn,
    get_asa_xfer_txn,
    get_asa_optin_txn
} from "./transactions"
import algosdk, { Algodv2, getApplicationAddress, Transaction } from 'algosdk';
import { platform_settings as ps } from "./platform-conf";
import { SessionWallet } from "algorand-session-wallet"
import { Injectable } from "@angular/core";

declare const AlgoSigner: any;

export enum StateKeys {
    asset_count_key = "ac",
    fee1_key = "f1",
    fee2_key = "f2",
    fee3_key = "f3",
    fee_addr_key = "fa",
    burn_addr_key = "ba",
    asset1_key = "1",
    asset2_key = "2",
    asset3_key = "3",
    asset4_key = "4",
    asset5_key = "5",
    asset6_key = "6",
    asset7_key = "7",
    asset8_key = "8",
    asset9_key = "9",
    asset10_key = "10",
    asset11_key = "11",
    asset12_key = "12",
    asset13_key = "13",
    asset14_key = "14",
    asset15_key = "15",
    asset16_key = "16",
    asset17_key = "17",
    asset18_key = "18",
    asset19_key = "19",
    asset20_key = "20",
    asset21_key = "21",
    asset22_key = "22",
    asset23_key = "23",
    asset24_key = "24",
    asset25_key = "25",
    asset26_key = "26",
    asset27_key = "27",
    asset28_key = "28",
    asset29_key = "29",
    asset30_key = "30",
    asset31_key = "31",
    asset32_key = "32",
    asset33_key = "33",
    asset34_key = "34",
    asset35_key = "35",
    asset36_key = "36",
    asset37_key = "37",
    asset38_key = "38",
    asset39_key = "39",
    asset40_key = "40",
    asset41_key = "41",
    asset42_key = "42",
    asset43_key = "43",
    asset44_key = "44",
    asset45_key = "45"
}

@Injectable({
    providedIn: 'root',
  })

export class UpgradeApp {
    async checkOptIn(wallet: SessionWallet, higherAssetId: number): Promise<boolean> {
        let client: Algodv2 = getAlgodClient()
        let addr = wallet.getDefaultAccount()
        let accInfo = await client.accountInformation(addr).do()
        console.log(accInfo)
        let asset = accInfo['assets'].find((element: any) => {return element['asset-id'] == higherAssetId})
        if(asset) {
            return true
        } else {
            return false
        }
    }

    constructor(){
    }

    async getAssetAmount(addr: string, assetId: number): Promise<any> {
        let client: Algodv2 = getAlgodClient()
        let accountInfo = await client.accountInformation(addr).do()
        let holding = 0
        let holdingInfo = accountInfo['assets'].find((asset: any) => {return asset['asset-id'] == assetId})
        if(holdingInfo) {
            holding = holdingInfo['amount']
        }
        return holding
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
        let fee = ps.platform.upgrade_fee1
        if(rarity == 2) {
            amount = 3
            fee = ps.platform.upgrade_fee2
        } else if(rarity == 3) {
            fee = ps.platform.upgrade_fee3
        }

        const transferTxn = new Transaction(get_asa_xfer_txn(suggested, addr, ps.platform.burn_addr, assetId, amount))

        const pay = new Transaction(get_pay_txn(suggested, addr, ps.platform.fee_addr, fee))

        suggested.fee = 2 * algosdk.ALGORAND_MIN_TX_FEE
        suggested.flatFee = true
        const args = [new Uint8Array(Buffer.from("upgrade")), algosdk.encodeUint64(rarity)]
        const assets = [higherAssetId]
        const accounts = [ps.platform.burn_addr]
        const upgradeTxn = new Transaction(get_app_call_txn(suggested, addr, ps.platform.upgrade_id, args, undefined, assets, accounts))
        
        const grouped = [transferTxn, pay, upgradeTxn]

        algosdk.assignGroupID(grouped)

        const signed = await wallet.signTxn(grouped)
        const result = await sendWait(signed)

        return result
    }
}