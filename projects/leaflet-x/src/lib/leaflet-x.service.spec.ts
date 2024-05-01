import { TestBed } from '@angular/core/testing';

import { LeafletXService } from './leaflet-x.service';

describe('LeafletXService', () => {
  let service: LeafletXService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeafletXService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
