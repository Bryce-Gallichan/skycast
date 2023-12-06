import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeolocationRoutingModule } from './geolocation-routing.module';
import { GeolocationComponent } from './geolocation.component';



@NgModule({
  declarations: [
    GeolocationComponent
  ],
  imports: [
    CommonModule,
    GeolocationRoutingModule
  ]
})
export class GeolocationModule { }
