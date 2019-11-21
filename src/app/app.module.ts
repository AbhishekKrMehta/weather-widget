import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { InvalidRouteComponent } from './invalid-route/invalid-route.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { HourlyForecastComponent } from './hourly-forecast/hourly-forecast.component';
import { DailyForecastComponent } from './daily-forecast/daily-forecast.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { WeatherSummaryBarComponent } from './weather-summary-bar/weather-summary-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    InvalidRouteComponent,
    HomepageComponent,
    AutocompleteComponent,
    HourlyForecastComponent,
    DailyForecastComponent,
    CurrentWeatherComponent,
    WeatherSummaryBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AutocompleteComponent]
})
export class AppModule { }
