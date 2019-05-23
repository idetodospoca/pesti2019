import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechniquesRoutingModule } from './techniques-routing.module';

import { TechniquesComponent } from './techniques.component';
import { CreateTechniqueComponent } from './create-technique/create-technique.component';

import { SharedModule } from '../../shared/shared.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditTechniquesComponent } from './edit-techniques/edit-techniques.component';


@NgModule({
  declarations: [TechniquesComponent, CreateTechniqueComponent, EditTechniquesComponent],
  imports: [
    CommonModule,
    TechniquesRoutingModule,
    SharedModule,
    SweetAlert2Module,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TechniquesModule { }
