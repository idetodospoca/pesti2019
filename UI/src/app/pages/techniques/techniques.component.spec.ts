import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechniquesComponent } from './techniques.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TechniquesComponent', () => {
  let component: TechniquesComponent;
  let fixture: ComponentFixture<TechniquesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ TechniquesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechniquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
