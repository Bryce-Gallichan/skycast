import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentWeather } from '../models/current-weather.interface';
import { environment } from '../../../environments/environment';
import { Units } from '../models/units.enum';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) { }

  getCurrentWeather(lat: number, lon: number, units: Units = Units.IMPERIAL): Observable<CurrentWeather> {
    return this.http.get<CurrentWeather>(
      `${environment.weatherUrl}/weather`, 
      {
        params: {
          lat: lat,
          lon: lon,
          units: units,
          appid: environment.openWeatherKey
        }
      }
    )
  }
}
