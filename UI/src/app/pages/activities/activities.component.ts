import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSort, MatTableDataSource } from '@angular/material';

import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap';

import { Project } from '../../models';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  bsModalRef        : BsModalRef;
  loading           : boolean = false;

  //Data Table display
  projects          : Array<Project>;
  displayedColumns  : string[] = ['name', 'goal', 'date', 'status', 'edit', 'copy', 'delete', 'recomendations'];
  dataSource        = new MatTableDataSource([]);


  constructor(
    private http          : HttpClient,
    private toastr        : ToastrService,
    public authService    : AuthService
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
        this.getProjects();
      },
      err => {
        this.toastr.error(err.error.message, 'Error');
      }
    );
  }

}
