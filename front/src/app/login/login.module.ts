import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {ToastModule} from "primeng/toast";



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'', component: LoginComponent},
      {path:'login', component: LoginComponent}
  ]),
    ReactiveFormsModule,
    ],
  providers:[
  ]
})
export class LoginModule { }
