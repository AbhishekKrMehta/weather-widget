import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

import { mockWeather } from 'src/model/weather.mock';

@Injectable({
  providedIn: 'root'
})
export class WeatherCacheService {

  constructor() { }
  private weatherDetailsSource$ = new BehaviorSubject(mockWeather);
  weatherDetails$ = this.weatherDetailsSource$.asObservable();

  public emitWeatherDetails(weatherDetails) {
    this.weatherDetailsSource$.next(weatherDetails);
  }
}
