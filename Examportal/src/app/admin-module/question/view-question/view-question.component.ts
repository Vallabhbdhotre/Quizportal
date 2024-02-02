import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionServiceService } from 'src/app/service/Adminservice/question-service.service';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.css']
})
export class ViewQuestionComponent implements OnInit {
questionList:any[]=[];
page:any=0;
size:any=10;
constructor(private qService:QuestionServiceService ,private router:Router){}

ngOnInit() {
  this.getQuestionsList();
}
getQuestionsList(){
  this.qService.getQuestionsPageble(this.page,this.size).subscribe({
    next:(res)=>{
      if(res){
        this.questionList=res.content;
        console.log('data received !'); 
      }
    },
    error:(error)=>{
      console.log('error in getting data !',error);
    }
  })
}
updateQuestion(id:any){
 this.router.navigate(['admin/updateQuestion',id])
}
addQuestion(){
  this.router.navigate(['admin/addQuestion'])
}


}

