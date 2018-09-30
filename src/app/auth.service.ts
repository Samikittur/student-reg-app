import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from './data.service';
@Injectable()
export class AuthServices {

    constructor(private router: Router,
        public activatedRoute: ActivatedRoute,
        private dataService: DataService) {
        this.routerUrl();
    }

    userAuth(param) {
        var userType = localStorage.getItem('userData');
        var userTypeParsed = JSON.parse(userType);
        userType = userType == null ? "" : userTypeParsed.type;
        var username = userType == "" ? "" : userTypeParsed.email;;

        //if(userType =="admin") param = 'admindash';
        if (localStorage.getItem('jwtToken')) {
            this.router.navigate(['/' + param], { relativeTo: this.activatedRoute });
            this.dataService.sendDataObj({ type: "logged", loggedin: true, userType: userType, username: username });
        } else {
            var activeRoute = this.router.url;
            if (this.router.url == '/signup') {
                this.dataService.sendDataObj({ type: "signup", loggedin: false, userType: userType, username: username });
                this.router.navigate([activeRoute], { relativeTo: this.activatedRoute });
            } else {
                this.dataService.sendDataObj({ type: "signin", loggedin: false, userType: userType, username: username });
                this.router.navigate(['/signin'], { relativeTo: this.activatedRoute });
            }
        }
    }

    authFlag() {
        if (localStorage.getItem('jwtToken')) {
            return true;
        } else {
            return false;
        }
    }

    routerUrl() {
        var user = localStorage.getItem('userData');
        if (user) {
            var getUrl = this.router.url,
                signin = "/signin",
                signup = "/signup",
                pnf = "/404";
            if (getUrl != '/') {
            if (getUrl == signin) return;
            if (getUrl == signup) return;
            if (getUrl == pnf) return;
            localStorage.removeItem('currentRoute');
            localStorage.setItem('currentRoute', this.router.url);            
            }
        }
    }
}

