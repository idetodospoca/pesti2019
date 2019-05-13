import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAttributesHelpComponent } from './create-attributes-help.component';

describe('CreateAttributesHelpComponent', () => {
  let component: CreateAttributesHelpComponent;
  let fixture: ComponentFixture<CreateAttributesHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
