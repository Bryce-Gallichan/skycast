import { Component, OnDestroy, OnInit } from '@angular/core';
import { GeolocationService } from '../../core/services/geolocation.service';
import { BehaviorSubject, Subject, filter, forkJoin, switchMap, take, takeUntil, tap } from 'rxjs';
import { WeatherService } from '../../core/services/weather.service';
import { CurrentWeather } from '../../core/models/current-weather.interface';
import { UserLocation } from '../../core/models/user-location.model';
import { Units } from '../../core/models/units.enum';
import { HourlyForecast } from '../../core/models/hourly-forecast.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();

  private UNITS_KEY: string = 'skycast-units';
  units$ = new BehaviorSubject<Units>(Units.IMPERIAL);

  backgroundImage: string = '';
  pod: string = '';

  loading: boolean = true;
  currentWeather?: CurrentWeather; 
  locationData?: UserLocation; 
  hourlyForecast?: HourlyForecast;

  constructor(
    private geolocationService: GeolocationService,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.loading = false;

    const units = localStorage.getItem(this.UNITS_KEY);
    if (units === 'imperial' || units === 'metric') this.units$.next(units as Units);

    const useTestData = false;

    if (useTestData) {
      this.useTestData();
    } else {
      this.geolocationService.getGeolocation()
      .pipe(
        takeUntil(this.onDestroy$),
        filter(loc => !!loc)
      )
      .subscribe({
          next: (loc) => {
            this.locationData = loc;
            this.getCurrentWeather(); 
          }
        } 
      );
    }
  }

  useTestData(): void {
    this.backgroundImage = 'mist.jpg';
    this.pod = 'day';
    this.currentWeather = {
      "image": "storm.svg",
      "pod": "night",
      "coord": {
          "lon": -104.9847,
          "lat": 39.7392
      },
      "weather": [
          {
              "id": 800,
              "main": "Clear",
              "description": "clear sky",
              "icon": "01d"
          }
      ],
      "base": "stations",
      "main": {
          "temp": 62,
          "feels_like": 58,
          "temp_min": 53,
          "temp_max": 65,
          "pressure": 1001,
          "humidity": 18
      },
      "visibility": 10000,
      "wind": {
          "speed": 15,
          "deg": 289
      },
      "clouds": {
          "all": 0
      },
      "dt": 1701992128,
      "sys": {
          "type": 2,
          "id": 2004334,
          "country": "US",
          "sunrise": 1701958053,
          "sunset": 1701992128
      },
      "timezone": -25200,
      "id": 5419384,
      "name": "Denver",
      "cod": 200
    };

    this.hourlyForecast = {
      "cod": "200",
      "message": 0,
      "cnt": 8,
      "list": [
          {
              "dt": 1702166400,
              "main": {
                  "temp": 32.4,
                  "feels_like": 27.34,
                  "temp_min": 28.2,
                  "temp_max": 32.4,
                  "pressure": 1030,
                  "sea_level": 1030,
                  "grnd_level": 845,
                  "humidity": 63,
                  "temp_kf": 2.33
              },
              "weather": [
                  {
                      "id": 803,
                      "main": "Clouds",
                      "description": "broken clouds",
                      "icon": "04n"
                  }
              ],
              "clouds": {
                  "all": 65
              },
              "wind": {
                  "speed": 5.23,
                  "deg": 196,
                  "gust": 9.57
              },
              "visibility": 10000,
              "pop": 0,
              "sys": {
                  "pod": "n"
              },
              "dt_txt": "2023-12-10 00:00:00"
          },
          {
              "dt": 1702177200,
              "main": {
                  "temp": 28.13,
                  "feels_like": 21.15,
                  "temp_min": 24.94,
                  "temp_max": 28.13,
                  "pressure": 1032,
                  "sea_level": 1032,
                  "grnd_level": 846,
                  "humidity": 73,
                  "temp_kf": 1.77
              },
              "weather": [
                  {
                      "id": 802,
                      "main": "Clouds",
                      "description": "scattered clouds",
                      "icon": "03n"
                  }
              ],
              "clouds": {
                  "all": 30
              },
              "wind": {
                  "speed": 6.6,
                  "deg": 208,
                  "gust": 12.12
              },
              "visibility": 10000,
              "pop": 0,
              "sys": {
                  "pod": "n"
              },
              "dt_txt": "2023-12-10 03:00:00"
          },
          {
              "dt": 1702188000,
              "main": {
                  "temp": 23.36,
                  "feels_like": 15.87,
                  "temp_min": 23.36,
                  "temp_max": 23.36,
                  "pressure": 1031,
                  "sea_level": 1031,
                  "grnd_level": 843,
                  "humidity": 76,
                  "temp_kf": 0
              },
              "weather": [
                  {
                      "id": 800,
                      "main": "Clear",
                      "description": "clear sky",
                      "icon": "01n"
                  }
              ],
              "clouds": {
                  "all": 9
              },
              "wind": {
                  "speed": 6.08,
                  "deg": 209,
                  "gust": 9.35
              },
              "visibility": 10000,
              "pop": 0,
              "sys": {
                  "pod": "n"
              },
              "dt_txt": "2023-12-10 06:00:00"
          },
          {
              "dt": 1702198800,
              "main": {
                  "temp": 22.89,
                  "feels_like": 14.99,
                  "temp_min": 22.89,
                  "temp_max": 22.89,
                  "pressure": 1027,
                  "sea_level": 1027,
                  "grnd_level": 840,
                  "humidity": 75,
                  "temp_kf": 0
              },
              "weather": [
                  {
                      "id": 800,
                      "main": "Clear",
                      "description": "clear sky",
                      "icon": "01n"
                  }
              ],
              "clouds": {
                  "all": 9
              },
              "wind": {
                  "speed": 6.44,
                  "deg": 201,
                  "gust": 10.49
              },
              "visibility": 10000,
              "pop": 0,
              "sys": {
                  "pod": "n"
              },
              "dt_txt": "2023-12-10 09:00:00"
          },
          {
              "dt": 1702209600,
              "main": {
                  "temp": 26.73,
                  "feels_like": 19.78,
                  "temp_min": 26.73,
                  "temp_max": 26.73,
                  "pressure": 1022,
                  "sea_level": 1022,
                  "grnd_level": 837,
                  "humidity": 72,
                  "temp_kf": 0
              },
              "weather": [
                  {
                      "id": 802,
                      "main": "Clouds",
                      "description": "scattered clouds",
                      "icon": "03n"
                  }
              ],
              "clouds": {
                  "all": 26
              },
              "wind": {
                  "speed": 6.2,
                  "deg": 195,
                  "gust": 9.13
              },
              "visibility": 10000,
              "pop": 0,
              "sys": {
                  "pod": "n"
              },
              "dt_txt": "2023-12-10 12:00:00"
          },
          {
              "dt": 1702220400,
              "main": {
                  "temp": 28.47,
                  "feels_like": 21.67,
                  "temp_min": 28.47,
                  "temp_max": 28.47,
                  "pressure": 1021,
                  "sea_level": 1021,
                  "grnd_level": 837,
                  "humidity": 77,
                  "temp_kf": 0
              },
              "weather": [
                  {
                      "id": 804,
                      "main": "Clouds",
                      "description": "overcast clouds",
                      "icon": "04d"
                  }
              ],
              "clouds": {
                  "all": 100
              },
              "wind": {
                  "speed": 6.44,
                  "deg": 204,
                  "gust": 9.19
              },
              "visibility": 10000,
              "pop": 0,
              "sys": {
                  "pod": "d"
              },
              "dt_txt": "2023-12-10 15:00:00"
          },
          {
              "dt": 1702231200,
              "main": {
                  "temp": 36.48,
                  "feels_like": 34.27,
                  "temp_min": 36.48,
                  "temp_max": 36.48,
                  "pressure": 1017,
                  "sea_level": 1017,
                  "grnd_level": 837,
                  "humidity": 79,
                  "temp_kf": 0
              },
              "weather": [
                  {
                      "id": 804,
                      "main": "Clouds",
                      "description": "overcast clouds",
                      "icon": "04d"
                  }
              ],
              "clouds": {
                  "all": 100
              },
              "wind": {
                  "speed": 3.09,
                  "deg": 222,
                  "gust": 3.89
              },
              "visibility": 3688,
              "pop": 0,
              "sys": {
                  "pod": "d"
              },
              "dt_txt": "2023-12-10 18:00:00"
          },
      ],
      "city": {
          "id": 5419384,
          "name": "Denver",
          "coord": {
              "lat": 39.7392,
              "lon": -104.9849
          },
          "country": "US",
          "population": 600158,
          "timezone": -25200,
          "sunrise": 1702130956,
          "sunset": 1702164928
      }
    };
  }

  getCurrentWeather(): void {
    if (this.locationData) {
      this.units$.asObservable()
        .pipe(
          takeUntil(this.onDestroy$),
          switchMap(units => 
            forkJoin({
              currentWeather: this.weatherService.getCurrentWeather(
                this.locationData!.lat, 
                this.locationData!.lon,
                units
              ).pipe(take(1)),
              hourlyForecast: this.weatherService.getHourlyForecast(
                this.locationData!.lat, 
                this.locationData!.lon,
                units
              ).pipe(take(1))
            })
          )
        ).subscribe({
          next: ({ currentWeather, hourlyForecast }) => {
            this.currentWeather = this.refineWeather(currentWeather);
            this.hourlyForecast = hourlyForecast;
          },
          complete: () => this.loading = false
        });
    }
  }

  setUnits(units: Units): void {
    localStorage.setItem(this.UNITS_KEY, units);
    this.units$.next(units);
  }

  refineWeather(weather: CurrentWeather): CurrentWeather {
    const id = weather.weather[0].id;
    const imageName = this.weatherService.getWeatherImageName(id);
    weather.image = `${imageName}.svg`;
    this.backgroundImage = `${imageName}.jpg`;

    this.pod = (weather.dt > weather.sys.sunrise && weather.dt < weather.sys.sunset) ? 'day' : 'night';
    weather.pod = this.pod;

    return weather;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.unsubscribe();
  }

}
