import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Advisor } from '../models/advisor';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdvisorResolver implements Resolve<Advisor> {

  constructor(private apiService: ApiService, private authService: AuthService) {}

  resolve(): Observable<Advisor> {
    const email = this.authService.user?.email ?? "";
    return this.apiService.getAdvisorByEmail(email);
  }
}
