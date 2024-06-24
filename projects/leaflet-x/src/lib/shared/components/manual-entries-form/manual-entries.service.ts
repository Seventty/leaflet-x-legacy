import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ManualEntriesService {
  constructor() { }

  formToGeoJson(linesCollection: any) {
    const features = linesCollection.lines.map(line => {
      const coordinates = line.vertices.map(vertex => [
        parseFloat(vertex.longitud),
        parseFloat(vertex.latitud)
      ]);

      return {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: coordinates
        }
      };
    });

    return {
      type: 'FeatureCollection',
      features: features
    };
  }

}
