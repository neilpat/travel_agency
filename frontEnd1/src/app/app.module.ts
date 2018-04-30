import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { FlightComponent } from './flight/flight.component';
import { CarComponent } from './car/car.component';
import { CruiseComponent } from './cruise/cruise.component';
import { HotelComponent } from './hotel/hotel.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SuggestionsComponent } from './suggestions/suggestions.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes:Routes = [
  {
    path: 'flights',
    component: FlightComponent
  },
  {
    path: 'hotels',
    component: HotelComponent
  },
  {
    path: 'cars',
    component: CarComponent
  },
  {
    path: 'cruise',
    component: CruiseComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    FlightComponent,
    CarComponent,
    CruiseComponent,
    HotelComponent,
    NavbarComponent,
    SuggestionsComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
