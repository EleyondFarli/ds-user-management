import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../model/user.model';
import { UserService } from '../../service/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {AuthenticationService} from "../../../utils/authservice";
import {MatDialog} from "@angular/material/dialog";
import {UserUpdateComponent} from "../user-update/user-update.component";
import {Device} from "../../model/device.model";
import {WebSocketService} from "../../../utils/websocket.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public userList: User[] = [];
  dataSource = new MatTableDataSource<User>([]);
  displayedColumns: string[] = ['username', 'firstName', 'lastName', 'role', 'edit', 'delete', 'devices'];

  deviceList: Device[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService, private authService: AuthenticationService, private popup: MatDialog) { }

  ngOnInit() {
    this.fetchUsers();
  }

  private fetchUsers(): void {
    this.userService.readUsers().subscribe(
      (users: User[]) => {
        this.userList = users;
        this.dataSource = new MatTableDataSource<User>(this.userList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error: any) => {
        console.error('Error fetching users:', error);
        // Handle the error, e.g., show an error message to the user
      }
    );
  }

  logout(): void {
    // Call your authentication service logout method
    this.authService.logout();
  }

  openPopupUpdate(user: User) {
    this.popup.open(UserUpdateComponent, { data: user, width: "750px", height: "585px" }).afterClosed()
      .subscribe(dialogResult => {
        if (dialogResult) {
          this.fetchUsers();
        }
      });
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user).subscribe(
      (response: any) => {
        this.fetchUsers();
      },
      (error: any) => {
        console.error('Error deleting user:', error);
        // Handle the error, e.g., show an error message to the user
      }
    );
  }

  showDevices(user: User) {
    this.deviceList = [];
    this.userService.readDevicesFromUser(user).subscribe(
      (response: any) => {
        if (response === null) {
          this.deviceList = [];
        }
        this.deviceList = response as Device[];
      },
      (error: any) => {
        console.error('Error deleting user:', error);
        // Handle the error, e.g., show an error message to the user
      }
    );
  }
}
