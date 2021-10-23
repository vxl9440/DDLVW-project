import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor( 
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

      // check if user is already authenticated for the requested role
      const returnUrlKey = 'returnUrl'
      const token = route.queryParamMap.get('token');
      const returnUrl = route.queryParamMap.get(returnUrlKey);

      if (token) {
        if (this.authService.login(token)) {
          console.log(`Attempting to navigate back to ${localStorage.getItem(returnUrlKey)}`);
          this.router.navigate([localStorage.getItem(returnUrlKey)]);
          return true;
        } else {
          // token did not yield a valid user
          this.router.navigate(['/']);
          return false;
        }
      }
      // else, need to ask authService to redirect to Shib for the requested role
      else {
        // no token, need to get one from server
        if (returnUrl) localStorage.setItem(returnUrlKey, returnUrl);
        this.authService.redirectToShibboleth();
        return false;
      }
  }
}
