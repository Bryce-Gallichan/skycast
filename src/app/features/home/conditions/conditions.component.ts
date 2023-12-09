import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-conditions',
  templateUrl: './conditions.component.html',
  styleUrl: './conditions.component.scss'
})
export class ConditionsComponent {
  @Input() windSpeed: number = 15;
  @Input() humidity: number = 18;
  @Input() sunrise: number = 0;
  @Input() sunset: number = 0;
  @Input() timezone: number = 0;
}
