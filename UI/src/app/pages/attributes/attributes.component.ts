import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap';

import { DeliveryMode, ResolutionScope, Interaction, SocialObjective, Behaviour, AffectiveObjective, TaskType } from '../../models';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.scss']
})
export class AttributesComponent implements OnInit {


  bsModalRef        : BsModalRef;
  loading           : boolean = false;

  delivery_modes    : Array<DeliveryMode> = [];
  interactions      : Array<Interaction> = [];
  reso_scopes       : Array<ResolutionScope> = [];
  social_obvj       : Array<SocialObjective> = [];
  behaviour_cat     : Array<Behaviour> = [];
  affective         : Array<AffectiveObjective> = [];
  social            : Array<SocialObjective> = [];
  task_types        : Array<TaskType> = [];

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
    Observable.forkJoin(
      this.http.get<DeliveryMode[]>('attributes/deliverymode'),
      this.http.get<ResolutionScope[]>('attributes/resolutionscope'),
      this.http.get<Interaction[]>('attributes/interaction'),
      this.http.get<Behaviour[]>('attributes/behaviour'),
      this.http.get<AffectiveObjective[]>('attributes/affective'),
      this.http.get<SocialObjective[]>('attributes/social'),
      this.http.get<TaskType[]>('attributes/task'),
    )
    .subscribe(response => {
      this.delivery_modes = response[0];
      this.reso_scopes    = response[1];
      this.interactions   = response[2];
      this.behaviour_cat  = response[3];
      this.affective      = response[4];
      this.social         = response[5];
      this.task_types     = response[6];

      this.loading = false;
    }, err => this.handleError(err));
  }

  deleteDM(id: number) {
    this.http.delete(`attributes/deliverymode/${id}`).subscribe(
      response => {
        this.toastr.success('Attribute deleted.', 'Success');
        this.getAttributes();
      },
      err => {
        this.toastr.error(err.error.message, 'Error');
      }
    );
  }

  deleteRS(id: number) {
    this.http.delete(`attributes/resolutionscope/${id}`).subscribe(
      response => {
        this.toastr.success('Attribute deleted.', 'Success');
        this.getAttributes();
      },
      err => {
        this.toastr.error(err.error.message, 'Error');
      }
    );
  }

  deleteINT(id: number) {
    this.http.delete(`attributes/interaction/${id}`).subscribe(
      response => {
        this.toastr.success('Attribute deleted.', 'Success');
        this.getAttributes();
      },
      err => {
        this.toastr.error(err.error.message, 'Error');
      }
    );
  }

  deleteBH(id: number) {
    this.http.delete(`attributes/behaviour/${id}`).subscribe(
      response => {
        this.toastr.success('Attribute deleted.', 'Success');
        this.getAttributes();
      },
      err => {
        this.toastr.error(err.error.message, 'Error');
      }
    );
  }

  deleteAF(id: number) {
    this.http.delete(`attributes/affective/${id}`).subscribe(
      response => {
        this.toastr.success('Attribute deleted.', 'Success');
        this.getAttributes();
      },
      err => {
        this.toastr.error(err.error.message, 'Error');
      }
    );
  }

  deleteSO(id: number) {
    this.http.delete(`attributes/social/${id}`).subscribe(
      response => {
        this.toastr.success('Attribute deleted.', 'Success');
        this.getAttributes();
      },
      err => {
        this.toastr.error(err.error.message, 'Error');
      }
    );
  }

  deleteTT(id: number) {
    this.http.delete(`attributes/task/${id}`).subscribe(
      response => {
        this.toastr.success('Attribute deleted.', 'Success');
        this.getAttributes();
      },
      err => {
        this.toastr.error(err.error.message, 'Error');
      }
    );
  }

  private handleError(err) {
    this.toastr.error(err.error.message, 'Error');
  }

}
