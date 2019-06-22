import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { LearningObjective } from '../../models/LearningObjective';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { FormControl, NgForm, FormGroupDirective, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

/** Error when invalid control is dirty or touched*/
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-create-learningobjective',
  templateUrl: './create-learningobjective.component.html',
  styleUrls: ['./create-learningobjective.component.scss']
})
export class CreateLearningobjectiveComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  kcValidator: FormControl =  new FormControl('', [Validators.required]);
  bhValidator: FormControl =  new FormControl('', [Validators.required]);
  smValidator: FormControl =  new FormControl('', [Validators.required]);

  form    :   Partial<LearningObjective> = {
    knowledge_category  : "",
    behaviour           : "",
    subject_matter      : "",
    conditions          : "",
    degree              : ""
  };
  canceled : boolean = false;
  behaviour_cat : Array<any> = [];

  constructor(
    public bsModalRef: BsModalRef,
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.canceled = false;

  }

  cancel() {
    this.canceled = true;
    this.bsModalRef.hide();
  }

  create() {
    this.kcValidator.markAsTouched();
    this.bhValidator.markAsTouched();
    this.smValidator.markAsTouched();
    if (!(this.kcValidator.invalid) && !(this.bhValidator.invalid) && !(this.smValidator.invalid)) {
      this.bsModalRef.hide();
    }

  }

  isInvalid(field: any): boolean {
    return field.invalid && (field.dirty || field.touched);
  }

  private handleError(err: any) {
    this.toastr.error(err.error.message, 'Error');
  }
}
