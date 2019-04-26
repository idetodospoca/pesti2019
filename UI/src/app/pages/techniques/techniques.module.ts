import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechniquesRoutingModule } from './techniques-routing.module';

import { TechniquesComponent } from './techniques.component';
import { CreateTechniqueComponent } from './create-technique/create-technique.component';

import { SharedModule } from '../../shared/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [TechniquesComponent, CreateTechniqueComponent],
  imports: [
    CommonModule,
    TechniquesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TechniquesModule { }
