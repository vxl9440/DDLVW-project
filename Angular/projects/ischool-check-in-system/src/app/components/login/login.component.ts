import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private route: ActivatedRoute, 
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');

    if (token) {
      console.log("Token received from server ", token);
      this.authService.login(token);
      this.router.navigate(['advisor']);
    } else {
      // no token, need to get one from server
      console.log("No token, attempting to reach shib...");
      this.authService.redirectToShibboleth();
    }
  }
}
