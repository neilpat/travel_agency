import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-flight-detail',
  templateUrl: './flight-detail.component.html',
  styleUrls: ['./flight-detail.component.css']
})
export class FlightDetailComponent implements OnInit {
  flight;

  constructor(private httpClient: HttpClient, private route : ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe( params => {
        this.httpClient.get('http://localhost:3000/flights/' + params['id']).subscribe(data => {
        this.flight = data;
      });
    });

  }

}
