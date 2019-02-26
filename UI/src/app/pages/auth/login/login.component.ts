import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  email: String = '';
  password: String = '';
  loading: boolean = false;
  constructor(private authService: AuthService, private http: HttpClient, private toastr: ToastrService, private router: Router) { }

  login() {
    this.loading = true;
    this.http.post('auth/login', {email: this.email, password: this.password}).subscribe(
      (res: any) => {
        this.authService.setToken(res.token);
        //this.toastr.success('Successfully logged in!'); not necessary
        this.router.navigate(['/']);
        this.loading = false;
      },
      err => {
        this.toastr.error(err.error.message, 'An error ocurred.');
        this.loading = false;
      }
    );
  }
}
