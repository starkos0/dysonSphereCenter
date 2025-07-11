import { TestBed } from '@angular/core/testing';

import { MapData } from './map-data';

describe('MapData', () => {
  let service: MapData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
