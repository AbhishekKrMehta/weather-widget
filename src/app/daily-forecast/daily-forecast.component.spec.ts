import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { MatTooltipModule } from '@angular/material';
import { of } from 'rxjs';

import { DailyForecastComponent } from './daily-forecast.component';
import { WeatherCacheService } from '../weather-cache.service';

describe('DailyForecastComponent', () => {
  let component: DailyForecastComponent;
  let fixture: ComponentFixture<DailyForecastComponent>;

  beforeEach(async(() => {
    const weatherCacheServiceMock = {
      weatherDetails$: of({
        daily: {
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9']
        },
        timezone: 'timezone',
        currently: {
          dev: 'abhi'
        }
      })
    };

    TestBed.configureTestingModule({
      declarations: [DailyForecastComponent],
      imports: [MatTooltipModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: WeatherCacheService, useValue: weatherCacheServiceMock },
        { provide: HAMMER_LOADER, useValue: () => new Promise(() => { }) } // to avoid hammer js warning during test
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the right values when ngOnInit is called', () => {
    component.ngOnInit();
    expect(component.dailyData).toEqual(['1', '2', '3', '4', '5', '6', '7', '8']);
    expect(component.timezone).toEqual('timezone');
    expect(component.currentWeather).toEqual({ dev: 'abhi' });
    expect(component.dailyData.length).not.toEqual(9);
  });
});
