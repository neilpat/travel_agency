import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {ActivatedRoute, Router} from "@angular/router";
import { CurrentUserService } from '../current-user.service';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {
  suggestions;

  constructor(private httpClient: HttpClient, private route : ActivatedRoute, private user:CurrentUserService) { }

  ngOnInit() {
    this.httpClient.get('http://localhost:3000/flights')
    .subscribe(
      (data:any) =>{
        console.log(data);
        this.suggestions = data;
      }
    );


    console.log("logged in user: " + this.user.getUser())
  }

}
