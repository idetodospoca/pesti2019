import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  matcher = new MyErrorStateMatcher();
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router)
    { }

    login() {

      this.emailFormControl.markAsTouched();
      this.passwordFormControl.markAsTouched();
      if (this.emailFormControl.valid && this.passwordFormControl.valid) {
        this.loading = true;
        this.http.post('auth/login', {email: this.emailFormControl.value, password: this.passwordFormControl.value}).subscribe(
          (res: any) => {
            this.authService.setToken(res.token);
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
  }
