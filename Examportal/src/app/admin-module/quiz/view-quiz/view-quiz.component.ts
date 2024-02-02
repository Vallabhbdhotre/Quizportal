import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { QuizServiceService } from 'src/app/service/Adminservice/quiz-service.service';
import { CategoryServiceService } from 'src/app/service/Adminservice/category-service.service';

@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrls: ['./view-quiz.component.css'],
})
export class ViewQuizComponent {
  page: any = 0;
  size: any = 10;
  quizlist: any[] = [];
  category:any={};

  constructor(
    private quizService: QuizServiceService,
    private router: Router,
    private location: Location,
    private categoryService:CategoryServiceService
  ) {
    this.getQuizPageble();
  }

  getQuizPageble() {
    this.quizService.getAllQuizesPageble(this.page, this.size).subscribe({
      next: (res) => {
        if (res) {
          this.quizlist = res.content;

          console.log('quiz data received', res);
        }
      },
      error: (error) => {
        console.log('cant get quiz data !', error);
      },
    });
  }
 
  update(id: any) {
    this.router.navigate(['admin/updateQuiz', id]);
  }
  addNewQuiz() {
    this.router.navigate(['admin/addQuiz']);
  }
  back() {
    this.location.back();
  }
}
