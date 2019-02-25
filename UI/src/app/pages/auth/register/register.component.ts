import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  templateUrl: 'register.component.html'
})

export class RegisterComponent {

  errors: Array<string> = [];
  email: string = '';
  name: string = '';
  password: string = '';
  passwordConfirmation: string = '';
  loading: boolean = false;
  constructor(private authService: AuthService, private http: HttpClient, private toastr: ToastrService, private router: Router) { }

  register() {
    this.loading = true;
    this.errors = [];

    if (this.password != this.passwordConfirmation) {
      this.toastr.error('The passwords don\'t match');
      this.loading = false;
      return;
    }

    this.http.post('auth/register', { email: this.email, name: this.name, password: this.password, role: 'professor' }).subscribe(
      (res: any) => {
        this.authService.setToken(res.token);
        this.toastr.success('Account created Successfully.');
        this.router.navigate(['/']);
        this.loading = false;
      },
      err => {
        for (let error of err.error.data) {
          this.toastr.error(error.message);
        }
        this.loading = false;
      }
    );
  }

}
