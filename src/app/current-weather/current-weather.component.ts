import { Component, Input } from '@angular/core';
import { CurrentWeather } from 'src/model/current-weather.model';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent {

  @Input() currentWeather: CurrentWeather;
  @Input() location: string;

}
