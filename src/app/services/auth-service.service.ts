import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private baseUrl = environment.baseUrl;
  constructor(private _http: HttpClient) {}

  createUser(input: any): Observable<any> {
    const url = `${this.baseUrl}/user/create`;
    return this._http.post<any>(url, input);
  }

  getUserByWallet(wallet: string | any): Observable<User> {
    const url = `${this.baseUrl}/user/get/byWallet`;
    return this._http.get<User>(url, {
      params: {
        wallet: wallet,
      },
    });
  }
}
