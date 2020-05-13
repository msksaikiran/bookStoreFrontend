import { TestBed } from '@angular/core/testing';

import { ViewcartService } from './viewcart.service';

describe('ViewcartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewcartService = TestBed.get(ViewcartService);
    expect(service).toBeTruthy();
  });
});
