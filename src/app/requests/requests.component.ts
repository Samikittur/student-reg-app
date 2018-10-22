import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Services } from '../services';
import { MatDialog } from '@angular/material';
import { AuthServices } from '../auth.service';
import { MatDialogComponent } from '../mat-dialog/mat-dialog.component';
import { Form } from '@angular/forms';
@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
  providers: [Services, AuthServices]
})
export class RequestsComponent implements OnInit {
  requestsData: any;
  loading = true;
  touchtime = 0;
  dialogType: any;
  constructor(private AuthServices: AuthServices,
    public Services: Services,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog) {
    this.AuthServices.userAuth('requests');
  }

  ngOnInit() {
    this.getRequestDetails();
  }

  getRequestDetails() {
    this.Services.getRequests().subscribe(result => {
      this.requestsData = result;
      this.loading = false;
    });
  }
  rejectRequest(id) {
    var modelData = {
      title: "CONFIRM",
      message: "Are you sure want to delete?",
      modelType: "confirm",
      width: '300px',
      height: '250px'
    };
    this.dialogType = "delete";
    this.openDialog(modelData, id);
  }

  viewDetails(request) {
    if (this.touchtime == 0) {
      // set first click
      this.touchtime = new Date().getTime();
    } else {
      // compare first click to this click and see if they occurred within double click threshold
      if (((new Date().getTime()) - this.touchtime) < 600) {
        // double click occurred
        request.title = "View Request Details";
        request.modelType = "viewReqDetails";
        request.width = '550px';
        request.height = 'auto';
        this.dialogType = "update";
        this.openDialog(request, request._id);
        this.touchtime = 0;
      } else {
        // not a double click so set as a new first click
        this.touchtime = new Date().getTime();
      }
    }

  }
  openDialog(content, id) {
    var self = this;
    const dialogRef = this.dialog.open(MatDialogComponent, {
      height: content.height,
      width: content.width,
      data: content
    });

     dialogRef.afterClosed().subscribe(result => {
      if (result == 'Confirm') {
        this.loading = true;
        if (this.dialogType == 'delete') {
          this.Services.deleteRequests(id).subscribe(result => {
            var modelData = { title: "SUCCESS", message: "Request Deleted Successfully", modelType: "default" };
            this.openDialog(modelData, "");
            this.getRequestDetails();
            this.loading = false;
          });
        } else {
            var modelData = { title: "SUCCESS", message: "Request Updated Successfully", modelType: "default" };
            this.openDialog(modelData, "");
            this.getRequestDetails();
            this.loading = false;
        }
      }
    });
  }
}
