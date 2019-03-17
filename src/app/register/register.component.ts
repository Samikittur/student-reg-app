import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material'
import { ActivatedRoute, Router } from '@angular/router';
import { Services } from '../services';
import { AuthServices } from '../auth.service';
import { MatDialogComponent } from '../mat-dialog/mat-dialog.component';
import {FormBuilder,FormGroup,Validators} from '@angular/forms'
import { ValidateSelect } from '../validators/select.validators';
import { isNumber } from '../validators/number.validator';
@Component({
  selector: 'register-home',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [Services,AuthServices,FormBuilder]
})
export class RegisterComponent implements OnInit {
statesList : any;
citiesList:any;
studentsList=[];
err ="";
examination = [];
stateModel = 0;
citiesModel = 0;
examModel = 0;
loading = false;
registerForm:FormGroup;
constructor(private AuthServices:AuthServices,
            public Services:Services, 
            private router : Router, 
            private route:ActivatedRoute,
            public dialog: MatDialog,
            private fb:FormBuilder) {
    this.AuthServices.userAuth('register');
  }

  ngOnInit() {
    this.getStatesList();
    this.formValidation();
  }
  formValidation(){
    this.registerForm = this.fb.group({
      examState:['0',[Validators.required,ValidateSelect]],
      examCity:['0',[Validators.required,ValidateSelect]],
      exam:['0',[Validators.required,ValidateSelect]],
      fatherName:['',[Validators.required]],
      lastName:['',[Validators.required]],
      mobileNo:['',[Validators.required]],
      city:['',[Validators.required]],
      street:['',[Validators.required]],
      address:['',[Validators.required]],
      zipcode:['',[Validators.required,isNumber]],
    });
  }
  getStatesList(){
    this.Services.getStates().subscribe(getList =>{
      this.statesList = getList;
    });
  }
  getExamsList(){
    this.getExamList();
  }

  getCitiesList(evt){
    this.citiesList=[];
    this.examination =[];
    this.Services.getCities(evt).subscribe(getList =>{
      this.citiesList = getList;
      this.citiesModel = 0;
      this.examModel = 0;
    });
  }
  getExamList(){
    this.Services.getExmas().subscribe(getList =>{
      const stringifyData = JSON.stringify(getList);
      const parseData = JSON.parse(stringifyData);
      this.examination = parseData;
    });
  }
  register(form){
    this.loading = true
    const getUserId = localStorage.getItem('userData');
    const userDataParsed = JSON.parse(getUserId);
    const regDetails = {
      userid:userDataParsed.id,
      stateid:form.examState,
      cityid:form.examCity,
      exam:form.exam,
      father_name:form.fatherName,
      last_name:form.lastName,
      mobileno:form.mobileNo,
      city:form.city,
      street:form.street,
      address:form.address,
      zipcode:form.zipcode
    }
    var modelData = {title:"",message:"",modelType:"default"};
    this.Services.registerExam(regDetails).subscribe(resObj=>{
      const stringifyData = JSON.stringify(resObj);
      const parseData = JSON.parse(stringifyData);

      if(parseData.errorCode == 7012 || parseData.errorCode == 6001) {
        modelData.title = "ALERT";
        modelData.message = parseData.message;
      }else{
        modelData.title = "SUCCESS";
        modelData.message = "Registered Successfully"
      }
      this.loading = false;
      this.openDialog(modelData);
    },(err) => {
      this.loading = false;
    });
  }

  updateConfig(resObj){
    this.Services.updateConfig(resObj).subscribe(result=>{
      this.loading = false;
    });
  }

  openDialog(content){
    var self = this;
    const dialogRef = this.dialog.open(MatDialogComponent, {
      height: '250px',
      width: '300px',
      data: content
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }
}
