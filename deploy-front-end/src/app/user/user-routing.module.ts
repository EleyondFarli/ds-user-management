import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from "./components/user-list/user-list.component";
import { SaveUserComponent } from "./components/save-user/save-user.component";

const routes: Routes = [
  {
    path: '',
    component: UserListComponent
  },
  {
    path: 'list',
    component: UserListComponent
  },
  {
    path: 'save',
    component: SaveUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
