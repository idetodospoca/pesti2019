import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttributesComponent } from './attributes.component';
import { CreateAttributesComponent } from './create-attributes/create-attributes.component';

import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Attributes'
    },
    children: [{
      path: '',
      component: AttributesComponent,
      pathMatch: 'full',
      data: {
        title: 'List'
      }
    }, {
      path: 'create',
      data: {
        title: 'New Attributes',
        requiredRole: ['psicologo_educacional']
      },
      component: CreateAttributesComponent,
      canActivate: [AuthGuard]
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttributesRoutingModule { }
