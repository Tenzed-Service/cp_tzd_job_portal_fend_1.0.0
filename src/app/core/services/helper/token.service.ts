import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { CommonEnum } from '../../enums/common.enum';

@Injectable({ providedIn: 'root' })
export class TokenService {
  authUserData: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService) {
    this.setAuthUserDataProperty();
  }
  // Get UserData
  getUserData() {
    const userData = this.setAuthUserDataProperty();
    if (userData) {
      return userData;
    } else {
      return false;
    }
  }
  // Get Token
  getToken() {
    const authData = this.localStorageService.getItem(CommonEnum.AUTHTOKEN || '{}')
    if (authData) {
      return authData;
    } else {
      return false;
    }
  }
  // Get refreshToken
  getRefreshToken() {
    const userData = this.setAuthUserDataProperty();
    if (userData) {
      return userData.refreshToken;
    } else {
      return false;
    }
  }
  clearToken() {
    this.localStorageService.removeItem(CommonEnum.AUTHTOKEN);
  }
  saveToken(token: string) {
    this.localStorageService.setItem(CommonEnum.AUTHTOKEN, token);
  }
  setAuthUserDataProperty() {
    try {
      this.authUserData = JSON.parse(this.localStorageService.getItem(CommonEnum.USERDATA));
      return this.authUserData;
    } catch {
      this.localStorageService.clearLocalStorage();
      this.router.navigate(['/login']);
      return null;
    }
  }
}
