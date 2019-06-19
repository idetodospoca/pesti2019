import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CreateLearningobjectiveComponent } from './create-learningobjective.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';

describe('CreateLearningobjectiveComponent', () => {
  let component: CreateLearningobjectiveComponent;
  let fixture: ComponentFixture<CreateLearningobjectiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLearningobjectiveComponent ],
      imports: [ HttpClientTestingModule, FormsModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [ { provide: BsModalRef, useValue: {} }, { provide: ToastrService, useValue: {} } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLearningobjectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
