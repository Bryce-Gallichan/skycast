import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { GeoLocation } from '../models/geo-location.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  private LOC_KEY: string = 'skycast-geolocation';

  private geoLocation$ = new BehaviorSubject<GeoLocation | undefined>(undefined);

  constructor(private http: HttpClient) {
    const locStr = localStorage.getItem(this.LOC_KEY);

    if (locStr) {
      try {
        this.geoLocation$.next(JSON.parse(locStr) as GeoLocation);
      } catch (error) {
        console.error('Error retrieving location data from local storage:', error);
      }
    }
  }

  getGeolocation(): Observable<GeoLocation | undefined> {
    return this.geoLocation$.asObservable();
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
