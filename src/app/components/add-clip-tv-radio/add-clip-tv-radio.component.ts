import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, VERSION } from '@angular/core';
import { Authors } from 'src/app/services/authors-service/authors';
import { AuthorsService } from 'src/app/services/authors-service/authors.service';
import { Clip } from 'src/app/services/clip-service/clip';
import { ClipService } from 'src/app/services/clip-service/clip.service';
import { MediumType } from 'src/app/services/medium-type-services/mediumType';
import { Mediums } from 'src/app/services/mediums-services/mediums';
import { MediumsService} from 'src/app/services/mediums-services/mediums.service';
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
import { ClipAuthors } from 'src/app/services/clip-author-service/clip-authors';
import { ClipAuthorService } from 'src/app/services/clip-author-service/clip-author.service';
import { DndDropEvent } from 'ngx-drag-drop';
import { ClipTvService } from 'src/app/services/clip-service/clip-tv.service';
import { ClipTv } from 'src/app/services/clip-service/clip-tv';
import { FunTags } from 'src/app/services/functions/fun-tags';
import { FunTagService } from 'src/app/services/functions/fun-tag.service';

@Component({
  selector: 'app-add-clip-tv-radio',
  templateUrl: './add-clip-tv-radio.component.html',
  styleUrls: ['./add-clip-tv-radio.component.css']
})
export class AddClipTvRadioComponent implements OnInit {
 
  public tvClipList: ClipTv[];
  public allClips: any[];
  public tagsList: FunTags[];
  public mediumsList: Mediums[];
  public mediumTypeList: MediumType[];
  public authorList: Authors[];
  public clipTagsList: clipTags[];
  public clipAuthorsList: ClipAuthors[] = [];
  public lastEnteredClip: Clip[] = [];

  public searchString: string;
  public searchStringTags: string;

  brojac: number = 0;
  showMe: boolean;

  formSwitch: string = 'tvRadioForm';
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
  clipTags: clipTags;


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

    constructor(private mediumService: MediumsService, 
                private funTagService: FunTagService, 
                private clipService: ClipService,  
                public http: HttpClient,
                private authorService: AuthorsService, 
                public dialog: MatDialog, private _snackBar: MatSnackBar, private formBuilder: FormBuilder,
                private clipTagService: ClipTagsService, private datePipe: DatePipe, private mediumTypeService: MediumTypeService,
                private clipAuthorsService: ClipAuthorService, private clipTvService: ClipTvService,
            ) {
                  this.clips = new Clip();
                  this.clipAuthors = new ClipAuthors();
                  this.mediums = new Mediums();
                  this.clipTags = new clipTags();
                
    }

  ngOnInit(): void {
 
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
    
    this.getClipTv();
    this.getClipAuthors();
    this.getClipTags();
    this.getMediumTypes();
    this.getTags();
    this.getMediums();
    this.getAuthors();
  }

  translateOnOff() {
    if (this.translateMode == true) this.translateMode = false; else this.translateMode = true;
  }




  checkTime(value: any) {
    console.log(value)
  }

  reverseDate(date: string) {
    const reverse = new Date(date.split("-").reverse().join("-"));
    return reverse.getTime();
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
    this.tvRadioClipForm.reset();
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



  transformDate(date) {
    var dateToDB = this.datePipe.transform(date, 'dd-MM-yyyy');
    return dateToDB;
  }



  addClipTv(importantInformation: boolean) {
    if (this.tvRadioClipForm.valid) {
      this.tvRadioClipForm.controls['important_information'].setValue(importantInformation);
     // this.clipTvService.addClipTv(this.tvRadioClipForm.value).subscribe(result => this.getFunClip());
    }
    this.resetTvForm();
  }
  
   resetTvForm() {
    this.tvRadioClipForm.reset();
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


  selectChangeHandler(event: any) {
    this.selectedMedium = event.target.value;
    console.log(this.selectedMedium)
  }


  // onSubmit() {
  //   for (var medium of this.mediumsList) {
  //     if (this.selectedMedium == medium.medium_name_cyrilic) {
  //       this.mediumID = medium.medium_id;
  //       this.clips.medium_id = this.mediumID;
  //       this.clipService.addClip(this.clips).subscribe(result => this.getClip());
  //     }
  //   }
  // }

  toggleTag() {
    this.showMe = !this.showMe;
  }



 
  public getClipTv(): void {
    this.clipTvService.getClipTv().subscribe(
      (response: ClipTv[]) => {
        if(response.length>0){
        this.tvClipList = response.sort((a,b) => (a.clip_id < b.clip_id ? -1: 1));
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public joinClips(): void {
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
      next:     (response: clipTags[])     => {this.clipTagsList = response;},
      error:    (error:HttpErrorResponse) => {console.log(error.message);},// errorHandler 
      complete: ()                        => {console.log("completeHandler");} // completeHandler
    });
  }

  public getMediumTypes(): void {
    this.mediumTypeService.getMediumType().subscribe({
      next:     (response: MediumType[])     => {this.mediumTypeList = response;},
      error:    (error:HttpErrorResponse) => {console.log(error.message);},// errorHandler 
      complete: ()                        => {console.log("completeHandler");} // completeHandler
    });
  }

  public getClipAuthors(): void {
    this.clipAuthorsService.getClipAuthors().subscribe({
      next:     (response: ClipAuthors[])     => {this.clipAuthorsList = response;},
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


}