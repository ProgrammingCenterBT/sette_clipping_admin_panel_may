import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, VERSION } from '@angular/core';
import { AuthenticationService } from 'src/app/services/administrator-login-services/authentication.service';
import { Authors } from 'src/app/services/authors-service/authors';
import { AuthorsService } from 'src/app/services/authors-service/authors.service';
import { Clip } from 'src/app/services/clip-service/clip';
import { ClipService } from 'src/app/services/clip-service/clip.service';
import { Gridkeywords } from 'src/app/services/gridkeywords-services/gridkeywords';
import { GridkeywordsService } from 'src/app/services/gridkeywords-services/gridkeywords.service';
import { MediumType } from 'src/app/services/medium-type-services/mediumType';
import { Mediums } from 'src/app/services/mediums-services/mediums';
import { MediumsService} from 'src/app/services/mediums-services/mediums.service';
import { Tags } from 'src/app/services/tags-service/tags';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/services/format-datepicker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { clipTags } from 'src/app/services/clip-tags-service/clip-tags';
import { ClipTagsService } from 'src/app/services/clip-tags-service/clip-tags.service';
import { DatePipe } from '@angular/common';
import { MediumTypeService } from 'src/app/services/medium-type-services/medium-type.service';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { ClipAuthors } from 'src/app/services/clip-author-service/clip-authors';
import { ClipAuthorService } from 'src/app/services/clip-author-service/clip-author.service';
import { ClipTvService } from 'src/app/services/clip-service/clip-tv.service';
import { ClipTv } from 'src/app/services/clip-service/clip-tv';
import { FunClip } from 'src/app/services/functions/fun-clip';
import { FunClipService } from 'src/app/services/functions/fun-clip.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { ClipPrintedService } from 'src/app/services/clip-service/clip-printed.service';
import { ClipPrinted } from 'src/app/services/clip-service/clip-printed';
import { FunTags } from 'src/app/services/functions/fun-tags';
import { FunTagService } from 'src/app/services/functions/fun-tag.service';
import { FunClipPrinted } from 'src/app/services/functions/fun-clip-printed';
import { FunClipPrintedService } from 'src/app/services/functions/fun-clip-printed.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class HomeComponent implements OnInit {

  public clipList: Clip[];
  public printedClipList: ClipPrinted[];
  public tvClipList: ClipTv[];
  public allClips: any[];
  public tagsList: FunTags[];
  public mediumsList: Mediums[];
  public mediumTypeList: MediumType[];
  public gridkeywordList: Gridkeywords[];
  public authorList: Authors[];
  public clipTagsList: clipTags[];
  public filteredList: FunClip[] = [];
  public clipAuthorsList: ClipAuthors[] = [];
  public funClipList: FunClip[];
  public funClipPrintedList: FunClipPrinted[];
  public lastEnteredClip: Clip[] = [];
  public numberOfClips: number;
  public searchString: string = '';
  public searchStringTags: string;

  brojac: number = 0;
  showMe: boolean;

  formSwitch: string = 'webForm';
  selectedMediumType: number = 0;
  showClipForm = false;
  newClipButton = true;
  mediumFilterActivate = false;

  keywords: string = '';
  brief: string = '';
  updatedBrief: string = '';

  title: string;
  mediumTitle: string;
  authorTitle: string;
  selectedMedium: string;
  mediumID: number;
  clipID: number;
  clipDateName: string;
  clipMediumID: number;
  clipMediumName: string;

  val = false;
  nextGroupID = 0;
  done = [];
  check: boolean;
  clipTagID: number;
  selectedMainClip: number;
  mainClip: number = -1;
  showGroup = false;
  groupID: number;
  nextGroup = 0;
  keywordList: string[] = [];

  clips: Clip;
  clipAuthors: ClipAuthors;
  mediums: Mediums;
  authors: Authors;
  tags: Tags;
  clipTags: clipTags;
  gridkeywords: Gridkeywords;

  openedTags: number[] = [];
  tagsToAdd: number[] = [];
  tagsToAddToForm: number[] = [];
  selectedClips = [];
  filterByMedium: string[] = [];
  filteredClipsByMedium: number[] = [];
  fileName = '';
  selectedFile = false;
  groupAddButton = false;

  currentDate: Date;
  version = VERSION.full;
  deptCtrl;
  required;
  datepickerRef1;
  myTimePicker;
  myTimePicker1;
  timemodel;

  webClipForm: FormGroup;
  printedClipForm: FormGroup;
  tvRadioClipForm: FormGroup;
  keywordForm: FormGroup;
  editMode = false;
  translateMode = false;
  clipIDForm: number;
  selectedKeyword: string;
  importantInformations: boolean;
  public modeselect = 245;
  allowMediums = sessionStorage.getItem('allowMediums');
  public counter = 1;
  timeFrom: any;
  clipsWithTags: number[] = [];

  filterMode = false;
  date = new Date();
  minDate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() -2);


    constructor(private clipService: ClipService, public authService: AuthenticationService, public http: HttpClient,
                public dialog: MatDialog,private formBuilder: FormBuilder){
      
                  this.clips = new Clip();
                  this.clipAuthors = new ClipAuthors();
                  this.mediums = new Mediums();
                  this.clipTags = new clipTags();
                  this.gridkeywords = new Gridkeywords();
                  let intervalId = setInterval(() => {

                    var dateEnd = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), 2, this.date.getMinutes(), this.date.getSeconds(), this.date.getMilliseconds());
                   if ( this.date.getTime() == dateEnd.getTime()) {
                      this.deleteClipsWithoutTag();
                    }

                    if(this.counter === 0) clearInterval(intervalId)
                }, 1000)
    }

  ngOnInit(): void {
    this.webClipForm = this.formBuilder.group({
      medium_id : ['',Validators.required],
      created_at : ['',Validators.required],
      created_at_time: [''],
      date_of_clip: ['',Validators.required],
      clip_title: ['', Validators.required],
      clip_title_english: [''],
      clip_text: ['', Validators.required],
      brief: ['',Validators.required],
      brief_english: [''],
      clip_url: ['', Validators.required],
      clip_image_url: [''],
      important_information: [''],
     // author_id: ['']
    });
    this.printedClipForm = this.formBuilder.group({
      medium_id: ['',Validators.required],
      created_at: ['', Validators.required],
      date_of_clip: ['', Validators.required],
      clip_title: ['', Validators.required],
      clip_text: ['', Validators.required],
      clip_image_url: ['', Validators.required],
      brief: ['', Validators.required],
      clip_pages: ['', Validators.required],
      clip_main_page: [''],
      clip_image: [''],
      clip_area: [''],
      clip_relevance: [''],
      clip_research: [''],
      important_information: ['']
    })
    this.tvRadioClipForm = this.formBuilder.group({
      medium_id: ['', Validators.required],
      created_at: ['', Validators.required],
      date_of_clip: ['', Validators.required],
      clip_title: ['', Validators.required],
      clip_text: ['', Validators.required],
      brief: ['', Validators.required],
      video_url: ['', Validators.required],
      important_information: ['']
    })
    this.keywordForm = this.formBuilder.group({
      keyword: ['']
    });
    this.getFunClip();
    this.getFunClipPrinted();
    this.getClipTv();
    this.getClip();
    this.clipMedium();
   //this.loadKeywords();
  }

  translateOnOff() {
    if (this.translateMode == true) this.translateMode = false; else this.translateMode = true;
  }

  removeMainAndMakeGroup() {
      this.clipService.removeClipFromGroup(this.selectedClips[0], this.clips).subscribe(result => this.getFunClip());
      this.clips.main_clip = true;
      this.clipService.updateClipGroup(this.selectedClips[1], this.clips).subscribe(result => this.getFunClip());
      this.selectedClips = [];
      this.mainClip = -1;
  }

  showClipsWithoutTags() {
  this.filterMode = true;
  for (let clip of this.funClipList) {
  if (this.clipTagsList.length != 0) {
    for (let clipTag of this.clipTagsList) {
      if (clip.clip_id == clipTag.clip.clip_id) {
        this.clipsWithTags.push(clip.clip_id)
      }
    }
  }
}
  for (let clip of this.funClipList) {
    if (!this.clipsWithTags.includes(clip.clip_id)) {
      this.filteredList.push(clip)
    }
  }
}

  checkTime(value: any) {
    console.log(value)
  }

  reverseDate(date: string) {
    const reverse = new Date(date.split("-").reverse().join("-"));
    return reverse.getTime();
  }

  filterByDate(dateFrom: string, dateTo: string) {
      this.filterMode = true;
      if(dateFrom == "") {
        this.filteredList = this.funClipList.filter(res => {
        return this.reverseDate(res.date_of_clip) <= this.reverseDate(dateTo);
        })
      }
      if(dateTo == "") {
          this.filteredList = this.funClipList.filter(res => {
          return this.reverseDate(res.date_of_clip) >= this.reverseDate(dateFrom);
          })
      }
      if(dateTo != "" && dateFrom != "") {
        this.filteredList = this.funClipList.filter(res => {
        return this.reverseDate(res.date_of_clip) >= this.reverseDate(dateFrom) && this.reverseDate(res.date_of_clip) <= this.reverseDate(dateTo);
        })
  }
  }

  tagOpened(tagID: number) {
    if(this.openedTags.includes(tagID)) {
      for (let i = 0; i < this.openedTags.length; i++) {
      if (this.openedTags[i] == tagID) {
      this.openedTags.splice(i, 1);
       }
     }
    } else {
      this.openedTags.push(tagID);
    }
  }

  addTagToClipByCheck(tagID: number) {}

  copyClipGroup() {
    this.getNextClipGroup();
    var checkClipGroup = false;
    var clipsToCopy: Clip[] = [];
    for (let clip of this.clipList) {
      if (this.selectedClips[0] == clip.clip_id) {
        if (clip.clip_group != -1) {
          checkClipGroup = true;
        }
      }
    }
    if(checkClipGroup) {
      for (let clip of this.clipList) {
        if(this.selectedClips.includes(clip.clip_id)) {
          clipsToCopy.push(clip);
        }
      }
      for (let clip of clipsToCopy) {
        this.clips.brief = clip.brief;
        this.clips.brief_english = clip.brief_english;
        this.clips.clip_image_url = clip.clip_image_url;
        this.clips.clip_text = clip.clip_text;
        this.clips.clip_text_english = clip.clip_text_english;
        this.clips.clip_title = clip.clip_title;
        this.clips.clip_title_english = clip.clip_title_english;
        this.clips.clip_type = clip.clip_type;
        this.clips.clip_url = clip.clip_url;
        this.clips.created_at = clip.created_at;
        this.clips.created_at_time = clip.created_at_time;
        this.clips.date_of_clip = clip.date_of_clip;
        this.clips.important_information = clip.important_information;
        this.clips.clip_group = this.nextGroup + 1;
        this.clips.main_clip = clip.main_clip;
        this.clips.medium.medium_id = clip.medium.medium_id;
        this.clipService.addClip(this.clips).subscribe(result => this.getFunClip());
      }
    }
  }

  deleteClipsWithoutTag() {}

  openClipForm() {}

  setMainClip(clipID: number) {}

  switchForms(value) {}

  openSnackBar(message: string, action: string) {}

  addToFilterMedium(mediumName: string) {}

  filterClipsByMedium() {}

  selectClip(clipID: number, clipCheckBox: boolean) {}

getNextClipGroup() {}

clipMedium() {}

  onSubmit() {
    for (var medium of this.mediumsList) {
      if (this.selectedMedium == medium.medium_name_cyrilic) {
        this.mediumID = medium.medium_id;
        this.clips.medium.medium_id = this.mediumID;
        this.clipService.addClip(this.clips).subscribe(result => this.getClip());
      }
    }
  }


  public getFunClip(): void {
  }

  public getFunClipPrinted(): void {
    // this.funClipPrintedService.fun_clips_printed().subscribe(
    //   (response: FunClipPrinted[]) => {
    //     if(response.length>0){
    //     this.funClipPrintedList = response.sort((a,b) => (a.clip_printed_id < b.clip_printed_id ? -1: 1));
    //   }
    // },
    //   (error: HttpErrorResponse) => {
    //     alert(error.message);
    //   }
    // );
  }

  public getClip(): void {
  }

  public getClipTv(): void {
    // this.clipTvService.getClipTv().subscribe(
    //   (response: ClipTv[]) => {
    //     if(response.length>0){
    //     this.tvClipList = response.sort((a,b) => (a.clip_id < b.clip_id ? -1: 1));
    //     }
    //   },
    //   (error: HttpErrorResponse) => {
    //     alert(error.message);
    //   }
    // );
  }
}