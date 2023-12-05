import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeoLocation } from '../models/geo-location.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  

  constructor(private http: HttpClient) {


    console.log(localStorage.getItem('TEST') || 'Nothing found');
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
