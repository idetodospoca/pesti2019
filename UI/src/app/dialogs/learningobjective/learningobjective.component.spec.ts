import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningobjectiveComponent } from './learningobjective.component';

describe('LearningobjectiveComponent', () => {
  let component: LearningobjectiveComponent;
  let fixture: ComponentFixture<LearningobjectiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningobjectiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningobjectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
