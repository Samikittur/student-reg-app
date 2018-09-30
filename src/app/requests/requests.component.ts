import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Services } from '../services';
import { AuthServices } from '../auth.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
  providers: [Services,AuthServices]
})
export class RequestsComponent implements OnInit {
  requestsData:any;
  loading = true;
  constructor(private AuthServices:AuthServices,public Services:Services, private router : Router, private route:ActivatedRoute) {
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
  rejectRequest(id,index){
    this.Services.deleteRequests(id).subscribe(result=>{
      this.requestsData.splice(index,1);
    });
  }
}
