import { Component } from '@angular/core';
import {AuthenticationService} from "./utils/authservice";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Assignment1';
  isLoggedIn: boolean = false;
  constructor(private authService: AuthenticationService){
    this.authService.currentUser.subscribe(currentUser => {
      this.isLoggedIn = !!currentUser;
    });
  }
}
