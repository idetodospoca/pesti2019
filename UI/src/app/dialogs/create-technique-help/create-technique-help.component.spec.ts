import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTechniqueHelpComponent } from './create-technique-help.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CreateTechniqueHelpComponent', () => {
  let component: CreateTechniqueHelpComponent;
  let fixture: ComponentFixture<CreateTechniqueHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ CreateTechniqueHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTechniqueHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
