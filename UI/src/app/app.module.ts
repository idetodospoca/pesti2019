import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



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

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { CreateLearningobjectiveComponent } from './dialogs/create-learningobjective/create-learningobjective.component';
import { CreateAttributesHelpComponent } from './dialogs/create-attributes-help/create-attributes-help.component';
import { CreateProjectHelpComponent } from './dialogs/create-project-help/create-project-help.component';
import { TechniqueDetailsComponent } from './dialogs/technique-details/technique-details.component';
import { CreateTechniqueHelpComponent } from './dialogs/create-technique-help/create-technique-help.component';

@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    SimpleLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    CreateLearningobjectiveComponent,
    CreateAttributesHelpComponent,
    CreateProjectHelpComponent,
    TechniqueDetailsComponent,
    CreateTechniqueHelpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right'
    }),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
    })
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
    CreateLearningobjectiveComponent,
    CreateAttributesHelpComponent,
    CreateProjectHelpComponent,
    TechniqueDetailsComponent,
    CreateTechniqueHelpComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
