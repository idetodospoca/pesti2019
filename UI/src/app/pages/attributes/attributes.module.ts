import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttributesRoutingModule } from './attributes-routing.module';

import { AttributesComponent } from './attributes.component';
import { CreateAttributesComponent } from './create-attributes/create-attributes.component';

import { SharedModule } from '../../shared/shared.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [AttributesComponent, CreateAttributesComponent],
  imports: [
    CommonModule,
    AttributesRoutingModule,
    SharedModule,
    SweetAlert2Module
  ]
})
export class AttributesModule { }
