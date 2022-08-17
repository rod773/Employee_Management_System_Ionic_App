import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { Storage } from '@ionic/storage';
import { User } from './user';
import { AuthResponse } from './auth-response';
import { LoginInterface } from './loginInterface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authServerAddress = 'http://localhost:4000/api/employee';
  authResponse = new BehaviorSubject(false);

  constructor(private httpClient: HttpClient, private storage: Storage) {}

  signup(user: User) {
    try {
      return this.httpClient
        .post(`${this.authServerAddress}/create`, user)
        .pipe(
          tap(async (res: any) => {
            if (res.status !== null && res.status === 'success') {
              this.authResponse.next(true);
              //   await this.storage.set('AUTH_TOKEN', res.user.authToken);
              //   await this.storage.set('EXPIRES_IN', res.user.expiresIn);
            } else {
              this.authResponse.next(false);
            }
          })
        );
    } catch (error) {
      console.log('Error Ocurred: ', error);
    }
  }

  login(user: LoginInterface): Observable<AuthResponse> {
    try {
      return this.httpClient
        .post<AuthResponse>(`${this.authServerAddress}/login`, user)
        .pipe(
          tap(async (res: AuthResponse) => {
            console.log('service side', res);

            // this.authResponseSubject.next(true);

            // if (res.user) {
            //   await this.storage.set('ACCESS_TOKEN', res.user.authToken);
            //   await this.storage.set('EXPIRES_IN', res.user.expiresIn);
            //   this.authResponseSubject.next(true);
            // }
          })
        );
    } catch (error) {
      console.log(error);
    }
  }

  async logout() {
    await this.storage.remove('ACCESS_TOKEN');
    await this.storage.remove('EXPIRES_IN');
    // this.authResponseSubject.next(false);
  }

  isLoggedIn() {
    return this.authResponse.asObservable();
  }
}
