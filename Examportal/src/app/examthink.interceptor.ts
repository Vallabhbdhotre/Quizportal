import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './service/login.service';

@Injectable()
export class ExamthinkInterceptor implements HttpInterceptor {

  constructor( private lservice:LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token =this.lservice.gettoken()
    let authreq = request
    if(token !=null){
      authreq=request.clone({
        setHeaders:{
          'Authorization':`Bearer ${token}`
        }
      })
    }
    return next.handle(authreq);
    
  }
}
