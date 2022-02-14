import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isProfileOpened = false;
  public isPopUpOpened = false;
  // public isMenuRespoOpened = false;
  // public isDarkModeChanged = false;
  // public walletConnectionPassed = false;
  // @ts-ignore
  // $isLoggedIn: Observable<AuthState>;
  // permanent
  public isLoggedIn: boolean = false;

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit(): any {
    if (localStorage.getItem('wallet')) {
      this.isLoggedIn = true;
    }
  }

  connectWalletPopUp() {
    this.isPopUpOpened = !this.isPopUpOpened;
  }

  closePopUp(event: boolean) {
    this.isPopUpOpened = event;
  }

  connect(event: any) {
    console.log(event);
  }

  loginIn($event: any) {
    this.authService
      .getUserByWallet(
        // @ts-ignore
        $event
      )
      .subscribe((user: User) => {
        console.log(user);
        this.isLoggedIn = true;
        this.isPopUpOpened = false;
        this.router.navigate(['selection']);
      });
  }

  disconnect() {
    this.isLoggedIn = false;
    localStorage.removeItem('wallet');
    this.router.navigate(['connect']);
  }
}
