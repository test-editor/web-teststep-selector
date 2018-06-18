import { TestBed, inject } from '@angular/core/testing';

import { TestStepService } from './test-step.service';

describe('TestStepService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestStepService]
    });
  });

  it('should be created', inject([TestStepService], (service: TestStepService) => {
    expect(service).toBeTruthy();
  }));
});
