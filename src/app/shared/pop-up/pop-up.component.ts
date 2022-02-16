import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { of } from 'rxjs';
import { WalletsConnectService } from 'src/app/services/wallets-connect.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss'],
})
export class PopUpComponent implements OnInit {
  @Output() isClosed = new EventEmitter<boolean>();
  @Output() login = new EventEmitter<boolean>();
  @Input() openWallet: boolean = false;

  constructor(private _walletsConnectService: WalletsConnectService) {}

  ngOnInit(): void {}

  closePopUp() {
    this.isClosed.emit();
  }

  async setelectWalletConnect(value: string) {
    if (value === 'MyAlgoWallet') {
      await of(this._walletsConnectService.connectToMyAlgo()).toPromise();
      if (
        this._walletsConnectService.myAlgoAddress &&
        this._walletsConnectService.myAlgoName !== undefined
      ) {
        this.closePopUp();
        this.login.emit(true);
      } else {
        this.closePopUp();
        this.login.emit(false);
      }
    }
  }
}
