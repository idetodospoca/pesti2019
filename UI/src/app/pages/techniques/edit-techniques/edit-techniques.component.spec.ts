import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTechniquesComponent } from './edit-techniques.component';

describe('EditTechniquesComponent', () => {
  let component: EditTechniquesComponent;
  let fixture: ComponentFixture<EditTechniquesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTechniquesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTechniquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
