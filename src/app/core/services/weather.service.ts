import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentWeather } from '../models/current-weather.interface';
import { environment } from '../../../environments/environment';
import { Units } from '../models/units.enum';
import { HourlyForecast } from '../models/hourly-forecast.interface';

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

  getHourlyForecast(lat: number, lon: number, units: Units = Units.IMPERIAL): Observable<HourlyForecast> {
    return this.http.get<HourlyForecast>(
      `${environment.weatherUrl}/forecast`, 
      {
        params: {
          lat: lat,
          lon: lon,
          units: units,
          cnt: 6,
          appid: environment.openWeatherKey
        }
      }
    )
  }

  getWeatherImageName(id: number): string {
    let imageName;

    switch(true) {
      case (id >= 200 && id < 300):
        imageName = 'storm';
        break;
      case id >= 300 && id < 600:
        imageName = 'rain';
        break;
      case id >= 600 && id < 700:
        imageName = 'snow';
        break;
      case id >= 700 && id < 800:
        imageName = 'mist';
        break;
      case id === 800:
        imageName = 'clear';
        break;
      case id === 801:
        imageName = 'clouds-few';
        break;
      case id >= 802 && id < 900:
        imageName = 'clouds-scattered';
        break;
      default:
        imageName = 'clear';
    }

    return imageName;
  }
}
