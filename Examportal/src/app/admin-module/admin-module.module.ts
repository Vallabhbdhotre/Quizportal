import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminModuleRoutingModule } from './admin-module-routing.module';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { ListcategoryComponent } from './listcategory/listcategory.component';
import { ViewcategoryComponent } from './viewcategory/viewcategory.component';
import { UpdatecategoryComponent } from './updatecategory/updatecategory.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { FormsModule } from '@angular/forms';
import { AddQuestionComponent } from './question/add-question/add-question.component';
import { AddQuizComponent } from './quiz/add-quiz/add-quiz.component';
import { ViewQuizComponent } from './quiz/view-quiz/view-quiz.component';
import { UpdateQuizComponent } from './quiz/update-quiz/update-quiz.component';
import { UpdateQuestionComponent } from './question/update-question/update-question.component';
import { ViewQuestionComponent } from './question/view-question/view-question.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AddcategoryComponent,
    ListcategoryComponent,
    ViewcategoryComponent,
    UpdatecategoryComponent,
    AdmindashboardComponent,
    AddQuestionComponent,
    AddQuizComponent,
    ViewQuizComponent,
    UpdateQuizComponent,
    UpdateQuestionComponent,
    ViewQuestionComponent,
  ],
  imports: [
    CommonModule,
    AdminModuleRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgMultiSelectDropDownModule,
    NgxPaginationModule,
  ],
})
export class AdminModuleModule {
  constructor() {
    console.log('admin works !');
  }
}
