import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/administrator-login-services/authentication.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  /*template: `
  <div
    class="search-results"
    infiniteScroll
    [infiniteScrollDistance]="2"
    [infiniteScrollUpDistance]="1.5"
    [infiniteScrollThrottle]="50"
    (scrolled)="onScrollDown()"
    (scrolledUp)="onScrollUp()"
  ></div>
`,*/
})
export class AppComponent implements OnInit{
  [x: string]: any;


  constructor(public authService: AuthenticationService){}

  ngOnInit() {
      
  }

  logOut() {
    this.authService.logOut();
  }


}
