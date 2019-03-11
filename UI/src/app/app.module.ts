import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


// Shared components
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';


// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';

// Http interceptors
import { TokenInterceptor } from './interceptors/token.interceptor';

// Services
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';


import { SharedModule } from './shared/shared.module';

import { LearningobjectiveComponent } from './dialogs/learningobjective/learningobjective.component';
import { CreateLearningobjectiveComponent } from './dialogs/create-learningobjective/create-learningobjective.component';

@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    SimpleLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    LearningobjectiveComponent,
    CreateLearningobjectiveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthService,
    AuthGuard
  ],
  entryComponents: [
    LearningobjectiveComponent,
    CreateLearningobjectiveComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
