import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CategoryServiceService } from 'src/app/service/Adminservice/category-service.service';
import { QuestionServiceService } from 'src/app/service/Adminservice/question-service.service';
import { QuizServiceService } from 'src/app/service/Adminservice/quiz-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css'],
})
export class AddQuizComponent implements OnInit {
  id: any;
  page: any = 0;
  size: any = 10;
  isEdit: boolean = false;
  questionList: any[] = [];
  categoryList: any[] = [];
  dropdownSettings: IDropdownSettings = {};
  // questions: any[] = [];
  quizList: any = {};
  quizQuestionList:any={};

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id != undefined || this.id != null) {
      this.isEdit = true;
      this.getById(this.id);
    }
    this.getQuestionsList();
    this.getCategoryList();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'content',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

  addQuizForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private quizService: QuizServiceService,
    private snack: MatSnackBar,
    private router: Router,
    private questionService: QuestionServiceService,
    private categoryService: CategoryServiceService,
    private location:Location
    
  ) {
    this.addQuizForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: this.fb.group({
        id: [null, Validators.required],
      }),
      questions: this.fb.array([]),
    });
  }
  get control() {
    return this.addQuizForm.controls;
  }
  get questionArray() {
    return this.control['questions'] as FormArray;
  }

  commonFields(id: any) {
    return this.fb.group({
      id: [id, Validators.required],
    });
  }
  addQuestion(item: any) {
    this.questionArray.push(this.commonFields(item.id));
    console.log(item);
  }

  onSelectAll(items: any) {
    this.questionArray.clear();
    for (let i = 0; i < items.length; i++) {
        this.questionArray.push(this.commonFields(items[i].id));
    }
  }
  
  unSelect(id: any) {
    console.log(id);
    this.questionArray.removeAt(id);
  }
  unSelectAll() {
    this.questionArray.clear();
  }

 patchArray1(items:any){
 for(let i=0 ;i<items.length;i++){
  this.questionArray.push(this.commonFields(items[i].id))
 }
 }



  //getQuiz by id to update
  getById(id: any) {
    this.quizService.getById(id).subscribe({
      next: (res) => {
        if (res) {
          this.quizList = res;
          this.quizQuestionList=res.questions;
          console.log('quiz received !', this.quizList);
          // console.log('question list in quiz',this.quizQuestionList);
          
          this.addQuizForm.patchValue({
            title: res.title,
            description: res.description,
            category: {
              id: res.category.id,
            },
            questions:[
              this.patchArray1(res.questions)
            ]    
          
          });
        }
      },
      error: (error) => {
        console.log('error in getting date', error);
      },
    });
  }




  //getting categotryList
  getCategoryList() {
    this.categoryService.getAllPageble(this.page, this.size).subscribe({
      next: (data) => {
        if (data) {
          this.categoryList = data.content;
          console.log('catogorylist received !');
        }
      },
      error: (error) => {
        console.log('error in getting catList', error);
      },
    });
  }

  //getting questionsList
  getQuestionsList() {
    this.questionService.getQuestionsPageble(this.page, this.size).subscribe({
      next: (data) => {
        if (data) {
          console.log('Qlist received !');
          this.questionList = data.content;
        }
      },
      error: (error) => {
        console.log('Error in getting Qlist', error);
      },
    });
  }
  //adding Quiz
  AddQuiz() {
    if (this.addQuizForm.valid) {
      this.quizService.addQuiz(this.addQuizForm.value).subscribe({
        next: () => {
          this.snack.open('Quiz Added Succesfully !', '', {
            duration: 1500,
            verticalPosition: 'top',
          });
          this.addQuizForm.reset();
        },
        error: (error) => {
          this.snack.open('Something Went wrong !', '', {
            duration: 1500,
            verticalPosition: 'top',
          });
          console.log('Error to add Quiz', error);
        },
      });
    } else {
      this.addQuizForm.markAllAsTouched();
      alert('All Fields are required !');
    }
  }
  //update Quiz
  updateQuiz() {
    if (this.addQuizForm.valid) {
      this.quizService.updateQuiz(this.id, this.addQuizForm.value).subscribe({
        next: (res) => {
          console.log('Quiz updated succesfully', res);
          this.snack.open('Quiz Updated Succesfully', '', {
            duration: 2000,
            verticalPosition: 'top',
          });
          this.router.navigate(['admin/viewQuiz']);
        },
        error: (error) => {
          console.log('Error ', error);
          this.snack.open('Unable to update Quiz', '', {
            duration: 2000,
            verticalPosition: 'top',
          });
          // if(error.errorCode==412){
          //   this.snack.open('please provide the questions for quiz','ok',{verticalPosition:'top'})
          // }
        },
      });
    }
  }

 back(){
  this.location.back();
  }

}
