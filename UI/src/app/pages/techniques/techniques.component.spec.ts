import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechniquesComponent } from './techniques.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MatTableModule, MatDialogModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

describe('TechniquesComponent', () => {
  let component: TechniquesComponent;
  let fixture: ComponentFixture<TechniquesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechniquesComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, SweetAlert2Module, MatTableModule, MatDialogModule ],
      providers: [ { provide: ToastrService, useValue: {} }, AuthService ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
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
