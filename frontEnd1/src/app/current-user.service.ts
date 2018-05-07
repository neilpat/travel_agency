import { Injectable } from '@angular/core';
import {Passenger} from "./passenger";

@Injectable()
export class CurrentUserService {
  private currentUser = "";
  private passengers : Array<Passenger> = [];
  constructor() {
    this.currentUser = "";
  }

  getUser(){
    return this.currentUser;
  }

  setUser(user){
    this.currentUser = user;
  }

  addPassengerToList(p){
    this.passengers.push(p);
  }

  clearPassengers(){
    this.passengers = [];
  }

  getPassengers(){
    return this.passengers;
  }

}
