import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechniqueDetailsComponent } from './technique-details.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

describe('TechniqueDetailsComponent', () => {
  let component: TechniqueDetailsComponent;
  let fixture: ComponentFixture<TechniqueDetailsComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechniqueDetailsComponent ],
      providers: [ { provide: MAT_DIALOG_DATA, useValue: [] } ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechniqueDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
