import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.authService.user;
    
    if (user) {
      // check for role
      if (route.data.roles && route.data.roles.indexOf(user.role) === -1) {
        // this user does not have the necessary role
        this.router.navigate(['/']);
        return false;
      }

      // authorized
      return true;
    }
    
    // not logged in

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
