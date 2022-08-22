import { TestBed } from '@angular/core/testing';

import { AllKeyService } from './all-key.service';

describe('AllKeyService', () => {
  let service: AllKeyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllKeyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
