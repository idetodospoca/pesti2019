import { Component, OnInit, OnDestroy } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { CreateLearningobjectiveComponent } from '../../../dialogs/create-learningobjective/create-learningobjective.component';

import { Attributes, LearningObjective, Technique, Structure } from '../../../models/index';

import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-create-technique',
  templateUrl: './create-technique.component.html',
  styleUrls: ['./create-technique.component.scss']
})
export class CreateTechniqueComponent implements OnInit, OnDestroy {

  loading         : boolean = false;
  currentEditing  : number = -1;

  bsModalRef      : BsModalRef;
  modalSub        : Subscription;

  delivery_modes    : Array<any> = [];
  interactions      : Array<any> = [];
  reso_scopes       : Array<any> = [];
  social_obvj       : Array<any> = [];
  behaviour_cat     : Array<any> = [];
  affective         : Array<any> = [];
  social            : Array<any> = [];

  form  : Partial<Technique> = {
    name                  : "",
    description           : "",
    rules                 : [],
    delivery_mode         : [],
    interaction           : [],
    interrelationship     : [],
    motivation            : [],
    participation         : [],
    performance           : [],
    resolution_scope      : [],
    feedback_use          : [],
    target_audience       : [],
    learning_objectives   : [],
    affective_objectives  : [],
    social_objectives     : [],
    structure             : {
      modules: [{
        name: "",
        phases: [{
          name: "",
          tasks: []
        }]
      }]
    }
  };

  techniqueStruct : FormGroup;



  rule            : string = "";
  delivery        : string = "";
  interact        : string = "";
  interrelation   : string = "";
  motiv           : string = "";
  particip        : string = "";
  perform         : string = "";
  scope           : string = "";
  feedback        : string = "";
  target          : number = 5;

  ao : string = "";
  so : string = "";

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.createHandler();

    this.getAttributes();

    this.form.structure.modules.splice(0, 1);

    this.techniqueStruct = this.fb.group({
      'modules': this.fb.array([
        this.initMod()
      ])
    });

  }

  ngOnDestroy() {
    this.destroyHandler();
  }

  initMod() {
    return this.fb.group({
      'name': ['', [Validators.required]],
      'phases': this.fb.array([
        this.initPhase()
      ])
    });
  }

  initPhase() {
    return this.fb.group({
      'name': ['', [Validators.required]],
      'tasks': this.fb.array([
        this.initTask()
      ])
    });
  }

  initTask() {
    return this.fb.group({
      'type': '',
      'description': '',
      'role': '',
      'resources': []
    })
  }


  addMod() {
    const control = <FormArray>this.techniqueStruct.controls['modules'];
    control.push(this.initMod());
  }

  addPhase(imod) {
    const control = (<FormArray>this.techniqueStruct.controls['modules']).at(imod).get('phases') as FormArray;
    control.push(this.initPhase());
  }

  addTask(imod, ipha) {
    const control = ((<FormArray>this.techniqueStruct.controls['modules']).at(imod).get('phases') as FormArray).at(ipha).get('tasks') as FormArray;
    control.push(this.initTask());
  }



  assignStruct() {
    this.form.structure = Object.assign({}, this.techniqueStruct.value);
  }


  create() {

    this.form.structure = Object.assign({}, this.techniqueStruct.value);

    this.http.post<Technique>(`techniques`, this.form).subscribe(
      response => {
        this.toastr.success('Technique successfully created.', 'Success');
        this.router.navigate(['/']);
      },
      err => this.handleError(err)
    );

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

        this.behaviour_cat = response.map(response => response['behaviour'].map(res => res.verb));
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


  addField(field: any) {

    if  (this.form[field.name].includes(field.value)) {
      this.toastr.error('This option has already been added.', 'Error');
    } else {
      this.form[field.name].push(field.value);
    }

  }

  removeField(number: number, field: any) {
    this.form[field.name].splice(number, 1);
  }


  addLearningObjective() {
    this.bsModalRef = this.setupModal();
  }

  deleteLO(number: number) {
    this.form.learning_objectives.splice(number, 1);
  }

  editLO(number: number) {
    this.currentEditing = number;
    let p = this.form.learning_objectives[number];
    // Launch the modal
    this.bsModalRef = this.setupModal();


    // Update the fields in the modal
    for (let property of Object.keys(p)){
      this.bsModalRef.content.form[property] = p[property];
    }
  }

  addAffectiveObjective() {
    if  (this.form.affective_objectives.includes(this.ao)) {
      this.toastr.error('This option has already been added.', 'Error');
    } else {
      this.form.affective_objectives.push(this.ao);
      this.ao = "";
    }

  }


  deleteAO(number: number) {
    this.form.affective_objectives.splice(number, 1);
  }

  addSocialObjective() {
    if  (this.form.social_objectives.includes(this.so)) {
      this.toastr.error('This option has already been added.', 'Error');
    } else {
      this.form.social_objectives.push(this.so);
      this.so = "";
    }

  }


  deleteSO(number: number) {
    this.form.social_objectives.splice(number, 1);
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
        this.form.learning_objectives[this.currentEditing] = lo;
        this.currentEditing = -1;
      } else {
        this.form.learning_objectives.push(lo);
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


  private handleError(err) {
    this.toastr.error(err.error.message, 'Error');
  }

  invalidForm(): boolean {
    if (this.form.rules.length == 0 || this.form.delivery_mode.length == 0 || this.form.interaction.length == 0 ||
      this.form.interrelationship.length == 0 || this.form.motivation.length == 0 || this.form.participation.length == 0
      || this.form.performance.length == 0 || this.form.resolution_scope.length == 0 || this.form.feedback_use.length == 0
      || this.form.target_audience.length == 0 || this.form.learning_objectives.length == 0)
      {
        return true;
      }

    }



  }