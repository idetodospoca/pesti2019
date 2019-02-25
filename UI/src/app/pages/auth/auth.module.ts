import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [ AuthRoutingModule, SharedModule ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthModule { }
