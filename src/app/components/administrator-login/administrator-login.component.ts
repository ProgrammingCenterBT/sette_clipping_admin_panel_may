import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/administrator-login-services/authentication.service';
import { UsersService } from 'src/app/services/users-service/users.service';
import { Users } from 'src/app/services/users-service/users';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-administrator-login',
  templateUrl: './administrator-login.component.html',
  styleUrls: ['./administrator-login.component.css']
})
export class AdministratorLoginComponent /*implements OnInit*/ {
  invalidLogin = false

  public usersList: Users[];
  users: Users;
  alert_warning:boolean=false;
  loginForm: FormGroup;
  userNotFound = false;
  usersEmpty=false;
  sha1 = require('sha-1');

  constructor(private userService: UsersService, private router: Router, public authService: AuthenticationService, private formBuilder: FormBuilder) {
    this.users = new Users();
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      administrator_username : ['',Validators.required],
      administrator_password : ['',Validators.required]
    });
  }

  logOut() {
    this.authService.logOut();
  }
  
  checkLogin() {
    this.invalidLogin = true;
    this.alert_warning=false;
    var username = this.loginForm.controls['administrator_username'].value;
    var password = this.sha1(this.loginForm.controls['administrator_password'].value);
    if(this.loginForm.valid){
        if (this.authService.authenticate(username, password)) {
          console.log("Sign in after "+username+" "+password);
    
  // let numberOfAuthors = this.usersList.filter(Users=>(Users.username===username &&  Users.user_password=== password)).length;
  
  // if(numberOfAuthors==1){
  //   console.log("Is logged "+username+" "+password);
  //       if (this.authService.authenticate(username, username, password, password)) {
          this.router.navigate(['']);
          this.invalidLogin = false;
        } else {
          this.loginForm.controls['administrator_password'].setValue('');
          this.userNotFound = true;
        }
    }else{
      this.alert_warning=true;
    }
  }
}