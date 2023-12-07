import { Component, OnDestroy, OnInit } from '@angular/core';
import { GeolocationService } from '../../core/services/geolocation.service';
import { Subject, takeUntil } from 'rxjs';
import { UserLocation } from '../../core/models/user-location.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();
  geoLocation?: UserLocation;

  constructor(private geolocationService: GeolocationService) {}

  ngOnInit(): void {
    this.geolocationService.getGeolocation()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(result => this.geoLocation = result);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.unsubscribe();
  }

}
