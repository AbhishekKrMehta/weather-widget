import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { WeatherDataService } from './weather-data.service';

describe('WeatherDataService', () => {
  let service: WeatherDataService;
  let httpMock: HttpTestingController;
  // todo: learn more about HTTP mocking

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherDataService]
    });
    service = TestBed.get(WeatherDataService);
    httpMock = TestBed.get(HttpTestingController);
  });

  // it ensures that no request is outstanding
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make GET call to the correct URL and return right data', () => {
    const weatherMock = [{
      awesomeDeveloper: 'Abhishek'
    }, {
      skills: 'Angular'
    }];
    service.getWeatherForcastUsingCoordinates().subscribe(weatherData => {
      expect(weatherData.length).toBe(2);
      expect(weatherData).toEqual(weatherMock);
    });
    // tslint:disable-next-line:max-line-length
    const request = httpMock.expectOne(`${service.enableCorsUrl}https://api.darksky.net/forecast/${service.apiKey}/52.3667,4.8945?&units=si`);
    expect(request.request.method).toBe('GET');
    request.flush(weatherMock);
  });
});
