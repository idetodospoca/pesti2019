import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSort, MatTableDataSource } from '@angular/material';

import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap';

import { Attributes } from '../../models';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.scss']
})
export class AttributesComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  bsModalRef        : BsModalRef;
  loading           : boolean = false;

  //Data Table display
  attributes          : Array<Attributes> = [];
  displayedColumns    : string[] = ['delivery_mode', 'interaction', 'resolution_scope', 'social_objectives', 'affective_objectives', 'behaviour', 'task_types'];
  dataSource          = new MatTableDataSource([]);

  constructor(
    private http          : HttpClient,
    private toastr        : ToastrService,
    public authService    : AuthService
  ) { }

  ngOnInit() {
    this.getAttributes();
  }


  getAttributes() {
    this.loading = true;
    this.http.get<Attributes[]>('attributes')
    .subscribe(
      response => {
        this.attributes = response;
        console.log(this.attributes);

        this.dataSource.data = this.attributes;
        this.dataSource.sort = this.sort;
        this.loading = false;
      },
      err => {
        this.toastr.error(err.error.message, 'Error');
        this.loading = false;
      }
    );
  }

}
