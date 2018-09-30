import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material'
import { ActivatedRoute, Router } from '@angular/router';
import { Services } from '../services';
import { AuthServices } from '../auth.service';
import { MatDialogComponent } from '../mat-dialog/mat-dialog.component'
@Component({
  selector: 'register-home',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [Services,AuthServices]
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
constructor(private AuthServices:AuthServices,
            public Services:Services, 
            private router : Router, 
            private route:ActivatedRoute,
            public dialog: MatDialog) {
    this.AuthServices.userAuth('register');
  }

  ngOnInit() {
    this.getStatesList();
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
  register(form:NgForm){
    this.loading = true
    const getUserId = localStorage.getItem('userData');
    const userDataParsed = JSON.parse(getUserId);
    const regDetails = {
      userid:userDataParsed.id,
      stateid:form.value.examState,
      cityid:form.value.examCity,
      exam:form.value.exam,
      father_name:form.value.fatherName,
      last_name:form.value.lastName,
      mobileno:form.value.mobileNo,
      city:form.value.city,
      street:form.value.street,
      address:form.value.address,
      zipcode:form.value.zipcode
    }
    var modelData = {title:"",message:""};
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
