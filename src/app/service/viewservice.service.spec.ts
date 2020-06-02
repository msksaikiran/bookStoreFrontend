import { TestBed } from '@angular/core/testing';

import { ViewserviceService } from './viewservice.service';

describe('ViewserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewserviceService = TestBed.get(ViewserviceService);
    expect(service).toBeTruthy();
  });
});
