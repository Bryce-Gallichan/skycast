import { Component, Input, OnInit } from '@angular/core';
import { Units } from '../../../core/models/units.enum';

@Component({
  selector: 'app-conditions',
  templateUrl: './conditions.component.html',
  styleUrl: './conditions.component.scss'
})
export class ConditionsComponent implements OnInit {
  @Input() windSpeed: number = 15;
  @Input() humidity: number = 18;
  @Input() sunrise: number = 0;
  @Input() sunset: number = 0;
  @Input() timezone: number = 0;
  @Input() units: Units = Units.METRIC;

  unitLabel: string = 'm/s'

  ngOnInit(): void {
    this.unitLabel = this.units === Units.IMPERIAL ? 'mph' : 'm/s';
  }
}
