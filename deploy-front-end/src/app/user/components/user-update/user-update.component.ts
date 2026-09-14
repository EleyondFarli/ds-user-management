import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { User } from "../../model/user.model";
import { UserService } from "../../service/user.service";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss'],
})
export class UserUpdateComponent implements OnInit {

  userRoles = ["ADMIN", "USER"];
  editForm!: FormGroup;
  disabled!: true;

  constructor(private userService: UserService, @Inject(MAT_DIALOG_DATA) public data: User,
              public dialogRef: MatDialogRef<UserUpdateComponent>, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

    this.editForm = this.formBuilder.group({
      firstName: [this.data.firstName, Validators.compose([Validators.required, Validators.minLength(1)])],
      lastName: [this.data.lastName, Validators.compose([Validators.required, Validators.minLength(1)])],
      username: [this.data.username, Validators.compose([Validators.required, Validators.minLength(1)])],
      role: [this.data.role],
    });
  }

  onSaveUpdate() {
    const formValue = this.editForm.getRawValue() as User;
    this.userService.updateUser(this.data.username, formValue).subscribe((user) => {
      setTimeout(() => {
        this.dialogRef.close(user)
      }, 1500)
    })
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
