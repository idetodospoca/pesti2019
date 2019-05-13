import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsModule, ModalModule, BsDropdownModule, BsDatepickerModule, TooltipModule } from 'ngx-bootstrap';
import { FormatDatePipe } from './pipes/format-date/format-date.pipe';
import { MatButtonModule, MatCheckboxModule, MatSelectModule,
  MatInputModule, MatFormFieldModule, MatCardModule,
  MatTableModule, MatSortModule, MatProgressSpinnerModule,
  MatTooltipModule, MatExpansionModule, MatDialogModule,
MatListModule } from '@angular/material';



@NgModule({
  declarations: [
    FormatDatePipe
  ],
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
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatExpansionModule,
    MatDialogModule,
    MatListModule
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
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatExpansionModule,
    MatDialogModule,
    MatListModule,
    FormatDatePipe
  ]
})
export class SharedModule { }
