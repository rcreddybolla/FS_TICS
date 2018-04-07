import { TestBed, inject } from '@angular/core/testing';

import { CandidDataService } from './candid-data.service';

describe('CandidDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CandidDataService]
    });
  });

  it('should be created', inject([CandidDataService], (service: CandidDataService) => {
    expect(service).toBeTruthy();
  }));
});
