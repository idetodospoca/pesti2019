import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLearningobjectiveComponent } from './create-learningobjective.component';

describe('CreateLearningobjectiveComponent', () => {
  let component: CreateLearningobjectiveComponent;
  let fixture: ComponentFixture<CreateLearningobjectiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
