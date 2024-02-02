import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryServiceService } from 'src/app/service/Adminservice/category-service.service';
import { QuestionServiceService } from 'src/app/service/Adminservice/question-service.service';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css'],
})
export class UpdateQuestionComponent implements OnInit {
  categoryData: any[] = [];
  id: any;
  page: any = 0;
  size: any = 10;
  questions = 
    {
      content: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      correctOption: '',
      category:{
        id:null
      }
      
    }
  

  updateForm: FormGroup;
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.getCategory();
    this.getQuestionById();
  }
  constructor(
    private fb: FormBuilder,
    private Cservice: CategoryServiceService,
    private route: ActivatedRoute,
    private questionService: QuestionServiceService,
    private snack:MatSnackBar,
    private router:Router
  ) {
    this.updateForm = this.fb.group({
      content: ['', Validators.required],
      option1: ['', Validators.required],
      option2: ['', Validators.required],
      option3: ['', Validators.required],
      option4: ['', Validators.required],
      correctOption: ['', Validators.required],
      category:this.fb.group({
      id:[null,Validators.required]
      })

    });
  }
  getCategory() {
    this.Cservice.getAllPageble(this.page, this.size).subscribe({
      next: (data) => {
        if (data) {
          console.log('data received !');

          this.categoryData = data.content;
        }
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }
  getQuestionById() {
    this.questionService.getQuestionById(this.id).subscribe({
      next: (res) => {
        console.log('questionbyid', res);
        if (res) {
          this.questions = 
            {
              content: res.content,
              option1: res.option1,
              option2: res.option2,
              option3: res.option3,
              option4: res.option4,
              correctOption: res.correctOption,
              category:{
                id:res.category.id
              }
            }
          
          // console.log(this.questions);

        }
      },
      error: (error) => {
        console.log('Error ingetting data', error);
      },
    });
  }

  updateQuestion() {
    if(this.updateForm.valid){
      this.questionService.updateQuestion(this.id,this.updateForm.value).subscribe({
        next:(res)=>{
          console.log('Question updated',res);
          this.snack.open('Question Updated !','',{duration:2000,verticalPosition:'top'})
          this.router.navigate(['admin/viewQuestions']);
        },
        error:(error)=>{
          console.log('cant update Question',error);
          this.snack.open('Unable to Update Question !','',{duration:2000,verticalPosition:'top'})
        }
      })
    }
    else{
      alert("All Fields Are Required !");
    }
  }
}
