import { TmplAstHoverDeferredTrigger } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuizCategoryService } from 'src/app/service/userService/quiz-category.service';

@Component({
  selector: 'app-play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.css'],
})
export class PlayQuizComponent {
  quizForm:FormGroup;
  id: any;
  questionList: any[] = [];
  quizDetails: any = {};
  questions:any=null;
  result:any='';
  constructor(
    private userService: QuizCategoryService,
    private route: ActivatedRoute,
    private fb:FormBuilder,
    private snack :MatSnackBar
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.playQuiz(this.id);
    this.quizForm=this.fb.group({
      Answer:this.fb.array([])
    })
  }
  get AnswerArray(){
    return this.quizForm.get('Answer') as FormArray;
  }
 AnswerFields(id:any,ans:any){
  return this.fb.group({
    questionId:[id ,Validators.required],
    userAnswer:[ans,Validators.required]
  })
 }
 addAnswer(Qid:any , ans:any){
  
  this.AnswerArray.push(this.AnswerFields(Qid,ans))
  console.log(Qid,ans);
  
 }
 addAnswer1(Qid: any, ans: any) {
  // Check if an answer for the current question already exists
  const existingAnswerIndex = this.AnswerArray.controls.findIndex(
    (control) => control.get('id')?.value === Qid
  );

  if (existingAnswerIndex !== -1) {
    // Update the existing answer
    this.AnswerArray.controls[existingAnswerIndex].get('userAnswer')?.setValue(ans);
  } else {
    // Add a new answer
    this.AnswerArray.push(this.AnswerFields(Qid, ans));
  }

}







  playQuiz(id: any) {
    this.userService.getPlayQuiz(id).subscribe({
      next: (res: any) => {
        if (res) {
          
          this.questionList = res.questions;
          this.questions=this.questionList.length
          // console.log('no of questions:',this.questions);
          
          this.quizDetails = res;
          console.log('question list', this.questionList);
        }
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }
   submitQuiz(){
    // console.log(this.AnswerArray.value);
    
      if(this.AnswerArray.length == this.questions ){
        this.userService.submitQuiz(this.id , this.AnswerArray.value).subscribe({
          next:(res)=>{
            // console.log(res);
            this.result=res.message;
            if(res.code==200){
               alert('Test Received')
               
            }
          },

          error:(error)=>{
            console.log(error);
            this.snack.open('Something went wrong','',{duration:2000,verticalPosition:'top'})
            
          }
        })

      }
      else{
      alert('All Questions Are Mandatory !');
      }
   }
}
