import { TestBed } from '@angular/core/testing';

import { ErrorInterceptor } from './error.interceptor';

describe('ErrorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrorInterceptor = TestBed.get(ErrorInterceptor);
    expect(service).toBeTruthy();
  });
});
