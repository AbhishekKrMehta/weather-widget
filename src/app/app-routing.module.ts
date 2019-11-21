import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvalidRouteComponent } from './invalid-route/invalid-route.component';
import { WeatherDataResolverService } from './weather-data-resolver.service';
import { HomepageComponent } from './homepage/homepage.component';
import { HourlyForecastComponent } from './hourly-forecast/hourly-forecast.component';
import { DailyForecastComponent } from './daily-forecast/daily-forecast.component';


const routes: Routes = [
  // { path: 'crisis-center', component: CrisisListComponent },
  // { path: 'hero/:id', component: HeroDetailComponent },
  {
    path: 'home',
    component: HomepageComponent
    // resolve: {
    //   data: WeatherDataResolverService
    // }
  },
  {
    path: 'hourly-forecast',
    component: HourlyForecastComponent
  },
  {
    path: 'daily-forecast',
    component: DailyForecastComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: InvalidRouteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
