import { Component, OnInit } from '@angular/core';
import { UpgradeApp } from '../blockchain/upgrade_application';
import { PresidentInfo } from '../selection/selection.component';
import { WalletsConnectService } from '../services/wallets-connect.service';

@Component({
  selector: 'app-after-selection',
  templateUrl: './after-selection.component.html',
  styleUrls: ['./after-selection.component.scss']
})
export class AfterSelectionComponent implements OnInit {

  presidentInfo: PresidentInfo | undefined
  rarity: number = -1
  constructor(
    private walletService: WalletsConnectService,
    private upgradeApp: UpgradeApp
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('president')){
      this.presidentInfo = JSON.parse(localStorage.getItem('president')!)
      this.rarity = JSON.parse(localStorage.getItem('rarity')!)
    }
    console.log(this.rarity)
    console.log(this.presidentInfo)
  }

  async upgrade(): Promise<void> {
    console.log("upgrade")
    let wallet = this.walletService.sessionWallet
    if(wallet) {
      let assetId = 0
      let higherAssetId = 0
      if(this.rarity == 1) {
        assetId = this.presidentInfo!.assetIdBase
        higherAssetId = this.presidentInfo!.assetIdSilver
      } else if(this.rarity == 2) {
        assetId = this.presidentInfo!.assetIdSilver
        higherAssetId = this.presidentInfo!.assetIdGold
      } else if(this.rarity == 3) {
        assetId = this.presidentInfo!.assetIdGold
        higherAssetId = this.presidentInfo!.assetIdDiamond
      } else {
        console.log("wrong rarity")
        return
      }
      let response = await this.upgradeApp.upgrade(wallet, assetId, higherAssetId, this.rarity)
      if(response) {
        console.log("Successfully upgraded")
      }
    } else {
      console.log("not connected")
    }
  }

  test() {
    console.log("test")
  }

}
