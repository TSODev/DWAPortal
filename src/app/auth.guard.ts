import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { CommonService } from './shared/services/common.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private common: CommonService) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  	if (this.common.getAuthenticated()) {
  			return true;
  		} else {
  			this.router.navigate(['/login']);
  			return false;
  		}
	}
}