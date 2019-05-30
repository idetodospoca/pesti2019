import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsModule, ModalModule, BsDropdownModule, BsDatepickerModule, TooltipModule } from 'ngx-bootstrap';
import { FormatDatePipe } from './pipes/format-date/format-date.pipe';
import { MatButtonModule, MatCheckboxModule, MatSelectModule,
  MatInputModule, MatFormFieldModule, MatCardModule,
  MatTableModule, MatSortModule, MatProgressSpinnerModule,
  MatTooltipModule, MatExpansionModule, MatDialogModule,
  MatListModule, MatStepperModule, MatIconModule,
  MatRadioModule, MatProgressBarModule } from '@angular/material';



@NgModule({
  declarations: [
    FormatDatePipe,
  ],
  imports:      [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
    MatListModule,
    MatStepperModule,
    MatIconModule,
    MatRadioModule,
    MatProgressBarModule
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
    MatStepperModule,
    MatIconModule,
    MatRadioModule,
    MatProgressBarModule,
    FormatDatePipe
  ]
})
export class SharedModule { }
