import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewQuizesComponent } from './view-quizes/view-quizes.component';
import { PlayQuizComponent } from './play-quiz/play-quiz.component';
import { ViewCategoryComponent } from './view-category/view-category.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  
  {
    path: 'playquiz/:id',
    component: PlayQuizComponent,
    pathMatch: 'full',
  },
  {
    path: 'Quizes',
    component: ViewQuizesComponent,
    pathMatch: 'full',
  },
  {
    path: 'viewCategory',
    component: ViewCategoryComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
