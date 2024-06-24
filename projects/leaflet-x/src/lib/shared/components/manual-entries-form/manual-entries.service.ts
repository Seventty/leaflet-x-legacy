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

  mapPolygonToGeojson(polygonsCollection: any) {
    const features = polygonsCollection.polygons.map(polygon => {
      const coordinates = polygon.vertices.map(vertex => [
        parseFloat(vertex.longitude),
        parseFloat(vertex.latitude)
      ]);

      if (coordinates.length > 0 &&
          (coordinates[0][0] !== coordinates[coordinates.length - 1][0] ||
           coordinates[0][1] !== coordinates[coordinates.length - 1][1])) {
        coordinates.push([...coordinates[0]]);
      }

      return {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [coordinates]
        }
      };
    });

    return {
      type: 'FeatureCollection',
      features: features
    };
  }


}
