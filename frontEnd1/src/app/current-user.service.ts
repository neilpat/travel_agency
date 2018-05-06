import { Injectable } from '@angular/core';

@Injectable()
export class CurrentUserService {
  private currentUser = "";
  constructor() {
    this.currentUser = "";
  }

  getUser(){
    return this.currentUser;
  }

  setUser(user){
    this.currentUser = user;
  }

}
