import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Services } from '../services';
import { MatDialog } from '@angular/material';
import { NgForm } from '@angular/forms';
import { AuthServices } from '../auth.service';
import { MatDialogComponent } from '../mat-dialog/mat-dialog.component';
// https://stackblitz.com/angular/oojygndaamg?file=main.ts
@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
  providers:[Services,AuthServices]
})
export class ManageComponent implements OnInit {
  statesList : any;
  citiesList:any;
  studentsList=[];
  examConfigList:any;
  examination = [];
  stateModel = 0;
  citiesModel = 0;
  examModel = 0;
  examConfig:any;
  loading = true;
  message ="";
  restrictExam={};
  constructor(private AuthServices:AuthServices,
              public Services:Services, 
              private router : Router, 
              private route:ActivatedRoute, 
              private dialog: MatDialog ) {
    this.AuthServices.userAuth('manage');
  }

  ngOnInit() {
    this.getStatesList();
    this.getExamConfig();
  }
  getStatesList(){
    this.Services.getStates().subscribe(getList =>{
      this.statesList = getList;
    });
  }
  getExamsList(){
    this.getExamList();
  }

  getCitiesList(id:any){
    this.citiesList=[];
    this.examination =[];
    this.Services.getCities(id).subscribe(getList =>{
      this.citiesList = getList;
      this.citiesModel = 0;
      this.examModel = 0;
      this.loading = false;
    });
  }
  getExamList(){
    this.Services.getExmas().subscribe(getList =>{
      const resStringify = JSON.stringify(getList);
      const parseRes = JSON.parse(resStringify)
      this.examination = parseRes;
      this.loading = false;
    });
  } 
  setConfig(form: NgForm){
    this.loading = true;
    var modelData = {title:"",message:"",modelType:"default"};
    const exam = {
      stateid:form.value.state,
      cityid:form.value.city,
      examcode:form.value.exam,
      seatlimit:form.value.seatlimit,
      remaining:form.value.seatlimit
    }
    this.Services.setExamConfig(exam).subscribe(config=>{
      this.examConfig = config;
      this.getExamConfig();
      this.loading = false;
      
      if(this.examConfig.code == 11000){
        modelData.title = "ALERT";
        modelData.message = "Exam configuration already created.";
      }else{
        modelData.title = "SUCCESS";
        modelData.message = "Exam configuration created.";
      }

      this.openDialog(modelData,"");
    });
  }

  getConfig(){
    this.Services.getExamConfig().subscribe(config=>{
      const stringifyData = JSON.stringify(this.restrictExam);
      const parseData = JSON.parse(stringifyData);
      const stringifyconfig = JSON.stringify(config);
      const parseConfigData = JSON.parse(stringifyconfig);
      parseConfigData.map(configelm => {
        configelm.deleteme = false;
         parseData.map(elm => {
          if(configelm.examcode == elm){
            configelm.deleteme = true;
            return;
          }
        });
      });
      this.examConfigList = parseConfigData;
      this.loading = false;
    });
  }
  getExamConfig(){
    this.Services.getExamConfigRestrict().subscribe(configList=>{
      this.restrictExam = configList;
      this.getConfig();
      this.loading = false;
    });
  }
  deleteExamConfig(id){
    var modelData = {title:"CONFIRM",message:"Are you sure want to delete?", modelType:"confirm"};
    this.openDialog(modelData,id);
  }

  openDialog(content,id){
    var self = this;
    const dialogRef = this.dialog.open(MatDialogComponent, {
      height: '250px',
      width: '300px',
      data: content
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed'+result);
      if(result == 'Confirm'){
        this.Services.deleteExamConfig(id).subscribe(deletedConfig=>{
          var modelData = {title:"SUCCESS",message:"Configuration Deleted Successfully", modelType:"default"};
          this.openDialog(modelData,"");
          this.getExamConfig();
        });
      }
    });
  }

}
