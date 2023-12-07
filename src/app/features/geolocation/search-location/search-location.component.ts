import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { GeocodeResponse } from '../../../core/models/geocode-response.model';
import { Subject, debounceTime, filter, take, takeUntil, tap } from 'rxjs';
import { GeolocationService } from '../../../core/services/geolocation.service';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { UserLocation } from '../../../core/models/user-location.model';

@Component({
  selector: 'app-search-location',
  templateUrl: './search-location.component.html',
  styleUrl: './search-location.component.scss'
})
export class SearchLocationComponent implements OnDestroy {
  @Output() onSetLocation = new EventEmitter<UserLocation>();

  searchTerm?: string;
  loading: boolean = false;
  searchResults: UserLocation[] = [];

  private onDestroy$ = new Subject<void>();
  private searchSubject$: Subject<string> = new Subject<string>();

  constructor(
    private geolocationService: GeolocationService,
    private snackbarService: SnackbarService
  ) {
    this.searchSubject$.pipe(
      filter(search => !!search),
      debounceTime(800),
      takeUntil(this.onDestroy$)
    )
    .subscribe(search => {
      if (!this.loading) this.searchLocation();
    });
  }

  handleEnter(): void {
    if (!this.loading) this.searchLocation();
  }

  searchTermChange(search: string): void {
    this.searchSubject$.next(search);
  }

  searchLocation() {
    if (!this.searchTerm) return;
    
    this.loading = true;

    this.geolocationService.locationToCoordinates(this.searchTerm)
    .pipe(take(1), tap(console.log))
    .subscribe(
      { 
        next: (results) => this.searchResults = results,
        complete: () => this.loading = false,
        error: (e) => {
          this.snackbarService.showError('Something went wrong while fetching locations');
          this.loading = false;
        }
      }
    );
  }

  clearSearch(): void {
    this.searchResults = [];
    this.searchTerm = '';
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.unsubscribe();
  }
}
