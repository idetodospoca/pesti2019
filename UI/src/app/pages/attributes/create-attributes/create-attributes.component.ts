import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Attributes } from '../../../models';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-attributes',
  templateUrl: './create-attributes.component.html',
  styleUrls: ['./create-attributes.component.scss']
})
export class CreateAttributesComponent implements OnInit {

  loading         : boolean = false;
  form            : Partial<Attributes> = {
    delivery_mode         : [],
    interaction           : [],
    resolution_scope      : [],
    behaviour             : [],
    affective_objectives  : [],
    social_objectives     : [],
    task_types            : []
  };

  behaviour_verb  : string = "";
  affective_verb  : string = "";
  task_category   : string = "";
  task_verb       : string = "";

  delivery_mode     : string = "";
  interaction       : string = "";
  resolution_scope  : string = "";
  social_objectives : string = "";
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private router: Router
  ) {}

  ngOnInit() {
    this.toastr.info('Each definition should be in a separate line.', '', {
      timeOut: 0,
      extendedTimeOut: 0
    });

    this.toastr.info('Attributes can be defined in this page.', '', {
      timeOut: 0,
      extendedTimeOut: 0
    });
  }

  create() {
    this.form.delivery_mode.push(...this.delivery_mode.split("\n"));
    this.form.interaction.push(...this.interaction.split("\n"));
    this.form.resolution_scope.push(...this.resolution_scope.split("\n"));
    this.form.social_objectives.push(...this.social_objectives.split("\n"));

    this.http.post<Attributes>(`attributes`, this.form).subscribe(
      response => {
        this.toastr.success('Attributes successfully added.', 'Success');
      },
      err => this.handleError(err)
    );
  }

  addBehaviour() {
    let Behaviour = {category: (<HTMLSelectElement>document.getElementById('behaviour_category')).value, verb: this.behaviour_verb};
    this.form.behaviour.push(Behaviour);
    this.toastr.success('Behaviour successfully added.');
    this.behaviour_verb = "";
  }

  addAffective() {
    let AffectiveObjective = {category: (<HTMLSelectElement>document.getElementById('affective_category')).value, verb: this.affective_verb};
    this.form.affective_objectives.push(AffectiveObjective);
    this.toastr.success('Affective Objective successfully added.');
    this.affective_verb = "";
  }

  addTask() {
    let TaskType = {category: this.task_category, verb: this.task_verb};
    this.form.task_types.push(TaskType);
    this.toastr.success('Task Type successfully added.');
    this.task_category = "";
    this.task_verb = "";
  }

  private handleError(err) {
    this.toastr.error(err.error.message, 'Error');
  }

}
