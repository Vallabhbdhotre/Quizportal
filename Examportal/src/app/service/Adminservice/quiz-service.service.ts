import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizServiceService {
  constructor(private http: HttpClient) {}
  baseUrl: any = 'http://localhost:8001/quiz';
  //posting quiz to server
  addQuiz(data: any) {
    return this.http.post(`${this.baseUrl}/`, data);
  }
  //get Quiz by id
  getById(id:any):Observable<any>{
    return this.http.get(`${this.baseUrl}/${id}`)
  }

  //get all Quizes
  getQuize(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
 getAllQuizesPageble(page:any,size:any):Observable<any>{
  let params=new HttpParams().set('page',page).set('size',size)
  return this.http.get(`${this.baseUrl}/`,{params:params})
 }

  //update Quiz
    updateQuiz(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }
}
