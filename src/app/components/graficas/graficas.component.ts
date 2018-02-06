import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Chart from 'chart.js';


@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styles: []
})

export class GraficasComponent implements OnInit {

  @Input() chartTitle: string = '';
  @Input() chartType: string = '';
  @Input() chartLabels: string = '';
  @Input() chartData: Array<any>;
  @Input() chartColors: Array<any> = [{
    backgroundColor: [
        'rgba(3, 57, 79, 0.2)',
        'rgba(5, 102, 141, 0.4)',
        'rgba(2, 128, 144, 0.4)',
        'rgba(0, 168, 150, 0.4)',
        'rgba(2, 195, 154, 0.4)',
        'rgba(240, 243, 189, 0.4)'
    ],
    borderColor: [
        'rgba(3, 57, 79, 1)',
        'rgba(5, 102, 141, 1)',
        'rgba(2, 128, 144, 1)',
        'rgba(0, 168, 150, 1)',
        'rgba(2, 195, 154, 1)',
        'rgba(240, 243, 189, 1)'
    ],
  },
  {
    backgroundColor: [
      'rgba(5, 102, 141, 0.2)',
        'rgba(5, 102, 141, 0.2)',
        'rgba(2, 128, 144, 0.2)',
        'rgba(0, 168, 150, 0.2)',
        'rgba(2, 195, 154, 0.2)',
        'rgba(240, 243, 189, 0.2)'
    ],
    borderColor: [
      'rgba(5, 102, 141, 1)',
        'rgba(5, 102, 141, 1)',
        'rgba(2, 128, 144, 1)',
        'rgba(0, 168, 150, 1)',
        'rgba(2, 195, 154, 1)',
        'rgba(240, 243, 189, 1)'
    ],
  }];

  @Output() status: EventEmitter<string> = new EventEmitter;

  constructor() { }

  ngOnInit() {

  }
}
