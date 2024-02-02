import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizCategoryService {

  constructor( private http:HttpClient) { }
  //get Active category list
  getAciveCategory():Observable<any>{
    return this.http.get('http://localhost:8001/category/list')
  }
  //get Active quiz list
  getActiveQuiz():Observable<any>{
    return this.http.get('http://localhost:8001/quiz/active')
  }
  //play quiz
  getPlayQuiz(id:any):Observable<any>{
    return this.http.get(`${'http://localhost:8001/quiz/play'}/${id}`)
  }
  //submit quiz
  submitQuiz(id:any ,data:any):Observable<any>{
  return this.http.post(`${'http://localhost:8001/quiz/submit'}/${id}`,data)
  }

}
