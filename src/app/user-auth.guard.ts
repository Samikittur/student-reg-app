import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {

  constructor(private router:Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      var userType = localStorage.getItem('userData');
      var userTypeParsed = JSON.parse(userType);
          userType = userType == null? "":userTypeParsed.type;

          if(userType =="user"){
              return true;
             } else {
            if(!userType){
              this.router.navigate(['/signin']);
              return false;
            }else{
              const currentRoute = localStorage.getItem('currentRoute');
              this.router.navigate([currentRoute]);
              return false;
            }
          }    
  }
}
