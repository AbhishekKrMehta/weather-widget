import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { HourlyForecastComponent } from './hourly-forecast.component';
import { WeatherCacheService } from '../weather-cache.service';

describe('HourlyForecastComponent', () => {
  let component: HourlyForecastComponent;
  let fixture: ComponentFixture<HourlyForecastComponent>;

  beforeEach(async(() => {
    const weatherCacheServiceMock = {
      weatherDetails$: of({
        hourly: {
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9']
        },
        timezone: 'timezone',
        currently: {
          dev: 'abhi'
        }
      })
    };

    TestBed.configureTestingModule({
      declarations: [HourlyForecastComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: WeatherCacheService, useValue: weatherCacheServiceMock }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HourlyForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the right values when ngOnInit() is called', () => {
    component.ngOnInit();
    expect(component.step).toBe(0);
    expect(component.timezone).toEqual('timezone');
    expect(component.currentWeather).toEqual({ dev: 'abhi' });
    expect(component.hourlyData).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9']);
    expect(component.hourlyData.length).toEqual(9);
  });

  it('setStep() should set the right value for step', () => {
    component.setStep(5);
    expect(component.step).toBe(5);
  });

  it('nextHour() should increment the value of step by 1', () => {
    component.setStep(5);
    expect(component.step).toBe(5);
    component.nextHour();
    expect(component.step).toBe(6);
  });

  it('prevHour() should decrement the value of step by 1', () => {
    component.setStep(5);
    expect(component.step).toBe(5);
    component.prevHour();
    expect(component.step).toBe(4);
  });

  it('getImagePath() should return the correct path', () => {
    expect(component.getImagePath('test')).toBe('../../assets/icons/test.svg');
  });
});
