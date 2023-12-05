import { Component, OnInit } from '@angular/core';
import { Observable, of, take } from 'rxjs';
import { GeocodingService } from '../../core/services/geocoding.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(private gs: GeocodingService) {}

  ngOnInit(): void {
    // this.getCoordinates().pipe(
    //   take
    // );

    // console.log(coords);
  }

  public lat?: number;
  public lng?: number;

  getCoordinates(): Observable<GeolocationCoordinates> {
    let coords: GeolocationCoordinates = {
      latitude: 0,
      longitude: 0,
      accuracy: 0,
      altitude: 0,
      altitudeAccuracy: 0,
      heading: 0,
      speed: 0
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
        if (position) {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          console.log(this.lat);
          console.log(this.lng);

          coords = position.coords;
        }
      },
      (error: GeolocationPositionError) => console.log(error));
    }

    return of(coords);
  }
}
