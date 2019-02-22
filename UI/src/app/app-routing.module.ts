import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { P404Component } from './pages/404.component';

const routes: Routes = [
  { path: 'not-found', component: P404Component },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [P404Component]
})
export class AppRoutingModule { }
