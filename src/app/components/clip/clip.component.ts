import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild, VERSION } from '@angular/core';
import { AuthenticationService } from 'src/app/services/administrator-login-services/authentication.service';
import { Authors } from 'src/app/services/authors-service/authors';
import { Clip } from 'src/app/services/clip-service/clip';
import { ClipService } from 'src/app/services/clip-service/clip.service';
import { Gridkeywords } from 'src/app/services/gridkeywords-services/gridkeywords';
import { GridkeywordsService } from 'src/app/services/gridkeywords-services/gridkeywords.service';
import { MediumType } from 'src/app/services/medium-type-services/mediumType';
import { Mediums } from 'src/app/services/mediums-services/mediums';
import { Tags } from 'src/app/services/tags-service/tags';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/services/format-datepicker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogComponent } from '../dialog/dialog.component';
import { clipTags } from 'src/app/services/clip-tags-service/clip-tags';
import { DialogClipGroupComponent } from '../dialog-clip-group/dialog-clip-group.component';
import { ClipTagsService } from 'src/app/services/clip-tags-service/clip-tags.service';
import { DatePipe } from '@angular/common';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MediumTypeService } from 'src/app/services/medium-type-services/medium-type.service';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { ClipAuthors } from 'src/app/services/clip-author-service/clip-authors';
import { ClipAuthorService } from 'src/app/services/clip-author-service/clip-author.service';
import { DndDropEvent } from 'ngx-drag-drop';
import { ClipTvService } from 'src/app/services/clip-service/clip-tv.service';
import { ClipTv } from 'src/app/services/clip-service/clip-tv';
import { FunClip } from 'src/app/services/functions/fun-clip';
import { FunClipService } from 'src/app/services/functions/fun-clip.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
//import * as moment from 'moment';
import { ClipPrintedService } from 'src/app/services/clip-service/clip-printed.service';
import { ClipPrinted } from 'src/app/services/clip-service/clip-printed';
import { FunTags } from 'src/app/services/functions/fun-tags';
import { FunTagService } from 'src/app/services/functions/fun-tag.service';
import { FunClipPrinted } from 'src/app/services/functions/fun-clip-printed';
import { FunClipPrintedService } from 'src/app/services/functions/fun-clip-printed.service';
//The another Components
import { AuthorsComponent } from '../authors/authors.component';
import { MediumsComponent } from '../mediums/mediums.component';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.css']
})

export class ClipComponent implements OnInit {

  public clipList: Clip[] = [];
  public printedClipList: ClipPrinted[] = [];
  public tvClipList: ClipTv[] = []; 
  public allClips: any[];
  public tagsList: FunTags[] = [];
  public mediumsList: Mediums[] = [];
  public mediumTypeList: MediumType[] = [];
  public gridkeywordList: Gridkeywords[];
  public authorList: Authors[] = [];
  public clipTagsList: clipTags[] = [];
  public filteredList: FunClip[] = [];
  public clipAuthorsList: ClipAuthors[] = [];
  public funClipList: FunClip[] = [];
  public funClipPrintedList: FunClipPrinted[] = [];
  public lastEnteredClip: Clip[] = [];
  public numberOfClips: number;
  public SearchString: string = '';
  public SearchStringTags: string;

  SearchAll: string = '';
  SearchWeb: boolean = false;
  SearchTv: boolean = false;
  SearchRadio: boolean = false;
  SearchPrint: boolean = false;
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
  url: string;
  // datepickerRef1;
  // myTimePicker;
  // myTimePicker1;
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
  alert_warning: boolean = false;
  searchFromDate: string;

  filteredRecords: any[];


