import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProjectHelpComponent } from './create-project-help.component';

describe('CreateProjectHelpComponent', () => {
  let component: CreateProjectHelpComponent;
  let fixture: ComponentFixture<CreateProjectHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
