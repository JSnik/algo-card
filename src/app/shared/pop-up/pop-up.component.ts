import {Component, DoCheck, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import {of} from "rxjs";
import {WalletsConnectService} from "../../services/wallets-connect.service";

export type SmartToolData = {
  userSupplied: number,
  availableTokenAmount: number,
  availableAlgoAmount: number,
  userBorrowed: number,
  assetDecimals: number,
  contractId: number,
  totalBacking: number,
  totalBorrowed: number,
  totalSupply: number,
  optedIn: boolean,
  name: string,
  unitName: string
}

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss'],
})
export class PopUpComponent implements OnInit, DoCheck {
  @Input() isDeployedSuccess: boolean = false;
  @Input() isDeployedFaied: boolean = false;
  @Input() isDeployedPending: boolean = false;

  @Output() isConnectedToWallet = new EventEmitter<boolean>();
  @Output() isClosed = new EventEmitter<boolean>();
  @Output() logInValue = new EventEmitter<string | null>();
  @Output() isLiquiditied = new EventEmitter<boolean>();

  @Output() makeRequest = new EventEmitter<FormGroup>();

  @Input() isChooseWallet: boolean = false;
  @Input() openWallet: boolean = false;
  @Input() isDeploy: boolean = false;
  @Input() isTrade: boolean = false;
  @Input() isBorrow: boolean = false;
  @Input() isBacking: boolean = false;
  @Input() isAddBacking: boolean = false;

  @Input() isRestart: boolean = false;
  @Input() isFair: boolean = false;

  tokensPerInterval: number = 0;
  availableAmountForDistribution: number = 0;

  @Input() stacking: boolean = false;
  @Input() stackingISStake: boolean = false;
  @Input() isD: boolean  = false;
  @Input() switcher: boolean = false;
  //deployed logic
  @Input() isDeployedSuccess: boolean = false;
  @Input() isDeployedFaied: boolean = false;
  @Input() isDeployedPending: boolean = false;
  //deployed logic

  // wallet switcher
  walletsForSwitching: any[] = [];

  assetInfo: any;

  isActiveFirst = true;
  isActiveSecond = false;

  isLend = true;
  isLendChecked = this.fb.control([])
  isLendVerseChecked = this.fb.control([])
  tradeBackingVerseControl = this.fb.control([])
  tradeLendVerseControl = this.fb.control([])

  tradeLendRepayTokenControl1 = this.fb.control([])
  tradeLendRepayTokenControl2 = this.fb.control([])
  tradeLendRepayTokenControl3 = this.fb.control([])
  tradeLendRepayTokenControl4 = this.fb.control([])
  tradeLendRepayTokenControl5 = this.fb.control([])
  tradeLendRepayTokenControl6 = this.fb.control([])
  tradeLendRepayTokenControl7 = this.fb.control([])


  verseReturnedBacking: number = 0;
  returnedBacking: number = 0;
  presalePrice: number = 0;
  minInitialPrice = 0;
  maxInitialPrice = 0;
  initialFairLaunchPrice = 0;

  accountList: string[] = []
  assetIdsToOptIn: number[] = []
  isOptedInToVerseBacking = false

  @Input()

  @Input()
  smartToolData: SmartToolData = {
    assetDecimals: 0,
    availableTokenAmount: 0,
    availableAlgoAmount: 0,
    contractId: 0,
    userBorrowed: 0,
    userSupplied: 0,
    totalBacking: 0,
    totalBorrowed: 0,
    totalSupply: 0,
    optedIn: true,
    name: "",
    unitName: ""
  }



  // FORMS

  // trade new popup flows
  @Input() isTradeLend: boolean = false;
  @Input() isTradeBacking: boolean = false;

  @Input() isTradeLendVerse: boolean = false;
  @Input() isTradeBackingVerse: boolean = false;

  // @Output() indexerOfChosenSection = new EventEmitter<number>();
  // trade new popup flows

  @Input() isPool: boolean = false;

  addBackingControl = this.fb.control([])

  distributionPoolForm = this.fb.group({
    poolReward: [],
    poolStart: [],
    poolInterval: [],
    poolDuration: [],
  })

  tokenDetailBorrowForm = this.fb.group({
    supplyAmount: [],
    borrowAmount: [],
  });

  tokenDetailRepayForm = this.fb.group({
    borrowedAmount: [],
    repayAmount: [],
  });

  tokenDetailBackingForm = this.fb.group({
    tokenName: [],
    secondInput: [],
  });

  launchDetailControl = this.fb.control([]);
  tradeBackingControl = this.fb.control([]);

