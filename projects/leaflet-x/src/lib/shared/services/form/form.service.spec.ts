import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormService } from './form.service';
import { GeoJsonResult } from '../../types/geoJsonResult.type';


describe('FormService', () => {
  let service: FormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
    });
    service = TestBed.inject(FormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not mutate polygon coordinates when loading a feature collection', () => {
    const featureCollection: GeoJsonResult = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [-70, 19],
              [-71, 19],
              [-71, 20],
              [-70, 19],
            ]],
          },
        },
      ],
    };
    const originalFeatureCollection = JSON.stringify(featureCollection);

    service.updateForm(featureCollection);

    expect(JSON.stringify(featureCollection)).toBe(originalFeatureCollection);
  });
});
