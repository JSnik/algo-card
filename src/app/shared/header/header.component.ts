import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isProfileOpened = false;
  public isPopUpOpened = false;
  public isLoggedIn: boolean = false;

  constructor(private router: Router) {}

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

  onLogin(isLoggedIn: any) {
    if (isLoggedIn) {
      this.isLoggedIn = true;
      this.router.navigate(['/selection']);
    } else {
      this.isLoggedIn = false;
    }
  }

  disconnect() {
    this.isLoggedIn = false;
    localStorage.removeItem('wallet');
    this.router.navigate(['connect']);
  }
}
