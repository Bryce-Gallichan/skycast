import { Component, OnInit } from '@angular/core';
import { Observable, Subject, catchError, filter, of, switchMap, take, tap } from 'rxjs';
import { GeolocationService } from '../../core/services/geolocation.service';
import { UserLocation } from '../../core/models/user-location.model';
import { SnackbarService } from '../../core/services/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrl: './geolocation.component.scss'
})
export class GeolocationComponent implements OnInit {

  constructor(
    private geolocationService: GeolocationService,
    private snackbarService: SnackbarService,
    private router: Router) {}

  ngOnInit(): void {
    this.getCoordinates().pipe(
      filter((gl) => !!gl),
      switchMap((gl) => this.geolocationService.reverseGeocode(gl!.latitude, gl!.longitude))
    ).subscribe(
      { 
        next: (result) => this.setGeolocation(result),
        error: (e) => this.snackbarService.showError('Could not find location')
      }
    );
  }

  getCoordinates(): Observable<GeolocationCoordinates | undefined> {
    const coordsSubject = new Subject<GeolocationCoordinates | undefined>();
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const coords = position ? position.coords : undefined;
          coordsSubject.next(coords);
          coordsSubject.complete();
        },
        (error: GeolocationPositionError) => {
          coordsSubject.error('Something went wrong while getting your location'); 
        }
      );
    } else {
      coordsSubject.error('Location is not supported');
    }
  
    return coordsSubject.asObservable().pipe(
      catchError((error) => {
        this.snackbarService.showError(error);
        return of(undefined);
      }),
      take(1)
    );
  }

  setGeolocation(geolocation: UserLocation | undefined): void {
    if (geolocation) {
      this.geolocationService.setGeolocation(geolocation);
      this.router.navigate(['']);
    } else {
      this.snackbarService.showError('Could not find location');
    }
  }
}
