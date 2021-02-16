import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public msg: any = [];
  public avail: boolean;
  loginUserData:any={}

  constructor(private _auth:AuthService,private _router:Router) { }


  ngOnInit(): void {
  }

  loginUser()
  {
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res=> {
        if(res['loginerror'])
          {
            
            
            this.msg = res['loginerror']
            this.avail=true;
            return;
          }
        
        localStorage.setItem('token', res['token'] )
        localStorage.setItem('bidderemail', res['bidderemail'] )
        this._router.navigate(['../bidding-section'])
      },
      err=>console.log(err)
      
    )
  }
}
