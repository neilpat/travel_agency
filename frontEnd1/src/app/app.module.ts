import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { CurrentUserService } from './current-user.service';

import { AppComponent } from './app.component';
import { FlightComponent } from './flight/flight.component';
import { CarComponent } from './car/car.component';
import { CruiseComponent } from './cruise/cruise.component';
import { HotelComponent } from './hotel/hotel.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SuggestionsComponent } from './suggestions/suggestions.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FlightDetailComponent } from './flight-detail/flight-detail.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { CruiseDetailComponent } from './cruise-detail/cruise-detail.component';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProfileComponent } from './profile/profile.component';

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
    path: 'cruises',
    component: CruiseComponent
  },
  {
    path: '',
    component: FlightComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'flights/:id',
    component: FlightDetailComponent
  },
  {
    path: 'cars/:id',
    component: CarDetailComponent
  },
  {
    path: 'hotels/:id',
    component: HotelDetailComponent
  },
  {
    path: 'cruises/:id',
    component: CruiseDetailComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
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
    RegisterComponent,
    FlightDetailComponent,
    CarDetailComponent,
    CruiseDetailComponent,
    HotelDetailComponent,
    CheckoutComponent,
    ProfileComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserModule
  ],
  providers: [CurrentUserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
