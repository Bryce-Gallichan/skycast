import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { HourlyForecast } from '../../../core/models/hourly-forecast.interface';
import { WeatherService } from '../../../core/services/weather.service';
import { HourlyForecastChartData } from '../../../core/models/hourly-forecast-chart-data.interface';

@Component({
  selector: 'app-hourly-forecast',
  templateUrl: './hourly-forecast.component.html',
  styleUrl: './hourly-forecast.component.scss'
})
export class HourlyForecastComponent implements OnChanges {
  @Input() hourlyForecast?: HourlyForecast;

  hourlyForecastChartData: HourlyForecastChartData[] = [];

  constructor(private weatherService: WeatherService) {}

  ngOnChanges(): void {
    if (this.hourlyForecast) {
      this.hourlyForecastChartData = this.hourlyForecast.list.map(wli => ({
        name: wli.weather[0].description,
        image: `${this.weatherService.getWeatherImageName(wli.weather[0].id)}.svg`,
        pod: wli.sys.pod === 'd' ? 'day' : 'night',
        time: new Date((wli.dt+this.hourlyForecast!.city.timezone)*1000).toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'UTC'
        }),
        timestamp: wli.dt,
        temperature: Math.round(wli.main.temp)
      }));
    }
  }
}
