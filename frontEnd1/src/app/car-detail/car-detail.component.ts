import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from "@angular/router";
import { CurrentUserService } from '../current-user.service';
import {Passenger} from "../passenger";

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  car;

  firstName1 : string;
  lastName1 : string;
  age1 : string;
  gender1 : string;

  firstName2 : string;
  lastName2 : string;
  age2 : string;
  gender2 : string;

  firstName3 : string;
  lastName3 : string;
  age3 : string;
  gender3 : string;

  firstName4 : string;
  lastName4 : string;
  age4 : string;
  gender4 : string;

  firstName5 : string;
  lastName5 : string;
  age5 : string;
  gender5 : string;

  id;

  constructor(private httpClient: HttpClient, private route : ActivatedRoute, private user:CurrentUserService, private router:Router) { }

  ngOnInit() {

    this.route.params.subscribe( params => {
        this.id = params['id'];
        this.httpClient.get('http://localhost:3000/cars/' + params['id']).subscribe(data => {
        this.car = data;
        console.log(this.car);
      });
    });

  }

  addPassengerToList(e){

    if(this.user.getUser() != ""){

      if(this.firstName1 == null){
        this.firstName1 = "";
      }
      if(this.firstName2 == null){
        this.firstName2 = "";
      }
      if(this.firstName3 == null){
        this.firstName3 = "";
      }
      if(this.firstName4 == null){
        this.firstName4 = "";
      }
      if(this.firstName5 == null){
        this.firstName5 = "";
      }

      var p1: Passenger = {
        FirstName : this.firstName1,
        LastName : this.lastName1,
        Age : this.age1,
        Gender : this.gender1
      };

      var p2: Passenger = {
        FirstName : this.firstName2,
        LastName : this.lastName2,
        Age : this.age2,
        Gender : this.gender2
      };

      var p3: Passenger = {
        FirstName : this.firstName3,
        LastName : this.lastName3,
        Age : this.age3,
        Gender : this.gender3
      };

      var p4: Passenger = {
        FirstName : this.firstName4,
        LastName : this.lastName4,
        Age : this.age4,
        Gender : this.gender4
      };

      var p5: Passenger = {
        FirstName : this.firstName5,
        LastName : this.lastName5,
        Age : this.age5,
        Gender : this.gender5
      };

      this.user.addPassengerToList(p1);
      this.user.addPassengerToList(p2);
      this.user.addPassengerToList(p3);
      this.user.addPassengerToList(p4);
      this.user.addPassengerToList(p5);

      this.router.navigate(['/checkout/' + this.id]);
    }else{
      console.log("Not Logged In");
    }
  }
}
