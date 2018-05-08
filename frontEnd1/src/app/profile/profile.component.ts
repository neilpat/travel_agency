import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from "@angular/router";
import { CurrentUserService } from '../current-user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private httpClient: HttpClient, private route : ActivatedRoute, private user:CurrentUserService, private router:Router) { }

  username = "";
  isFlight = false;
  isCar = false;
  isCruise = false;
  hotelFound = false;
  containsPassengers = false;
  paymentFound = false;
  profile;
  flight;
  car;
  cruise;
  hotel;
  passengers;
  payment;
  transportType;

  ngOnInit() {
    if(this.user.getUser() != ""){
      this.username = this.user.getUser();
      console.log(this.username);
      this.httpClient.get('http://localhost:3000/profile').subscribe(data =>{
        this.profile = data;
        var groupID = this.profile.GroupID;
        var transportationID = this.profile.TransportationID;
        var hotelID = this.profile.AccommodationID;
        console.log(this.profile);
        console.log("groupID" + groupID);
        console.log("transID" + transportationID);
        console.log("hotelID" + hotelID);

        if(transportationID != null){
          this.httpClient.get('http://localhost:3000/transportation/' + transportationID)
          .subscribe((data : any) => {
            console.log(data);
            this.transportType = data.TransportationType;
            console.log("type: ");
            console.log(this.transportType);

            if(this.transportType == "flight"){

              this.httpClient.get('http://localhost:3000/flights/' + transportationID)
              .subscribe(data => {
                this.flight = data;
                this.isFlight = true;
                this.isCar = false;
                this.isCruise = false;
                console.log("flight:");
                console.log(this.flight);
              });

            }else if(this.transportType == "car"){

              this.httpClient.get('http://localhost:3000/cars/' + transportationID)
              .subscribe(data => {
                this.car = data;
                this.isFlight = false;
                this.isCar = true;
                this.isCruise = false;
                console.log("car:");
                console.log(this.car);
              });

            }else if(this.transportType == "cruise"){

              this.httpClient.get('http://localhost:3000/cruises/' + transportationID)
              .subscribe(data => {
                this.cruise = data;
                this.isFlight = false;
                this.isCar = false;
                this.isCruise = true;
                console.log("cruise:");
                console.log(this.cruise);
              });
            }
          });
        }else{
          this.isFlight = false;
          this.isCar = false;
          this.isCruise = false;
        }

        if(hotelID != null){
          this.httpClient.get('http://localhost:3000/hotels/' + hotelID)
          .subscribe(data => {
            this.hotel = data;
            console.log("hotel:");
            console.log(this.hotel);
            if(this.hotel != null){
              this.hotelFound = true;
            }else{
              this.hotelFound = false;
            }
          });
        }else{
          this.hotel = null;
        }

        this.httpClient.get('http://localhost:3000/payment/' + groupID)
        .subscribe(data => {
          this.payment = data;
          console.log("payment:");
          console.log(this.payment);
          if(this.payment != null){
            this.paymentFound = true;
          }else{
            this.paymentFound = false;
          }
        }, (err: HttpErrorResponse) => {
          console.log("payment erorr");
          if (err.error instanceof Error) {

          } else {

          }
        });

        this.httpClient.get('http://localhost:3000/group/' + groupID)
        .subscribe(data => {
          this.passengers = data;
          if(this.passengers[0] != null){
            console.log("enterin not emp");
            this.containsPassengers = true;
          }else{
            this.containsPassengers = false;
          }
          console.log("passengers:");
          console.log(this.passengers);
        });

      });
    }else{
      // this.router.navigate(['/']);
    }
  }

}
