import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Clip } from 'src/app/services/clip-service/clip';
import { ClipService } from 'src/app/services/clip-service/clip.service';
import { Mediums } from 'src/app/services/mediums-services/mediums';
import { MediumsService } from 'src/app/services/mediums-services/mediums.service';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/services/format-datepicker';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class SearchbarComponent implements OnInit {
  public clipList: Clip[];
  public mediumsList: Mediums[];
  clipDateName: string;
  clipMediumID: number;
  clipMediumName: string;
  clips: Clip;
  mediums: Mediums;
  title: string;
  deptCtrl;
  required;
  datepickerRef1;


  constructor(private mediumService: MediumsService, private clipService: ClipService) { }

  ngOnInit(): void {
    this.getClip();
  }


  filterDates(dateFrom: string, dateTo: string) {
    if (dateFrom == "" && dateTo == "") {
      this.getClip();
    } else if (dateFrom == "") {
      this.clipList = this.clipList.filter(
        res => new Date(res.date_of_clip) <= new Date(dateTo)
      );
    } else if (dateTo == "") {
      this.clipList = this.clipList.filter(
        res => new Date(res.date_of_clip) >= new Date(dateFrom)
      );
    } else {
      this.clipList = this.clipList.filter(
        res => new Date(res.date_of_clip) >= new Date(dateFrom) && new Date(res.date_of_clip) <= new Date(dateTo)
      );
    }
  }

  clipMedium() {
    for (var clip of this.clipList) {
      this.clipMediumID = clip.medium.medium_id;
      for (var medium of this.mediumsList) {
        if (medium.medium_id == this.clipMediumID) {
          this.clipMediumName = medium.medium_name_cyrilic;
        }
      }
    }
  }

  public getClip(): void {
    this.clipService.getClip().subscribe({
      next:     (response: Clip[])        => {this.clipList = response;},
      error:    (error:HttpErrorResponse) => {console.log(error.message);},// errorHandler 
      complete: ()                        => {console.log("completeHandler");} // completeHandler
    });
  }

  Search() {
    if (this.title == "") {
      this.ngOnInit();
    }
    this.clipList = this.clipList.filter(res => {
      return res.clip_title.toLocaleLowerCase().match(this.title.toLocaleLowerCase());
    })
  }

}