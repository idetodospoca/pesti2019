import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TechniquesComponent } from './techniques.component';
import { CreateTechniqueComponent } from './create-technique/create-technique.component';

import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Techniques'
    },
    children: [{
      path: '',
      component: TechniquesComponent,
      pathMatch: 'full',
      data: {
        title: 'List',
        requiredRole: ['psicologo_escolar']
      },
      canActivate: [AuthGuard]
    }, {
      path: 'create',
      data: {
        title: 'New Technique',
        requiredRole: ['psicologo_escolar']
      },
      component: CreateTechniqueComponent,
      canActivate: [AuthGuard]
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechniquesRoutingModule { }
