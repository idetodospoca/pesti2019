import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyActivitiesComponent } from './copy-activities.component';

describe('CopyActivitiesComponent', () => {
  let component: CopyActivitiesComponent;
  let fixture: ComponentFixture<CopyActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopyActivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
