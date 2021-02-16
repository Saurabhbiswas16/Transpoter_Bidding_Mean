import { Injectable,Injector } from '@angular/core';
import { HttpInterceptor, HttpHandler,HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor( private injector:Injector) { }
 
  intercept(req, next: HttpHandler) {
    let authService =this.injector.get(AuthService)
    let tokenizedreq = req.clone({
      url:  req.url,
      setHeaders: {
        Authorization: `Bearer ${ authService.getToken() } `
      }
     // ${tokenizedreq}
    });
    return next.handle(req);
  }
}
