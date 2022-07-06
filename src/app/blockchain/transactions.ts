import algosdk from 'algosdk'  
import { platform_settings as ps } from './platform-conf'


// @ts-ignore
export function get_asa_optin_txn(suggestedParams, addr, id) {
    return get_asa_xfer_txn(suggestedParams, addr, addr, id, 0)
}

// @ts-ignore
export function get_asa_xfer_txn(suggestedParams, from, to, id, amt) {
    return {
        from: from,
        to: to,
        assetIndex: id,
        type: 'axfer',
        amount: amt,
        ...suggestedParams
    }
}

// @ts-ignore
export function get_pay_txn(suggestedParams, addr, to, amount) {
    return {
        from: addr,
        to: to,
        amount: amount,
        type: 'pay',
        ...suggestedParams
    }
}

// @ts-ignore
export function get_app_optin_txn(suggestedParams, addr, id, apps?) {
    return {
        from: addr,
        appIndex:id,
        type: 'appl',
        appOnComplete: algosdk.OnApplicationComplete.OptInOC,
        appForeignApps: apps,
        ...suggestedParams
    }
}

// @ts-ignore
export function get_app_closeout_txn(suggestedParams, addr, id) {
    return {
        from: addr,
        appIndex:id,
        type: 'appl',
        appOnComplete: algosdk.OnApplicationComplete.CloseOutOC,
        ...suggestedParams
    }
}

// @ts-ignore
export function get_app_call_txn(suggestedParams, addr, app_id, args, apps, assets, accounts) {
    return {
        from: addr,
        appArgs: args,
        appIndex: app_id,
        appOnComplete: algosdk.OnApplicationComplete.NoOpOC,
        type: "appl",
        appForeignAssets: assets,
        appForeignApps: apps,
        appAccounts: accounts,
        ...suggestedParams
    }
}

