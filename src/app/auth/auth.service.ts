import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { Storage } from '@ionic/storage';
import { User } from './user';
import { AuthResponse } from './auth-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authServerAddress = 'http://localhost:4000/api/employee';
  authSubject = new BehaviorSubject(false);

  constructor(private httpClient: HttpClient, private storage: Storage) {}

  signup(user: User): Observable<AuthResponse> {
    try {
      return this.httpClient
        .post<AuthResponse>(`${this.authServerAddress}/create`, user)
        .pipe(
          tap(async (res: AuthResponse) => {
            if (res.user) {
              await this.storage.set('AUTH_TOKEN', res.user.authToken);
              await this.storage.set('EXPIRES_IN', res.user.expiresIn);
              this.authSubject.next(true);
            }
          })
        );
    } catch (error) {
      console.log(error);
    }
  }

  login(user: User): Observable<AuthResponse> {
    try {
      return this.httpClient
        .post<AuthResponse>(`${this.authServerAddress}/login`, user)
        .pipe(
          tap(async (res: AuthResponse) => {
            if (res.user) {
              await this.storage.set('ACCESS_TOKEN', res.user.authToken);
              await this.storage.set('EXPIRES_IN', res.user.expiresIn);
              this.authSubject.next(true);
            }
          })
        );
    } catch (error) {
      console.log(error);
    }
  }

  async logout() {
    await this.storage.remove('ACCESS_TOKEN');
    await this.storage.remove('EXPIRES_IN');
    this.authSubject.next(false);
  }

  isLoggedIn() {
    return this.authSubject.asObservable();
  }
}
