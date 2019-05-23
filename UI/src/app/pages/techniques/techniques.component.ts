import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSort, MatTableDataSource } from '@angular/material';

import { ToastrService } from 'ngx-toastr';

import { Technique } from '../../models';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-techniques',
  templateUrl: './techniques.component.html',
  styleUrls: ['./techniques.component.scss']
})
export class TechniquesComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  techniques          : Array<Technique>;
  loading           : boolean = false;
  displayedColumns  : string[] = ['name', 'description', 'actions'];
  dataSource        = new MatTableDataSource([]);

  constructor(
    private http          : HttpClient,
    private toastr        : ToastrService,
    public authService    : AuthService,
    private router        : Router,
  ) { }

  ngOnInit() {
    this.getTechniques();
  }

  getTechniques() {
    this.loading = true;
    this.http.get<Technique[]>('techniques')
    .subscribe(
      response => {
        this.techniques = response;
        this.dataSource.data = this.techniques;
        this.dataSource.sort = this.sort;
        this.loading = false;
      },
      err => {
        this.toastr.error(err.error.message, 'Error');
        this.loading = false;
      }
    )
  }

  deleteTechnique(id: number) {
    this.http.delete(`techniques/${id}`).subscribe(
      response => {
        this.toastr.success('Technique deleted.', 'Success');
        this.getTechniques();
      },
      err => {
        this.toastr.error(err.error.message, 'Error');
      }
    );
  }
}
