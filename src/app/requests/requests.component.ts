import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Services } from '../services';
import { MatDialog } from '@angular/material';
import { AuthServices } from '../auth.service';
import { MatDialogComponent } from '../mat-dialog/mat-dialog.component';
@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
  providers: [Services,AuthServices]
})
export class RequestsComponent implements OnInit {
  requestsData:any;
  loading = true;
  constructor(private AuthServices:AuthServices,
              public Services:Services, 
              private router : Router, 
              private route:ActivatedRoute,
              private dialog: MatDialog) {
    this.AuthServices.userAuth('requests');
  }

  ngOnInit() {
    this.getRequestDetails();
  }

  getRequestDetails(){
    this.Services.getRequests().subscribe(result=>{
     this.requestsData = result;
     this.loading = false;
    });
  }
  rejectRequest(id){
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
        this.Services.deleteRequests(id).subscribe(result=>{
        var modelData = {title:"SUCCESS",message:"Request Deleted Successfully", modelType:"default"};
        this.openDialog(modelData,"");  
        this.getRequestDetails();
    });
      }
    });
  }
}
