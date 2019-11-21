import { TestBed } from '@angular/core/testing';

import { WeatherCacheService } from './weather-cache.service';

describe('WeatherCacheService', () => {
  let service: WeatherCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(WeatherCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set the right value when emitWeatherDetails() is called', () => {
    const emitWeatherDetailsSpy = spyOn(service, 'emitWeatherDetails').and.callThrough();
    service.emitWeatherDetails('Abhishek');
    expect(emitWeatherDetailsSpy).toHaveBeenCalledTimes(1);
    // expect(service.weatherDetails$).toEqual(of('Abhishek'));
  });
});
