import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import {MatDialog} from "@angular/material/dialog";
import {UserUpdateComponent} from "../user-update/user-update.component";

@Component({
  selector: 'app-save-user',
  templateUrl: './save-user.component.html',
  styleUrls: ['./save-user.component.scss']
})
export class SaveUserComponent {

  firstName: string = '';
  lastName: string = '';
  username: string = '';
  password: string = '';
  role: string = '';

  constructor(private userService: UserService, private dialog: MatDialog) { }

  saveUser(): void {
    // Perform any validation if needed
    // Call userService.saveUser() with the provided values
    this.userService.saveUser(
      this.firstName,
      this.lastName,
      this.username,
      this.password,
      this.role
    ).subscribe(
      (response) => {
        console.log('User saved successfully:', response);
        // Handle success, e.g., navigate to user list or show a success message
      },
      (error) => {
        console.error('Error saving user:', error);
        // Handle error, e.g., show an error message to the user
      }
    );
  }

  openEditPopup(): void {
    // Open the edit popup using MatDialog
    const dialogRef = this.dialog.open(UserUpdateComponent, {
      data: {
        firstName: this.firstName,
        lastName: this.lastName,
        username: this.username,
        password: this.password,
        role: this.role
      },
      width: '750px',
      height: '585px'
    });

    // Subscribe to the afterClosed event to get the result when the popup is closed
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Perform any actions after the popup is closed with a result
        console.log('Edit popup closed with result:', result);
      }
    });
  }
}
