import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { ListcategoryComponent } from './listcategory/listcategory.component';
import { UpdatecategoryComponent } from './updatecategory/updatecategory.component';
import { ViewcategoryComponent } from './viewcategory/viewcategory.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AddQuestionComponent } from './question/add-question/add-question.component';
import { AddQuizComponent } from './quiz/add-quiz/add-quiz.component';
import { ViewQuestionComponent } from './question/view-question/view-question.component';
import { UpdateQuestionComponent } from './question/update-question/update-question.component';
import { ViewQuizComponent } from './quiz/view-quiz/view-quiz.component';


const routes: Routes = [
  {
    path:'',redirectTo:'admindashboard' ,pathMatch:'full'
  },
  {
  path: 'admindashboard' ,component:AdmindashboardComponent
  },
  {
    path:'addCategory' ,component:AddcategoryComponent ,pathMatch:'full'
  },
  {
    path:'listCategory',component:ListcategoryComponent ,pathMatch:'full'
  },
  {
    path:'updateCategory/:id' ,component:UpdatecategoryComponent ,pathMatch:'full'
  },
  {
    path:'viewCategory/:id' ,component:ViewcategoryComponent , pathMatch:'full'
  },
  {
    path:'addQuestion' ,component:AddQuestionComponent ,pathMatch:'full'
  },
  {
   path:'viewQuestions' ,component:ViewQuestionComponent ,pathMatch:'full'
  },
  {
   path:'updateQuestion/:id',component:UpdateQuestionComponent,pathMatch:'full'
  },
  {
    path:'addQuiz', component:AddQuizComponent ,pathMatch:'full'
  },
  {
    path:'updateQuiz/:id' , component:AddQuizComponent ,pathMatch:'full'
  },
  {
    path:'viewQuiz' ,component:ViewQuizComponent ,pathMatch:'full'
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminModuleRoutingModule { }
