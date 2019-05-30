import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

import { Project, Attributes } from '../../../models';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CreateProjectHelpComponent } from '../../../dialogs/create-project-help/create-project-help.component';
import { CreateLearningobjectiveComponent } from '../../../dialogs/create-learningobjective/create-learningobjective.component';

@Component({
  selector: 'app-copy-activities',
  templateUrl: './copy-activities.component.html',
  styleUrls: ['./copy-activities.component.scss']
})
export class CopyActivitiesComponent implements OnInit {

  loading         : boolean = false;
  currentEditing  : number = -1;
  bsModalRef      : BsModalRef;
  modalSub        : Subscription;       // The modal subscription object
  sub             : Subscription;       // The route subscription object to handle params received in the url
  id              : string;             // Id received in the url


  delivery_modes    : Array<any> = [];
  interactions      : Array<any> = [];
  reso_scopes       : Array<any> = [];
  social_obvj       : Array<any> = [];
  behaviour_cat     : Array<any> = [];
  affective         : Array<any> = [];
  social            : Array<any> = [];



  form           : Partial<Project> = {
    name      : "",
    goal      : "",
    activity  :  {
      description           : "",
      subject               : "",
      delivery_mode         : "",
      interaction           : "",
      scope                 : "",
      age                   : 5,
      feedback_use          : "",
      interrelationship     : "",
      motivation            : "",
      participation         : "",
      performance           : "",
      learning_objectives   : [],
      affective_objectives  : [],
      social_objectives     : []
    },
    canCopy: true
  };

  ao : string = "";
  so : string = "";



  constructor(
    private http: HttpClient,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private router: Router,
    public  dialog: MatDialog
  ) { }

  ngOnInit() {

    this.createHandler();

    this.getAttributes();

    this.sub = this.activeRoute.params.subscribe(params => {
      this.id = params['id'];
      this.populateForm();
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.destroyHandler();
  }

  create() {

    this.http.post<Project>(`projects`, this.form).subscribe(
      response => {
        this.toastr.success('Project successfully copied.', 'Success');
      },
      err => this.handleError(err)
    );

    this.router.navigate(['/']);

  }

  showHelp() {
    this.dialog.open(CreateProjectHelpComponent);
  }



  getAttributes() {
    this.loading = true;
    this.http.get<Attributes[]>('attributes')
    .subscribe(
      response => {

        this.delivery_modes = response.map(response => response['delivery_mode'].map(res => res.name));
        this.delivery_modes = [].concat.apply([], this.delivery_modes);

        this.interactions   = response.map(response => response['interaction'].map(res => res.name));
        this.interactions   = [].concat.apply([], this.interactions);

        this.reso_scopes    = response.map(response => response['resolution_scope'].map(res => res.name));
        this.reso_scopes    = [].concat.apply([], this.reso_scopes);

        this.social_obvj    = response.map(response => response['social_objectives'].map(res => res.name));
        this.social_obvj    = [].concat.apply([], this.social_obvj);

        this.behaviour_cat = response.map(response => response['behaviour']);
        this.behaviour_cat = ([].concat.apply([], this.behaviour_cat)).sort();

        this.affective = response.map(response => response['affective_objectives']);
        this.affective = ([].concat.apply([], this.affective)).sort();

        this.social = response.map(response => response['social_objectives']);
        this.social = ([].concat.apply([], this.social)).sort();

        this.loading = false;

      },
      err => {
        this.toastr.error(err.error.message, 'Error');
        this.loading = false;
      }
    );
  }

  addLearningObjective() {
    this.currentEditing = -1;
    this.bsModalRef = this.setupModal();
  }

  deleteLO(number: number) {
    this.form.activity.learning_objectives.splice(number, 1);
  }

  editLO(number: number) {
    this.currentEditing = number;
    let p = this.form.activity.learning_objectives[number];
    // Launch the modal
    this.bsModalRef = this.setupModal();


    // Update the fields in the modal
    for (let property of Object.keys(p)){
      this.bsModalRef.content.form[property] = p[property];
    }
  }


  addAffectiveObjective() {
    if  (this.form.activity.affective_objectives.includes(this.ao)) {
      this.toastr.error('This option has already been added.', 'Error');
    } else {
      this.form.activity.affective_objectives.push(this.ao);
      this.ao = "";
    }

  }

  deleteAO(number: number) {
    this.form.activity.affective_objectives.splice(number, 1);
  }



  addSocialObjective() {
    if  (this.form.activity.social_objectives.includes(this.so)) {
      this.toastr.error('This option has already been added.', 'Error');
    } else {
      this.form.activity.social_objectives.push(this.so);
      this.so = "";
    }

  }

  deleteSO(number: number) {
    this.form.activity.social_objectives.splice(number, 1);
  }

  private destroyHandler() {
    this.modalSub.unsubscribe();
  }

  private createHandler() {
    this.modalSub = this.modalService.onHide.subscribe(reason => {
      if (reason || this.bsModalRef.content.canceled) { // Backdrop click
        return;
      }

      let lo = this.transformModalData(this.bsModalRef.content.form);

      if (this.currentEditing !== -1) {
        this.form.activity.learning_objectives[this.currentEditing] = lo;
        this.currentEditing = -1;
      } else {
        this.form.activity.learning_objectives.push(lo);
      }

    });
  }

  private setupModal() : BsModalRef {
    let ref = this.modalService.show(CreateLearningobjectiveComponent, {class: 'modal-lg'});
    ref.content.behaviour_cat = this.behaviour_cat;
    return ref;
  }

  isInvalid(field: any): boolean {
    return field.invalid && (field.dirty || field.touched);
  }

  private transformModalData(data: any) {
    return data;
  }

  private populateForm() {
    this.loading = true;
    this.http.get<Project>(`projects/${this.id}`)
    .subscribe(data => {
      this.sanitize(data);
      this.form = data;
      this.loading = false;
    }, err => this.handleError(err));
  }

  private handleError(err: HttpErrorResponse) {
    if (err.status === 404) {
      this.toastr.error("The specified project doesn\'t exist.", "Error");
      this.router.navigate(['/projects']);
      return;
    }

    if (this.loading) {
      this.loading = false;
    }

    this.toastr.error(err.error.message, 'Erro');
  }

  private sanitize(data) {
    delete data._id;
    delete data.project_manager;
    delete data.date;
    delete data.activity._id;
    delete data.activity.learning_objectives._id;
    delete data.__v;
    return data;
  }


}