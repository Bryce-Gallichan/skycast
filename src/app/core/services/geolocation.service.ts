import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { UserLocation } from '../models/user-location.model';
import { environment } from '../../../environments/environment';
import { GeocodeResponse } from '../models/geocode-response.model';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  private LOC_KEY: string = 'skycast-geolocation';

  private geoLocation$ = new BehaviorSubject<UserLocation | undefined>(undefined);

  constructor(private http: HttpClient) {
    const locStr = localStorage.getItem(this.LOC_KEY);

    if (locStr) {
      try {
        this.geoLocation$.next(JSON.parse(locStr) as UserLocation);
      } catch (error) {
        console.error('Error retrieving location data from local storage:', error);
      }
    }
  }

  getGeolocation(): Observable<UserLocation | undefined> {
    return this.geoLocation$.asObservable();
  }

  setGeolocation(gl: UserLocation): void {
    try {
      const jsonData = JSON.stringify(gl);
      console.log(gl);
      console.log(jsonData);
      localStorage.setItem(this.LOC_KEY, jsonData);
      this.geoLocation$.next(gl);
    } catch (error) {
      console.error('Error saving data to local storage:', error);
    }
  }

  reverseGeocode(lat: number, lng: number): Observable<UserLocation | undefined> {
    return this.http.get<GeocodeResponse[]>(
      `${environment.geocodeUrl}/reverse`, 
      {
        params: {
          lat: lat,
          lon: lng,
          limit: 1,
          appid: environment.openWeatherKey
        }
      }
    ).pipe(
      map((response: GeocodeResponse[]) => {
        let userLocation: UserLocation | undefined;
        if (response.length > 0) {
          const firstResult = response[0];
          userLocation = {
            name: firstResult.name,
            lat: firstResult.lat,
            lon: firstResult.lon,
            country: firstResult.country,
            state: firstResult.state ?? undefined
          };
        }
        return userLocation;
      })
    );
  }
}
