import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { WeatherCacheService } from 'src/app/weather-cache.service';

@Component({
  selector: 'app-daily-forecast',
  templateUrl: './daily-forecast.component.html',
  styleUrls: ['./daily-forecast.component.scss']
})
export class DailyForecastComponent implements OnInit, OnDestroy {

  constructor(public weatherCacheService: WeatherCacheService) { }
  weatherSubscription: Subscription;
  dailyData: Array<any>;
  timezone: string;
  currentWeather: object;

  ngOnInit() {
    this.weatherSubscription = this.weatherCacheService.weatherDetails$.subscribe(
      weatherData => {
        this.dailyData = weatherData.daily.data;
        this.timezone = weatherData.timezone;
        this.currentWeather = weatherData.currently;
        if (this.dailyData.length > 8) {
          this.dailyData.length = 8; // to limit prediction to next 7 days
        }
      }
    );
  }

  getImagePath(iconName: string): string {
    return `../../assets/icons/${iconName}.svg`;
  }

  ngOnDestroy() {
    this.weatherSubscription.unsubscribe();
  }

}
