import {Component, DoCheck, OnInit} from '@angular/core';
import { UpgradeApp } from '../blockchain/upgrade_application';
import { PresidentInfo } from '../selection/selection.component';
import { WalletsConnectService } from '../services/wallets-connect.service';

@Component({
  selector: 'app-after-selection',
  templateUrl: './after-selection.component.html',
  styleUrls: ['./after-selection.component.scss']
})
export class AfterSelectionComponent implements OnInit, DoCheck {
  finalStepApi: boolean = false;
  isFailed: boolean = false;
  isPending: boolean = false;

  closePopup: any;
  isOptedIn = false
  presidentInfo: PresidentInfo | undefined
  presidentNumber: number = 0
  rarity: number = -1
  assetId: number = 0
  higherAssetId: number = 0
  constructor(
    private walletService: WalletsConnectService,
    private upgradeApp: UpgradeApp,
  ) { }

  ngDoCheck() {
    if(localStorage.getItem('sendWaitSuccess') === 'pending') {
      this.closePopup = true;
      this.isPending = true;
      this.isFailed = false;
      this.finalStepApi = false;
    } else if (localStorage.getItem('sendWaitSuccess') === 'fail') {
      this.closePopup = true;
      this.isFailed = true;
      this.finalStepApi = false;
      this.isPending = false;
    } else if (localStorage.getItem('sendWaitSuccess') === 'success') {
      this.closePopup = true;
      this.finalStepApi = true;
      this.isFailed = false;
      this.isPending = false;
    }

  }

  closePopUp($event: boolean) {
    this.closePopup = $event;
  }

  async ngOnInit(): Promise<void> {
    if(localStorage.getItem('president')){
      this.presidentInfo = JSON.parse(localStorage.getItem('president')!)
      this.rarity = JSON.parse(localStorage.getItem('rarity')!)
      this.presidentNumber = JSON.parse(localStorage.getItem('number')!)
    }
    console.log(this.rarity)
    console.log(this.presidentInfo)
    let wallet = this.walletService.sessionWallet
    if(wallet) {
      if(this.rarity == 1) {
        this.assetId = this.presidentInfo!.assetIdBase
        this.higherAssetId = this.presidentInfo!.assetIdSilver
      } else if(this.rarity == 2) {
        this.assetId = this.presidentInfo!.assetIdSilver
        this.higherAssetId = this.presidentInfo!.assetIdGold
      } else if(this.rarity == 3) {
        this.assetId = this.presidentInfo!.assetIdGold
        this.higherAssetId = this.presidentInfo!.assetIdDiamond
      }
      this.isOptedIn = await this.upgradeApp.checkOptIn(wallet, this.higherAssetId)
      console.log(this.isOptedIn)
    }

  }

  async upgrade(): Promise<void> {
    console.log("upgrade")
    let wallet = this.walletService.sessionWallet
    if(wallet) {
      console.log(this.rarity)
      console.log(this.assetId)
      console.log(this.higherAssetId)
      let response = await this.upgradeApp.upgrade(wallet, this.assetId, this.higherAssetId, this.rarity, this.presidentNumber)
      if(response) {
        if(this.rarity == 1) {
          this.presidentInfo!.holdingBase -= 2
          this.presidentInfo!.holdingSilver += 1
        } else if(this.rarity == 2) {
          this.presidentInfo!.holdingSilver -= 3
          this.presidentInfo!.holdingGold += 1
        } else if(this.rarity == 3) {
          this.presidentInfo!.holdingGold -= 2
          this.presidentInfo!.holdingDiamond += 1
        }
        console.log("Successfully upgraded")
        alert('Successfully upgraded!')
      }
    } else {
      console.log("not connected")
      alert('Error in upgrade')
    }
  }

  async optInAsset() {
    let wallet = this.walletService.sessionWallet
    if(wallet) {
      let response = await this.upgradeApp.optInAsset(wallet, this.higherAssetId!)
      if(response) {
        this.isOptedIn = true
      }
    }
  }
}
