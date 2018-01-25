import { TestBed, inject } from '@angular/core/testing';

import { ClassifiersService } from './classifiers.service';

describe('ClassifiersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClassifiersService]
    });
  });

  it('should be created', inject([ClassifiersService], (service: ClassifiersService) => {
    expect(service).toBeTruthy();
  }));
});
