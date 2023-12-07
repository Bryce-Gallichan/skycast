import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';



@NgModule({
  declarations: [
    HomeComponent,
    CurrentWeatherComponent
  ],
  imports: [
    SharedModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }
