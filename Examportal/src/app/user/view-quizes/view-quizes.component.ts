import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuizCategoryService } from 'src/app/service/userService/quiz-category.service';

@Component({
  selector: 'app-view-quizes',
  templateUrl: './view-quizes.component.html',
  styleUrls: ['./view-quizes.component.css'],
})
export class ViewQuizesComponent {
  quizList: any[] = [];
  constructor(private userService: QuizCategoryService ,private router:Router) {
    this.getQuizes();
  }
  getQuizes() {
    this.userService.getActiveQuiz().subscribe({
      next: (res) => {
        if (res) {
          this.quizList = res;
          console.log('data received !', this.quizList);
        }
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }
  playQuiz(id:any){
 this.router.navigate(['user/playquiz',id])

  }
}
