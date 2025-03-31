import { TestBed } from '@angular/core/testing';

import { MegaleiosFormsService } from './megaleios-forms.service';

describe('MegaleiosFormsService', () => {
  let service: MegaleiosFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MegaleiosFormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
