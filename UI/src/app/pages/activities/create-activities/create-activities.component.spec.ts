import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActivitiesComponent } from './create-activities.component';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatCardModule, MatDialogModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatRadioModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('CreateActivitiesComponent', () => {
  let component: CreateActivitiesComponent;
  let fixture: ComponentFixture<CreateActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateActivitiesComponent ],
      imports: [ HttpClientTestingModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatRadioModule, MatSelectModule, RouterTestingModule, MatDialogModule, MatCardModule, ModalModule.forRoot() ],
      providers: [ BsModalRef, BsModalService, { provide: ToastrService, useValue: {} } ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
