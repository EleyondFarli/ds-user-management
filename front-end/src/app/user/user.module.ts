import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DropdownModule } from "primeng/dropdown";
import { SelectButtonModule } from "primeng/selectbutton";
import { RouterModule } from "@angular/router";
import { UserRoutingModule } from "./user-routing.module";
import { UserListComponent } from "./components/user-list/user-list.component";
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { MultiSelectModule } from "primeng/multiselect";
import { ButtonModule } from "primeng/button";
import { SaveUserComponent } from "./components/save-user/save-user.component";
import {MatTableModule} from "@angular/material/table";
import {MatOptionModule} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSortModule} from "@angular/material/sort";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatRadioModule} from "@angular/material/radio";


@NgModule({
  declarations: [
    UserListComponent,
    SaveUserComponent,
    UserUpdateComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatTableModule,
    MatSlideToggleModule,
    MatOptionModule,
    FormsModule,
    ButtonModule,
    MultiSelectModule,
    DropdownModule,
    SelectButtonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatRadioModule
  ],
  providers: [
  ],
  exports: [
    RouterModule
  ]
})
export class UserModule {
}
