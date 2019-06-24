import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
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
  templateUrl: 'register.component.html'
})

export class RegisterComponent {



  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  nameFormControl = new FormControl('', [
    Validators.required
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8)
  ]);

  confirmPasswordFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  errors                : Array<string> = [];
  loading               : boolean = false;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) {}

    register() {
      this.emailFormControl.markAsTouched();
      this.nameFormControl.markAsTouched();
      this.passwordFormControl.markAsTouched();
      this.confirmPasswordFormControl.markAsTouched();

      if (this.emailFormControl.valid && this.nameFormControl.valid && this.passwordFormControl.valid && this.confirmPasswordFormControl.valid) {
        this.loading = true;
        this.errors = [];

        if (this.passwordFormControl.value != this.confirmPasswordFormControl.value) {
          this.toastr.error('The passwords must match.');
          this.loading = false;
          return;
        }

        this.http.post('auth/register', {
          email: this.emailFormControl.value,
          name: this.nameFormControl.value,
          password: this.passwordFormControl.value,
          role: 'professor' }, {observe: 'response'})
        .subscribe(
          response => {
            if (response.status == 200) {
              this.toastr.error(response.body['message'], 'Error');
            }

            if (response.status == 201) {
              this.toastr.success(response.body['message']);
              this.emailFormControl.reset();
              this.nameFormControl.reset();
              this.passwordFormControl.reset();
              this.confirmPasswordFormControl.reset();
            }
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

  }
