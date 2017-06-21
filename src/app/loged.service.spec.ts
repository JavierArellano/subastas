import { TestBed, inject } from '@angular/core/testing';

import { LogedService } from './loged.service';

describe('LogedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogedService]
    });
  });

  it('should be created', inject([LogedService], (service: LogedService) => {
    expect(service).toBeTruthy();
  }));
});
