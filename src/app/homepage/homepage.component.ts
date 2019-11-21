import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { CurrentWeather } from 'src/model/current-weather.model';
import { WeatherCacheService } from '../weather-cache.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit, OnDestroy {

  constructor(private weatherCacheService: WeatherCacheService) { }

  currentWeather: CurrentWeather;
  hourlyWeather;
  dailyWeather;
  location: string;
  weatherSubscription: Subscription;

  ngOnInit() {
    this.weatherSubscription = this.weatherCacheService.weatherDetails$.subscribe(
      weatherData => {
        this.location = weatherData.timezone;
        this.currentWeather = weatherData.currently;
      }
    );
  }

  ngOnDestroy() {
    if (this.weatherSubscription) {
      this.weatherSubscription.unsubscribe();
    }
  }

}
