import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { MatDialog, ErrorStateMatcher } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

import { Project, DeliveryMode, ResolutionScope, Interaction, SocialObjective, Behaviour, AffectiveObjective } from '../../../models';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CreateProjectHelpComponent } from '../../../dialogs/create-project-help/create-project-help.component';
import { CreateLearningobjectiveComponent } from '../../../dialogs/create-learningobjective/create-learningobjective.component';
import { FormControl, NgForm, FormGroupDirective, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/forkJoin';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

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


  delivery_modes    : Array<DeliveryMode> = [];
  interactions      : Array<Interaction> = [];
  reso_scopes       : Array<ResolutionScope> = [];
  behaviour_cat     : Array<Behaviour> = [];
  affective         : Array<AffectiveObjective> = [];
  social            : Array<SocialObjective> = [];



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
    teachers: [],
    canCopy: true
  };

  ao : string = "";
  so : string = "";

  emailFormControl = new FormControl('', [
    Validators.email
  ]);

  matcher = new MyErrorStateMatcher();

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

    setTimeout(() => this.sub = this.activeRoute.params.subscribe(params => {
      this.id = params['id'];
      this.populateForm();
    }));

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.destroyHandler();
  }

  create() {
    if (this.form.activity.age < 5 ) {
      this.toastr.error('Age needs to be at least 5.', 'Error');
    }

    if (this.form.activity.learning_objectives.length < 1 ) {
      this.toastr.error('At least one learning objective must be defined.', 'Error');
    }

    if (this.form.activity.age > 4 && this.form.activity.learning_objectives.length > 0) {
      this.http.post<Project>(`projects`, this.form).subscribe(
        response => {
          this.toastr.success('Project successfully added.', 'Success');
          this.router.navigate(['/projects']);
        },
        err => this.handleError(err)
      );

    }

  }

  showHelp() {
    this.dialog.open(CreateProjectHelpComponent);
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
    )
    .subscribe(response => {
      this.delivery_modes = response[0];
      this.reso_scopes    = response[1];
      this.interactions   = response[2];
      this.behaviour_cat  = response[3];
      this.affective      = response[4];
      this.social         = response[5];

      this.loading = false;
    }, err => this.handleError(err));
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
      this.form.teachers = [];
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
    delete data.techniques;
    delete data.status;
    return data;
  }


}
