import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/services/format-datepicker';

@Component({
  selector: 'app-bankruptcies-searchbar',
  templateUrl: './bankruptcies-searchbar.component.html',
  styleUrls: ['./bankruptcies-searchbar.component.css'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class BankruptciesSearchbarComponent { //implements OnInit {
  // title: string;
  // showSalesForm: boolean = false;
  // deptCtrl;
  // required;
  // datepickerRef1;

  // bankruptciesForm: FormGroup;

  // constructor() { }

  // ngOnInit(): void {
  // }

  // Search() {
  //   if (this.title == "") {
  //     this.ngOnInit();
  //   }
  //   /*this.clipList = this.clipList.filter(res => {
  //     return res.clip_title.toLocaleLowerCase().match(this.title.toLocaleLowerCase());
  //   })*/
  // }

  // filterDates(dateFrom: string, dateTo: string){
  // }

}