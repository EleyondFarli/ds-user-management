import { NgModule } from '@angular/core';
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AccordionModule} from "primeng/accordion";
import {ButtonModule} from "primeng/button";
import {MultiSelectModule} from "primeng/multiselect";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {MatCardModule} from "@angular/material/card";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {RippleModule} from "primeng/ripple";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {ToastModule} from "primeng/toast";
import {LoginModule} from "./login/login.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    LoginModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AccordionModule,
    ButtonModule,
    MultiSelectModule,
    InputTextModule,
    DropdownModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    RippleModule,
    MatIconModule,
    MatSidenavModule,
    ToastModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
