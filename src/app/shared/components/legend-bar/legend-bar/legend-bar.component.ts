import { Component, Input, OnInit } from '@angular/core';
import { ILegendBar } from 'src/app/shared/interfaces/ILegendBar';

@Component({
  selector: 'legend-bar',
  templateUrl: './legend-bar.component.html',
  styleUrls: ['./legend-bar.component.sass']
})
export class LegendBarComponent implements OnInit {
  @Input() legendBarData: Array<ILegendBar> = [];

  isArray(data: any): boolean {
    return Array.isArray(data);
  }

  constructor() { }

  ngOnInit() {
  }

}
