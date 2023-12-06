import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { geolocationGuard } from './geolocation.guard';

describe('geolocationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => geolocationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
