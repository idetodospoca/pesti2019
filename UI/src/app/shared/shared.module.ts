import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsModule, ModalModule, BsDropdownModule, BsDatepickerModule, TooltipModule } from 'ngx-bootstrap';

import { MatButtonModule, MatCheckboxModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatCardModule, MatTableModule } from '@angular/material';
// import {} from '@angular/material/input';
// import {} from '@angular/material/form-field';

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
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
    MatTableModule
  ],
  exports:      [
    CommonModule,
    FormsModule,
    BsDropdownModule,
    BsDatepickerModule,
    TabsModule,
    ModalModule,
    TooltipModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
    MatTableModule
  ]
})
export class SharedModule { }
