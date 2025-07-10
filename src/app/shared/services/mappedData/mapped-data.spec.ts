import { TestBed } from '@angular/core/testing';

import { MappedData } from './mapped-data';

describe('MappedData', () => {
  let service: MappedData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MappedData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
