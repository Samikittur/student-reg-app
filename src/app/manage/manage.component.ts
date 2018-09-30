import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Services } from '../services';
import { NgForm } from '@angular/forms';
import { AuthServices } from '../auth.service';
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
  constructor(private AuthServices:AuthServices,public Services:Services, private router : Router, private route:ActivatedRoute) {
    this.AuthServices.userAuth('manage');
  }

  ngOnInit() {
    this.getStatesList();
    this.getConfig();
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
    const exam = {
      stateid:form.value.state,
      cityid:form.value.city,
      examcode:form.value.exam,
      seatlimit:form.value.seatlimit,
      remaining:form.value.seatlimit
    }
    this.Services.setExamConfig(exam).subscribe(config=>{
      this.examConfig = config;
      this.getConfig();
      this.loading = false;
    });
  }

  getConfig(){
    this.Services.getExamConfig().subscribe(config=>{
      this.examConfigList = config;
      this.loading = false;
    });
  }

  deleteExamConfig(id){
    this.Services.deleteExamConfig(id).subscribe(deletedConfig=>{
      this.getConfig();
    });
  }

}
