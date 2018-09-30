import { Component, OnInit } from '@angular/core';
import { AuthServices } from '../auth.service';
import {Router, ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
  providers:[AuthServices]
})
export class PageNotFoundComponent implements OnInit {

  constructor(private AuthServices : AuthServices, private router: Router, private route: ActivatedRoute) {
    this.AuthServices.userAuth('404');
    }

  ngOnInit() {
  }

}
