import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionServiceService {
 baseUrl:any='http://localhost:8001/question';
  constructor(private http:HttpClient) { }
//adding questions
  addQuestion(data:any){
  return this.http.post(`${this.baseUrl}/`,data)
}
//get questions by id
getQuestionById(id:any):Observable<any>{
  return this.http.get(`${this.baseUrl}/${id}`)
}
getQuestionsPageble(page:any,size:any):Observable<any>{
  let params =new HttpParams().set('page',page).set('size',size)
  return this.http.get(`${this.baseUrl}/`,{params:params})
}
//get questions
getQuestionList():Observable<any>{
return this.http.get(`${this.baseUrl}`)
}
//update Question
updateQuestion(id:any , data:any){
return this.http.put(`${this.baseUrl}/${id}`,data)
}

}
