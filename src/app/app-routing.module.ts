import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { TabsPage } from './pages/tabs/tabs.page';

const routes: Routes = [
  {
    path: 'cars-list/:plateNumber',
    loadChildren: () => import('./pages/car-details/car-details.module').then( m => m.CarDetailsPageModule)
  },
  {
    path: 'book/:plateNumber',
    loadChildren: () => import('./pages/book/book.module').then( m => m.BookPageModule),
    canActivate: [ authGuard ]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
    // component: TabsPage,
    // children: [
    //   {
    //     path:'',
    //     redirectTo: 'cars-list',
    //     pathMatch: 'full'
    //   },
    //   {
    //     path:'cars-list',
    //     loadChildren: () => import('./pages/cars-list/cars-list.module').then(m => m.CarsListPageModule)
    //   },
    //   {
    //     path: 'my-bookings',
    //     loadChildren: () => import('./pages/my-bookings/my-bookings.module').then( m => m.MyBookingsPageModule)
    //   }
    // ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
