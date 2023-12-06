import { NgModule } from '@angular/core';
import { GeolocationComponent } from './geolocation.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: GeolocationComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeolocationRoutingModule { }
