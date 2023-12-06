import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GeolocationService } from '../services/geolocation.service';
import { map } from 'rxjs';

export const geolocationGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  return inject(GeolocationService).getGeolocation().pipe(
    map((gl) => !!gl ? router.parseUrl('') : true)
  );
};
