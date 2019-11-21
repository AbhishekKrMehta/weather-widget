import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  constructor(private http: HttpClient) { }

  apiKey = 'd7a80137044a18b6a83d72b2c9f992c8';
  enableCorsUrl = 'https://cors-anywhere.herokuapp.com/';

  // default parameters are co-ordinates of Amsterdam
  getWeatherForcastUsingCoordinates(latitude = '52.3667', longitude = '4.8945', unit = 'si'): Observable<any> {
    const url = `${this.enableCorsUrl}https://api.darksky.net/forecast/${this.apiKey}/${latitude},${longitude}?&units=${unit}`;
    return this.http.get(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
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

  // not used anymore
  // gettHeaders() {
  //   return {
  //     headers: new HttpHeaders().set('Origin', 'https://example.com')
  //   }
  // }
}
