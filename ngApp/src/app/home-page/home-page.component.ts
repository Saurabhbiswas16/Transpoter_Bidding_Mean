import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  allcourier:any=[]
  constructor(private _authService: AuthService,
    private _router: Router,private http:HttpClient) { }

  ngOnInit(): void {
    this._authService.getAllCouriers()
    .subscribe(
    res => {
      
      
      this.allcourier= res['allcouries']
      
    },
      err => {
        console.log(err)
      }
    )
  }
  checkLogin()
  {
    if(this._authService.loggedIn())
    {
      this._router.navigate(['../bidding-section'])
    }
    else{
        this._router.navigate(['../login'])
    }
  }

}
