import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ILegendBar } from 'projects/leaflet-x/src/lib/shared/interfaces/ILegendBar';
import { GeoJsonResult } from 'projects/leaflet-x/src/public-api';
import { geoJSON } from './mock/geojson.mock';
import { geoJsonPoint } from './mock/geojson-point.mock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  form: FormGroup = this.fb.group({ map: [geoJSON] });
  constructor(private fb: FormBuilder) {
    this.form.valueChanges.subscribe((c) => console.log('valueChange', c));
  }

  title = 'leaflet-x-legacy';
  geojsonPrueba: GeoJsonResult = geoJSON;

  defaultLocation: any = [19.026319, -70.147792];
  exampleLegendBarData: Array<ILegendBar> = [
    {
      title: 'Zona de ejemplo',
      description: 'Esta es una leyenda de ejemplo',
      hexcolor: '#275ECD',
    },
  ];
}
