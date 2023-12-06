import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { geolocationGuard } from './core/guards/geolocation.guard';
import { homeGuard } from './core/guards/home.guard';

const routes: Routes = [
  {
    path: 'location',
    loadChildren: () => import('./features/geolocation/geolocation.module').then((m) => m.GeolocationModule),
    canActivate: [geolocationGuard]
  },
  {
    path: '',
    loadChildren: () => import('./features/home/home.module').then((m) => m.HomeModule),
    canActivate: [homeGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
