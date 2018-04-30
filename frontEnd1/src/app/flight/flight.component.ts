import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {
  suggestions;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get('https://my-json-server.typicode.com/nihadhn2/hello-world/flights')
    .subscribe(
      (data:any) =>{
        console.log(data);
        this.suggestions = data;
      }
    )
  }

}
