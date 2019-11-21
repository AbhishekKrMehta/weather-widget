import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-weather-summary-bar',
  templateUrl: './weather-summary-bar.component.html',
  styleUrls: ['./weather-summary-bar.component.scss']
})
export class WeatherSummaryBarComponent implements OnInit {
  @Input() currentWeather;
  @Input() timezone = 'AMSTERDAM';

  smallScreen: boolean;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.smallScreen = window.innerWidth < 800;
  }

  ngOnInit() {
    this.smallScreen = window.innerWidth < 800;
  }

}
