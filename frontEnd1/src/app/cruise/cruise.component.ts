import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-cruise',
  templateUrl: './cruise.component.html',
  styleUrls: ['./cruise.component.css']
})
export class CruiseComponent implements OnInit {
  cruises;
  constructor(private httpClient: HttpClient, private route : ActivatedRoute) { }

  ngOnInit() {
    this.httpClient.get('http://localhost:3000/cruises')
    .subscribe(
      (data:any) =>{
        console.log(data);
        this.cruises = data;
      }
    );
  }

}
