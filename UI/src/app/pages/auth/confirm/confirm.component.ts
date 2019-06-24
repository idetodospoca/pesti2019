import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  sub             : Subscription;       // The route subscription object to handle params received in the url
  email           : string;             // email received in the url
  token           : string;             // token received in the url
  errors          : Array<string> = [];
  loading         : Boolean = false;
  verified        : Boolean = false;

  constructor(
    private http        : HttpClient,
    private activeRoute : ActivatedRoute,
    private toastr      : ToastrService,
    private router      : Router
  ) { }



  ngOnInit() {
    this.sub = this.activeRoute.params.subscribe(params => {
      this.email = params['email'];
      this.token = params['token'];
      this.confirm();
    });
  }

  confirm() {
    this.loading = true;
    this.http.get(`auth/confirm/${this.email}/${this.token}`, {observe: 'response'}).subscribe(
      response => {
        this.verified = true;
        this.toastr.success('Account successfully verified. You can now log in.');
        this.loading = false;
        this.router.navigate(['/auth/login']);
      },
      err => {
        if (err['error'].error == "verified") {
          this.toastr.info('Your account has already been verified. You can now log in.')
          this.router.navigate(['/auth/login']);
        }
        this.loading = false;
      }
    );
  }

  resend() {
    this.loading = true;
    this.http.get(`auth/resend/${this.email}`, {observe: 'response'}).subscribe(
      response => {
        this.toastr.success(response.body['message']);
        this.loading = false;
        this.router.navigate(['/auth/login']);
      },
      err => {
        this.toastr.error(err.error, 'Error');
        this.loading = false;
      }
    );

  }

}
