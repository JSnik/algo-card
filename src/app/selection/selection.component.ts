import { Component, OnInit } from '@angular/core';
import presidents from '../../environments/presidents_local.json'
import { UpgradeApp } from '../blockchain/upgrade_application';
import { WalletsConnectService } from '../services/wallets-connect.service';

export type PresidentInfo = {
  assetIdBase: number,
  holdingBase: number,
  imageBase: string,
  assetIdSilver: number,
  holdingSilver: number,
  imageSilver: string,
  assetIdGold: number,
  holdingGold: number,
  imageGold: string,
  assetIdDiamond: number,
  holdingDiamond: number,
  imageDiamond: string
}

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {
  presidentsArray: PresidentInfo[] = []

  // nonClickable: boolean = true;
  constructor(
    private upgradeApp: UpgradeApp,
    private walletService: WalletsConnectService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.loadPresidents()
  }

  async loadPresidents() {
    this.presidentsArray = []
    let wallet = localStorage.getItem("wallet")//this.walletService.sessionWallet!
    console.log(wallet)
    for(let i = 0; i < presidents.length; i++) {

      this.presidentsArray.push(
        {
          assetIdBase: presidents[i].r0.id,
          holdingBase: await this.upgradeApp.getAssetAmount(wallet!, presidents[i].r0.id),
          imageBase: presidents[i].r0.img,
          assetIdSilver: presidents[i].r1.id,
          holdingSilver: await this.upgradeApp.getAssetAmount(wallet!, presidents[i].r1.id),
          imageSilver: presidents[i].r1.img,
          assetIdGold: presidents[i].r2.id,
          holdingGold: await this.upgradeApp.getAssetAmount(wallet!, presidents[i].r2.id),
          imageGold: presidents[i].r2.img,
          assetIdDiamond: presidents[i].r3.id,
          holdingDiamond: await this.upgradeApp.getAssetAmount(wallet!, presidents[i].r3.id),
          imageDiamond: presidents[i].r3.img,
        }
      )
    }
    console.log(this.presidentsArray)
  }

  storePresident(info: PresidentInfo, rarity: number) {
    console.log("store")
    localStorage.setItem('president', JSON.stringify(info))
    localStorage.setItem('rarity', JSON.stringify(rarity))
  }

}
