import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeolocationRoutingModule } from './geolocation-routing.module';
import { GeolocationComponent } from './geolocation.component';
import { SharedModule } from '../shared/shared.module';
import { SearchLocationComponent } from './search-location/search-location.component';
import { LocationResultsComponent } from './location-results/location-results.component';



@NgModule({
  declarations: [
    GeolocationComponent,
    SearchLocationComponent,
    LocationResultsComponent
  ],
  imports: [
    SharedModule,
    GeolocationRoutingModule
  ]
})
export class GeolocationModule { }
