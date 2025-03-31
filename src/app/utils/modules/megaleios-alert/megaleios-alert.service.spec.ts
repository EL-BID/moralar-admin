import { TestBed } from '@angular/core/testing';

import { MegaleiosAlertService } from './megaleios-alert.service';

describe('MegaleiosAlertService', () => {
  let service: MegaleiosAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MegaleiosAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
