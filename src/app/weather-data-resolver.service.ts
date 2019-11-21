import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';

import { WeatherDataService } from './weather-data.service';

@Injectable({
  providedIn: 'root',
})
export class WeatherDataResolverService implements Resolve<any> {
  constructor(
    private weatherDataService: WeatherDataService,
    private router: Router
  ) { }

  // not used anymore
  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
    return this.weatherDataService.getWeatherForcastUsingCoordinates();
  }
}
