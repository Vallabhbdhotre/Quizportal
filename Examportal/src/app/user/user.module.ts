import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatRadioModule} from '@angular/material/radio';
import { UserRoutingModule } from './user-routing.module';
import { ViewQuizesComponent } from './view-quizes/view-quizes.component';
import { PlayQuizComponent } from './play-quiz/play-quiz.component';
import { ViewCategoryComponent } from './view-category/view-category.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { SideComponent } from './side/side.component';
import { BodyComponent } from './body/body.component';

@NgModule({
  declarations: [
    ViewQuizesComponent,
    PlayQuizComponent,
    ViewCategoryComponent,
    HomeComponent,
    NavComponent,
    SideComponent,
    BodyComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule ,
    MatRadioModule,
    ReactiveFormsModule,
    FormsModule

  ]
})
export class UserModule { 
 constructor() {
  console.log('User Works');
  
  
 }
}
