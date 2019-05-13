import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Attributes } from '../../../models';
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
  form            : Partial<Attributes> = {
    delivery_mode         : [],
    interaction           : [],
    resolution_scope      : [],
    behaviour             : [],
    affective_objectives  : [],
    social_objectives     : [],
    task_types            : []
  };

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

    this.http.post<Attributes>(`attributes`, this.form).subscribe(
      response => {
        this.toastr.success('Attributes successfully added.', 'Success');
      },
      err => this.handleError(err)
    );
    this.router.navigate(['/']);

  }

  showHelp() {
    let dialog = this.dialog.open(CreateAttributesHelpComponent);
  }

  addDelivery() {
    if (this.form.delivery_mode.filter(dm => dm.name === this.delivery_mode).length > 0) {
      this.toastr.error('This option has already been added.', 'Error');
    } else {
      let DeliveryMode = {name: this.delivery_mode};
      this.form.delivery_mode.push(DeliveryMode);
    }

    this.delivery_mode = "";
  }

  addInteraction() {
    if (this.form.interaction.filter(it => it.name === this.interaction).length > 0) {
      this.toastr.error('This option has already been added.', 'Error');
    } else {
      let Interaction = {name: this.interaction};
      this.form.interaction.push(Interaction);
    }

    this.interaction = "";
  }

  addResolution() {
    if (this.form.resolution_scope.filter(rs => rs.name === this.resolution_scope).length > 0) {
      this.toastr.error('This option has already been added.', 'Error');
    } else {
      let Resolution = {name: this.resolution_scope};
      this.form.resolution_scope.push(Resolution);
    }

    this.resolution_scope = "";
  }

  addSocial() {
    if (this.form.social_objectives.filter(so => so.name === this.social_objectives).length > 0) {
      this.toastr.error('This option has already been added.', 'Error');
    } else {
      let SocialObjective = {name: this.social_objectives};
      this.form.social_objectives.push(SocialObjective);
    }

    this.social_objectives = "";
  }

  addBehaviour() {
    if (this.form.behaviour.filter(bh => bh.category === this.behaviour_category && bh.verb === this.behaviour_verb).length > 0) {
      this.toastr.error('This option has already been added.', 'Error');
    } else {
      let Behaviour = {category: this.behaviour_category, verb: this.behaviour_verb};
      this.form.behaviour.push(Behaviour);
    }

    this.behaviour_verb = "";
  }

  addAffective() {
    if (this.form.affective_objectives.filter(af => af.category === this.affective_category && af.verb === this.affective_verb).length > 0) {
      this.toastr.error('This option has already been added.', 'Error');
    } else {
      let AffectiveObjective = {category: this.affective_category, verb: this.affective_verb};
      this.form.affective_objectives.push(AffectiveObjective);
    }

    this.affective_verb = "";
  }

  addTask() {
    if (this.form.task_types.filter(tt => tt.category === this.task_category && tt.verb === this.task_verb).length > 0) {
      this.toastr.error('This option has already been added.', 'Error');
    } else {
      let TaskType = {category: this.task_category, verb: this.task_verb};
      this.form.task_types.push(TaskType);
    }

    this.task_category = "";
    this.task_verb = "";
  }

  deleteDM(number: number) {
    this.form.delivery_mode.splice(number, 1);
  }

  deleteINT(number: number) {
    this.form.interaction.splice(number, 1);
  }

  deleteBH(number: number) {
    this.form.behaviour.splice(number, 1);
  }

  deleteRS(number: number) {
    this.form.resolution_scope.splice(number, 1);
  }

  deleteSO(number: number) {
    this.form.social_objectives.splice(number, 1);
  }

  deleteAO(number: number) {
    this.form.affective_objectives.splice(number, 1);
  }

  deleteTT(number: number) {
    this.form.task_types.splice(number, 1);
  }

  private handleError(err) {
    this.toastr.error(err.error.message, 'Error');
  }

}
