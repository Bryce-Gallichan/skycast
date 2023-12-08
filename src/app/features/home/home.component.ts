import { Component, OnDestroy, OnInit } from '@angular/core';
import { GeolocationService } from '../../core/services/geolocation.service';
import { Subject, filter, switchMap, takeUntil, tap } from 'rxjs';
import { WeatherService } from '../../core/services/weather.service';
import { CurrentWeather } from '../../core/models/current-weather.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();

  backgroundName: string = '';
  timePath: string = '';

  loading: boolean = true;
  currentWeather?: CurrentWeather; 

  constructor(
    private geolocationService: GeolocationService,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.loading = false;

    // this.currentWeather = {
    //   "image": "storm.svg",
    //   "path": "night",
    //   "coord": {
    //       "lon": -104.9847,
    //       "lat": 39.7392
    //   },
    //   "weather": [
    //       {
    //           "id": 800,
    //           "main": "Clear",
    //           "description": "clear sky",
    //           "icon": "01d"
    //       }
    //   ],
    //   "base": "stations",
    //   "main": {
    //       "temp": 62,
    //       "feels_like": 58,
    //       "temp_min": 53,
    //       "temp_max": 65,
    //       "pressure": 1001,
    //       "humidity": 18
    //   },
    //   "visibility": 10000,
    //   "wind": {
    //       "speed": 15.01,
    //       "deg": 289
    //   },
    //   "clouds": {
    //       "all": 0
    //   },
    //   "dt": 1701992128,
    //   "sys": {
    //       "type": 2,
    //       "id": 2004334,
    //       "country": "US",
    //       "sunrise": 1701958053,
    //       "sunset": 1701992128
    //   },
    //   "timezone": -25200,
    //   "id": 5419384,
    //   "name": "Denver",
    //   "cod": 200
    // };

    this.geolocationService.getGeolocation()
      .pipe(
        takeUntil(this.onDestroy$),
        filter(loc => !!loc),
        switchMap(loc => this.weatherService.getCurrentWeather(loc!.lat, loc!.lon))
      )
      .subscribe({
          next: (weather) => {
            this.currentWeather = this.refineWeather(weather);
            console.log(weather);
            this.loading = false;
          },
          complete: () => this.loading = false,
        } 
      );
  }

  refineWeather(weather: CurrentWeather): CurrentWeather {
    const id = weather.weather[0].id;
    switch(true) {
      case (id >= 200 && id < 300):
        weather.image = 'storm.svg';
        this.backgroundName = 'storm.jpg';
        break;
      case id >= 300 && id < 600:
        weather.image = 'rain.svg';
        this.backgroundName = 'rain.jpg';
        break;
      case id >= 600 && id < 700:
        weather.image = 'snow.svg';
        this.backgroundName = 'snow.jpg';
        break;
      case id >= 700 && id < 800:
        weather.image = 'mist.svg';
        this.backgroundName = 'mist.jpg';
        break;
      case id === 800:
        weather.image = 'clear.svg';
        this.backgroundName = 'clear.jpg';
        break;
      case id === 801:
        weather.image = 'clouds-few.svg';
        this.backgroundName = 'clouds-few.jpg';
        break;
      case id >= 802 && id < 900:
        weather.image = 'clouds-scattered.svg';
        this.backgroundName = 'clouds-scattered.jpg';
        break;
      default:
        weather.image = 'clear.svg';
        this.backgroundName = 'clear.jpg';
    }

    this.timePath = (weather.dt > weather.sys.sunrise && weather.dt < weather.sys.sunset) ? 'day' : 'night';
    weather.path = this.timePath;

    return weather;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.unsubscribe();
  }

}
