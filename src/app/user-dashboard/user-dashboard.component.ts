import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder,FormGroup,Validators, NgForm} from '@angular/forms'
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
  uploadPic : FormGroup;
  filesToUpload:File = null;
  constructor(private AuthServices: AuthServices, 
    public Services: Services, 
    private router: Router, 
    private route: ActivatedRoute,
    private fb:FormBuilder,
    private cd: ChangeDetectorRef) {
    this.AuthServices.userAuth('userdashboard');
  }
  ngOnInit() {
    this.getUserDetails();
    this.getExamRequests();
    this.formValidation();
  }
  formValidation(){
    this.uploadPic = this.fb.group({
      profilePicture:[null,Validators.required]
    });
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
  /*uploadProfilePicture(form: NgForm){
    const getUserId = localStorage.getItem('userData');
    this.user = JSON.parse(getUserId);
    const userData = {
      id:this.user.id,
      file:this.uploadPic
    };
    /*this.Services.uploadProfilePicture(userData).subscribe(user=>{
      console.log(JSON.stringify(user));
    });
}*/

  onFileChange(event) {
    this.filesToUpload = <File>event.target.files[0];
  }

uploadProfilePicture() {
  const formData: any = new FormData();
  const getUserId = localStorage.getItem('userData');
  this.user = JSON.parse(getUserId);
  formData.append('photo',this.filesToUpload,this.filesToUpload.name);
  formData.append('userid',this.user.id);
 
  this.Services.uploadProfilePicture(formData).subscribe(user=>{
    localStorage.removeItem('userData');
    localStorage.setItem('userData', JSON.stringify(user));
    this.getUserDetails();
  });
 
}

}