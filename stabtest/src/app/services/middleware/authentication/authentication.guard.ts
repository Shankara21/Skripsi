import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private AuthService: AuthService, private Router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url = state.url;

    if (this.AuthService.GetToken()) {
      if (url.includes('auth')) {
        this.Router.navigateByUrl('/home');
        return false;
      } else {
        return true;
      }
    } else {
      if (url.includes('auth')) {
        return true;
      } else {
        this.Router.navigateByUrl('/auth');
        return false;
      }
    }
  }

}
