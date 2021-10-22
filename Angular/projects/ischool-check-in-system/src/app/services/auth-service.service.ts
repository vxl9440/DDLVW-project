import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import decode from 'jwt-decode';
import { User } from '../models/user';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 // https://medium.com/@ryanchenkie_40935/angular-authentication-using-route-guards-bf7a4ca13ae3

  private user?: User;
  private helper: JwtHelperService

  private tokenKey: string = 'id_token';

  constructor(private apiService: ApiService, private router: Router) {
    this.helper = new JwtHelperService();
  }

  isAuthenticated(): boolean {
    const token = this.getToken();

    if (token) {
      console.log("Token found: ", token);
      return !this.helper.isTokenExpired(token);
    } else {
      return false;
    }
  }

  getToken(): string {
    return localStorage.getItem(this.tokenKey) ?? "";
  }

  getUser() {
    return this.user;
  }
  
  // should be able to create a User object out of a JWT. If not then the JWT is invalid or something went wrong on the server.
  login(token: string) {
    this.user = this.decodeToken(token);
    localStorage.setItem(this.tokenKey, token);
  }

  redirectToShibboleth() {
    this.apiService.login();
  }

  private decodeToken(token: string) {
    const tokenPayload = decode<any>(token);
    return tokenPayload.data
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.user = undefined;
    this.router.navigate(['']);
  }
}
