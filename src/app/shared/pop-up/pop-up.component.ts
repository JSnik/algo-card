import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { of } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { WalletsConnectService } from 'src/app/services/wallets-connect.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss'],
})
export class PopUpComponent implements OnInit {
  @Output() isConnectedToWallet = new EventEmitter<boolean>();
  @Output() logInValue = new EventEmitter<string | null>();
  @Output() isClosed = new EventEmitter<boolean>();

  @Input() openWallet: boolean = false;

  constructor(
    private _walletsConnectService: WalletsConnectService,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {}

  closePopUp(value: any) {
    this.isClosed.emit(false);
  }

  async setelectWalletConnect(value: string) {
    if (value === 'MyAlgoWallet') {
      await of(this._walletsConnectService.connectToMyAlgo()).toPromise();
      let wallet = localStorage.getItem('wallet');
      if (
        this._walletsConnectService.myAlgoAddress &&
        this._walletsConnectService.myAlgoName !== undefined
      ) {
        this.authService
          .createUser(
            // @ts-ignore
            {
              wallet: wallet,
              name: 'Name',
              verified: false,
              bio: 'Nothing yet...',
              profileImage: '',
              banner: '',
              featuredImage: '',
              customUrl: '',
              twitter: '',
              instagram: '',
              website: '',
            }
          )
          .subscribe(
            (user: any) => {
              console.log(user);
              this.isConnectedToWallet.emit(false);
              this.logInValue.emit(wallet);
            },
            (error) => {
              console.log('error', error);
              this.logInValue.emit(wallet);
              this.isConnectedToWallet.emit(false);
            }
          );
      }
    }
  }
}
