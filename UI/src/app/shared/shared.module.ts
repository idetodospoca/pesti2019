import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsModule, ModalModule, BsDropdownModule, BsDatepickerModule, TooltipModule } from 'ngx-bootstrap';
@NgModule({
  declarations: [],
  imports:      [
    CommonModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
  ],
  exports:      [
    CommonModule,
    FormsModule,
    BsDropdownModule,
    BsDatepickerModule,
    TabsModule,
    ModalModule,
    TooltipModule
  ]
})
export class SharedModule { }
