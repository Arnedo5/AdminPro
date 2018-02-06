import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/dist/Chart.js';


@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: []
})
export class Graficas1Component implements OnInit {

  public graficos: any = {
    'grafico1': {
      'labels': ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
      'data':   [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
      ],
      'type': 'line',
      'title': 'Grafic Line'
    },
    'grafico2': {
      'labels': ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
      'data':  [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
      ],
      'type': 'bar',
      'title': 'Grafic Bar'
    },
    'grafico3': {
      'labels': ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
      'data':   [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
      ],
      'type': 'radar',
      'title': 'Grafic Radar'
    },
    'grafico4': {
      'labels': ['2006', '2007', '2008', '2009', '2010', '2011'],
      'data':   [
        {data: [65, 59, 80, 81, 56, 55], label: 'Series A'}
      ],
      'type': 'doughnut',
      'title': 'Grafic Doughnut'
    },
    'grafico5': {
      'labels': ['2006', '2007', '2008', '2009', '2010', '2011'],
      'data':   [
        {data: [65, 59, 80, 81, 56, 55], label: 'Series A'}
      ],
      'type': 'pie',
      'title': 'Grafic Doughnut'
    },
    'grafico6': {
      'labels': ['2006', '2007', '2008', '2009', '2010', '2011'],
      'data':   [
        {data: [65, 59, 80, 81, 56, 55], label: 'Series A'}
      ],
      'type': 'polarArea',
      'title': 'Grafic PolarArea'
    },
  };

  constructor() {

  }

  ngOnInit() {

  }


}
