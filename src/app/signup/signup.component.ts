import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Services } from '../services';
import { AuthServices } from '../auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [Services,AuthServices]
})
export class SignupComponent implements OnInit {

  state: String = '';
  authFlag: Boolean = true;
  signUpFlag: boolean = false;
  message: String = '';
  errorFlag: Boolean = false;
  headerFlag: Boolean = true;
  logging: Boolean = false;
  success:Boolean = false;
  user = {
    name: '',
    email: '',
    password: '',
    cpassword:'',
    type : ''
  }
  err ="";
  
  @Input() public flag: boolean = true;
  @Output() componenetFlag: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private AuthServices: AuthServices, private Services : Services, private router: Router, private route: ActivatedRoute) {
    this.AuthServices.userAuth('register');
  }
  signUp(form: NgForm) {
    const name = form.value.name;
    const email = form.value.email;
    const passwordf = form.value.password;
    const password = form.value.cpassword;
    const user = form.value.user;
    if (passwordf === password) {
      this.logging = true;
    } else {
      this.message = 'Password does not match.'
      this.errorFlag = true;
      return;
    }
    this.user = {
      name: name,
      email: email,
      password: password,
      cpassword:password,
      type : user == ''? 'user':'admin'
    }
    this.success = false;
    this.Services.registerUser(this.user).subscribe(getList =>{
      const resStringify = JSON.stringify(getList);
      const parseRes = JSON.parse(resStringify)
      if(parseRes.code == '11000'){
        this.message = 'The user already exist. Please try another.';
        this.errorFlag = true;
        this.logging = false;
      }else{
      this.user.name = "";
      this.user.email = "";
      this.user.password ="";
      this.user.cpassword ="";
      this.errorFlag = true;
      this.message = 'Signed Up Sucessfully. Please Login';
      this.logging = false;
      this.success = true;
    }
    });
  }
  ngOnInit() {
  }
}
