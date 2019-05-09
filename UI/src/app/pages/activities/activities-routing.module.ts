import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActivitiesComponent } from './activities.component';
import { CreateActivitiesComponent } from './create-activities/create-activities.component';
import { EditActivitiesComponent } from './edit-activities/edit-activities.component';

import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Projects'
    },
    children: [{
      path: '',
      component: ActivitiesComponent,
      pathMatch: 'full',
      data: {
        title: 'List'
      }
    }, {
      path: 'create',
      data: {
        title: 'New Project',
        requiredRole: ['professor']
      },
      component: CreateActivitiesComponent,
      canActivate: [AuthGuard]
    },
    {
     path: ':id/edit',
     data: {
       title: 'Edit Project',
       requiredRole: ['professor']
     },
     component: EditActivitiesComponent,
     canActivate: [AuthGuard]
   }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesRoutingModule { }
