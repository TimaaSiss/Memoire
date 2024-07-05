import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };

  public pieChartLabels: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;

  public pieChartData = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'My First Dataset' }
  ];

  constructor() { }

  ngOnInit(): void {
    // Initialisation si nécessaire
  }

}
