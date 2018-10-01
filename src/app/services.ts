import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable()
export class Services {
    //domainPort = 'http://localhost:4003/api/';
    domainPort = 'https://exam-reg.herokuapp.com/api/'; 
    public httpOptions = {
            headers: new HttpHeaders({ 'authorization':'Bearer '+localStorage.getItem('jwtToken') }),
           };
    constructor(private http: HttpClient) {}
    
    registerUser(user) {
        return this.http.post(this.domainPort+'signup',user)
            .pipe(map(res => {
                console.log(res);
                return res;
            }));
           // .map(res => res.json());
    }

    loginUser(user) {
        return this.http.post(this.domainPort+'signin',user)
            .pipe(map(res => {
                return res;
            }));
    }

    getAllUser(){
        return this.http.get(this.domainPort+'getusers',this.httpOptions)
            .pipe(map(res => {
                console.log(res);
                return res;
            }));
    }

    getStates(){
        return this.http.get(this.domainPort+'states',this.httpOptions)
            .pipe(map(res => {
                return res;
            }));
    }

    getCities(id){
        return this.http.get(this.domainPort+'cities/'+id,this.httpOptions)
            .pipe(map(res => {
                return res;
            }));
    }
    getExmas(){
        return this.http.get(this.domainPort+'exams',this.httpOptions)
            .pipe(map(res => {
                return res;
            }));
    }
    setExamConfig(reqObj){
        return this.http.post(this.domainPort+'examconfig',reqObj)
            .pipe(map(res => {
                return res;
            }));
    }
    getExamConfig(){
        return this.http.get(this.domainPort+'get/examconfig',this.httpOptions)
            .pipe(map(res => {
                return res;
            }));
    }
    deleteExamConfig(id){
        return this.http.delete(this.domainPort+'delete/examconfig/'+id)
            .pipe(map(res => {
                return res;
            }));
    }
    deleteUser(id){
        return this.http.delete(this.domainPort+'user/delete/'+id,this.httpOptions)
            .pipe(map(res => {
                return res;
            }));
    }

    registerExam(reqObj){
        return this.http.post(this.domainPort+'exam/register',reqObj)
            .pipe(map(res => {
                return res;
            }));
    }

    updateConfig(examObj) {
        return this.http.put(this.domainPort+'update/config/'+examObj.e_id,examObj)
            .pipe(map(res => {
                return res;
            }));
    }

    getRequests() {
        return this.http.get(this.domainPort+'exam/requests',this.httpOptions)
            .pipe(map(res => {
                return res;
            }));
    }
    deleteRequests(id) {
        return this.http.delete(this.domainPort+'requests/delete/'+id)
            .pipe(map(res => {
                return res;
            }));
    }
    
}

