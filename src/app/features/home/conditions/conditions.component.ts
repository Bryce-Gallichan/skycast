import { Component, Input, OnInit } from '@angular/core';

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

  ngOnInit(): void {
    this.windSpeed = Math.round(this.windSpeed);

    const utcSunsetInSeconds = this.sunrise;
    const timezoneOffsetInMilliseconds = this.timezone;

    // Convert UTC sunset time to local time in milliseconds
    const localSunsetInMillis = utcSunsetInSeconds * 1000 + timezoneOffsetInMilliseconds;

    // Format the local sunset time using Intl.DateTimeFormat with timeZone option
    const options: Intl.DateTimeFormatOptions = { timeZone: 'UTC', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const localSunsetTime = new Intl.DateTimeFormat('en-US', options).format(localSunsetInMillis);

    // Display the local sunset time
    console.log('Local Sunset Time:', localSunsetTime);
  }
}
