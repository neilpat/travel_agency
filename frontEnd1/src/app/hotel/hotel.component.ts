import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from "@angular/router";
import { CurrentUserService } from '../current-user.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {

  constructor(private httpClient: HttpClient, private route : ActivatedRoute, private user:CurrentUserService) { }

  ngOnInit() {
  }

}
