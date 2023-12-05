import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeoLocation } from '../models/geo-location.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  private LOC_KEY: string = 'skycast-geolocation';

  constructor(private http: HttpClient) {

    let geoLocation: GeoLocation = {
      name: 'Denver',
      lat: 0,
      lng: 0,
      country: 'US'
    }

    const locStr = localStorage.getItem(this.LOC_KEY);

    if (locStr) {
      try {
        geoLocation = JSON.parse(locStr) as GeoLocation;
      } catch (error) {
        console.error('Error retrieving location data from local storage:', error);
      }
    }

    console.log(geoLocation);
  }

  reverseGeocode(lat: number, lng: number): Observable<GeoLocation[]> {
    return this.http.get<GeoLocation[]>(
      `${environment.geocodeUrl}/reverse`, 
      {
        params: {
          lat: lat,
          lon: lng,
          limit: 1,
          appid: environment.openWeatherKey
        }
      }
    )
  }
}
