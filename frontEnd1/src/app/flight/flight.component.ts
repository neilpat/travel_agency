import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {
  suggestions;

  constructor(private httpClient: HttpClient, private route : ActivatedRoute) { }

  ngOnInit() {
    this.httpClient.get('http://localhost:3000/flights')
    .subscribe(
      (data:any) =>{
        console.log(data);
        this.suggestions = data;
      }
    );
  }

}
