import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { environment } from '../environments/environment';
@Injectable()
export class Services { 
    APIEndpoint = environment.baseUrl;
   // domainPort = 'https://exam-reg.herokuapp.com/api/'; 
    public httpOptions = {
            headers: new HttpHeaders({ 'authorization':'Bearer '+localStorage.getItem('jwtToken') }),
           };
    constructor(private http: HttpClient) {}
    
    registerUser(user) {
        return this.http.post(this.APIEndpoint+'signup',user)
            .pipe(map(res => {
                console.log(res);
                return res;
            }));
           // .map(res => res.json());
    }

    loginUser(user) {
        return this.http.post(this.APIEndpoint+'signin',user)
            .pipe(map(res => {
                return res;
            }));
    }

    getAllUser(){
        return this.http.get(this.APIEndpoint+'getusers',this.httpOptions)
            .pipe(map(res => {
                console.log(res);
                return res;
            }));
    }

    getStates(){
        return this.http.get(this.APIEndpoint+'states',this.httpOptions)
            .pipe(map(res => {
                return res;
            }));
    }

    getCities(id){
        return this.http.get(this.APIEndpoint+'cities/'+id,this.httpOptions)
            .pipe(map(res => {
                return res;
            }));
    }
    getExmas(){
        return this.http.get(this.APIEndpoint+'exams',this.httpOptions)
            .pipe(map(res => {
                return res;
            }));
    }
    setExamConfig(reqObj){
        return this.http.post(this.APIEndpoint+'examconfig',reqObj)
            .pipe(map(res => {
                return res;
            }));
    }
    getExamConfig(){
        return this.http.get(this.APIEndpoint+'get/examconfig',this.httpOptions)
            .pipe(map(res => {
                return res;
            }));
    }
    deleteExamConfig(id){
        return this.http.delete(this.APIEndpoint+'delete/examconfig/'+id)
            .pipe(map(res => {
                return res;
            }));
    }
    deleteUser(id){
        return this.http.delete(this.APIEndpoint+'user/delete/'+id,this.httpOptions)
            .pipe(map(res => {
                return res;
            }));
    }

    registerExam(reqObj){
        return this.http.post(this.APIEndpoint+'exam/register',reqObj)
            .pipe(map(res => {
                return res;
            }));
    }

    updateConfig(examObj) {
        return this.http.put(this.APIEndpoint+'update/config/'+examObj.e_id,examObj)
            .pipe(map(res => {
                return res;
            }));
    }

    updateRequest(reqObj) {
        return this.http.put(this.APIEndpoint+'update/request/'+reqObj._id,reqObj)
            .pipe(map(res => {
                return res;
            }));
    }

    getExamConfigRestrict() {
        return this.http.get(this.APIEndpoint+'examConfig/restrict',this.httpOptions)
            .pipe(map(res => {
                return res;
            }));
    }
    getRequests() {
        return this.http.get(this.APIEndpoint+'exam/requests',this.httpOptions)
            .pipe(map(res => {
                return res;
            }));
    }
    getExamRequests(id) {
        return this.http.get(this.APIEndpoint+'requests/get/exams/'+id)
            .pipe(map(res => {
                return res;
            }));
    }
    deleteRequests(id) {
        return this.http.delete(this.APIEndpoint+'requests/delete/'+id)
            .pipe(map(res => {
                return res;
            }));
    }
    
}

