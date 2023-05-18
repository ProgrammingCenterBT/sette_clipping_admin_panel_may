import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, tap } from 'rxjs';
//import { AdministratorLoginComponent } from 'src/app/components/administrator-login/administrator-login.component';
import { Users } from '../users-service/users';
import { UsersService } from '../users-service/users.service';
//import { Administrators } from './administrators';
//import { AdministratorsService } from './administrators.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public usersList: any[]=[];
  //public usersList: Users[]=[];//problem
  user:Users = new Users();
  constructor(private userService: UsersService) { }

  public setData(results:any){
    this.usersList=results;
  }
  public getData():any{
    return this.usersList;
  }
  public getUsersAll(username: string, password: string):void {
    this.user.username=username;
    this.user.user_password=password;
    //const delayedClicks = this.userService.loginUser(this.user).pipe(delay(500)); // each click emitted after 1 second
    this.userService.loginUser(this.user).subscribe(
      {
        next:     (response: Users[])         => {this.usersList=response;},
        error:    (error:HttpErrorResponse) => {console.log(error.message);},// errorHandler 
       // complete: ()                          => {console.log("completeHandler");} // completeHandler
      }
    );
    // setTimeout(() => {
    //   this.userService.loginUser(this.user).subscribe({
    //     next: (response:any)         => {this.usersList = response;}
    //   });
    // }, 1000);
  }
  // public ngOnInit(): void {
  //   this.getUsersAll("",""); //don't log here, logging here will return undefined
  // }
  authenticate(username: string, password: string) {
    this.getUsersAll(username,password);
    //this.usersList=this.getData();
    console.log(this.usersList);
    if(this.usersList!=undefined){
        if( username  == this.usersList['username'] && password  == this.usersList['user_password']){
            sessionStorage.setItem('allowClips', this.usersList["allow_clips"].toString());
            sessionStorage.setItem('allowTenders', this.usersList["allow_tenders"].toString());
            sessionStorage.setItem('allowBankruptcies', this.usersList['allow_bankruptcies'].toString());
            sessionStorage.setItem('allowNotifications', this.usersList['allow_notifications'].toString());
            sessionStorage.setItem('allowSales', this.usersList['allow_sales'].toString());
            sessionStorage.setItem('allowMediums', this.usersList['allow_mediums'].toString());
            sessionStorage.setItem('allowAuthors', this.usersList['allow_authors'].toString());
            sessionStorage.setItem('allowTags', this.usersList['allow_tags'].toString());
            sessionStorage.setItem('allowClients', this.usersList['allow_clients'].toString());
            sessionStorage.setItem('allowSocials', this.usersList['allow_socials'].toString());
            sessionStorage.setItem('allowAdministrators', this.usersList['allow_administrators'].toString());
            sessionStorage.setItem('username', username);
            return true;
        }
      return false;
    } else {
      return false;
    } 
}
  
  isUserLoggedIn() {
    let user = sessionStorage.getItem('username');
    return !(user === null)
  }
  userLoggedInAuthors() {
    return sessionStorage.getItem('allowAuthors');
  }
  userLoggedInClips() {
    return sessionStorage.getItem('allowClips');
  }
  userLoggedInTenders() {
    return sessionStorage.getItem('allowTenders');
  }
  userLoggedInBankruptcies() {
    return sessionStorage.getItem('allowBankruptcies');
  }
  userLoggedInNotifications() {
    return sessionStorage.getItem('allowNotifications');
  }
  userLoggedInSales() {
    return sessionStorage.getItem('allowSales');
  }
  userLoggedInMediums() {
    return sessionStorage.getItem('allowMediums');
  }
  userLoggedInTags() {
    return sessionStorage.getItem('allowTags');
  }
  userLoggedInClients() {
    return sessionStorage.getItem('allowClients');
  }
  userLoggedInSocials() {
    return sessionStorage.getItem('allowSocials');
  }
  userLoggedInAdministrators() {
    return sessionStorage.getItem('allowAdministrators');
  }
  logOut() {
    sessionStorage.removeItem('username')
  }

  }