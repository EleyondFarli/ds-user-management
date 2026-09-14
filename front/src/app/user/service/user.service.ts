import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs";
import { BackendService } from "../../backend/backend.service";
import { FormControl } from "@angular/forms";
import { User } from "../model/user.model";
import {AuthenticationService} from "../../utils/authservice";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly LOCAL_URL = 'http://localhost:8081/admin';

  constructor(private http: HttpClient, private backendService: BackendService, private authService: AuthenticationService) {
  }

  readUsers(): Observable<any> {
    const role : string = this.authService.currentUserValue?.role || "ADMIN";

    return this.backendService.get(this.LOCAL_URL + "/all", {role: role});
  }

  saveUser(firstName: string, lastName: string, username: string, password: string, role: string): Observable<any> {
    const user = {
      firstName,
      lastName,
      username,
      password,
      role
    }
    const userRole : string = this.authService.currentUserValue?.role || "ADMIN";
    return this.backendService.post(this.LOCAL_URL + "/save", user, {role: userRole});
  }

  updateUser(update_username: string, user: User): Observable<User> {
    const userRole : string = this.authService.currentUserValue?.role || "ADMIN";
    return this.backendService.put(this.LOCAL_URL + "/update/" + update_username, user, {role: userRole});
  }

  deleteUser(user: User) {
    const userRole : string = this.authService.currentUserValue?.role || "ADMIN";
    return this.backendService.delete(this.LOCAL_URL + "/delete/" + user.username, {role: userRole});
  }

  readDevices(): Observable<any>  {
    const user = this.authService.currentUserValue;
    const userRole : string = this.authService.currentUserValue?.role || "USER";
    return this.backendService.get("http://localhost:8081" + "/device/username/" + user?.username, {role: userRole});
  }

  readDevicesFromUser(user: User): Observable<any>  {
    const userRole : string = this.authService.currentUserValue?.role || "USER";
    return this.backendService.get("http://localhost:8081" + "/device/username/" + user?.username, {role: userRole});
  }
}
