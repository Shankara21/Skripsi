import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
  constructor(private AuthService: AuthService, private Router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url = state.url;
    const listNikAllowed = ['0927', '1547', '3371', '212121']
    const user = this.AuthService.GetPayload();

    if (listNikAllowed.includes(user.nik)) {
      return true;
    } else {
      this.Router.navigateByUrl('/forbidden');
      return false;
    }
  }
}
