import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivitiesRoutingModule } from './activities-routing.module';

import { ActivitiesComponent } from './activities.component';
import { CreateActivitiesComponent } from './create-activities/create-activities.component';

import { SharedModule } from '../../shared/shared.module';
import { EditActivitiesComponent } from './edit-activities/edit-activities.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [ActivitiesComponent, CreateActivitiesComponent, EditActivitiesComponent],
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    SharedModule,
    SweetAlert2Module
  ]
})
export class ActivitiesModule { }
