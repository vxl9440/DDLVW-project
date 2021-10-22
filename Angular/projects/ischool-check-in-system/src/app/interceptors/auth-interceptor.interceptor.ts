import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-service.service';

// Intercepts all HTTP requests to attach authorization token
@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // if authenticated, attached authentication token to headers
    if (this.authService.isAuthenticated()) {
        const cloned = request.clone({
            headers: request.headers.set("Authorization",
                "Bearer " + this.authService.getToken())
        });

        return next.handle(cloned);
    }
    // else attempt request without authentication (will fail to return results or return an error)
    else {
        return next.handle(request);
    }
  }
}
