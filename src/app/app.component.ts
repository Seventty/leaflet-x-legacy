import { Component } from '@angular/core';
import { ILegendBar } from './shared/interfaces/ILegendBar';
import { GeoJsonResult } from './shared/types/geoJsonResult.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'leaflet-x-legacy';
  geojsonPrueba: GeoJsonResult =
    {"featureCollectionColor":'#000000',"featureCollectionPopup": "Hello <b>world</b>", "type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"coordinates":[[[-69.88913353646005,18.48149640025997],[-69.88988323655252,18.480971004046324],[-69.88934404338265,18.48021443066976],[-69.88855002604272,18.48073982920215],[-69.88913353646005,18.48149640025997]]],"type":"Polygon"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[[[-69.88561391963938,18.47727147994992],[-69.8865450210715,18.47714698966398],[-69.88648349454482,18.476933021774585],[-69.88656963168143,18.47692524111919],[-69.88653271576563,18.476765737602946],[-69.88693468907132,18.476637356615527],[-69.88679112717635,18.476221090330327],[-69.8866147511339,18.476123831706502],[-69.88563442848186,18.476411717072295],[-69.88557700372354,18.47654009822861],[-69.88563032671357,18.476676259954985],[-69.88542934006117,18.476754066607498],[-69.88561391963938,18.47727147994992]]],"type":"Polygon"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[-69.88822417298121,18.477568112050776],"type":"Point"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[-69.89848178060772,18.487897688711882],"type":"Point"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[-69.91072877947806,18.479319120158053],"type":"Point"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[-69.93248553299708,18.48257558608583],"type":"Point"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[-69.92254747600447,18.466294485090202],"type":"Point"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[[[-69.95992270505123,18.47366198830443],[-69.95992270505123,18.452666557728065],[-69.93372237298024,18.452666557728065],[-69.93372237298024,18.47366198830443],[-69.95992270505123,18.47366198830443]]],"type":"Polygon"}}]}


  defaultLocation: any = [19.026319, -70.147792];
  exampleLegendBarData: Array<ILegendBar> =  [
    {
      "title": "Zonas productoras de agua",
      "description": "Zonas productoras de agua en los bosques montano bajo y bosque muy humedo montano (bosques nublados). En estas zonas nacen la mayoría de los ríos debido a la condensación de las nubes en el suelo, por la altura sobre el nivel del mar.",
      "hexcolor": "#275ECD",
    }
  ]
}
