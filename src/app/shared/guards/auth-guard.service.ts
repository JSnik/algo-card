import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(private router: Router) {}
  canActivate(): boolean {
    if (localStorage.getItem('wallet')) {
      console.log('s')
      return true;
    }
    this.router.navigate(['connect']);
    return false;
  }
}
