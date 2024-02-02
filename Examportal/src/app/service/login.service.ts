import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl:any='http://localhost:8001/generate-token'
  constructor(private http:HttpClient) { }
  //posting logindata to server
  login(data:any):Observable<any>{
    return this.http.post(`${this.baseUrl}`,data);
  }
  //checking if the user is loggedin or not 
  islogged(){
   const tokenStr = localStorage.getItem('token');
   if(tokenStr == null|| tokenStr==""||tokenStr==undefined){
    return false;
   }
   else{
    return true;
   }
  }
  logout(){
    localStorage.clear();
  }
  gettoken(){
    return localStorage.getItem('token')
  }
  //checking if admin logged
  // Adminlogged(){
  // const user =localStorage.getItem('userData');
  // const phone=localStorage.getItem('userData')
  // if( user=='vallabh123'){

  // }
  // }

}
