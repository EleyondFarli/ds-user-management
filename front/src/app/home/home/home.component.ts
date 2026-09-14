import {Component, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserService} from "../../user/service/user.service";
import {AuthenticationService} from "../../utils/authservice";
import {MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {Device} from "../../user/model/device.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../user/model/user.model";
import {WebSocketService} from "../../utils/websocket.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  public deviceList: Device[] = [];
  dataSource = new MatTableDataSource<Device>([]);
  displayedColumns: string[] = ['deviceID', 'description', 'address', 'maxHourlyEnergyConsumption'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private userService: UserService, private authService: AuthenticationService, private popup: MatDialog, private webSocketService: WebSocketService) { }


  ngOnInit(): void {
    this.fetchDevices();
    this.webSocketService.connect();
    // this.webSocketService.subscribeToTopic('/topic/notifications/3').subscribe(msg => {
    //   console.log('Received message:' + msg);
    //   alert("High Energy Consumption Detected! Value: " + msg + " kWh");
    // });
  }
  private fetchDevices(): void {
    this.userService.readDevices().subscribe(
      (devices: Device[]) => {
        this.deviceList = devices;
        this.dataSource = new MatTableDataSource<Device>(this.deviceList);
        console.log(this.deviceList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error: any) => {
        console.error('Error fetching devices:', error);
        // Handle the error, e.g., show an error message to the user
      }
    )
  }

  logout(): void {
    // Call your authentication service logout method
    this.authService.logout();
  }
}
