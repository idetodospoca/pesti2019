import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Project, Activity, LearningObjective } from '../../models';
import { AuthService } from '../../services/auth.service';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;

  projects          : Array<Project>;
  bsModalRef        : BsModalRef;
  loading           : boolean = false;
  displayedColumns  : string[] = ['name', 'goal', 'date', 'actions'];
  dataSource;
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
        this.dataSource = new MatTableDataSource(this.projects);
        this.loading = false;
      },
      err => {
        this.toastr.error(err.error.message, 'Error');
        this.loading = false;
      }
    )
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  deleteProject(id: number)/*: Observable<Project>*/ {
    this.http.delete(`projects/${id}`).subscribe(
      response => {
        this.toastr.success('Project deleted.', 'Success');
      },
      err => {
        this.toastr.error(err.error.message, 'Error');
      }
    );
    //
    // this.router.navigate(['/']);
    // return this.http.delete<Project>(`projects/${id}`).pipe(
    //   tap(_ => this.toastr.success('Project deleted.', 'Success')),
    //   catchError()
    // );
  }





  // showLearningObjectives(learningObjective: LearningObjective) {
  //   this.bsModalRef = this.modalService.show(LearningobjectiveComponent, {class: 'modal-lg'});
  //   this.bsModalRef.content.learning_objectives = learningObjective;
  // }




}
