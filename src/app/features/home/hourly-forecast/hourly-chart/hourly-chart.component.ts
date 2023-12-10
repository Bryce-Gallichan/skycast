import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { HourlyForecastChartData } from '../../../../core/models/hourly-forecast-chart-data.interface';

@Component({
  selector: 'app-hourly-chart',
  templateUrl: './hourly-chart.component.html',
  styleUrl: './hourly-chart.component.scss'
})
export class HourlyChartComponent implements OnInit {
  @Input() data: HourlyForecastChartData[] = [];
  chart?: any;

  ngOnInit(): void {
    this.createChart();
  }

  createChart(){
  
    this.chart = new Chart("HourlyChart", {
      type: 'line',
      data: {
        labels: this.data.map(x => x.time), 
	       datasets: [
          {
            label: "Temperature",
            data: this.data.map(x => x.temperature),
            backgroundColor: 'blue',
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
            },
            // border: {
            //   display: BORDER
            // },
            // grid: {
            //   display: DISPLAY,
            //   drawOnChartArea: CHART_AREA,
            //   drawTicks: TICKS,
            // }
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
            },
            // grid: {
            //   color: function(context) {
            //     if (context.tick.value > 0) {
            //       return Utils.CHART_COLORS.green;
            //     } else if (context.tick.value < 0) {
            //       return Utils.CHART_COLORS.red;
            //     }
    
            //     return '#000000';
            //   },
            // },
          }
        }
      } 
    });
  }
}
