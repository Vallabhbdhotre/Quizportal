import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CategoryServiceService } from 'src/app/service/Adminservice/category-service.service';
import { QuestionServiceService } from 'src/app/service/Adminservice/question-service.service';
import { QuizServiceService } from 'src/app/service/Adminservice/quiz-service.service';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css'],
})
export class UpdateQuizComponent implements OnInit {
  updateForm: FormGroup;
  dropdownSettings: IDropdownSettings = {};
  questionList: any[] = [];
  categoryList: any[] = [];
  id: any;
  ngOnInit() {
    this.getCategoryList();
    this.getQuestionList();
    //dropdown settings
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'content',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.id = this.route.snapshot.paramMap.get('id');
  }

  constructor(
    private fb: FormBuilder,
    private quizService: QuizServiceService,
    private categoryService: CategoryServiceService,
    private questionService: QuestionServiceService,
    private snack: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.updateForm = fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: this.fb.group({
        id: [null, Validators.required],
      }),
      questions: this.fb.array([]),
    });
  }
  get questionsArray() {
    return this.updateForm.get('questions') as FormArray;
  }
  commonFields(id: any) {
    return this.fb.group({
      id: [id, Validators.required],
    });
  }

  addQuestion(item: any) {
    this.questionsArray.push(this.commonFields(item.id));
    console.log(item);
  }
  onSelectAll(items: any) {
    this.questionsArray.clear();
    for (let i = 0; i < items.length; i++) {
        this.questionsArray.push(this.commonFields(items[i].id));
    }
  }
  unSelect(id: any) {
    console.log(id);
    this.questionsArray.removeAt(id);
  }
  unSelectAll() {
    this.questionsArray.clear();
  }

  getQuizById() {
    this.quizService.getById(this.id).subscribe({
      next: (data) => {
        if (data) {
          this.updateForm.patchValue({
            title: data.title,
            description: data.description,
            category:{
              id : data.category.id
            },
            questions:[
              {

              }
            ]
          });
        }
      },
    });
  }

  getCategoryList() {
    this.categoryService.getCategory().subscribe({
      next: (data) => {
        if (data) {
          this.categoryList = data;
          console.log('Category data recived');
        }
      },
      error: (error) => {
        console.log('Error in getting Category data', error);
      },
    });
  }
  getQuestionList() {
    this.questionService.getQuestionList().subscribe({
      next: (data) => {
        if (data) {
          this.questionList = data;
          console.log('Question list received !');
        }
      },
      error: (error) => {
        console.log('Error in getting question list !', error);
      },
    });
  }


  UpdateQuiz(){
  console.log(this.updateForm.value);
  
  }

}
