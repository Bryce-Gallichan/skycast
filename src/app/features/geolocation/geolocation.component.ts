import { Component, OnInit } from '@angular/core';
import { Observable, Subject, catchError, filter, of, take, tap } from 'rxjs';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrl: './geolocation.component.scss'
})
export class GeolocationComponent implements OnInit {

  ngOnInit(): void {
    this.getCoordinates().pipe(
      filter((gl) => !!gl),
      tap((gl) => {
        console.log('Got coords');
        console.log(gl);
      })
    ).subscribe();
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
          coordsSubject.error(error); 
        }
      );
    } else {
      coordsSubject.error('Location is not supported');
    }
  
    return coordsSubject.asObservable().pipe(
      catchError((error) => {
        console.error('Error getting location: ', error);
        return of(undefined);
      }),
      take(1)
    );
  }
}
