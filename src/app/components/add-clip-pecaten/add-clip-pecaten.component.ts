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
import { TagsService } from 'src/app/services/tags-service/tags.service';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
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




@Component({
  selector: 'app-add-clip-container',
  templateUrl: './add-clip-pecaten.component.html',
  styleUrls: ['./add-clip-pecaten.component.css']
})

export class AddClipPecatenComponent implements OnInit {
      
  public clipList: Clip[] = [];
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

  public searchString: string;
  public searchStringTags: string;

  brojac: number = 0;
  showMe: boolean;

  formSwitch: string = 'printedForm';
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

      //Infinite scroll
      listArray : string[] = [];
      sum = 5;
      direction = "";

    constructor(private gridkeywordService: GridkeywordsService, private mediumService: MediumsService, private funTagService: FunTagService, private clipService: ClipService, public authService: AuthenticationService, public http: HttpClient,
                private authorService: AuthorsService, public dialog: MatDialog, private _snackBar: MatSnackBar, private formBuilder: FormBuilder,
                private clipTagService: ClipTagsService, private datePipe: DatePipe, private mediumTypeService: MediumTypeService,
                private clipAuthorsService: ClipAuthorService, private clipTvService: ClipTvService,
                private funClipService: FunClipService, private clipPrintedService: ClipPrintedService,
                private funClipPrintedService: FunClipPrintedService) {
                  this.clips = new Clip();
                  this.clipAuthors = new ClipAuthors();
                  this.mediums = new Mediums();
                  this.clipTags = new clipTags();
                  this.gridkeywords = new Gridkeywords();
                  let intervalId = setInterval(() => {

                    var dateEnd = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), 2, this.date.getMinutes(), this.date.getSeconds(), this.date.getMilliseconds());
                 //   console.log(date , dateEnd)
                    if ( this.date.getTime() == dateEnd.getTime()) {
                      this.deleteClipsWithoutTag();
                    }

                    if(this.counter === 0) clearInterval(intervalId)
                }, 1000)
  }

  ngOnInit(): void {
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
    this.keywordForm = this.formBuilder.group({
      keyword: ['']
    });
    this.getFunClip();
    this.getFunClipPrinted();
    this.getClipPrinted();
    this.getClipAuthors();
    this.getClipTags();
    this.getMediumTypes();
    this.getClip();
    this.getTags();
    this.getMediums();
    this.getGridkeywords();
    this.getAuthors();
    this.clipMedium();
    this.loadKeywords();
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
    console.log(this.openedTags)
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
      this.clipTags.clip.clip_id = clipID;
      this.clipTags.tag.tag_id = tagID;
      this.clipTagService.addClipTag(this.clipTags).subscribe(result => this.getClipTags());
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
        //this.clips.created_at_time = clip.created_at_time;
        this.clips.date_of_clip = clip.date_of_clip;
        this.clips.important_information = clip.important_information;
        this.clips.clip_group = this.nextGroup + 1;
        this.clips.main_clip = clip.main_clip;
        this.clips.medium.medium_id = clip.medium.medium_id;
        this.clipService.addClip(this.clips).subscribe(result => this.getFunClip());
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
      this.clipService.deleteClip(clip.clip_id).subscribe(result => this.getFunClip());
    }
  }
  }

  openClipForm() {
    if (this.showClipForm == false) { this.showClipForm = true } else { this.showClipForm = false}
  }

  setMainClip(clipID: number) {
    if (this.mainClip == clipID)
    this.mainClip = -1;
    else
    this.mainClip = clipID;

    console.log(this.mainClip)
  }

  switchForms(value) {

    this.printedClipForm.reset();
    this.printedClipForm.controls['medium_id'].setValue(value);
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
    switch(mediumTypeName) {
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
    if(this.filterByMedium.includes(mediumName)) {
      for (let i = 0; i < this.filterByMedium.length; i++) {
      if (this.filterByMedium[i] == mediumName) {
      this.filterByMedium.splice(i, 1);
       }
     }
    } else {
      this.filterByMedium.push(mediumName);
    }
    console.log(this.filterByMedium)
  }

  filterClipsByMedium() {
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
    for(let clip of this.clipList) {
      if (clip.clip_id == clipID && clip.clip_group != -1) {
        clipHasGroup = true;
        clipGroup = clip.clip_group;
      }
    }
    if(clipHasGroup) {
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

getNextClipGroup() {
 for (let clip of this.clipList) {
   if (clip.clip_group > this.nextGroup) {
     this.nextGroup = clip.clip_group;
   }
 }
}

makeClipGroup() {
this.getNextClipGroup();
if(this.selectedClips.length < 2) {
  this.openSnackBar('Селектиран е само еден клип!','Затвори');
} else if (this.mainClip == -1) {
  this.openSnackBar('Немате селектирано носечки клип на група!','Затвори');
}
else {
    for (let clip of this.clipList) {
      if (clip.clip_id == this.mainClip) {
        this.clips.main_clip = true;
        this.clips.clip_group = this.nextGroup + 1;
        this.clipService.updateClip(clip.clip_id, this.clips).subscribe(result => this.getFunClip())
      } else
      if (this.selectedClips.includes(clip.clip_id) && clip.clip_id != this.selectedMainClip) {
        this.clips.main_clip = false;
        this.clips.clip_group = this.nextGroup + 1;
        this.clipService.updateClip(clip.clip_id, this.clips).subscribe(result => this.getFunClip())
      }
    }
  }
  this.selectedClips = [];
  this.mainClip = -1;
}

makeMainClip(clipFromGroupID: number, mainClipID: number) {
    this.selectedClips = [];
    this.clips.main_clip = true;
    this.clipService.updateClipGroup(clipFromGroupID, this.clips).subscribe(result => this.getFunClip());
    this.clips.main_clip = false;
    this.clipService.updateClipGroup(mainClipID, this.clips).subscribe(result => this.getFunClip());
    this.openSnackBar("Клипот е успешно направен носечки клип на групата!", "Затвори");
  }


removeClipFromGroup(clipID: number) {
    this.clipService.removeClipFromGroup(clipID, this.clips).subscribe(result => this.getFunClip());
    this.selectedClips = [];
    this.openSnackBar("Клипот е успешно одврзан!", "Затвори");
  }

  removeTagFromClip(tagID: number) {
      this.clipTagService.deleteClipTag(tagID).subscribe(result => this.getClipTags());
  }

  transformDate(date) {
    var dateToDB = this.datePipe.transform(date, 'dd-MM-yyyy');
    return dateToDB;
  }

  addClipPrinted(importantInformation: boolean) {
    if(this.printedClipForm.valid) {
      this.printedClipForm.controls['important_information'].setValue(importantInformation);
      this.clipPrintedService.addClipPrinted(this.printedClipForm.value).subscribe(result => this.getClipPrinted());
    }
    this.resetForm();
  }


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
        this.clipService.deleteClip(clipID).subscribe(result => this.getFunClip());
        this.resetForm();
        this.selectedClips = [];
        this.openSnackBar("Клипот е успешно избришан!", "Затвори");
      }
    });
   }



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
          this.clipService.deleteClip(clipID).subscribe(result => this.getFunClip());
        }
        this.selectedClips = [];
        this.openSnackBar("Селектираните клипови се успешно избришани!", "Затвори");
      }
    });
   }


   resetForm() {
    this.printedClipForm.reset();
   }


  searchMedium() {
    if (this.mediumTitle = "") {
      this.ngOnInit();
    }
    this.mediumsList = this.mediumsList.filter(res => {
      return res.medium_name_cyrilic.toLocaleLowerCase().match(this.mediumTitle.toLocaleLowerCase());
    })
  }

  searchAuthor() {
    if (this.authorTitle = "") {
      this.ngOnInit();
    }
    this.authorList = this.authorList.filter(res => {
      return res.full_name_c.toLocaleLowerCase().match(this.authorTitle.toLocaleLowerCase());
    })
  }

  generateBrief() {
    if (this.webClipForm.controls['clip_text'].value.length <= 250)
    this.webClipForm.controls['brief'].setValue(this.webClipForm.controls['clip_text'].value)
    if (this.webClipForm.controls['clip_text'].value.length > 250)
    this.webClipForm.controls['brief'].setValue(this.webClipForm.controls['clip_text'].value.slice(0,250) + ' ...')
  }

  loadKeywords() {
    this.keywordList = []
    for (let keyword of this.gridkeywordList) {
      this.keywordList.push(keyword.keyword)
    }
  }

  showKeywords() {
    this.loadKeywords();
    this.selectedKeyword = window.getSelection()?.toString();
    if (this.keywordList.includes(this.selectedKeyword)) {}
    else {
    this.gridkeywords.keyword = this.selectedKeyword;
    this.gridkeywordService.addGridkeywords(this.gridkeywords).subscribe(result => this.getGridkeywords(), result => this.loadKeywords());
    }
  }

  addKeywords() {
    var keywords: Gridkeywords[];
    keywords = this.keywordForm.controls['keyword'].value.split(', ');
      console.log(keywords)
  }

  removeKeyword(keywordID: number){
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



  logOut() {
    this.authService.logOut();
  }

  clipMedium() {
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
    console.log(this.selectedMedium)
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

  public getFunClip(): void {
    this.funClipService.fun_clips().subscribe(
      (response: FunClip[]) => {
        if(response.length>0){
        this.funClipList = response.sort((a,b) => (a.clip_id < b.clip_id ? -1: 1));
        console.log("in add-clip-pecaten metod getFunClip()");
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getFunClipPrinted(): void {
    this.funClipPrintedService.fun_clips_printed().subscribe(
      (response: FunClipPrinted[]) => {
        if(response.length>0){
        this.funClipPrintedList = response.sort((a,b) => (a.clip_printed_id < b.clip_printed_id ? -1: 1));
        console.log("in add-clip-pecaten metod getFunClipPrinted()");
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
        if(response.length>0){
        this.clipList = response.sort((a,b) => (a.clip_id < b.clip_id ? -1: 1));
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
        if(response.length>0){
        this.printedClipList = response.sort((a,b) => (a.clip_printed_id < b.clip_printed_id ? -1: 1));
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
    console.log(this.allClips);
  }

  public getTags(): void {
    this.funTagService.fun_tags().subscribe({
      next:     (response: FunTags[])     => {this.tagsList = response;},
      error:    (error:HttpErrorResponse) => {console.log(error.message);},// errorHandler 
      complete: ()                        => {console.log("completeHandler");} // completeHandler
    });
  }

  public getGridkeywords(): void {
    this.gridkeywordService.getGridkeywords().subscribe({
      next:     (response: Gridkeywords[])  => {this.gridkeywordList = response;},
      error:    (error:HttpErrorResponse)   => {console.log(error.message);},// errorHandler 
      complete: ()                          => {console.log("completeHandler");} // completeHandler
    });
  }

  public getMediums(): void {
    this.mediumService.getMediums().subscribe({
      next:     (response: Mediums[])     => {this.mediumsList = response;},
      error:    (error:HttpErrorResponse) => {console.log(error.message);},// errorHandler 
      complete: ()                        => {console.log("completeHandler");} // completeHandler
    });
  }

  public getAuthors(): void {
    this.authorService.getAuthors().subscribe({
      next:     (response: Authors[])     => {this.authorList = response;},
      error:    (error:HttpErrorResponse) => {console.log(error.message);},// errorHandler 
      complete: ()                        => {console.log("completeHandler");} // completeHandler
    });
  }

  public getClipTags(): void {
    this.clipTagService.getClipTags().subscribe({
      next:     (response: clipTags[])    => {this.clipTagsList = response;},
      error:    (error:HttpErrorResponse) => {console.log(error.message);},// errorHandler 
      complete: ()                        => {console.log("completeHandler");} // completeHandler
    });
  }

  public getMediumTypes(): void {
    this.mediumTypeService.getMediumType().subscribe({
      next:     (response: MediumType[])    => {this.mediumTypeList = response;},
      error:    (error:HttpErrorResponse) => {console.log(error.message);},// errorHandler 
      complete: ()                        => {console.log("completeHandler");} // completeHandler
    });
  }

  public getClipAuthors(): void {
    this.clipAuthorsService.getClipAuthors().subscribe({
      next:     (response: ClipAuthors[]) => {this.clipAuthorsList = response;},
      error:    (error:HttpErrorResponse) => {console.log(error.message);},// errorHandler 
      complete: ()                        => {console.log("completeHandler");} // completeHandler
    });
  }

  draggable = {
    data: "myDragData",
    effectAllowed: "all",
    disable: false,
    handle: false
  };

  onDragEnd(event:DragEvent) { }

  onDraggableCopied(event:DragEvent, tagID: number) {
      var checkExistingTag = false;
      for (let clipTags of this.clipTagsList) {
        if (clipTags.tag.tag_id == tagID && clipTags.clip.clip_id == this.clipTagID) {
          checkExistingTag = true;
        }
      }
      if (!checkExistingTag) {
        this.clipTags.tag.tag_id = tagID;
        if (this.selectedClips.length == 0) {
          this.clipTags.clip.clip_id = this.clipTagID;
          this.clipTagService.addClipTag(this.clipTags).subscribe(result => this.getClipTags());
        }
         if (this.selectedClips.length != 0) {
            for (let clipID of this.selectedClips) {
            this.clipTags.clip.clip_id = clipID;
            this.clipTagService.addClipTag(this.clipTags).subscribe(result => this.getClipTags())
          }
          this.selectedClips = [];
        }
      }
  }

  onDraggableMoved(event:DragEvent) {}

  onDragCanceled(event:DragEvent) {}

  onDrop(event:DndDropEvent,  clipID: number) {
    this.clipTagID = clipID;
  }

  onDropForm(event:DndDropEvent) {
    console.log(event.data)
  }

  onDraggableCopiedForm(event:DragEvent, tagID: number) {
    if (!this.tagsToAddToForm.includes(tagID))
    this.tagsToAddToForm.push(tagID);
    console.log("Таговите се: " + this.tagsToAddToForm)
  }

  removeTagFromForm(tagID: number) {
    this.tagsToAddToForm = this.tagsToAddToForm.filter(item => item !== tagID);
    console.log("Таговите се: " + this.tagsToAddToForm)
  }

  tagToClipOnInput() {
    var clipID = this.funClipList[this.funClipList.length - 1].clip_id;
    this.clipTags.clip.clip_id = clipID;
    for (let tagID of this.tagsToAddToForm) {
      this.clipTags.tag.tag_id = tagID;
      this.clipTagService.addClipTag(this.clipTags).subscribe(result => this.getClipTags());
    }
    this.tagsToAddToForm = [];
  }

}