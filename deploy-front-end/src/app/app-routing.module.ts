import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'home',
    loadChildren: () => import ('../app/home/home.module').then(m => m.HomeModule),
  },
  {
    path:'login',
    loadChildren: () => import('../app/login/login.module').then(m => m.LoginModule)
  },
  {
    path:"",
    loadChildren: () => import('../app/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('../app/user/user.module').then(m => m.UserModule),
  },
  {
    path: 'admin/all',
    loadChildren: () => import('../app/user/user.module').then(m => m.UserModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
