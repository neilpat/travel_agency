import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CurrentUserService } from '../current-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router, private http: HttpClient, private user:CurrentUserService) { }

  username: string;
  password: string;

  ngOnInit() {

  }

  enterName(e){
    this.username = e.target.value;
    console.log(this.username);
  }

  enterPassword(e){
    this.password = e.target.value;
    console.log(this.password);
  }

  login(e){
    this.http.post('http://localhost:3000/login', {username : this.username, password : this.password}, { headers :
    new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }), withCredentials: true }).subscribe(data => {
      console.log("Login data", data);
      this.user.setUser(this.username);
      // console.log("logged in user: " + this.user.getUser())
      this.router.navigate(['/flights']);
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {

      } else {

      }
    });
  }

}
