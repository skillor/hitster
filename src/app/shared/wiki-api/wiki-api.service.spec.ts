import { TestBed } from '@angular/core/testing';

import { WikiApiService } from './wiki-api.service';

describe('WikiApiService', () => {
  let service: WikiApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WikiApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
