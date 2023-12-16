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

  dateFormat: string = '';

  ngOnInit(): void {
    this.isDevMode = !environment.production;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateLoading = false;
    this.roundTemps();
    this.dateFormat = this.isTimestampToday(this.currentWeather.last_updated || 0) ?
      'HH:mm' : 'short'
  }

  updateWeather(): void {
    this.updateLoading = true;
    this.onUpdateWeather.emit();
  }

  setUnits(): void {
    this.onSetUnits.emit(this.units);
  }

  isTimestampToday(timestamp: number): boolean {
    const targetDate = new Date(timestamp);
    const currentDate = new Date();

    return (
      targetDate.getFullYear() === currentDate.getFullYear() &&
      targetDate.getMonth() === currentDate.getMonth() &&
      targetDate.getDate() === currentDate.getDate()
    );
  }

  roundTemps(): void {
    this.currentWeather.main.temp = Math.round(this.currentWeather.main.temp);
    this.currentWeather.main.temp_min = Math.round(this.currentWeather.main.temp_min);
    this.currentWeather.main.temp_max = Math.round(this.currentWeather.main.temp_max);
    this.currentWeather.main.feels_like = Math.round(this.currentWeather.main.feels_like);
  }
}