  @ViewChild('to') dateTo: ElementRef;
  @ViewChild('from') dateFrom: ElementRef;
  objPosition: number = 0;
  filterMode = false;
  date = new Date();
  minDate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() - 2);

  //Infinite scroll
  private offset = 0;
  private limit = 50;
  //call function from the another component
  //https://stackblitz.com/edit/angular-screenshot-orpj8q?file=src%2Fapp%2Fapp.component.ts
  //stackblitz.com/edit/ngx-capture-sathia?file=src%2Fapp%2Fapp.component.html
  //https://javascript.plainenglish.io/screen-capture-a-page-using-angular-ngx-capture-2eda79c93bf
  name = 'Angular';
  img = "https://javascript.plainenglish.io/screen-capture-a-page-using-angular-ngx-capture-2eda79c93bf'";

  imgBase64: any = '';
  @ViewChild('screen', { static: true }) screen: any;

  constructor(private gridkeywordService: GridkeywordsService, private mediumComponent: MediumsComponent, private funTagService: FunTagService, private clipService: ClipService, public authService: AuthenticationService, public http: HttpClient,
    public dialog: MatDialog, private _snackBar: MatSnackBar, private formBuilder: FormBuilder,
    private clipTagService: ClipTagsService, private datePipe: DatePipe, private mediumTypeService: MediumTypeService,
    private clipAuthorsService: ClipAuthorService, private clipTvService: ClipTvService, private clipPrintedService: ClipPrintedService, private funClipPrintedService: FunClipPrintedService,
    private componentAuthors: AuthorsComponent) {
    this.clips = new Clip();
    this.clipAuthors = new ClipAuthors();
    this.mediums = new Mediums();
    this.clipTags = new clipTags();
    this.gridkeywords = new Gridkeywords();
    let intervalId = setInterval(() => {

      var dateEnd = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), 2, this.date.getMinutes(), this.date.getSeconds(), this.date.getMilliseconds());
      if (this.date.getTime() == dateEnd.getTime()) {
        this.deleteClipsWithoutTag();
      }

      if (this.counter === 0) clearInterval(intervalId)
    }, 1000)
  }

  ngOnInit(): void {
    this.webClipForm = this.formBuilder.group({
      medium_id: ['', Validators.required],
      created_at: ['', Validators.required],
      created_at_time: [''],
      date_of_clip: ['', Validators.required],
      clip_title: ['', Validators.required],
      clip_title_english: [''],
      clip_text: ['', Validators.required],
      brief: ['', Validators.required],
      brief_english: [''],
      clip_url: ['', Validators.required],
      clip_image_url: [''],
      important_information: [''],
      cluster_url: [''],
      author_id: ['']

    });
    this.printedClipForm = this.formBuilder.group({
      medium_id: ['', Validators.required],
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
    });
    this.tvRadioClipForm = this.formBuilder.group({
      medium_id: ['', Validators.required],
      created_at: ['', Validators.required],
      date_of_clip: ['', Validators.required],
      clip_title: ['', Validators.required],
      clip_text: ['', Validators.required],
      brief: ['', Validators.required],
      video_url: ['', Validators.required],
      important_information: ['']
    });
    this.keywordForm = this.formBuilder.group({
      keyword: ['']
    });
    this.getFunClipPrinted();
    this.getClipPrinted();
    this.getClipTv();
    this.getClipAuthors();
    this.getClipTags();
    this.getMediumTypes();
    this.getTags();
    this.getMediums();
    this.getGridkeywords();
    this.getAuthors();
    this.clipMedium();
    this.loadKeywords();
    this.getClip();

    console.log("Page OnInit: " + this.offset);
    this.pagination(this.limit, this.offset);
  }
  
  private createClipObject( clip_id: number) {
  
    let clipListNew: Clip;
    clipListNew = ({
      clip_id: -1,
      clip_title: "",
      clip_title_english: "",
      clip_text: "",
      clip_text_english: "",
      clip_type: "",
      date_of_clip: "",
      clip_url: "",
      cluster_url: "",
      created_at: "",
      created_at_time: "",
      brief: "",
      brief_english: "",
      important_information: false,
      clip_image_url: "",
      clip_group: -1,
      main_clip: false,
      isWeb: false,
      isPrinted: false,
      isRadio: false,
      isTV: false,
      isSocial: false,
      medium_name_cyrilic: "",
      medium_name: "",
      medium: {
        medium_id: -1,
        medium_name_cyrilic: "",
        medium_name: "",
        mediumType: {
          medium_type_id: -1,
          medium_type_name: "",
        }
      }
    });
    return clipListNew;
  }
  translateOnOff() {
    if (this.translateMode == true) this.translateMode = false; else this.translateMode = true;
  }

  removeMainAndMakeGroup() {
    this.clipService.removeClipFromGroup(this.selectedClips[0], this.clips).subscribe(result => this.pagination(this.limit, this.offset));
    this.clips.main_clip = true;
    this.clipService.updateClipGroup(this.selectedClips[1], this.clips).subscribe(result => this.pagination(this.limit, this.offset));
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

  // reverseDate(date: string) {
  //   const reverse = new Date(date.split("-").reverse().join("-"));
  //   return reverse.getTime();
  // }

  // filterByDate(dateFrom: string, dateTo: string) {
  //     this.filterMode = true;
  //     if(dateFrom == "") {
  //       this.filteredList = this.funClipList.filter(res => {
  //       return this.reverseDate(res.date_of_clip) <= this.reverseDate(dateTo);
  //       })
  //     }
  //     if(dateTo == "") {
  //         this.filteredList = this.funClipList.filter(res => {
  //         return this.reverseDate(res.date_of_clip) >= this.reverseDate(dateFrom);
  //         })
  //     }
  //     if(dateTo != "" && dateFrom != "") {
  //       this.filteredList = this.funClipList.filter(res => {
  //       return this.reverseDate(res.date_of_clip) >= this.reverseDate(dateFrom) && this.reverseDate(res.date_of_clip) <= this.reverseDate(dateTo);
  //       })
  // }
  // }


  formatDate(dateFrom: string) {
    var myDate = dateFrom;
    var chunks = myDate.split("-");
    var formattedDate = chunks[1] + "-" + chunks[0] + "-" + chunks[2];

    //console.log("formated date " + formattedDate);

    //dd-mm-yyyy convert to mm-dd-yyyy
    //let currentDate = new Date(dateFrom.toString());
    //return this.datePipe.transform(dateFrom, 'yyyy-MM-dd');
    //console.log(dateFrom + " " + formattedDate);
    return this.datePipe.transform(formattedDate, 'yyyy-MM-dd', 'en-US');

  }
  filteredClips(){
  this.filteredRecords = this.SearchWeb ? this.funClipList.filter(FunClip => FunClip.medium_type_name === 'ТВ') : this.funClipList;
  console.log(this.filteredRecords);
  this.filteredRecords = this.SearchWeb ? this.funClipList.filter(FunClip => FunClip.medium_type_name === 'Радио') : this.funClipList;
  console.log(this.filteredRecords);
  this.filteredRecords = this.SearchWeb ? this.funClipList.filter(FunClip => FunClip.medium_type_name === 'Веб') : this.funClipList;
  console.log(this.filteredRecords);
  this.filteredRecords = this.SearchWeb ? this.funClipList.filter(FunClip => FunClip.medium_type_name === 'Печатени') : this.funClipList;
  console.log(this.filteredRecords);
  this.filteredRecords = this.SearchWeb ? this.funClipList.filter(FunClip => FunClip.medium_type_name === 'Социјални Мрежи') : this.funClipList;
  console.log(this.filteredRecords);


  
}

  filterByDate(dateFrom: string, dateTo: string) {
    let dateFrom_format = this.formatDate(dateFrom);
    let dateTo_format = this.formatDate(dateTo);
    this.filterMode = true;
    console.log("SearchAll: " + this.SearchAll + " - " + " SearchTv: " + this.SearchTv + " - " + " SearchRadio: " + 
    this.SearchRadio + " - " + " SearchWeb: " + this.SearchWeb + " - " + " SearchPrint: " + this.SearchPrint);
    return this.funClipList = this.funClipList.filter(FunClip => (FunClip.date_of_clip >= dateFrom_format && FunClip.date_of_clip <= dateTo_format));
  }

  tagOpened(tagID: number) {
    if (this.openedTags.includes(tagID)) {
      for (let i = 0; i < this.openedTags.length; i++) {
        if (this.openedTags[i] == tagID) {
          this.openedTags.splice(i, 1);
        }
      }
    } else {
      this.openedTags.push(tagID);
    }
  }

  addTagToClipByCheck(tagID: number) {
    var checkExistingTag = false;
    for (let clipTags of this.clipTagsList) {
      if (clipTags.tag.tag_id == tagID && this.selectedClips.includes(clipTags.clip.clip_id)) {
        checkExistingTag = true;
      }
    }
    if (!checkExistingTag) {
      for (let clipID of this.selectedClips) {
        //this.clipTags.clip.clip_id = clipID;
        // this.clipTags.tag.tag_id = tagID;
        let clipTagsObj: clipTags[] = [];
        clipTagsObj.push({ "clip_tag_id": -1, "clip": { "clip_id": clipID }, "tag": { "tag_id": tagID } });
        console.log(clipTagsObj);
        this.clipTagService.addClipTag(clipTagsObj[0]).subscribe(result => this.getClipTags());
      }
    }
  }

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
    if (checkClipGroup) {
      for (let clip of this.clipList) {
        if (this.selectedClips.includes(clip.clip_id)) {
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
        //this.clips.cluster_url = clip.cluster_url;
        this.clips.created_at = clip.created_at;
        this.clips.created_at_time = clip.created_at_time;
        this.clips.date_of_clip = clip.date_of_clip;
        this.clips.important_information = clip.important_information;
        this.clips.clip_group = this.nextGroup + 1;
        this.clips.main_clip = clip.main_clip;
        this.clips.medium.medium_id = clip.medium.medium_id;
        this.clipService.addClip(this.clips).subscribe(result => this.pagination(this.limit, this.offset));
      }
    }
  }

  deleteClipsWithoutTag() {
    for (let clip of this.clipList) {
      var clipHasTag = false;
      for (let clipTag of this.clipTagsList) {
        if (clip.clip_id == clipTag.clip.clip_id) {
          clipHasTag = true;
        }
      }
      if (!clipHasTag) {
        this.clipService.deleteClip(clip.clip_id).subscribe(result => this.pagination(this.limit, this.offset));
      }
    }
  }

  openClipForm() {
    if (this.showClipForm == false){ 
      this.getMediums();
      this.getAuthors();
      this.showClipForm = true ;
    }else { 
      this.showClipForm = false; 
    }
  }

  setMainClip(clipID: number) {
    if (this.mainClip == clipID)
      this.mainClip = -1;
    else

      this.mainClip = clipID;
  }

  switchForms(value) {
    this.webClipForm.reset();
    this.printedClipForm.reset();
    this.tvRadioClipForm.reset();
    this.webClipForm.controls['medium_id'].setValue(value);
    this.printedClipForm.controls['medium_id'].setValue(value);
    this.tvRadioClipForm.controls['medium_id'].setValue(value);
    var mediumTypeID = 0;
    var mediumTypeName = '';
    for (let medium of this.mediumsList) {
      if (medium.medium_id == value) {
        mediumTypeID = medium.mediumType.medium_type_id;
      }
    }
    for (let mediumType of this.mediumTypeList) {
      if (mediumType.medium_type_id == mediumTypeID)
        mediumTypeName = mediumType.medium_type_name;
    }
    console.log("Medium_name " + mediumTypeName);
    switch (mediumTypeName) {
      case 'Печатен': this.formSwitch = 'printedForm'; break;
      case 'ТВ': this.formSwitch = 'tvRadioForm'; break;
      case 'Радио': this.formSwitch = 'tvRadioForm'; break;
      case 'Веб': this.formSwitch = 'webForm'; break;
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      panelClass: "sette-dialog"
    });
  }

  addToFilterMedium(mediumName: string) {
    if (this.filterByMedium.includes(mediumName)) {
      for (let i = 0; i < this.filterByMedium.length; i++) {
        if (this.filterByMedium[i] == mediumName) {
          this.filterByMedium.splice(i, 1);
        }
      }
    } else {
      this.filterByMedium.push(mediumName);
    }
  }

  filterClipsByMedium() {
    console.log("Filter by Medium");
    if (this.filterByMedium.length == 0) {
      this.mediumFilterActivate = false;
    } else {
      this.filteredList = [];
      this.mediumFilterActivate = true;
      for (let clip of this.funClipList) {
        if (this.filterByMedium.includes(clip.medium_type_name) || this.filterByMedium.includes("Сите")) {
          this.filteredList.push(clip);
        }
      }
    }
  }

  selectClip(clipID: number, clipCheckBox: boolean) {

    if (this.mainClip == -1) {
      this.mainClip = clipID;
    } // Prvio selektiran klip e nosecki

    var clipGroup = 0;

    if (clipCheckBox) {
      this.selectedClips.push(clipID);
      for (let clip of this.clipList) {
        if (clip.clip_id == clipID && clip.clip_group != -1) {
          clipGroup = clip.clip_group;
        }
      }
      for (let clip of this.clipList) {
        if (clip.clip_group == clipGroup && !clip.main_clip) {
          this.selectedClips.push(clip.clip_id);
        }
      }
    }
    else {
      var clipHasGroup = false;
      for (let clip of this.clipList) {
        if (clip.clip_id == clipID && clip.clip_group != -1) {
          clipHasGroup = true;
          clipGroup = clip.clip_group;
        }
      }
      if (clipHasGroup) {
        for (let clip of this.clipList) {
          if (clip.clip_group == clipGroup) {
            for (let i = 0; i < this.selectedClips.length; i++) {
              if (this.selectedClips[i] == clip.clip_id) {
                this.selectedClips.splice(i, 1);
              }
            }
          }
        }
      } else {
        for (let i = 0; i < this.selectedClips.length; i++) {
          if (this.selectedClips[i] == clipID) {
            this.selectedClips.splice(i, 1);
          }
        }
      }
    }

    if (this.selectedClips.length == 0) {
      this.groupAddButton = false;
    } else {
      this.groupAddButton = true;
    }
    if (!this.selectedClips.includes(clipID) && this.mainClip == clipID)
      this.mainClip = -1;
    console.log(this.selectedClips)
  }

  selectMainClip(selectedMainClip: number) {
    this.selectedMainClip = selectedMainClip
    console.log(this.selectedMainClip)
  }

  //updated

  getNextClipGroup() {
    console.log("Generate groupe ");
    for (let clip of this.clipList) {
      if (clip.clip_group > this.nextGroup) {
        this.nextGroup = clip.clip_group;
      }
    }
  }


  makeClipGroup() {
    this.getNextClipGroup();

    console.log("Generate groupe 2");
    if (this.selectedClips.length < 2) {
      this.openSnackBar('Селектиран е само еден клип!', 'Затвори');
    } else if (this.mainClip == -1) {
      this.openSnackBar('Немате селектирано носечки клип на група!', 'Затвори');
    }
    else {
      console.log(this.clipList);
      for (let clip of this.clipList) {

        //this.numberOfTenders = this.cl.filter(Tenders => Tenders.tender_type === "Тендер").length;
        //this.clipService.ge
        if (clip.clip_id == this.mainClip) {
          this.clips.main_clip = true;
          this.clips.clip_group = this.nextGroup + 1;
          clip.main_clip = true;
          clip.clip_group = this.nextGroup + 1;
          console.log(clip);
          //this.makeMainClip(clip.clip_group,clip.clip_id);
          this.clipService.updateClip(clip.clip_id, clip).subscribe(result => this.pagination(this.limit, this.offset))
        } else
        if (this.selectedClips.includes(clip.clip_id) && clip.clip_id != this.selectedMainClip) {
            this.clips.main_clip = false;
            this.clips.clip_group = this.nextGroup + 1;
            clip.main_clip = false;
            clip.clip_group = this.nextGroup + 1;
            //this.makeMainClip(clip.clip_group,clip.clip_id);
            this.clipService.updateClip(clip.clip_id, clip).subscribe(result => this.pagination(this.limit, this.offset))
          }
      }
    }
    this.selectedClips = [];
    this.mainClip = -1;
  }

  makeMainClip(clipFromGroupID: number, mainClipID: number) {
    console.log("make Group "+clipFromGroupID);
    console.log(this.clips);
    this.selectedClips = [];
    this.clips.main_clip = true;
    this.clipService.updateClipGroup(clipFromGroupID, this.clips).subscribe(result => this.pagination(this.limit, this.offset));
    this.clips.main_clip = false;
    this.clipService.updateClipGroup(mainClipID, this.clips).subscribe(result => this.pagination(this.limit, this.offset));
    this.openSnackBar("Клипот е успешно направен носечки клип на групата!", "Затвори");
  }

  removeClipFromGroup(clipID: number) {
    this.clipService.removeClipFromGroup(clipID, this.clips).subscribe(result => this.pagination(this.limit, this.offset));
    this.selectedClips = [];
    this.openSnackBar("Клипот е успешно одврзан!", "Затвори");
  }

  removeTagFromClip(tagID: number) {
    this.clipTagService.deleteClipTag(tagID).subscribe(result => this.getClipTags());
  }

  transformDate(date) {
    var dateToDB = this.datePipe.transform(date, 'dd.MM.yyyy');
    return dateToDB;
  }


  // tuka i print i tv
  addClipPrinted(importantInformation: boolean) {
    if (this.printedClipForm.valid) {
      this.printedClipForm.controls['important_information'].setValue(importantInformation);
      this.clipPrintedService.addClipPrinted(this.printedClipForm.value).subscribe(result => this.getClipPrinted());
    }
    this.resetPrintedForm();
  }

  addClipTv(importantInformation: boolean) {
    if (this.tvRadioClipForm.valid) {
      this.tvRadioClipForm.controls['important_information'].setValue(importantInformation);
      this.clipTvService.addClipTv(this.tvRadioClipForm.value).subscribe(result => this.pagination(this.limit, this.offset));
    }
    this.resetTvForm();
  }


  //ostanuva
  addClip(importantInformation: boolean) {

    if (this.webClipForm.controls['date_of_clip'].value != "" && this.webClipForm.controls['clip_text'].value! != "" &&
      this.webClipForm.controls['clip_title'].value != "" && this.webClipForm.controls['brief'].value != "" &&
      this.webClipForm.controls['clip_url'].value != "" && this.webClipForm.controls['medium_id'].value > 0) {

      this.alert_warning = false;
      const clip_create_at = new Date().getHours() + ":" + new Date().getMinutes();
      this.clips.clip_id = -1;
      this.clips.created_at = this.webClipForm.controls['created_at'].value;
      this.clips.created_at_time = clip_create_at;
      this.clips.date_of_clip = this.webClipForm.controls['date_of_clip'].value;
      this.clips.clip_title = this.webClipForm.controls['clip_title'].value;
      this.clips.clip_title_english = this.webClipForm.controls['clip_title_english'].value;
      this.clips.brief_english = this.webClipForm.controls['brief_english'].value;
      this.clips.clip_text = this.webClipForm.controls['clip_text'].value;
      this.clips.brief = this.webClipForm.controls['brief'].value;
      this.clips.clip_url = this.webClipForm.controls['clip_url'].value;
      this.clips.cluster_url = this.webClipForm.controls['cluster_url'].value;
      this.clips.clip_image_url = this.webClipForm.controls['clip_image_url'].value;
      this.clips.important_information = this.webClipForm.controls['important_information'].value;
      this.clips.clip_group = -1;
      let mediumObject = {
        "medium_id": Number(this.webClipForm.controls['medium_id'].value),
        "medium_name_cyrilic": "",
        "medium_name": "",
        "mediumType": {
          "medium_type_id": -1,
          "medium_type_name": ""
        }
      };
      this.clips.medium = mediumObject;
      this.clipService.addClip(this.clips).subscribe((result: Clip) => {
        let getLastId: number = result.clip_id;
        setTimeout(() => { this.tagToClipOnInput(getLastId) }, 100);
        if (this.webClipForm.controls['author_id'].value.length > 0) {
          for (let authorID of this.webClipForm.controls['author_id'].value) {
            let authorObject = { "clip_author_id": -1, "author": { "author_id": authorID }, "clip": { "clip_id": getLastId } };
            console.log(authorObject);
            // this.clipAuthorsService.addClipAuthor(authorObject).subscribe(result => this.getClipAuthors());
          }
        }

        this.resetForm();
      });

    } else {
      this.alert_warning = true;
    }
  }

  //Scraping buttons START - ostanuvaat vo clip
  scrapeGridMK() {
    if (this.webClipForm.controls['cluster_url'].value != "") {
      console.log("Scrape");
      //this.clipService.getGridNews(this.webClipForm.controls['cluster_url'].value).subscribe(result => this.getClip());
      this.clipService.gridArticles(this.webClipForm.controls['cluster_url'].value).subscribe(result => this.getClip());
    }
  }

  scrapeFaxAl() {
    if (this.webClipForm.controls['cluster_url'].value != "") {
      //console.log("Scrape" + this.webClipForm.controls['cluster_url'].value);
      this.clipService.getFaxAlNews(this.webClipForm.controls['cluster_url'].value).subscribe(result => this.getClip());
    }
  }

  scrapeVestiMK() {
    if (this.webClipForm.controls['cluster_url'].value != "") {
      console.log("Scrape" + this.webClipForm.controls['cluster_url'].value);
      this.clipService.getVestiNews(this.webClipForm.controls['cluster_url'].value).subscribe(result => this.getClip());
    }
  }


  scrapeTimeMK() {
    if (this.webClipForm.controls['cluster_url'].value != "") {
      console.log("Scrape " + this.webClipForm.controls['cluster_url'].value);
      this.clipService.getTimeNews(this.webClipForm.controls['cluster_url'].value).subscribe(result => this.getClip());
    }
  }
  //Scraping buttons END  --- ostantuvaat vo clip

  //ostanuva tuka
  addClipWithSelectedGroup(importantInformation: boolean) {
    if (this.webClipForm.valid) {
      this.webClipForm.controls['important_information'].setValue(importantInformation);
      this.clipService.addClip(this.webClipForm.value).subscribe(result => this.pagination(this.limit, this.offset));
      this.resetForm();
      this.openSnackBar("Успешно додаден клип!", "Затвори");
    }

    var listOfClips: Clip[] = [];
    this.clipService.getClip().subscribe(
      (response: Clip[]) => {
        if (response.length > 0) {

          listOfClips = response;
        }
      });
    console.log(this.clipList);
    console.log("===========");
    console.log(listOfClips)
  }


  //Ostanuva vo clip.ts
  editClip(clipID: number) {
    console.log("CLip ID: " + clipID);
    this.clips.medium.medium_id = this.webClipForm.controls['medium_id'].value;
    this.clips.created_at = this.webClipForm.controls['created_at'].value;
    this.clips.date_of_clip = this.webClipForm.controls['date_of_clip'].value;
    this.clips.clip_title = this.webClipForm.controls['clip_title'].value;
    this.clips.clip_title_english = this.webClipForm.controls['clip_title_english'].value;
    this.clips.brief_english = this.webClipForm.controls['brief_english'].value;
    this.clips.clip_text = this.webClipForm.controls['clip_text'].value;
    this.clips.brief = this.webClipForm.controls['brief'].value;
    this.clips.clip_url = this.webClipForm.controls['clip_url'].value;
    this.clips.clip_image_url = this.webClipForm.controls['clip_image_url'].value;
    this.clips.important_information = this.webClipForm.controls['important_information'].value;
    this.clips.created_at_time = this.webClipForm.controls['created_at_time'].value;
    this.clips.clip_group = -1;
    this.clips.main_clip = true;
    console.log(this.clips);
    this.clipService.updateClip(clipID, this.clips).subscribe(result => this.getClip());//(result => this.pagination(this.limit, this.offset));
    //this.getClip();
    if (this.webClipForm.controls['author_id'].value.length > 0) {
      for (let authorID of this.webClipForm.controls['author_id'].value) {
        let authorObject = {
          "clip_author_id": -1,
          "author": { "author_id": authorID },
          "clip": { "clip_id": clipID }
        };
        this.clipAuthorsService.addClipAuthor(authorObject).subscribe(result => this.getClipAuthors());
      }
    }
    this.selectedClips = [];
    this.resetForm();
    this.openSnackBar("Клипот е успешно изменет!", "Затвори");
  }

  //Ostanuva vo clip.ts
  loadClip(mediumName: string, createdAt: string, dateOfClip: string, clipTitle: string, clipTitleEnglish: string,
    clipText: string, clipBrief: string, clipBriefEnglish: string,
    clipUrl: string, clipImageUrl: string) {
    this.objPosition = 8;
    console.log("Load Clip " + mediumName + " " + clipTitle + " /" + this.objPosition);
    this.webClipForm.controls['medium_id'].setValue(mediumName);
    this.webClipForm.controls['created_at'].setValue(createdAt);
    this.webClipForm.controls['date_of_clip'].setValue(dateOfClip);
    this.webClipForm.controls['clip_title'].setValue(clipTitle);
    this.webClipForm.controls['clip_title_english'].setValue(clipTitleEnglish);
    this.webClipForm.controls['clip_text'].setValue(clipText);
    this.webClipForm.controls['brief'].setValue(clipBrief);
    this.webClipForm.controls['brief_english'].setValue(clipBriefEnglish);
    this.webClipForm.controls['clip_url'].setValue(clipUrl);
    this.webClipForm.controls['clip_image_url'].setValue(clipImageUrl);
  }

  //Ostanuva vo clip.ts
  deleteClip(clipID: number) {
    const confirmDialog = this.dialog.open(DialogComponent, {
      data: {
        title: 'Избриши клип',
        message: 'Дали сте сигурни дека сакате да го избришите клипот?',
        true: 'Избриши',
        false: 'Откажи',
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.clipService.deleteClip(clipID).subscribe(result => this.pagination(this.limit, this.offset));
        this.resetForm();
        this.selectedClips = [];
        this.openSnackBar("Клипот е успешно избришан!", "Затвори");
      }
    });
  }


  //Ostanuva vo clip.ts
  deleteMultipleClips() {
    const confirmDialog = this.dialog.open(DialogComponent, {
      data: {
        title: 'Избриши селектирани клипови',
        message: 'Дали сте сигурни дека сакате да ги избришите селектираните клипови?',
        true: 'Избриши',
        false: 'Откажи'
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        for (let clipID of this.selectedClips) {
          this.clipService.deleteClip(clipID).subscribe(result => this.pagination(this.limit, this.offset));
        }
        this.selectedClips = [];
        this.openSnackBar("Селектираните клипови се успешно избришани!", "Затвори");
      }
    });
  }

  resetForm() {
    this.webClipForm.reset();
  }

  resetPrintedForm() {
    this.printedClipForm.reset();
  }

  resetTvForm() {
    this.tvRadioClipForm.reset();
  }


  //Ostanuva vo clip.ts
  searchMedium() {
    if (this.mediumTitle = "") {
      this.ngOnInit();
    }
    this.mediumsList = this.mediumsList.filter(res => {
      return res.medium_name_cyrilic.toLocaleLowerCase().match(this.mediumTitle.toLocaleLowerCase());
    })
  }


  //Ostanuva vo clip.ts
  searchAuthor() {
    if (this.authorTitle = "") {
      this.ngOnInit();
    }
    this.authorList = this.authorList.filter(res => {
      return res.full_name_c.toLocaleLowerCase().match(this.authorTitle.toLocaleLowerCase());
    })
  }

  //ostanuva vo clip.ts
  generateBrief() {
    if (this.webClipForm.controls['clip_text'].value.length <= 250)
      this.webClipForm.controls['brief'].setValue(this.webClipForm.controls['clip_text'].value)
    if (this.webClipForm.controls['clip_text'].value.length > 250)
      this.webClipForm.controls['brief'].setValue(this.webClipForm.controls['clip_text'].value.slice(0, 250) + ' ...')
  }

  //ostanuva vo clip.ts
  loadKeywords() {
    this.gridkeywordList = []
    for (let keyword of this.gridkeywordList) {
      this.keywordList.push(keyword.keyword)
    }
  }

  //ostanuva vo clip.ts
  showKeywords() {
    this.loadKeywords();
    this.selectedKeyword = window.getSelection()?.toString();
    if (this.keywordList.includes(this.selectedKeyword)) { }
    else {
      this.gridkeywords.keyword = this.selectedKeyword;
      this.gridkeywordService.addGridkeywords(this.gridkeywords).subscribe(result => this.getGridkeywords(), result => this.loadKeywords());
    }
  }


  //ostanuva vo clip.ts do 891
  addKeywords() {
    var keywords: Gridkeywords[];
    keywords = this.keywordForm.controls['keyword'].value.split(', ');
  }

  removeKeyword(keywordID: number) {
    this.gridkeywordService.deleteGridkeyword(keywordID).subscribe(result => this.getGridkeywords());
  }

  removeTag(event: CdkDragDrop<string[]>) {
    this.done.splice(event.previousIndex, 1)
  }

  getSelectedKeyword(event: any, words: string) {
    this.selectedKeyword = window.getSelection()?.toString();
    if (!words.toLocaleLowerCase().includes(this.selectedKeyword))
      this.keywords += " *" + this.selectedKeyword + "* ";
  }

  searchKeyword(text: string, words: string) {
    if (text == '') {
      this.keywords = '';
    } else {
      for (var keyword of this.gridkeywordList) {
        if (!words.toLocaleLowerCase().includes(keyword.keyword.toLocaleLowerCase())) {
          if (text.toLocaleLowerCase().includes(keyword.keyword.toLocaleLowerCase())) {
            this.keywords += " *" + keyword.keyword + "* ";
          }
        }
      }
    }
  }


  //I ovie dolu? -- ostanuvaat tuka vo clip.ts


  logOut() {
    this.authService.logOut();
  }

  clipMedium() {
    this.clipList = [];
    for (let clip of this.clipList) {
      this.clipMediumID = clip.medium.medium_id;
      for (let medium of this.mediumsList) {
        if (medium.medium_id == this.clipMediumID) {
          this.clipMediumName = medium.medium_name_cyrilic;
        }
      }
    }
  }

  Search() {
    if (this.title == "") {
      this.ngOnInit();
    }
    this.clipList = this.clipList.filter(res => {
      return res.clip_title.toLocaleLowerCase().match(this.title.toLocaleLowerCase());
    })
  }

  selectChangeHandler(event: any) {
    this.selectedMedium = event.target.value;
  }


  onSubmit() {
    for (var medium of this.mediumsList) {
      if (this.selectedMedium == medium.medium_name_cyrilic) {
        this.mediumID = medium.medium_id;
        this.clips.medium.medium_id = this.mediumID;
        this.clipService.addClip(this.clips).subscribe(result => this.getClip());
      }
    }
  }

  toggleTag() {
    this.showMe = !this.showMe;
  }

  // Read data from database

  public getFunClipPrinted(): void {
    this.funClipPrintedService.fun_clips_printed().subscribe(
      (response: FunClipPrinted[]) => {
        if (response.length > 0) {
          this.funClipPrintedList = response.sort((a, b) => (a.clip_printed_id < b.clip_printed_id ? -1 : 1));
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getClip(): void {
    this.clipService.getClip().subscribe(
      (response: Clip[]) => {
        if (response.length > 0) {
          this.clipList = response.sort((a, b) => (a.clip_id < b.clip_id ? -1 : 1));
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getClipPrinted(): void {
    this.clipPrintedService.getClipPrinted().subscribe(
      (response: ClipPrinted[]) => {
        if (response.length > 0) {
          this.printedClipList = response.sort((a, b) => (a.clip_printed_id < b.clip_printed_id ? -1 : 1));
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getClipTv(): void {
    this.clipTvService.getClipTv().subscribe(
      (response: ClipTv[]) => {
        if (response.length > 0) {
          this.tvClipList = response.sort((a, b) => (a.clip_id < b.clip_id ? -1 : 1));
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public joinClips(): void {
    for (let clip of this.funClipList) {
      this.allClips.push(clip)
    }
    for (let clip of this.printedClipList) {
      this.allClips.push(clip)
    }
    for (let clip of this.tvClipList) {
      this.allClips.push(clip)
    }
  }

  public getTags(): void {
    this.funTagService.fun_tags().subscribe({
      next: (response: FunTags[]) => { this.tagsList = response; },
      error: (error: HttpErrorResponse) => { console.log(error.message); },// errorHandler 
      complete: () => { console.log("Component Clip completeHandler"); } // completeHandler
    });
  }

  public getGridkeywords(): void {
    this.gridkeywordService.getGridkeywords().subscribe({

      next: (response: Gridkeywords[]) => { this.gridkeywordList = response; },
      error: (error: HttpErrorResponse) => { console.log(error.message); },// errorHandler 
      complete: () => { console.log("Component Clip completeHandler"); } // completeHandler
    });
  }
  private getAuthors() {
    //component Authors
    this.componentAuthors.getAuthorsList();
    this.authorList = this.componentAuthors.authorsList;
  }

  private getMediums() {
    //component Mediums
    this.mediumComponent.getMediumsList();
    this.mediumsList = this.mediumComponent.mediumsList;
  }

  public getClipTags(): void {
    this.clipTagService.getClipTags().subscribe({
      next: (response: clipTags[]) => { this.clipTagsList = response; },
      error: (error: HttpErrorResponse) => { console.log(error.message); },// errorHandler 
      complete: () => { console.log("Component Clip completeHandler"); } // completeHandler
    });
  }

  public getMediumTypes(): void {
    this.mediumTypeService.getMediumType().subscribe({
      next: (response: MediumType[]) => { this.mediumTypeList = response; },
      error: (error: HttpErrorResponse) => { console.log(error.message); },// errorHandler 
      complete: () => { console.log("Component Clip completeHandler"); } // completeHandler
    });
  }

  public getClipAuthors(): void {
    this.clipAuthorsService.getClipAuthors().subscribe({
      next: (response: ClipAuthors[]) => { this.clipAuthorsList = response; },
      error: (error: HttpErrorResponse) => { console.log(error.message); },// errorHandler 
      complete: () => { console.log("Component Clip completeHandler"); } // completeHandler
    });
  }

  generatePDF(action = 'open', date: string, medium: string, title: string, brief: string, clip_text: string, link: string) {

    let docDefinition = {
      content: [
        {
          // Header content
        },
        {
          style: 'header',

          table: {
            heights: 40,
            border: [false, false, true, false],
            borderColor: ['#EDF2F7', '#EDF2F7', '#EDF2F7', '#EDF2F7'],
            layout: 'noBorders',


            body: [
              [{ text: 'Датум', style: 'header' }, { text: this.transformDate(date), alignment: 'left', bold: false, margin: [8, 14, 6, 0] }],
              [{ text: 'Медиум', style: 'header' }, { text: medium, alignment: 'left', bold: false, margin: [8, 14, 6, 0] }],
              [{ text: 'Наслов', style: 'header' }, { text: title, bold: true, italics: true, alignment: 'center', fontSize: 12, margin: [0, 6, 6, 0] }],
              [{ colSpan: 2, text: clip_text, bold: false, alignment: 'justify', margin: [6, 8, 6, 0] }],
              [{ text: 'Посети ја страната', style: 'header' }, { text: link, bold: false }]
            ]
          },

          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              return (rowIndex % 2 === 0) ? '#EDF2F7' : null;

            },

            hLineWidth: function (i, node) {
              if (i === 0 || i === node.table.body.length) {
                return 0;
              }
              return (i === node.table.headerRows) ? 2 : 1;
            },
            vLineWidth: function (i) {
              return 0;
            },
            hLineColor: function (i) {
              return i === 1 ? '#aaa' : '#aaa';
            },
            paddingLeft: function (i) {
              return i === 0 ? 0 : 8;
            },
            paddingRight: function (i, node) {
              return (i === node.table.widths.length - 1) ? 0 : 8;
            }


            // defaultBorder: false,
            // paddingLeft: function (i, node) { return 1; },
            // paddingRight: function (i, node) { return 1; },
            // paddingTop: function (i, node) { return 5; },
            // paddingBottom: function (i, node) { return 5; }
          }
        },
        {
          // Footer content
        }
        //{
        /*layout: 'lightHorizontalLines', // optional*/
        // table: {
        //   style: 'center',
        //   headerRows: 1,
        //   widths: [ '*', '0', 4, '0' ],

        // body: [
        //   [ 'Бриф'],
        //   [brief],
        // ]
        // }
        // }
      ],
      // defaultStyle: {
      //   font: 'Helvetica'
      // },
      styles: {
        header: {
          alignment: 'center',
          fontSize: 10,
          bold: true,
          margin: [0, 14, 5, 0],
          layout: 'noBorders'

        }
        // },
        // title: {
        //   alignment: 'center',
        //   fontSize: 14,
        //   bold:true
        // }
      } // Styles
    }

    if (action === 'download') {
      pdfMake.createPdf(docDefinition).download();
    } else if (action === 'print') {
      pdfMake.createPdf(docDefinition).print();
    } else {
      pdfMake.createPdf(docDefinition).open();
    }
  }

  draggable = {
    data: "myDragData",
    effectAllowed: "all",
    disable: false,
    handle: false
  };

  onDragEnd(event: DragEvent) { }

  onDraggableCopied(event: DragEvent, tagID: number) {
    var checkExistingTag = false;

    for (let clipTags of this.clipTagsList) {
      if (clipTags.tag.tag_id == tagID && clipTags.clip.clip_id == this.clipTagID) {
        checkExistingTag = true;
      }
    }
    if (!checkExistingTag) {
      // this.clipTags.tag.tag_id = tagID;
      if (this.selectedClips.length == 0) {
        //this.clipTags.clip.clip_id = this.clipTagID;
        let clipTagsObj: clipTags[] = [];
        clipTagsObj.push({ "clip_tag_id": -1, "clip": { "clip_id": this.clipTagID }, "tag": { "tag_id": tagID } });
        console.log(clipTagsObj);
        this.clipTagService.addClipTag(clipTagsObj[0]).subscribe(result => this.getClipTags());
      }
      if (this.selectedClips.length != 0) {
        for (let clipID of this.selectedClips) {
          //this.clipTags.clip.clip_id = clipID;
          let clipTagsObj: clipTags[] = [];
          clipTagsObj.push({ "clip_tag_id": -1, clip: { "clip_id": clipID }, tag: { "tag_id": tagID } });
          this.clipTagService.addClipTag(clipTagsObj[0]).subscribe(result => this.getClipTags())
        }
        this.selectedClips = [];
      }
    }
  }

  onDraggableMoved(event: DragEvent) { }

  onDragCanceled(event: DragEvent) { }

  onDrop(event: DndDropEvent, clipID: number) {
    this.clipTagID = clipID;
  }

  onDropForm(event: DndDropEvent) {
    console.log(event.data)
  }

  onDraggableCopiedForm(event: DragEvent, tagID: number) {
    if (!this.tagsToAddToForm.includes(tagID))
      this.tagsToAddToForm.push(tagID);
    console.log("Таговите се: " + this.tagsToAddToForm)
  }

  removeTagFromForm(tagID: number) {
    this.tagsToAddToForm = this.tagsToAddToForm.filter(item => item !== tagID);
    console.log("Таговите се: " + this.tagsToAddToForm)
  }

  tagToClipOnInput(getLastId: number) {
    var clipID = getLastId;
    //this.clipTags.clip.clip_id = clipID;
    for (let tagID of this.tagsToAddToForm) {
      //this.clipTags.tag.tag_id = tagID;
      console.log("add tagg " + tagID);
      let clipTagsObj: clipTags[] = [];
      clipTagsObj.push({ "clip_tag_id": -1, clip: { "clip_id": clipID }, tag: { "tag_id": tagID } });
      this.clipTagService.addClipTag(clipTagsObj[0]).subscribe(result => this.getClipTags());
    }
    this.tagsToAddToForm = [];
  }

  //Infinite scroll - i ova ke e tuka
  onScroll() {
    console.log("Page scroll:" + this.offset);
    this.offset += this.limit;
    console.log(this.offset+" / "+this.limit);
    this.pagination(this.limit, this.offset);
  }
  pagination(limit, offset) {
    console.log("Pagination " + offset);
   // this.clipService.getClipPagination(limit, offset).subscribe((response: Clip[]) => {this.clipList=[];this.clipList.push(...response); });
  this.clipService.getClipPagination(limit, offset).subscribe((response: Clip[]) => {this.clipList.push(...response); });
  
  }
  filterData() { }

  takeSreenshot() {
    for (let i = 0; i < this.selectedClips.length; i++) {

      let getClip: Clip[] = this.clipList.filter(Clip => Clip.clip_id == this.selectedClips[i]);
      if (getClip.length > 0) {
        //var splitted = str.split(" ", 3); 
        this.clipService.getscreenShot(getClip[0].clip_url,getClip[0].clip_image_url).subscribe(result => this.getClip());
      }
    }
  }


}