  stakeVerseControl = this.fb.control([0,])
  withdrawVerseControl = this.fb.control([])
  isStakeInvalid: boolean = false;
  isWithdrawInvalid: boolean = false;

  myPresaleRestartForm = this.fb.group({
    presaleStart: [],
    presaleEnd: [],
    tradingStart: [],
    tokenInPresale: [],
    tokenInLiquidity: [],
    algoInLiquidity: [],
    softCap: [],
    hardCap: [],
    walletCap: [],
    toLiquidity: [],
    checkVested: [],
    release: [],
    releaseInterval: [],
    releaseIntervalNumbers: []
  });

  @ViewChild('checkVested', {static: false})
  // @ts-ignore
  private checkVested: ElementRef;

  isCheckedVested: boolean = false;

  myPresaleFairLaunchForm = this.fb.group({
    tradingStart: [],
    tokenLiq: [],
    algoLiq: [],
  });
  restartReleasePerInterval: number = 0;
  // FORMS
  constructor(
    private _walletsConnectService: WalletsConnectService,
    private fb: FormBuilder,

  ) {}

  ngDoCheck() {
    // if (this.stakeVerseControl.value.length) {
    //   this.stakeVerseControl.valueChanges.subscribe((res: any) => {
    //     if (+this.stakeVerseControl.value >  this.stakingInfo?.usersHolding!) {
    //       this.isStakeInvalid = true;
    //     } else {
    //       this.isStakeInvalid = false;
    //     }
    //   })
    // }
    // if (this.withdrawVerseControl.value.length) {
    //   this.withdrawVerseControl.valueChanges.subscribe((res: any) => {
    //     if (+this.withdrawVerseControl.value > this.stakingInfo?.usersStake!) {
    //       this.isWithdrawInvalid = true;
    //     } else {
    //       this.isWithdrawInvalid = false;
    //     }
    //   })
    // }
  }

  async ngOnInit(): Promise<void> {
    // this.lendControl.valueChanges!.subscribe(
    //   (value: any) => {
    //     this.calculateBackingReturn(value)
    //   }
    // )
  }

  closePopUp(value: any) {
    this.isClosed.emit(false);
  }

  async setelectWalletConnect(value: string) {

    if (value === 'MyAlgoWallet') {
      await this._walletsConnectService.connect('my-algo-connect');
      if (this._walletsConnectService.myAlgoAddress && this._walletsConnectService.myAlgoName !== undefined) {
        // this.isConnectedToWallet.emit(false);
        let wallet = localStorage.getItem('wallet');
        if (localStorage.getItem('wallet')!) {
          this.isConnectedToWallet.emit(false);
          this.logInValue.emit(wallet);
          this.isClosed.emit(false);
        } else {
          this.logInValue.emit(wallet);
          this.isConnectedToWallet.emit(false);
          this.isClosed.emit(false);
        }

      }
      console.log('emited')
      console.log('Connected to MyAlgoWallet')
      localStorage.setItem('reload', 'true');
      if (localStorage.getItem('reload')) {
        location.reload();
        setTimeout(() => {
          localStorage.removeItem('reload');
        }, 4000)
      } else {
        return
      }
    } else if (value == 'WalletConnect') {
      await this._walletsConnectService.connect('wallet-connect');
      if (this._walletsConnectService.myAlgoAddress && this._walletsConnectService.myAlgoName !== undefined) {
        this.isConnectedToWallet.emit(false);
        console.log('Connected to MyAlgoWallet')
      }
    }
  }

  activeFirst() {
    this.isActiveFirst = true;
    this.isActiveSecond = false;
  }

  activeSecond() {
    this.isActiveSecond = true;
    this.isActiveFirst = false;
  }

  triggetLiquidity() {
    this.isLiquiditied.emit(true);
  }

  wallet(): any {
    this.walletsForSwitching = JSON.parse(localStorage.getItem('walletsOfUser')!);
    return this.walletsForSwitching;
  }

  // returnAddress(acc: string) {
  //  let start: string = '';
  //  let last: string = ''
  //  start = acc.substring(0,3);
  //  last = acc.substring(acc.length, acc.length - 3);
  //  let final = start + '...' + last;
  //  return final
  // }

  // getActive(acc: string) {
  //   if (localStorage.getItem('wallet') === acc) {
  //     return true
  //   } else {
  //     return  false
  //   }
  // }

  switchAcc(i: number) {
    localStorage.removeItem('wallet');
    localStorage.setItem('walletIndex', JSON.stringify(i));
    this.setelectWalletConnect('MyAlgoWallet');
  }

  getValueFromDropDown($event: any) {
    let index = +$event.i - 1;
    this.switchAcc(+index);
    console.log($event)
  }


}
