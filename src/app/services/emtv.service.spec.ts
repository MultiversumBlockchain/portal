import { TestBed } from '@angular/core/testing';

import { EMTVService } from './emtvservice.service';

describe('EMTVService', () => {
  let service: EMTVService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EMTVService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
