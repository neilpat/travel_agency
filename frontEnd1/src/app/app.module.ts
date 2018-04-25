import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { FlightComponent } from './flight/flight.component';
import { CarComponent } from './car/car.component';
import { CruiseComponent } from './cruise/cruise.component';
import { HotelComponent } from './hotel/hotel.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SuggestionsComponent } from './suggestions/suggestions.component';


@NgModule({
  declarations: [
    AppComponent,
    FlightComponent,
    CarComponent,
    CruiseComponent,
    HotelComponent,
    NavbarComponent,
    SuggestionsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
