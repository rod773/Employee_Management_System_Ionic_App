import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';

import { Storage } from '@ionic/storage';
import { User } from './user';
import { AuthResponse } from './auth-response';
import { LoginInterface } from './loginInterface';
import { LoadingController } from '@ionic/angular';
import { LoadingService } from '../loading_service/loading.service';
import { HttpService } from '../http/http.service';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpService,
    private storage: Storage,
    private loadingService: LoadingService,
    private toastService: ToastService
  ) {}

  registerUser(user: User) {
    const httpHeader = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post('/create', user, httpHeader).pipe(
      catchError((error) => {
        let errorMessage: string;
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = this.getServerErrorMessage(error);
        }
        this.loadingService.dismissLoading();
        this.toastService.presentToast(errorMessage, true);
        return throwError(errorMessage);
      })
    );
  }

  loginUser(user: LoginInterface) {
    const httpHeader = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post('/login', user, httpHeader).pipe(
      catchError((error) => {
        let errorMessage: string;
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = this.getServerErrorMessage(error);
        }
        this.loadingService.dismissLoading();
        this.toastService.presentToast(errorMessage, true);
        return throwError(errorMessage);
      })
    );
  }

  async logout() {
    await this.storage.remove('ACCESS_TOKEN');
    await this.storage.remove('EXPIRES_IN');
    // this.authResponseSubject.next(false);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.error.message}`);
      return of(result as T);
    };
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 401:
        return error.error.message;
      case 403:
        return `Access Denied: ${error.message}`;
      case 404:
        return error.error.message;
      case 409:
        return `${error.error.message}`;
      case 500:
        return `Internal Server Error: ${error.message}`;
      default:
        return `Unknown Server Error: ${error.message}`;
    }
  }
}
