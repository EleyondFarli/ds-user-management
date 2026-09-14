import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../utils/authservice";
import {first} from "rxjs";
import {User} from "../../user/model/user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('password') passField!: ElementRef;
  @ViewChild('show') showElement!: ElementRef;

  username: string;

  loginForm!: FormGroup;
  error: string = "Invalid account! Please try again";
  show: boolean = false;
  loginFailed: boolean = false;

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthenticationService,) {
    this.username = "";
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const formValue: { username: string, password: string } = this.loginForm.getRawValue();
    const {username, password} = formValue;

    this.authService.login(username, password)
      .pipe(first())
      .subscribe({
        next: (response) => {

          // Create a User object with extracted information
          const user: User = {
            username: response.username,
            firstName: response.firstName,
            lastName: response.lastName,
            role: response.role,
          };
          // Store user information in a service or another appropriate location
          this.authService.setCurrentUser(user);

          if (user.role === 'ADMIN') {
            this.router.navigate(['./admin']);
          } else {
            this.router.navigate(['./home']);
          }
        },
        error: (err) => {
          this.loginFailed = true;
          this.error = "One or more fields are incorrect";
        }
      });
    this.loginForm.reset();
    return false;
  }

  changePassType() {
    this.passField.nativeElement.type = this.passField.nativeElement.type === 'password' ? 'text' : 'password';
    this.show = !this.show;
    this.showElement.nativeElement.classList = !this.show ? "show pi pi-eye" : "show pi pi-eye-slash";
  }
}
