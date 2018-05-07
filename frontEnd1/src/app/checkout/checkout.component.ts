import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from "@angular/router";
import { CurrentUserService } from '../current-user.service';
import {Passenger} from "../passenger";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cardNumber : string;
  ccv : string;
  expMonth : string;
  expYear : string;
  id;

  constructor(private httpClient: HttpClient, private route : ActivatedRoute, private user:CurrentUserService, private router:Router) { }

  ngOnInit() {
    // console.log(this.user.getPassengers());
    // console.log(this.cardNumber);
    // console.log(this.ccv);
    // console.log(this.expMonth);
    // console.log(this.expYear);
  }

  confirmPurchase(e){
    console.log(this.user.getPassengers());
    console.log(this.cardNumber);
    console.log(this.ccv);
    console.log(this.expMonth);
    console.log(this.expYear);
    if(this.user.getUser() != ""){
      var cardNum = this.cardNumber;
      var ccv = this.ccv;
      var exp = this.expMonth.concat("/");
      exp = exp.concat(this.expYear);
      console.log(cardNum);
      console.log(ccv);
      console.log(exp);

      this.httpClient.post('http://localhost:3000/payment', {
        CardNumber : cardNum,
        PaymentType : "Credit",
        CardExpiration : exp,
        Ccv : ccv
      }, { headers :
      new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }), withCredentials: true }).subscribe(data => {
        console.log("Payment Added", data);
        this.router.navigate(['/']);
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {

        } else {

        }
      });

      console.log(this.user.getPassengers());
      this.httpClient.post('http://localhost:3000/adduser', this.user.getPassengers(), { headers :
      new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }), withCredentials: true }).subscribe(data => {
        console.log("passengers", data);
        console.log(data);
        // this.router.navigate(['/']);
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {

        }else{

        }
      });

      this.route.params.subscribe( params => {
          this.id = params['id'];
          this.httpClient.post('http://localhost:3000/updateTransportation',
          {
            TransportationID : this.id
          }, { headers :
          new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }), withCredentials: true }).subscribe(data => {
            console.log("transportation added", data);
            this.router.navigate(['/']);
          }, (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {

            } else {

            }
          });

      });
    }else{
      this.router.navigate(['/']);
    }
  }

}
