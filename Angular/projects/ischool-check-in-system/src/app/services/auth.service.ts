import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject: BehaviorSubject<User | null>;
  private helper: JwtHelperService;

  constructor(private apiService: ApiService, private router: Router) {
    this.helper = new JwtHelperService();
    try {
      const user = JSON.parse(localStorage.getItem('user') ?? "");
      this.userSubject = new BehaviorSubject<User | null>(user);
    } catch {
      this.userSubject = new BehaviorSubject<User | null>(null);
    }
  }

  private hasValidToken(): boolean {
    const token = this.user?.token;

    return !this.helper.isTokenExpired(token);
  }

  private decodeToken(token: string) {
    const tokenPayload = this.helper.decodeToken(token);
    return tokenPayload.data
  }

  get isLoggedIn(): boolean {
    return this.hasValidToken();
  }

  // returns the current user, or null if no user is set (logged out state)
  get user(): User | null {
    return this.userSubject.value;
  }
  
  // should be able to create a User object out of a JWT. If not then the JWT is invalid or something went wrong on the server.
  login(token: string): boolean {

    const payload = this.decodeToken(token);
    
    if (User.isValidUser(payload)) {
      const newUser = new User().deserialize(payload);
      newUser.token = token;
      localStorage.setItem('user', JSON.stringify(newUser));
      this.userSubject.next(newUser);

      return true;
    } 

    return false;
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.apiService.logout;
  }

  redirectToShibboleth() {
    this.apiService.login();
  }
}
