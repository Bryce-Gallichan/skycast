import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CurrentWeather } from '../../../core/models/current-weather.interface';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.scss'
})
export class CurrentWeatherComponent implements OnChanges {
  @Input() currentWeather!: CurrentWeather;
  @Output() onUpdateWeather = new EventEmitter();

  updateLoading: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    this.updateLoading = false;
    this.roundTemps();
  }

  updateWeather(): void {
    this.updateLoading = true;
    this.onUpdateWeather.emit();
  }

  roundTemps(): void {
    this.currentWeather.main.temp = Math.round(this.currentWeather.main.temp);
    this.currentWeather.main.temp_min = Math.round(this.currentWeather.main.temp_min);
    this.currentWeather.main.temp_max = Math.round(this.currentWeather.main.temp_max);
    this.currentWeather.main.feels_like = Math.round(this.currentWeather.main.feels_like);
  }
}
