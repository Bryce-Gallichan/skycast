import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CurrentWeather } from '../../../core/models/current-weather.interface';
import { Units } from '../../../core/models/units.enum';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.scss'
})
export class CurrentWeatherComponent implements OnChanges, OnInit {
  @Input() currentWeather!: CurrentWeather;
  @Input() units: Units = Units.IMPERIAL;
  @Output() onUpdateWeather = new EventEmitter();
  @Output() onSetUnits = new EventEmitter<Units>();

  updateLoading: boolean = false;
  isDevMode: boolean = false;

  ngOnInit(): void {
    this.isDevMode = !environment.production;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateLoading = false;
    this.roundTemps();
  }

  updateWeather(): void {
    this.updateLoading = true;
    this.onUpdateWeather.emit();
  }

  setUnits(): void {
    this.onSetUnits.emit(this.units);
  }

  roundTemps(): void {
    this.currentWeather.main.temp = Math.round(this.currentWeather.main.temp);
    this.currentWeather.main.temp_min = Math.round(this.currentWeather.main.temp_min);
    this.currentWeather.main.temp_max = Math.round(this.currentWeather.main.temp_max);
    this.currentWeather.main.feels_like = Math.round(this.currentWeather.main.feels_like);
  }
}
