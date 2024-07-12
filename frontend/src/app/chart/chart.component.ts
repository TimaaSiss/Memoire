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

  public pieChartLabels: string[] = ['Avril', 'Mai', 'Juin', 'Juillet'];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;

  public pieChartData = [
    { data: [17, 8, 8, 5], label: 'Données en fonction du nombre d\'utilisateur inscrit' }
  ];

  constructor() { }

  ngOnInit(): void {
    // Initialisation si nécessaire
  }

}
