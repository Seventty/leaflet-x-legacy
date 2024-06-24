import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ManualEntriesService {
  constructor() { }

  mapLineToGeojson(linesCollection: any) {
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

  mapPointsToGeojson(pointsCollection: any) {
    if (!pointsCollection || !Array.isArray(pointsCollection.points)) {
      throw new Error("El formato de los datos es incorrecto");
    }

    const features = pointsCollection.points.map(point => ({
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [point.longitude, point.latitude]
      }
    }));

    return {
      type: 'FeatureCollection',
      features: features
    };
  }


}
