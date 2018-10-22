import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Services } from '../services';
import { AuthServices } from '../auth.service';
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  providers: [Services, AuthServices]
})
export class UserDashboardComponent implements OnInit {
  user: any;
  userExamList: any;
  constructor(private AuthServices: AuthServices, public Services: Services, private router: Router, private route: ActivatedRoute) {
    this.AuthServices.userAuth('userdashboard');
  }
  ngOnInit() {
    this.getUserDetails();
    this.getExamRequests();
  }
  getUserDetails() {
    const getUserId = localStorage.getItem('userData');
    this.user = JSON.parse(getUserId);
  }
  getExamRequests() {
    const getUserId = localStorage.getItem('userData');
    this.user = JSON.parse(getUserId);
    this.Services.getExamRequests(this.user.id).subscribe(examList => {
      this.userExamList = examList;
    });
  }
}