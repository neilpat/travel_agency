import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from "@angular/router";
import { CurrentUserService } from '../current-user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  username = "";
  constructor(private httpClient: HttpClient, private route : ActivatedRoute, private user:CurrentUserService, private router:Router) { }

  ngOnInit() {
    if(this.user.getUser() != ""){
      this.isLoggedIn = true;
      this.username = this.user.getUser();
    }else{
      this.isLoggedIn = false;
    }
  }

  logOut(e){
    this.httpClient.post('http://localhost:3000/logout', {}, { headers :
    new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }), withCredentials: true }).subscribe(data => {
      console.log("Logout", data);
      this.user.setUser("");
      this.isLoggedIn = false;
      this.router.navigate(['/flights']);
    });
  }

}
