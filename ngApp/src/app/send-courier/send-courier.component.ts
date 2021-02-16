import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {Router} from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-send-courier',
  templateUrl: './send-courier.component.html',
  styleUrls: ['./send-courier.component.css']
})
export class SendCourierComponent implements OnInit {

  courierData:any={}
  temp:any={}
  
  constructor(private _auth:AuthService,private _router:Router) { }

  ngOnInit(): void {
  }

  sendCourier(){
    this._auth.sendCourier(this.courierData)
    .subscribe(
      res=> {
          this.temp=res['addedcourier'];
      alert("Your courier request is successfully added")
        this._router.navigate(['../home-page'])
      },
      err=>console.log(err)
      
    )
  }

}
