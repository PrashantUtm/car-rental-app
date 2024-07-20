import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { authGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path:'',
        redirectTo: 'cars-list',
        pathMatch: 'full'
      },
      {
        path:'cars-list',
        loadChildren: () => import('../cars-list/cars-list.module').then(m => m.CarsListPageModule)
      },
      {
        path: 'my-bookings',
        loadChildren: () => import('../my-bookings/my-bookings.module').then( m => m.MyBookingsPageModule),
        canActivate: [ authGuard ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
