import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Project, Activity, LearningObjective } from '../../models';
import { AuthService } from '../../services/auth.service';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map, tap, delay } from 'rxjs/operators';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  projects          : Array<Project>;
  bsModalRef        : BsModalRef;
  loading           : boolean = false;
  displayedColumns  : string[] = ['name', 'goal', 'date', 'actions'];
  dataSource        = new MatTableDataSource([]);

  constructor(
    private http          : HttpClient,
    private toastr        : ToastrService,
    public authService    : AuthService,
    private router        : Router
  ) {}

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.loading = true;
    this.http.get<Project[]>('projects')
    .subscribe(
      response => {
        this.projects = response;
        this.dataSource.data = this.projects;
        this.dataSource.sort = this.sort;
        this.loading = false;
      },
      err => {
        this.toastr.error(err.error.message, 'Error');
        this.loading = false;
      }
    )
  }


  deleteProject(id: number) {
     this.http.delete(`projects/${id}`).subscribe(
      response => {
        this.toastr.success('Project deleted.', 'Success');
      },
      err => {
        this.toastr.error(err.error.message, 'Error');
      }
    );
  }





  // showLearningObjectives(learningObjective: LearningObjective) {
  //   this.bsModalRef = this.modalService.show(LearningobjectiveComponent, {class: 'modal-lg'});
  //   this.bsModalRef.content.learning_objectives = learningObjective;
  // }




}
