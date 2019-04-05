import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttributesRoutingModule } from './attributes-routing.module';

import { AttributesComponent } from './attributes.component';
import { CreateAttributesComponent } from './create-attributes/create-attributes.component';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [AttributesComponent, CreateAttributesComponent],
  imports: [
    CommonModule,
    AttributesRoutingModule,
    SharedModule
  ]
})
export class AttributesModule { }
