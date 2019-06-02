import { Component, OnInit, OnDestroy } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { Subscription } from 'rxjs/Subscription';

import { CreateLearningobjectiveComponent } from '../../../dialogs/create-learningobjective/create-learningobjective.component';

import { Attributes, LearningObjective, Technique, Structure } from '../../../models/index';

import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';

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

  delivery_modes    : Array<any> = [];
  interactions      : Array<any> = [];
  reso_scopes       : Array<any> = [];
  social_obvj       : Array<any> = [];
  behaviour_cat     : Array<any> = [];
  affective         : Array<any> = [];
  social            : Array<any> = [];
  task_types        : Array<any> = [];
  assess            : Array<any> = ["High", "Medium", "Low", "None"];

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
    private http: HttpClient,
    private activeRoute   : ActivatedRoute,
    private toastr        : ToastrService,
    private modalService  : BsModalService,
    private router        : Router,
    private fb            : FormBuilder
  ) { }

  ngOnInit() {

    this.createHandler();

    this.getAttributes();

    //this.form.structure.modules.splice(0, 1);

    this.techniqueStruct = this.fb.group({
      'modules': this.fb.array([
        this.initMod()
      ])
    });

    this.sub = this.activeRoute.params.subscribe(params => {
      this.id = params['id'];
      this.populateForm();
    });

  }

  ngOnDestroy() {
    this.destroyHandler();
  }




  delivery_mode(event) {
    if(event.checked) {
      this.form.delivery_mode.push(event.source.value)
    } else {
      this.form.delivery_mode = this.form.delivery_mode.filter(item => item.valueOf() !== event.source.value);
    }
  }

  interaction(event) {
    if(event.checked) {
      this.form.interaction.push(event.source.value)
    } else {
      this.form.interaction = this.form.interaction.filter(item => item.valueOf() !== event.source.value);
    }
  }

  interrelationship(event) {
    if(event.checked) {
      this.form.interrelationship.push(event.source.value)
    } else {
      this.form.interrelationship = this.form.interrelationship.filter(item => item.valueOf() !== event.source.value);
    }
  }

  motivation(event) {
    if(event.checked) {
      this.form.motivation.push(event.source.value)
    } else {
      this.form.motivation = this.form.motivation.filter(item => item.valueOf() !== event.source.value);
    }
  }

  participation(event) {
    if(event.checked) {
      this.form.participation.push(event.source.value)
    } else {
      this.form.participation = this.form.participation.filter(item => item.valueOf() !== event.source.value);
    }
  }

  performance(event) {
    if(event.checked) {
      this.form.performance.push(event.source.value)
    } else {
      this.form.performance = this.form.performance.filter(item => item.valueOf() !== event.source.value);
    }
  }

  resolution_scope(event) {
    if(event.checked) {
      this.form.resolution_scope.push(event.source.value)
    } else {
      this.form.resolution_scope = this.form.resolution_scope.filter(item => item.valueOf() !== event.source.value);
    }
  }

  feedback_use(event) {
    if(event.checked) {
      this.form.feedback_use.push(event.source.value)
    } else {
      this.form.feedback_use = this.form.feedback_use.filter(item => item.valueOf() !== event.source.value);
    }
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

    this.form.structure = Object.assign({}, this.techniqueStruct.value);

    this.http.put<Technique>(`techniques/${this.id}`, this.form).subscribe(
      response => {
        this.toastr.success('Technique successfully edited.', 'Success');
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

        this.behaviour_cat = response.map(response => response['behaviour']);
        this.behaviour_cat = ([].concat.apply([], this.behaviour_cat)).sort();

        this.affective = response.map(response => response['affective_objectives']);
        this.affective = ([].concat.apply([], this.affective)).sort();

        this.social = response.map(response => response['social_objectives']);
        this.social = ([].concat.apply([], this.social)).sort();

        this.task_types = response.map(response => response['task_types']);
        this.task_types = ([].concat.apply([], this.task_types)).sort();

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

  private populateForm() {
    this.loading = true;
    this.http.get<Technique>(`techniques/${this.id}`)
    .subscribe(data => {
      this.form = data;
      for (let mod of this.form.structure.modules) {
        this.sanitize(mod);
        for (let pha of mod.phases) {
          this.sanitize(pha);
          for (let task of pha.tasks) {
              this.sanitize(task);
          }
        }
      }
      // for (let mod of this.form.structure.modules) {
      //   this.techniqueStruct.controls['modules'].patchValue({
      //     name: mod.name,
      //     phases: mod.phases
      //   });
      //
      // }
      this.techniqueStruct.patchValue(this.form.structure);
      console.log(this.form);
      this.loading = false;
    },
    err => this.handleError(err));

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

  private sanitize(data) {
    delete data._id;
    delete data.__v;
    return data;
  }





}
