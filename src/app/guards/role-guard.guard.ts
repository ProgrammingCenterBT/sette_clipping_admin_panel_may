import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/administrator-login-services/authentication.service';
import { Users } from '../services/users-service/users';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardGuard implements CanActivate {

 usersList: Users[] = [];

 constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAuthorized(route);
  }

  private isAuthorized(route: ActivatedRouteSnapshot): boolean {
    var roles = [];
    if (sessionStorage.getItem('allowClips') == "true") roles.push('Clips');
    if (sessionStorage.getItem('allowTenders') == "true") roles.push('Tenders');
    if (sessionStorage.getItem('allowBankruptcies') == "true") roles.push('Bankruptcies');
    if (sessionStorage.getItem('allowNotifications') == "true") roles.push('Notifications');
    if (sessionStorage.getItem('allowSales') == "true") roles.push('Sales');
    if (sessionStorage.getItem('allowMediums') == "true") roles.push('Mediums');
    if (sessionStorage.getItem('allowAuthors') == "true") roles.push('Authors');
    if (sessionStorage.getItem('allowTags') == "true") roles.push('Tags');
    if (sessionStorage.getItem('allowClients') == "true") roles.push('Clients');
    if (sessionStorage.getItem('allowSocials') == "true") roles.push('Socials');
    if (sessionStorage.getItem('allowAdministrators') == "true") roles.push('Administrators');
    const expectedRoles = route.data['expectedRoles'];
    const roleMatches = roles.findIndex(role => expectedRoles.indexOf(role) !== -1);
    return (roleMatches >= 0) ? true : false;
  }

}
