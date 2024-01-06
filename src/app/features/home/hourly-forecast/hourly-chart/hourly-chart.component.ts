import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { HourlyForecastChartData } from '../../../../core/models/hourly-forecast-chart-data.interface';

@Component({
  selector: 'app-hourly-chart',
  templateUrl: './hourly-chart.component.html',
  styleUrl: './hourly-chart.component.scss'
})
export class HourlyChartComponent implements OnChanges {
  @ViewChild('hourlyChart', { static: false }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  @Input() data: HourlyForecastChartData[] = [];
  chart?: any;

  ngOnChanges(): void {
    this.createChart();
  }

  createChart(){

    if (this.chart) this.chart.destroy();
    
    this.chart = new Chart("hourlyChart", {
      type: 'line',
      data: {
        labels: this.data.map(x => x.time), 
	       datasets: [
          {
            label: "Temperature",
            data: this.data.map(x => x.temperature),
            backgroundColor: '#190482',
            fill: false,
            cubicInterpolationMode: 'monotone',
          },
        ]
      },
      options: {
        aspectRatio:10,
        responsive: true,
        plugins: {
          legend: {
            display: false 
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              display: false
            },
            border: {
              display: false
            }
          },
          y: {
            grid: {
              display: false
            },
            ticks: {
              display: false
            },
            border: {
              display: false
            }
          }
        }
      } 
    });
  }
}
