import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLearningobjectiveComponent } from './create-learningobjective.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CreateLearningobjectiveComponent', () => {
  let component: CreateLearningobjectiveComponent;
  let fixture: ComponentFixture<CreateLearningobjectiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ CreateLearningobjectiveComponent ]
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
