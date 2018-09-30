import { Component, OnInit } from '@angular/core';
import { AuthServices} from '../auth.service';
import { Services } from '../services';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  usersList=[];
  adminList=[];
  loading = true;
  constructor(private AuthServices: AuthServices, private Services : Services) {
    this.AuthServices.userAuth('admindash');
    this.AuthServices.routerUrl();
   }

  ngOnInit() {
    this.getUsersList();
  }

  getUsersList(){
   const self = this;
   this.adminList =[];
   this.usersList =[];
    this.Services.getAllUser().subscribe(getList =>{
      console.log(getList);
     const stringifyData = JSON.stringify(getList);
     const parseData = JSON.parse(stringifyData);
      parseData.map(function(list){
        if(list.type == 'admin'){
          self.adminList.push(list)
        }else{
          self.usersList.push(list);
        }
      });
      this.loading = false;
    });
  }

  deleteUser(id,index){
     this.Services.deleteUser(id).subscribe(getList =>{
      //this.usersList.splice(index,1);
      this.getUsersList();
     });
   }
  
}
