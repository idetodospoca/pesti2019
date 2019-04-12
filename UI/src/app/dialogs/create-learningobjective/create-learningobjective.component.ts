import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { LearningObjective } from '../../models/LearningObjective';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-learningobjective',
  templateUrl: './create-learningobjective.component.html',
  styleUrls: ['./create-learningobjective.component.scss']
})
export class CreateLearningobjectiveComponent implements OnInit {

  form    :   Partial<LearningObjective> = {
    knowledge_category  : "",
    behaviour           : "",
    subject_matter      : "",
    conditions          : "",
    degree              : ""
  };
  canceled : boolean = false;
  
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
    this.bsModalRef.hide();
  }

  isInvalid(field: any): boolean {
    return field.invalid && (field.dirty || field.touched);
  }


  private handleError(err: any) {
    this.toastr.error(err.error.message, 'Error');
  }
}
