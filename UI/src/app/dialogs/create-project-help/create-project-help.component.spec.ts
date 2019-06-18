import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProjectHelpComponent } from './create-project-help.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CreateProjectHelpComponent', () => {
  let component: CreateProjectHelpComponent;
  let fixture: ComponentFixture<CreateProjectHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ CreateProjectHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProjectHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
