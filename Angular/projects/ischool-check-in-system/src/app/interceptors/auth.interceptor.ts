import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';

// Intercepts all HTTP requests to attach authorization token
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const user       = this.authService.user;
    const isLoggedIn = this.authService.isLoggedIn;
    const isApiUrl   = request.url.startsWith(environment.apiUrl);

    if (user && isLoggedIn && isApiUrl) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${ user.token }`
            }
        });
    }

    return next.handle(request);
  }
}
