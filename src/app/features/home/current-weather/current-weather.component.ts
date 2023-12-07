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
    this.chooseWeatherImage();
  }

  roundTemps(): void {
    this.currentWeather.main.temp = Math.round(this.currentWeather.main.temp);
    this.currentWeather.main.temp_min = Math.round(this.currentWeather.main.temp_min);
    this.currentWeather.main.temp_max = Math.round(this.currentWeather.main.temp_max);
    this.currentWeather.main.feels_like = Math.round(this.currentWeather.main.feels_like);
  }

  chooseWeatherImage(): void {
    const id = this.currentWeather.weather[0].id;
    switch(true) {
      case (id >= 200 && id < 300):
        this.currentWeather.image = 'storm.svg';
        break;
      case id >= 300 && id < 600:
        this.currentWeather.image = 'rain.svg';
        break;
      case id >= 600 && id < 700:
        this.currentWeather.image = 'snow.svg';
        break;
      case id >= 700 && id < 800:
        this.currentWeather.image = 'mist.svg';
        break;
      case id === 800:
        this.currentWeather.image = 'clear.svg';
        break;
      case id === 801:
        this.currentWeather.image = 'clouds-few.svg';
        break;
      case id >= 802 && id < 900:
        this.currentWeather.image = 'clouds-scattered.svg';
        break;
    }
  }
}
