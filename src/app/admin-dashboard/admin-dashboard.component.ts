import { Component, OnInit } from '@angular/core';
import { AuthServices} from '../auth.service';
import { Services } from '../services';
import { MatDialog } from '@angular/material';
import { MatDialogComponent } from '../mat-dialog/mat-dialog.component';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  usersList=[];
  adminList=[];
  loading = true;
  constructor(private AuthServices: AuthServices, private Services : Services,private dialog: MatDialog) {
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

  deleteUser(id){
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
        this.Services.deleteUser(id).subscribe(deletedConfig=>{
          var modelData = {title:"SUCCESS",message:"User Deleted Successfully", modelType:"default"};
          this.openDialog(modelData,"");
          this.getUsersList();
        });
      }
    });
  }
}
