import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CurrentWeather } from '../../../core/models/current-weather.interface';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.scss'
})
export class CurrentWeatherComponent implements OnChanges {
  @Input() currentWeather!: CurrentWeather;

  ngOnChanges(changes: SimpleChanges): void {
    this.roundTemps();
  }

  roundTemps(): void {
    this.currentWeather.main.temp = Math.round(this.currentWeather.main.temp);
    this.currentWeather.main.temp_min = Math.round(this.currentWeather.main.temp_min);
    this.currentWeather.main.temp_max = Math.round(this.currentWeather.main.temp_max);
    this.currentWeather.main.feels_like = Math.round(this.currentWeather.main.feels_like);
  }
}
