import { Component, OnInit, OnDestroy } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { Subscription } from 'rxjs/Subscription';

import { CreateLearningobjectiveComponent } from '../../../dialogs/create-learningobjective/create-learningobjective.component';

import { DeliveryMode, ResolutionScope, Interaction, SocialObjective, Behaviour, AffectiveObjective, Technique, TaskType } from '../../../models';

import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { CreateTechniqueHelpComponent } from 'src/app/dialogs/create-technique-help/create-technique-help.component';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'app-edit-techniques',
  templateUrl: './edit-techniques.component.html',
  styleUrls: ['./edit-techniques.component.scss']
})
export class EditTechniquesComponent implements OnInit, OnDestroy {
  loading         : boolean = false;
  currentEditing  : number = -1;

  bsModalRef      : BsModalRef;
  modalSub        : Subscription;
  sub             : Subscription;       // The route subscription object to handle params received in the url
  id              : string;             // Id received in the url

  delivery_modes    : Array<DeliveryMode> = [];
  interactions      : Array<Interaction> = [];
  reso_scopes       : Array<ResolutionScope> = [];
  social_obvj       : Array<SocialObjective> = [];
  behaviour_cat     : Array<Behaviour> = [];
  affective         : Array<AffectiveObjective> = [];
  social            : Array<SocialObjective> = [];
  task_types        : Array<TaskType> = [];
  assess            : Array<String> = ["High", "Medium", "Low", "None"];

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
    structure             : null
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
    private http          : HttpClient,
    private activeRoute   : ActivatedRoute,
    private toastr        : ToastrService,
    private modalService  : BsModalService,
    private router        : Router,
    private fb            : FormBuilder,
    public dialog         : MatDialog
  ) { }

  ngOnInit() {

    this.createHandler();

    this.getAttributes();

    this.techniqueStruct = this.fb.group({
      'modules': this.fb.array([
        this.initMod()
      ])
    });

    setTimeout(() => this.sub = this.activeRoute.params.subscribe(params => {
      this.id = params['id'];
      this.populateForm();
    }));

  }

  ngOnDestroy() {
    this.destroyHandler();
  }

  showHelp() {
    this.dialog.open(CreateTechniqueHelpComponent);
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

  deleteMod(index) {
    let control = <FormArray>this.techniqueStruct.controls['modules'];
    control.removeAt(index)
  }

  deletePhase(imod, ipha) {
    const control = (<FormArray>this.techniqueStruct.controls['modules']).at(imod).get('phases') as FormArray;
    control.removeAt(ipha);
  }

  deleteTask(imod, ipha, itask) {
    const control = ((<FormArray>this.techniqueStruct.controls['modules']).at(imod).get('phases') as FormArray).at(ipha).get('tasks') as FormArray;
    control.removeAt(itask);
  }



  assignStruct() {
    this.form.structure = Object.assign({}, this.techniqueStruct.value);
  }


  create() {

    if ((<FormArray>this.techniqueStruct.controls['modules']).length == 0) {
      this.toastr.error('At least one module must be defined.', 'Error');
      return;
    }

    if (this.form.rules.length == 0) {
      this.toastr.error('At least one rule must be defined.', 'Error');
      return;
    }

    if (this.form.target_audience.length == 0) {
      this.toastr.error('At least one target audience must be defined.', 'Error');
      return;
    }

    if (this.form.delivery_mode.length == 0) {
      this.toastr.error('At least one delivery mode must be chosen.', 'Error');
      return;
    }

    if (this.form.resolution_scope.length == 0) {
      this.toastr.error('At least one resolution scope must be chosen.', 'Error');
      return;
    }

    if (this.form.interaction.length == 0) {
      this.toastr.error('At least one interaction must be chosen.', 'Error');
      return;
    }

    if (this.form.feedback_use.length == 0) {
      this.toastr.error('At least one feedback use must be defined.', 'Error');
      return;
    }

    if (this.form.interaction.length == 0) {
      this.toastr.error('At least one interaction must be chosen.', 'Error');
      return;
    }

    if (this.form.interrelationship.length == 0) {
      this.toastr.error('At least one interrelationship must be chosen.', 'Error');
      return;
    }

    if (this.form.motivation.length == 0) {
      this.toastr.error('At least one motivation must be chosen.', 'Error');
      return;
    }

    if (this.form.participation.length == 0) {
      this.toastr.error('At least one participation must be chosen.', 'Error');
      return;
    }

    if (this.form.performance.length == 0) {
      this.toastr.error('At least one performance must be chosen.', 'Error');
      return;
    }

    if (this.form.learning_objectives.length == 0) {
      this.toastr.error('At least one learning objective must be defined.', 'Error');
      return;
    }

    
    this.form.structure = Object.assign({}, this.techniqueStruct.value);
    this.http.put<Technique>(`techniques/${this.id}`, this.form).subscribe(
      response => {
        this.toastr.success('Technique successfully edited.', 'Success');
        this.router.navigate(['/techniques']);
      },
      err => this.handleError(err)
    );


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
        this.http.get<TaskType[]>('attributes/task')
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

  private populateForm() {
    this.loading = true;
    this.http.get<Technique>(`techniques/${this.id}`)
    .subscribe(data => {
      this.form = data;

      //Sanitize structure
      for (let mod of this.form.structure.modules) {
        this.sanitize(mod);
        for (let pha of mod.phases) {
          this.sanitize(pha);
          for (let task of pha.tasks) {
              this.sanitize(task);
          }
        }
      }

      // Populate form structure
      // Add extra modules
      for (let imod = 0; imod < (this.form.structure.modules.length)-1; imod++) {
        this.addMod();
      }

      // For every module, check for extra phases, for each phase, check for extra tasks
      for (let imod = 0; imod < this.form.structure.modules.length; imod++) {
        if (this.form.structure.modules[imod].phases.length > 1) {
          for (let ipha = 0; ipha < (this.form.structure.modules[imod].phases.length) -1; ipha++) {
              this.addPhase(imod);
              if (this.form.structure.modules[imod].phases[ipha].tasks.length > 1) {
                for (let itask = 0; itask < (this.form.structure.modules[imod].phases[ipha].tasks.length) -1; itask++) {
                    this.addTask(imod, ipha);
                }
              }
          }
        } else { // Special case when having 1 mod, 1 pha but multiple tasks
          for (let ipha = 0; ipha < this.form.structure.modules[imod].phases.length; ipha++) {
            if (this.form.structure.modules[imod].phases[ipha].tasks.length > 1) {
                this.addTask(imod, ipha);
            }
          }
        }
      }
      this.techniqueStruct.patchValue(this.form.structure);

      this.loading = false;
    },
    err => this.handleError(err));

  }

  private handleError(err) {
    this.toastr.error(err.error.message, 'Error');
  }


  private sanitize(data) {
    delete data._id;
    delete data.__v;
    return data;
  }

}
