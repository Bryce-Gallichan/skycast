import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { ConditionsComponent } from './conditions/conditions.component';

import {MatMenuModule} from '@angular/material/menu';
import {MatRadioModule} from '@angular/material/radio';
import { HourlyForecastComponent } from './hourly-forecast/hourly-forecast.component';
import { HourlyChartComponent } from './hourly-forecast/hourly-chart/hourly-chart.component';

@NgModule({
  declarations: [
    HomeComponent,
    CurrentWeatherComponent,
    ConditionsComponent,
    HourlyForecastComponent,
    HourlyChartComponent,
  ],
  imports: [
    SharedModule,
    HomeRoutingModule,
    MatMenuModule,
    MatRadioModule
  ]
})
export class HomeModule { }
