import { TestBed } from '@angular/core/testing';

import { DailyService } from './daily.service';

describe('DailyService', () => {
  let service: DailyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
