import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Activity, LearningObjective } from '../../../models';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CreateLearningobjectiveComponent } from '../../../dialogs/create-learningobjective/create-learningobjective.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-activities',
  templateUrl: './create-activities.component.html',
  styleUrls: ['./create-activities.component.scss']
})
export class CreateActivitiesComponent implements OnInit {

  loading        : boolean = false;
  form           : Partial<Activity> = {
    description : "",

  };

  bsModalRef     : BsModalRef;
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private router: Router
  ) { }

    ngOnInit() {

    }

    create(){}

addLearningObjective(){
  this.bsModalRef = this.setupModal();
}

private setupModal() : BsModalRef {
    let ref = this.modalService.show(CreateLearningobjectiveComponent, {class: 'modal-lg'});

    return ref;
}
  }
