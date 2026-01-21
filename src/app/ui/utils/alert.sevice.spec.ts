import { TestBed } from '@angular/core/testing';

import { AlertSevice } from './alert.sevice';

describe('AlertSevice', () => {
  let service: AlertSevice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertSevice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
