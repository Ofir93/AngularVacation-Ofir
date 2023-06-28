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

  getVacation(){
   this.chartOptions.data[0].dataPoints = this.vacationService.getVacation().map(
    (vacation: Vacation) => ({
      label: vacation.destination,
      y: vacation.followers.length,
    })
  )
  }


  ngAfterContentInit() {
    console.log(this.vacDataPoints);
  }

  ngOnInit(): void {
    this.getVacation();
  }
}
