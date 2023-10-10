import { TestBed } from '@angular/core/testing';

import { StreamUpdaterService } from './stream-updater.service';

describe('StreamUpdaterService', () => {
  let service: StreamUpdaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StreamUpdaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
