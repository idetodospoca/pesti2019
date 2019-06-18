import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAttributesHelpComponent } from './create-attributes-help.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CreateAttributesHelpComponent', () => {
  let component: CreateAttributesHelpComponent;
  let fixture: ComponentFixture<CreateAttributesHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ CreateAttributesHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAttributesHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
