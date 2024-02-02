import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizCategoryService } from 'src/app/service/userService/quiz-category.service';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css'],
})
export class ViewCategoryComponent {
  categoryList:any[]=[];

  constructor(
    private userService: QuizCategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {
   this.getCategory();
  }

 getCategory(){
  this.userService.getAciveCategory().subscribe({
    next:(res)=>{
      if(res){
        // this.categoryList=res;
        // console.log('data received',this.categoryList);
      }
    },
    error:(error)=>{
      this.categoryList=error.error
      console.log('data',this.categoryList);
      
      // console.log('unable to get data',this.categoryList);
      
    }
  })
 }






}
