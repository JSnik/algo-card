import {Component, ElementRef, EventEmitter, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import {WalletsConnectService} from "../../services/wallets-connect.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isProfileOpened = false;
  public isPopUpOpened = false;
  public isMenuRespoOpened = false;
  public isDarkModeChanged = false;
  public walletConnectionPassed = false;
  public isProfileOpenedOnRespo = false;
  public changeRespoNavAndProfileIcons = false;
  public changeRespoNavAndProfileIconsCounter = 1;
  public SearchRespoOpened = false;
  // @ts-ignore
  // $isLoggedIn: Observable<AuthState>;
  // permanent
  public isLoggedIn: boolean = false;
  public isPopUpOpenedSecond: boolean = false;
  @Output() themeWasChanged = new EventEmitter<boolean>();
  public walletArr: any[] = [];
  constructor(
    private router: Router,
    private _walletsConnectService: WalletsConnectService,
    private _eref: ElementRef,
  ) { }

  ngOnInit(): any {
    if (localStorage.getItem('sessionWallet')) {
      this.walletArr = JSON.parse(localStorage.getItem('sessionWallet')!).wallet.accounts;
    } else {
      return;
    }
    if (this._walletsConnectService.sessionWallet && this._walletsConnectService.sessionWallet!.connected()) {
      this.isLoggedIn = true;
    }
    if (localStorage.getItem('wallet')) {
      this.isLoggedIn = true;
    }
  }

  openAvatar() {
    if (!this.isMenuRespoOpened) {
      this.isProfileOpened = !this.isProfileOpened;
    } else {
      this.isProfileOpenedOnRespo = true;
      this.changeRespoNavAndProfileIconsCounter = this.changeRespoNavAndProfileIconsCounter + 1;
      if (this.changeRespoNavAndProfileIconsCounter % 2 === 0) {
        this.changeRespoNavAndProfileIcons = true;
      } else {
        this.changeRespoNavAndProfileIcons = false;
      }
      console.log(this.changeRespoNavAndProfileIcons);
    }

  }

  connectWalletPopUp() {
    this.isPopUpOpened = !this.isPopUpOpened;
  }

  closePopUp(event: boolean) {
    this.isPopUpOpened = event;
    this.isPopUpOpenedSecond = event;
  }

  showMenuRespo() {
    this.isMenuRespoOpened = !this.isMenuRespoOpened;
  }

  changeDarkMode() {
    this.isDarkModeChanged = !this.isDarkModeChanged
    if (this.isDarkModeChanged) {
      this.themeWasChanged.emit(true);
    } else {
      this.themeWasChanged.emit(false);
    }
  }

  walletConnectionSucceed(event: boolean): void {
    this.isPopUpOpened = false;
    this.walletConnectionPassed = true;
  }

  openSearchRespo() {
    this.SearchRespoOpened = true;
  }

  closeSearchRespo() {
    this.SearchRespoOpened = false;
  }

  connect(event: any) {
    console.log(event);
    this.isLoggedIn = true;
    this.isPopUpOpened = false;
  }

  loginIn($event: any) {
    if (localStorage.getItem('wallet')) {
      this.isLoggedIn = true;
      this.isPopUpOpened = false;
    }
  }

  disconnect() {
    this.isLoggedIn = false;
    localStorage.removeItem('wallet');
    localStorage.removeItem('sessionWallet')
    this._walletsConnectService.disconnect()
  }

  closeDropDown() {
    console.log('clicked outside');
  }

  switcher() {
    this.isPopUpOpenedSecond = true;
  }
}
