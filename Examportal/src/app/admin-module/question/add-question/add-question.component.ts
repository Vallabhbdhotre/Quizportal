import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { category } from 'src/app/interface';
import { CategoryServiceService } from 'src/app/service/Adminservice/category-service.service';
import { QuestionServiceService } from 'src/app/service/Adminservice/question-service.service';
@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'],
})
export class AddQuestionComponent implements OnInit {
  addQuestionForm: FormGroup;
  categoryData :category[]=[];
  page:any=0;
  size:any=10;
  // export enum State {
  //   Drafting_NoneSelected, AwaitingApproval, Approved, Rejected, }
    
  //   export const StateNames: { [key in State]: string } = { [State.Drafting_NoneSelected]: 'Under udarbejdelse / ingen valgt ',   [State.AwaitingApproval]: 'Afventer godkendelse',
  //   [State.Approved]: 'Godkendt',   
  //   [State.Rejected]: 'Afvist',
  //   }
  
  ngOnInit() {
  this.getCategory();
  }
  constructor(
    private fb: FormBuilder,
    private qService: QuestionServiceService,
    private snack:MatSnackBar,
    private cService:CategoryServiceService
  ) {
    this.addQuestionForm = this.fb.group({
      content: ['', Validators.required],
      option1: ['', Validators.required],
      option2: ['', Validators.required],
      option3: ['', Validators.required],
      option4: ['', Validators.required],
      correctOption: ['', Validators.required],
      category:this.fb.group({
        id:[null ,Validators.required]
      }),
    });
   
  }
  get controls(){
    return this.addQuestionForm.controls;
  }
  getCategory(){
    this.cService.getAllPageble(this.page,this.size).subscribe({
      next:(data)=>{
        if(data){
          this.categoryData=data.content;
        }
      },
      error:(error)=>{
        console.log('Error in getting data !',error);
      }
    })
  }

  addQuestion() {
    if (this.addQuestionForm.valid) {
      this.qService.addQuestion(this.addQuestionForm.value).subscribe({
        next: (res) => {
         this.snack.open('Qusetion Added Succesfully','' ,{duration:1000 ,verticalPosition:'top'})
         this.addQuestionForm.reset()
         console.log(res);
         
        },
        error:(error)=>{
          console.log('Error',error);
          
        this.snack.open('Something went wrong !','' ,{duration:2000,verticalPosition:'top'})
        }
      });
    } else {
      this.addQuestionForm.markAllAsTouched();
      alert('All Fields Are Required !');
    }
  }

}
