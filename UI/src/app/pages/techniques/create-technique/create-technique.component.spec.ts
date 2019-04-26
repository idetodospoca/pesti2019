import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTechniqueComponent } from './create-technique.component';

describe('CreateTechniqueComponent', () => {
  let component: CreateTechniqueComponent;
  let fixture: ComponentFixture<CreateTechniqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTechniqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTechniqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
