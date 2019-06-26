import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { DeliveryMode, ResolutionScope, Interaction, SocialObjective, Behaviour, AffectiveObjective, TaskType } from '../../../models';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { CreateAttributesHelpComponent } from '../../../dialogs/create-attributes-help/create-attributes-help.component';




@Component({
  selector: 'app-create-attributes',
  templateUrl: './create-attributes.component.html',
  styleUrls: ['./create-attributes.component.scss']
})
export class CreateAttributesComponent implements OnInit {

  loading        : boolean = false;

  delivery_modes    : Array<any> = [];
  interactions      : Array<any> = [];
  reso_scopes       : Array<any> = [];
  social_obvj       : Array<any> = [];
  behaviour_cat     : Array<any> = [];
  affective         : Array<any> = [];
  social            : Array<any> = [];
  task_types        : Array<any> = [];

  behaviour_verb      : string = "";
  behaviour_category  : string = "";
  affective_category  : string = "";
  affective_verb      : string = "";
  task_category       : string = "";
  task_verb           : string = "";
  delivery_mode       : string = "";
  interaction         : string = "";
  resolution_scope    : string = "";
  social_objectives   : string = "";


  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {

  }

  create() {

    if (this.delivery_modes.length > 0) {
      for (let item of this.delivery_modes) {
        this.http.post<DeliveryMode>('attributes/deliverymode', item).subscribe(
          response => {
            this.router.navigate(['/attributes']);
          },
          err => this.handleError(err)
        );
      }
    }

    if (this.interactions.length > 0) {
      for (let item of this.interactions) {
        this.http.post<Interaction>('attributes/interaction', item).subscribe(
          response => {
            this.router.navigate(['/attributes']);
          },
          err => this.handleError(err)
        );
      }
    }

    if (this.reso_scopes.length > 0) {
      for (let item of this.reso_scopes) {
        this.http.post<DeliveryMode>('attributes/resolutionscope', item).subscribe(
          response => {
            this.router.navigate(['/attributes']);
          },
          err => this.handleError(err)
        );
      }
    }

    if (this.behaviour_cat.length > 0) {
      for (let item of this.behaviour_cat) {
        this.http.post<Behaviour>('attributes/behaviour', item).subscribe(
          response => {
            this.router.navigate(['/attributes']);
          },
          err => this.handleError(err)
        );
      }
    }

    if (this.affective.length > 0) {
      for (let item of this.affective) {
        this.http.post<AffectiveObjective>('attributes/affective', item).subscribe(
          response => {
            this.router.navigate(['/attributes']);
          },
          err => this.handleError(err)
        );
      }
    }

    if (this.social.length > 0) {
      for (let item of this.social) {
        this.http.post<SocialObjective>('attributes/social', item).subscribe(
          response => {
            this.router.navigate(['/attributes']);
          },
          err => this.handleError(err)
        );
      }
    }

    if (this.task_types.length > 0) {
      for (let item of this.task_types) {
        this.http.post<TaskType>('attributes/task', item).subscribe(
          response => {
            this.router.navigate(['/attributes']);
          },
          err => this.handleError(err)
        );
      }
    }
  }


  showHelp() {
    let dialog = this.dialog.open(CreateAttributesHelpComponent);
  }

  addDelivery() {
    if (this.delivery_modes.filter(dm => dm.name === this.delivery_mode).length > 0) {
      this.toastr.error('This option has already been added.', 'Error');
    } else {
      let DeliveryMode = {name: this.delivery_mode};
      this.delivery_modes.push(DeliveryMode);
    }

    this.delivery_mode = "";
  }

  addInteraction() {
    if (this.interactions.filter(it => it.name === this.interaction).length > 0) {
      this.toastr.error('This option has already been added.', 'Error');
    } else {
      let Interaction = {name: this.interaction};
      this.interactions.push(Interaction);
    }

    this.interaction = "";
  }

  addResolution() {
    if (this.reso_scopes.filter(rs => rs.name === this.resolution_scope).length > 0) {
      this.toastr.error('This option has already been added.', 'Error');
    } else {
      let Resolution = {name: this.resolution_scope};
      this.reso_scopes.push(Resolution);
    }

    this.resolution_scope = "";
  }

  addSocial() {
    if (this.social.filter(so => so.name === this.social_objectives).length > 0) {
      this.toastr.error('This option has already been added.', 'Error');
    } else {
      let SocialObjective = {name: this.social_objectives};
      this.social.push(SocialObjective);
    }

    this.social_objectives = "";
  }

  addBehaviour() {
    if (this.behaviour_cat.filter(bh => bh.category === this.behaviour_category && bh.verb === this.behaviour_verb).length > 0) {
      this.toastr.error('This option has already been added.', 'Error');
    } else {
      let Behaviour = {category: this.behaviour_category, verb: this.behaviour_verb};
      this.behaviour_cat.push(Behaviour);
    }

    this.behaviour_verb = "";
  }

  addAffective() {
    if (this.affective.filter(af => af.category === this.affective_category && af.verb === this.affective_verb).length > 0) {
      this.toastr.error('This option has already been added.', 'Error');
    } else {
      let AffectiveObjective = {category: this.affective_category, verb: this.affective_verb};
      this.affective.push(AffectiveObjective);
    }

    this.affective_verb = "";
  }

  addTask() {
    if (this.task_types.filter(tt => tt.category === this.task_category && tt.verb === this.task_verb).length > 0) {
      this.toastr.error('This option has already been added.', 'Error');
    } else {
      let TaskType = {category: this.task_category, verb: this.task_verb};
      this.task_types.push(TaskType);
    }

    this.task_category = "";
    this.task_verb = "";
  }

  deleteDM(number: number) {
    this.delivery_modes.splice(number, 1);
  }

  deleteINT(number: number) {
    this.interactions.splice(number, 1);
  }

  deleteBH(number: number) {
    this.behaviour_cat.splice(number, 1);
  }

  deleteRS(number: number) {
    this.reso_scopes.splice(number, 1);
  }

  deleteSO(number: number) {
    this.social.splice(number, 1);
  }

  deleteAO(number: number) {
    this.affective.splice(number, 1);
  }

  deleteTT(number: number) {
    this.task_types.splice(number, 1);
  }

  private handleError(err) {
    this.toastr.error(err.error.message, 'Error');
  }

}
