import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../serviceAuth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard  {
  constructor(private authSerice:AuthService,private router:Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authSerice.isAuthService ){
      return true
    }
    else {
         this.router.navigateByUrl("/login")
      return  false
    }

    return true;
  }

}
