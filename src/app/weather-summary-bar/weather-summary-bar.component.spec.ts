import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { WeatherSummaryBarComponent } from './weather-summary-bar.component';

describe('WeatherSummaryBarComponent', () => {
  let component: WeatherSummaryBarComponent;
  let fixture: ComponentFixture<WeatherSummaryBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherSummaryBarComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherSummaryBarComponent);
    component = fixture.componentInstance;
    const weatherSummary = fixture.debugElement.componentInstance;
    weatherSummary.currentWeather = {
      temperature: 'test',
      time: '123',
      icon: 'rain'
    };
    weatherSummary.timezone = 'AMSTERDAM';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit( should set the right value)', () => {
    expect(component.smallScreen).toBe(false);
  });

});
