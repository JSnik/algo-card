type AlgodConf = {
    server: string
    port: number
    token: string
    network: string
};
type IpfsConf = {
    display: string
    token: string
};
type IndexerConf = {
    server: string
    port: number
    token: string
};
type DevConf = {
    debug_txns: boolean
    accounts: {
        [key: string]: string[]
    }
};
type Platform = {
    burn_addr: string,
    fee_addr: string,
    upgrade_id: number,
    upgrade_addr: string,
    flat_upgrade_fee: number
};
type PlatformConf = {
    domain: string
    algod: AlgodConf
    ipfs: IpfsConf
    indexer: IndexerConf
    explorer: string
    platform: Platform
    dev: DevConf
};

const platform_settings = require("../../environments/config.json") as PlatformConf;


export { platform_settings }
