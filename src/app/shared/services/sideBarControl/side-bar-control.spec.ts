import { TestBed } from '@angular/core/testing';

import { SideBarControl } from './side-bar-control';

describe('SideBarControl', () => {
  let service: SideBarControl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SideBarControl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
