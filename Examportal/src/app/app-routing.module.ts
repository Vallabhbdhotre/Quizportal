import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WildComponent } from './wild/wild.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },

  {
    path:'user',loadChildren:()=>import('./user/user.module').then(m=>m.UserModule)
  },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin-module/admin-module.module').then(
        (m) => m.AdminModuleModule
      ),
  },
  // {
  //   path: 'user',
  //   loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  // },


  {
    path: '**',
    component: WildComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
