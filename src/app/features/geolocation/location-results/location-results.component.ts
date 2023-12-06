import { Component, Input } from '@angular/core';
import { UserLocation } from '../../../core/models/user-location.model';

@Component({
  selector: 'app-location-results',
  templateUrl: './location-results.component.html',
  styleUrl: './location-results.component.scss'
})
export class LocationResultsComponent {
  @Input() locations: UserLocation[] = [];
}
