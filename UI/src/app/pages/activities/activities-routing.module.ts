import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActivitiesComponent } from './activities.component';
import { CreateActivitiesComponent } from './create-activities/create-activities.component';
import { EditActivitiesComponent } from './edit-activities/edit-activities.component';
import { CopyActivitiesComponent } from './copy-activities/copy-activities.component';
import { RecommendComponent } from './recommend/recommend.component';

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
    },
    {
      path: ':id/copy',
      data: {
        title: 'Copy Project',
        requiredRole: ['professor']
      },
      component: CopyActivitiesComponent,
      canActivate: [AuthGuard]
    },
    {
      path: ':id/recommend',
      data: {
        title: 'Recommend Techniques',
        requiredRole: ['professor']
      },
      component: RecommendComponent,
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
