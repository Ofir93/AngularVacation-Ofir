import { Component, OnInit } from '@angular/core';
import { Vacation } from 'src/interfaces/Vacation';
import { VacationsService } from 'src/services/vacations.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  vacDataPoints: { label: string; y: number }[] = [];

  chart: any;

  constructor(private vacationService: VacationsService) {}

  chartOptions = {
    title: {
      text: 'Total followers by vacation restore down and maximise the page please',
    },
    animationEnabled: true,
    axisY: {
      includeZero: true,
    },
    data: [
      {
        type: 'bar',
        indexLabel: '{y}',
        yValueFormatString: '#,###',
        dataPoints: this.vacDataPoints,
      },
    ],
  };

  getVacations() {
    this.vacationService
      .getVacations()
      .subscribe((vacations) => this.getData(vacations));
  }

  getData(vacations: any) {
    vacations.map((vacation: Vacation, index: number) => {
      const vacData = {
        label: vacation.destination,
        y: vacation.followers.length,
      };
      this.vacDataPoints.push(vacData);
    });
  }

  ngOnInit(): void {
    this.getVacations();
  }
}
