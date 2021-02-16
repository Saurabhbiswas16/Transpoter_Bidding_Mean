import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-bidding-section',
  templateUrl: './bidding-section.component.html',
  styleUrls: ['./bidding-section.component.css']
})
export class BiddingSectionComponent implements OnInit {

  allcourier:any=[]
  bidchange:Number
  id:String
  price:Number
  changeprice:Number
  constructor(private _authService: AuthService,
    private _router: Router,private http:HttpClient) { }

    ngOnInit():void {
      
      this._authService.getAllCouriers()
        .subscribe(
        res => {
          
          
          this.allcourier= res['allcouries']
          
        },
          err => {
            if( err instanceof HttpErrorResponse ) {
              if (err.status === 401) {
                this._router.navigate(['/login'])
              }
            }
          }
        )
        
    }

    bidValue(updatedcourier){
      
      this.http.get<any>('http://localhost:3000/api/updatecourier?id=' + updatedcourier._id + '&price=' + this.priceChange).subscribe(
        (res) => {
          
          
          if(res['lesserr'])
          {
            alert(res['lesserr'])
            window.location.reload();
          }
          else
          {
            alert("You have succesfully bidded ")
            window.location.reload();
          }
          
        
      }
      ,
      (error) =>{
        if(error instanceof HttpErrorResponse)
        {
          console.log(error);
        }
        
      })
    }
    confirmBid(updatedcourier)
    {
      console.log(updatedcourier._id,this.priceChange);
      

      this.http.get<any>('http://localhost:3000/api/updatecheck?id=' + updatedcourier._id ).subscribe(
        (res) => {
        
          alert("You have succesfully confirmed your courier")
          window.location.reload();
      }
      ,
      (error) =>{
        
        if(error instanceof HttpErrorResponse)
        {
          console.log(error);
        }
        
      })
    }
    

      priceChange(value: any){
        this.priceChange=value       
    }

}