import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServices} from './auth.service';
import { DataService } from './data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[DataService,AuthServices]
})
export class AppComponent implements OnInit{
  loggedIn = false;
  contolsFlag = false;
  userType = false;
  subscription : any;
  signed:any;
  serviceData:any;
  userEmail:any;
  checkAdminUser :any;
  navbarOpen = false;
  constructor(public router: Router, private AuthServices:AuthServices, private dataService: DataService) {
    if(this.AuthServices.authFlag()){
      this.loggedIn = true; 
      
    }    
    var activeRoute = this.router.url;
    if(this.router.url == '/signin'){
        this.contolsFlag = true;
    }
  this.dataService.getDataObj().subscribe((res:Object)  => {
    this.serviceData = res;
    this.contolsFlag = this.serviceData.type == 'signin'? true:false;
    this.loggedIn = this.serviceData.loggedin;
    this.userType = this.serviceData.userType;
    this.userEmail = this.serviceData.username;
    this.checkAdminUser = this.serviceData.userType =='admin'? true : false;
  });       
  }
  
  ngOnInit() {

  }
  logout(){
    this.dataService.sendDataObj({type:"signin",loggedin:false});
    localStorage.clear();
    this.router.navigate(['/signin']);
  }
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
