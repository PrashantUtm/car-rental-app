import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'cars-list',
    loadChildren: () => import('./pages/cars-list/cars-list.module').then(m => m.CarsListPageModule)
  },
  {
    path:'',
    redirectTo: 'cars-list',
    pathMatch: 'full'
  },
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
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
