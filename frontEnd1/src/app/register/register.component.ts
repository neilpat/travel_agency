import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username:string;
  password: string;

  constructor(private httpClient: HttpClient, private router:Router) { }

  ngOnInit() {

  }

  enterName(e){
    this.username = e.target.value;
  }

  enterPassword(e){
    this.password = e.target.value;
  }

  registerUser(e){
    console.log("hello");
    console.log(this.username);
    console.log(this.password);
    if(this.username == null || this.username == "" || this.password == null || this.password == ""){
      return;
    }
    this.httpClient.post('http://localhost:3000/register',{
      username: this.username,
      password: this.password
    })
    .subscribe(data => {
      console.log(data);
      this.router.navigate(['/login']);
    });
  }

}
