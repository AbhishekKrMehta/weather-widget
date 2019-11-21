import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { WeatherCacheService } from 'src/app/weather-cache.service';

@Component({
  selector: 'app-hourly-forecast',
  templateUrl: './hourly-forecast.component.html',
  styleUrls: ['./hourly-forecast.component.scss']
})
export class HourlyForecastComponent implements OnInit, OnDestroy {


  constructor(private weatherCacheService: WeatherCacheService) { }
  step: number;
  weatherSubscription: Subscription;
  // todo: add types
  hourlyData: Array<any>;
  timezone: string;
  currentWeather: object;

  ngOnInit() {
    this.step = 0;
    this.weatherSubscription = this.weatherCacheService.weatherDetails$.subscribe(
      weatherData => {
        this.timezone = weatherData.timezone;
        this.currentWeather = weatherData.currently;
        this.hourlyData = weatherData.hourly.data;
        if (this.hourlyData.length > 24) {
          this.hourlyData.length = 24; // to limit prediction to next 24 hours
        }
      }
    );
  }

  setStep(index: number) {
    this.step = index;
  }

  nextHour(): void {
    this.step++;
  }

  prevHour(): void {
    this.step--;
  }

  getImagePath(iconName: string): string {
    return `../../assets/icons/${iconName}.svg`;
  }

  ngOnDestroy() {
    this.weatherSubscription.unsubscribe();
  }
}
