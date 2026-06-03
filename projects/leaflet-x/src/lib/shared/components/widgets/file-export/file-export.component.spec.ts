import { FileExportComponent } from './file-export.component';
import { GeoJsonResult } from '../../../types/geoJsonResult.type';

describe('FileExportComponent', () => {
  it('should build a valid TopoJSON payload', () => {
    const component = new FileExportComponent();
    component.FeatureCollectionToExport = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: [-70.147792, 19.026319],
          },
        },
      ],
    } as GeoJsonResult;

    const topology = JSON.parse((component as any).buildTopoJson());

    expect(topology.type).toBe('Topology');
    expect(topology.objects.collection).toBeTruthy();
  });
});
