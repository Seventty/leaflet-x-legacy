import { ChangeDetectorRef } from '@angular/core';
import { LeafletXLegacyComponent } from './leaflet-x-legacy.component';
import { GeoJsonResult } from '../../shared/types/geoJsonResult.type';

describe('LeafletXLegacyComponent', () => {
  it('should flatten array feature collections before emitting state', () => {
    const component = new LeafletXLegacyComponent(
      {} as any,
      {} as any,
      { detectChanges: () => {} } as ChangeDetectorRef,
      {} as any
    );
    const firstCollection = buildPointCollection([-70, 19]);
    const secondCollection = buildPointCollection([-71, 20]);

    const result = (component as any).toFeatureCollection([firstCollection, secondCollection]);

    expect(result.type).toBe('FeatureCollection');
    expect(result.features.length).toBe(2);
    expect(result.features[0].geometry.coordinates).toEqual([-70, 19]);
    expect(result.features[1].geometry.coordinates).toEqual([-71, 20]);
  });
});

function buildPointCollection(coordinates: number[]): GeoJsonResult {
  return {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates,
        },
      },
    ],
  } as GeoJsonResult;
}
