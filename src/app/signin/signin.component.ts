import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Services } from '../services';
import { AuthServices } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [Services,AuthServices]
})
export class SigninComponent implements OnInit {

  state: string = '';
  error: any;
  authFlag: boolean = false;
  message: string = '';
  signUpFlag: boolean = false;
  errorFlag: boolean = false;
  logging: boolean = false;
  JWtoken: any;
  user = {
    email: "",
    password: ""
  }
  constructor(private AuthServices : AuthServices, 
              private Services: Services, 
              private router: Router, 
              private route: ActivatedRoute) {
  this.AuthServices.userAuth('register');
  }

  ngOnInit() {
   }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.logging = true;
    this.user = {
      email: email,
      password: password
    }
    this.Services.loginUser(this.user).subscribe(res =>{
      const resStringify = JSON.stringify(res);
      const parseRes = JSON.parse(resStringify)
      if(parseRes.success){
        this.JWtoken = res;
        localStorage.setItem('jwtToken', this.JWtoken.token);
        localStorage.setItem('userData', JSON.stringify(parseRes.user));
        if(parseRes.user.type == 'admin'){
          this.router.navigate(['/admindash']);
        }else{
          this.router.navigate(['/register']);
        }
        
        this.errorFlag = false;
        this.message = "";
        this.logging = false;
      }
    },(err) => {
      const errMsg = err.error;
      this.errorFlag = true;
      this.message = errMsg.msg;
      if(errMsg.msg == undefined){
        this.message ="Server Error. Please login after some time"
      }
      this.logging = false;
    });
   }
}