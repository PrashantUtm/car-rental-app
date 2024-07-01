import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'cars-list',
    loadChildren: () => import('./pages/cars-list/cars-list.module').then(m => m.CarsListPageModule)
  },
  {
    path:'',
    redirectTo: 'cars-list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
