import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {Router} from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData:any={}
  
  
  constructor(private _auth:AuthService,private _router:Router) { }

  ngOnInit(): void {
  }

  registerUser(){
    this._auth.registerUser(this.registerUserData)
    .subscribe(
      res=> {
      
        console.log(res)
        localStorage.setItem('token', res['token'] )
        localStorage.setItem('bidderemail', res['bidderemail'] )
        this._router.navigate(['../bidding-section'])
      },
      err=>console.log(err)
      
    )
  }
  
}
