import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAttributesComponent } from './create-attributes.component';

describe('CreateAttributesComponent', () => {
  let component: CreateAttributesComponent;
  let fixture: ComponentFixture<CreateAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAttributesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
