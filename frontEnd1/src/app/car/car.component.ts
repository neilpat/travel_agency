import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {ActivatedRoute, Router} from "@angular/router";
import { CurrentUserService } from '../current-user.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars;
  constructor(private httpClient: HttpClient, private route : ActivatedRoute, private user:CurrentUserService) { }

  ngOnInit() {
    this.httpClient.get('http://localhost:3000/cars')
    .subscribe(
      (data:any) =>{
        console.log(data);
        this.cars = data;
      }
    );
  }

}
