import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {
  baseUrl:any='http://localhost:8001/category'
  constructor( private http:HttpClient) { }
  //posting category details to server
  addCategory(data:any){
 return this.http.post(`${this.baseUrl}/`,data)
  }

  //get Category 
   getCategory():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}`);
   }

  // get all category pagebale 
getAllPageble(page:any,size:any):Observable<any>{
  let params =new HttpParams().set('page', page).set('size',size)
  return this.http.get(`${this.baseUrl}/`,{params:params})
 
} 

//getting category by id
   getById(id:any):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/${id}`)
   }
   //update category 
   updateCategory(id:any ,data:any):Observable<any>{
    return this.http.put(`${this.baseUrl}/${id}`,data)
   }

}
