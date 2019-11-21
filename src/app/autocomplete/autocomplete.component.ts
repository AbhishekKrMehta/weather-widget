import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatOptionSelectionChange } from '@angular/material';
import { Subject, Subscription, Observable, throwError } from 'rxjs';

import { GeocodingFeatureProperties } from 'src/model/geocoding-feature-properties.model';
import { PlaceSuggestion } from 'src/model/place-suggestion.model';
import { WeatherDataService } from '../weather-data.service';
import { WeatherCacheService } from '../weather-cache.service';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})

export class AutocompleteComponent implements OnDestroy {
  API_KEY = '34dc3cf6e7dd431eb505531448de024c';
  searchOptions: Subject<PlaceSuggestion[]> = new Subject<PlaceSuggestion[]>();
  showLoader = false;
  searchFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ]);

  private valueChangesSub: Subscription;
  private choosenOption: PlaceSuggestion;
  private userInputTimeout: number;
  private requestSub: Subscription;

  constructor(
    private http: HttpClient,
    private weatherDataService: WeatherDataService,
    private weatherCacheService: WeatherCacheService
  ) {
    this.valueChangesSub = this.searchFormControl.valueChanges.subscribe((value) => {
      if (this.userInputTimeout) {
        window.clearTimeout(this.userInputTimeout);
      }
      if (this.choosenOption && this.choosenOption.shortAddress === value) {
        this.searchOptions.next(null);
        return;
      }
      // provide suggestions if minimum 3 letters are entered
      if (!value || value.length < 3) {
        this.searchOptions.next(null);
        return;
      }
      this.userInputTimeout = window.setTimeout(() => {
        this.generateSuggestions(value);
      }, 300);
    });
  }

  public generateSuggestions(text: string): void {
    const url = `https://api.geoapify.com/v1/geocode/api?q=${text}&limit=5&api_key=${this.API_KEY}`;
    if (this.requestSub) {
      this.requestSub.unsubscribe();
    }
    this.showLoader = true;
    this.requestSub = this.http.get(url).subscribe((data: any) => {
      const placeSuggestions = data.features.map(feature => {
        const properties: GeocodingFeatureProperties = (feature.properties as GeocodingFeatureProperties);
        return {
          shortAddress: this.generateShortAddress(properties),
          latitude: properties.lat,
          longitude: properties.lon
        };
      });
      this.searchOptions.next(placeSuggestions.length ? placeSuggestions : null);
      this.showLoader = false;
    }, err => {
      this.showLoader = false;
      this.handleError(err);
    });
  }

  private handleError(error: HttpErrorResponse): void | Observable<any> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  public generateShortAddress(properties: GeocodingFeatureProperties): string {
    let shortAddress = properties.name;
    if (!shortAddress && properties.street && properties.housenumber) {
      // name is not set for buildings
      shortAddress = `${properties.street} ${properties.housenumber}`;
    }
    shortAddress += (properties.postcode && properties.city) ? `, ${properties.postcode}-${properties.city}` : '';
    shortAddress += (!properties.postcode && properties.city && properties.city !== properties.name) ? `, ${properties.city}` : '';
    shortAddress += (properties.country && properties.country !== properties.name) ? `, ${properties.country}` : '';
    return shortAddress;
  }

  public optionSelectionChange(option: PlaceSuggestion, event: MatOptionSelectionChange): void {
    if (event.isUserInput) {
      this.choosenOption = option;
      if (option.latitude && option.longitude) {
        this.weatherDataService.getWeatherForcastUsingCoordinates(option.latitude, option.longitude).subscribe(
          (weatherData: any) => {
            this.weatherCacheService.emitWeatherDetails(weatherData);
          }
        );
      }
    }
  }

  ngOnDestroy() {
    this.valueChangesSub.unsubscribe();
  }

}
