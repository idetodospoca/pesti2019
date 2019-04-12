import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Activity, LearningObjective } from '../../models';
import { AuthService } from '../../services/auth.service';
import { LearningobjectiveComponent } from '../../dialogs/learningobjective/learningobjective.component';
//import *  as jquery from 'jquery';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {

  activities  : Array<Activity>;
  bsModalRef  : BsModalRef;
  loading     : boolean = false;
  

  constructor
  (
    private http          : HttpClient,
    private toastr        : ToastrService,
    private modalService  : BsModalService,
    public authService    : AuthService
  ) {}

  ngOnInit() {


    this.getActivities();
  }

  getActivities() {
    this.loading = true;
    this.http.get<Activity[]>('atividades')
    .subscribe(
      response => {
        this.activities = response;
        this.loading = false;
      },
      err => {
        this.toastr.error(err.error.message, 'Error');
        this.loading = false;
      }
    );
  }

  showLearningObjectives(learningObjective: LearningObjective) {
    this.bsModalRef = this.modalService.show(LearningobjectiveComponent, {class: 'modal-lg'});
    this.bsModalRef.content.learning_objectives = learningObjective;
  }




}
