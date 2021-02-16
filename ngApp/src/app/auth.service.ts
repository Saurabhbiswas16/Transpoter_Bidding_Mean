import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpClientModule } from '@angular/common/http';
import  { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  private _registerUrl="http://localhost:3000/api/register";
  private _loginUrl="http://localhost:3000/api/login";
  private _courierUrl="http://localhost:3000/api/courier";
  private _allcourierUrl="http://localhost:3000/api/getallcourier";
  private _updatecourierUrl="http://localhost:3000/api/updatecourier";

  constructor(private http:HttpClient,private _router:Router) { }

  
  registerUser(body: any) {
    
    return this.http.post(this._registerUrl, body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  loginUser(body: any) {
    
    return this.http.post(this._loginUrl, body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  loggedIn()
  {
    return !!localStorage.getItem('token')
  }

  canBid(yemail:String)
  {
    
    var checkemail:String=localStorage.getItem('bidderemail')
    if(checkemail!=yemail)
    {
      return true;
    }
    else
    {
      return false
    }
  }
 
  logoutUser()
  {
    localStorage.removeItem('token')
    this._router.navigate(['./home-page'])
  }

  getToken()
  {
    localStorage.getItem('token')
  }

  getBidderEmail()
  {
    localStorage.getItem('bidderemail')
  }



  sendCourier(body: any) {
    
    return this.http.post(this._courierUrl, body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  getAllCouriers() {
    return this.http.get<any>(this._allcourierUrl)
  }
  
 
}
