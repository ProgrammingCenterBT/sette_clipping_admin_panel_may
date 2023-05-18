import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, Injectable, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/administrator-login-services/authentication.service';
import { Mediums } from 'src/app/services/mediums-services/mediums';
import { MediumTypeService } from 'src/app/services/medium-type-services/medium-type.service';
import { MediumType } from 'src/app/services/medium-type-services/mediumType';
import { MediumsService } from 'src/app/services/mediums-services/mediums.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InfiniteScrollingService } from 'src/app/services/infinite-scrolling-service/infinite-scrolling.service';
import { FunMedium } from 'src/app/services/functions/fun-medium';
import { FunMediumService } from 'src/app/services/functions/fun-medium.service';
import { Clip } from 'src/app/services/clip-service/clip';
import { ClipService } from 'src/app/services/clip-service/clip.service';
@Component({
  selector: 'app-mediums',
  templateUrl: './mediums.component.html',
  styleUrls: ['./mediums.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class MediumsComponent implements OnInit {

  public mediumsList: Mediums[]=[];
  public mediumTypeList: MediumType[];
  public funMediumList: FunMedium[] = [];
  public clipList: Clip[];
  selectedMediumType: string;
  public searchString: string = '';
  private numberOfMediums: number = 0;
  mediumTypeID: number;
  mediumType_ID: number;
  mediumType: MediumType;
  mediumTypeMediumName: string;
  mediumTypeMediumID: number;
  position: number = -1;
  mediums: Mediums;
  mediumName: string;
  x = 31;
  editMode = false;
  mediumForm: FormGroup;
  mediumTypeForm: FormGroup;
  deleteMediumTypeForm: FormGroup;
  mediumID: number;
  selectedMediumTypeID: string;
  selected = '';
  clips: Clip;
  alert_warning: boolean = false;
  showMediumsForm = false;
  selectedDropdown: number = 1;
  selectedDropdownDelete: number = 1;

  public endLimit: number = 10;
  public mediumData: any = [];

  //Infinite scroll
  private offset = 0;
  private limit=100;

  constructor(private mediumTypeService: MediumTypeService, private mediumService: MediumsService,
    private scrollService: InfiniteScrollingService, public authService: AuthenticationService, public http: HttpClient,
    private funMediumService: FunMediumService, private formBuilder: FormBuilder, public dialog: MatDialog,
    private _snackBar: MatSnackBar, private clipService: ClipService) {
    this.mediums = new Mediums();
    this.mediumType = new MediumType();
    this.clips = new Clip();
  }

  ngOnInit(): void {
    this.mediumForm = this.formBuilder.group({
      medium_name_cyrilic: ['', Validators.required],
      medium_name: ['', Validators.required],
      medium_type_id: ['']
    });
    this.mediumTypeForm = this.formBuilder.group({ medium_type_name: ['', Validators.required] });
    this.deleteMediumTypeForm = this.formBuilder.group({ medium_type_id: ['', Validators.required] });
    this.getClip();
    this.getMediums();
    this.getMediumType();
    this.getFunMedium();
   
    this.pagination(this.limit,this.offset);


    this.getMediumData(this.endLimit); //for the first time

    this.scrollService.getObservable().subscribe(status => {
      if (status) {
        this.endLimit = this.endLimit + 10;
        this.getMediumData(this.endLimit);
      }
    })
  }

  getMediumData(endLimit: number) {
    this.mediumService.getMediumData(endLimit).subscribe(response => {
      this.mediumData = this.mediumData.concat(response);

      let clear = setInterval(() => {
        let target = document.querySelector(`#target${endLimit}`);
        if (target) {
          clearInterval(clear);
          this.scrollService.setObserver().observe(target);
        }
      }, 2000)
    },
      err => {
        console.log(err);
      })
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    //In chrome and some browser scroll is given to body tag
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
    if (pos == max) {
      this.x += 2;
      console.log("end")
    }
  } //Dont forget me!!!!

  openSnackBar(message: string, action: string,) {
    this._snackBar.open(message, action, {
      duration: 3000,
      panelClass: "sette-dialog"
    });
  }

  ChangeHandler(event: any) {
    this.selectedMediumType = event.target.value;
    console.log(this.selectedMediumType);
  }

  openMediumsForm() {
    if (this.showMediumsForm == false) {
      this.showMediumsForm = true;
    } else {
      this.showMediumsForm = false;
    }
  }
  keepOpen() {
    this.showMediumsForm = true;
  }

  resetMediumForm() {
    this.mediumForm.reset();
  }


  addMediums() {
    //filters
    this.alert_warning = false;
    this.numberOfMediums = this.mediumsList.filter(Mediums => (Mediums.medium_name_cyrilic === this.mediumForm.controls['medium_name_cyrilic'].value ||
      Mediums.medium_name === this.mediumForm.controls['medium_name'].value)).length;
    // if (this.mediumForm.valid && this.numberOfMediums == 0) {
    //   this.mediumService.addMediums(this.mediumForm.value).subscribe(result => this.getFunMedium());
    //   this.resetForm();
    // } else {
    //   this.alert_warning = true;  
    // }
    //novo:
    if (this.numberOfMediums == 0) {
      let mediumType = {
        medium_type_id: this.mediumForm.controls['medium_type_id'].value,
        medium_type_name: ""
      };

      this.mediums.medium_name_cyrilic = this.mediumForm.controls['medium_name_cyrilic'].value;
      this.mediums.medium_name = this.mediumForm.controls['medium_name'].value;
      this.mediums.mediumType = mediumType;
      delete this.mediums["medium_type_id"];
      this.mediumService.addMediums(this.mediums).subscribe(result => this.getMediums());
      this.resetMediumForm();
      this.openSnackBar("Успешно додаден медиум!", "Затвори");
    } else {
      this.alert_warning = true;
    }
  }

  editMedium(mediumID: number) {
    this.mediums.medium_name_cyrilic = this.mediumForm.controls['medium_name_cyrilic'].value;
    this.mediums.medium_name = this.mediumForm.controls['medium_name'].value;
    //this.mediums.mediumType.medium_type_id = this.mediumForm.controls['medium_type_id'].value;
    delete this.mediums["medium_type_id"];
    let mediumType = {
      medium_type_id: this.mediumForm.controls['medium_type_id'].value,
      medium_type_name: ""
    };
    this.mediums.mediumType = mediumType;
    //console.log(this.mediums);
    this.mediumService.updateMediums(this.mediums, mediumID).subscribe(result => this.getMediums());
    this.resetForm();
    this.editMode = false;
  }

  // editMedium(mediumID: number,index:number) {
  //   //https://stackblitz.com/edit/angular-mat-select-no-label?file=src%2Fapp%2Fapp.component.ts
  //   let tags_category = {
  //     tags_category_id: this.tagForm.controls['tags_category_id'].value,
  //     tags_category_name: ""
  //   };
  //   this.m.tag_id            = mediumID;
  //   this.tags.tag_name_c        = this.tagForm.controls['tag_name_c'].value;
  //   this.tags.tag_name_l        = this.tagForm.controls['tag_name_l'].value;
  //   this.tags.tag_color         = this.tagForm.controls['tag_color'].value;
  //   this.tags.parent_tag        = this.tagForm.controls['parent_tag'].value;
  //   this.tags.parent_tag_id     = this.medList[index].parent_tag_id;
  //   this.tags.tags_category     = tags_category;
  //   delete this.tags["tags_category_id"];
  //   this.tagService.updateTags(this.tags, tagID).subscribe(result => this.getTags());
  //   this.resetTagForm();
  //   this.openSnackBar('Тагот е успешно изменет!', 'Затвори');
  // }


  loadMedium(fullNameLatin: string, fullNameCyrilic: string, mediumTypeID: string, mediumTypDropdown: number) {
   // console.log("Load Ljubisa dropdown " + mediumTypDropdown + " / " + mediumTypeID);
    this.mediumForm.controls['medium_name_cyrilic'].setValue(fullNameCyrilic);
    this.mediumForm.controls['medium_name'].setValue(fullNameLatin);
    this.mediumForm.controls['medium_type_id'].setValue(mediumTypDropdown);
    this.selectedDropdown = mediumTypDropdown;
  }

  onChangeDropdown(event) {
    this.selectedDropdown = event;
  }

  onChangeDropdownDelete(event) {
    this.selectedDropdownDelete = event;
  }

  deleteMedium(mediumID: number) {
    for (let clip of this.clipList) {
      if (clip.medium.medium_id == mediumID) {
        this.clips.medium.medium_id = -1;
        this.clipService.updateClip(clip.clip_id, this.clips).subscribe(result => this.getClip());
      }
    }
    //this.mediumService.deleteMediums(mediumID).subscribe(result => this.getFunMedium());
    //this.resetForm();

    this.editMode = false;
    const confirmDialog = this.dialog.open(DialogComponent, {
      data: {
        title: 'Избриши медиум',
        message: 'Дали сте сигурни дека сакате да го избришите медиумот: ' + this.mediumName+ '?',
        true: 'Избриши',
        false: 'Откажи'
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.mediumService.deleteMediums(mediumID).subscribe(result => this.getMediums());
        this.resetForm();
        this.openSnackBar("Медиумот е успешно избришан!", "Затвори");
        this.editMode = false;
      }
    });
  }

  resetForm() {
    this.mediumForm.reset();
  }

  resetMediumTypeForm() {
    this.mediumTypeForm.reset();
  }

  addMediumType() {
    this.alert_warning = false;
    this.numberOfMediums = this.mediumTypeList.filter(mediumType => (mediumType.medium_type_name === this.mediumTypeForm.controls["medium_type_name"].value)).length;
    if (this.mediumTypeForm.valid && this.numberOfMediums == 0) {
      this.mediumTypeService.addMediumType(this.mediumTypeForm.value).subscribe(result => this.getMediumType());
      this.resetMediumTypeForm();
      this.openSnackBar("Успешно додаден тип на медиум!", "Затвори");
    } else {
      this.alert_warning = true;
    }
  }

  // deleteMediumTypePassword() {
  //   this.selectedMediumTypeID = this.deleteMediumTypeForm.controls['medium_type_id'].value;
  //   this.selectedMediumType   = "";//treba da se zemi
  //   console.log("delete: "+this.selectedMediumTypeID);
  //   for (let mediumType of this.mediumTypeList) {
  //     if (this.selectedMediumTypeID == mediumType.medium_type_id.toString()) {
  //       this.selectedMediumType = mediumType.medium_type_name;
  //     }
  //   }
  //   const confirmDialog = this.dialog.open(DialogMediumTypeComponent, {
  //     data: {
  //       title: 'Избриши Тип на медиум',
  //       message: 'Внесете лозинка за бришење на тип на медиум: ' + this.selectedMediumType
  //     }
  //   });
  //   confirmDialog.afterClosed().subscribe(result => {
  //     if (result === '7110eda4d09e062aa5e4a390b0a572ac0d2c0220') {

  //       this.mediumTypeService.deleteMediumType(parseInt(this.selectedMediumTypeID)).subscribe(result => this.getMediumType());
  //       this.resetForm();
  //       this.openSnackBar("Типот на медиум е успешно избришан!", "Затвори");
  //       this.editMode = false;

  //     } else if (result !== '7110eda4d09e062aa5e4a390b0a572ac0d2c0220' && result) {
  //       this.resetForm();
  //       this.openSnackBar("Погрешна лозинка!", "Затвори");
  //       this.editMode = false;
  //     }

  //   });
  // }

  deleteMediumType() {
    this.selectedMediumTypeID = this.deleteMediumTypeForm.controls['medium_type_id'].value;
    for (let mediumType of this.mediumTypeList) {
      if (this.selectedMediumTypeID == mediumType.medium_type_id.toString()) {
        this.selectedMediumType = mediumType.medium_type_name;
      }
    }
    const confirmDialog = this.dialog.open(DialogComponent, {
      data: {
        title: 'Избриши тип на медиум',
        message: 'Дали сте сигурни дека сакате да го избришите типот на медиум: ' + this.selectedMediumType + '?',
        true: 'Избриши',
        false: 'Откажи'
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.mediumTypeService.deleteMediumType(parseInt(this.selectedMediumTypeID)).subscribe(result => this.getMediumType());
        this.resetMediumTypeForm();
        this.openSnackBar("Типот на медиум е успешно избришан!", "Затвори");
        this.editMode = false;
      }
    });
  }


  public getMediums(): void {
    this.mediumService.getMediums().subscribe(
      {
        next: (response: Mediums[]) => { this.mediumsList = response; this.numberOfMediums=response.length; },
        error: (error: HttpErrorResponse) => { console.log(error.message); },// errorHandler 
        complete: () => { console.log("completeHandler"); } // completeHandler
      }
    );
  }
  getMediumsList(){
    this.mediumService.getMediums().subscribe((response: Mediums[]) => {this.mediumsList=[];this.mediumsList.push(...response);});
  }

  public getMediumType(): void {
    this.mediumTypeService.getMediumType().subscribe({
      next: (response: MediumType[]) => { this.mediumTypeList = response; },
      error: (error: HttpErrorResponse) => { console.log(error.message); },// errorHandler 
      complete: () => { console.log("completeHandler"); } // completeHandler
    });
  }

  onClick(id: number) {
    this.mediumService.deleteMediums(id).subscribe(result => this.getMediums());
  }

  public getFunMedium(): void {
    this.funMediumService.fun_mediums().subscribe({
      next: (response: FunMedium[]) => { this.funMediumList = response; },
      error: (error: HttpErrorResponse) => { console.log(error.message); },// errorHandler 
      complete: () => { console.log("completeHandler"); } // completeHandler
    });
  }

  public getClip(): void {
    this.clipService.getClip().subscribe(
      (response: Clip[]) => {
        if (response.length > 0) {
          this.clipList = response.sort((a, b) => (a.clip_id < b.clip_id ? -1 : 1));
        }
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onScrollUp(){
    console.log("Page scroll:"+this.offset);
    this.offset+=this.limit;
    this.pagination(this.limit,this.offset);
   }
   pagination(limit,offset){
     console.log("Pagination "+offset);
     this.mediumService.getMediumsPagination(limit,offset).subscribe((response: Mediums[]) => {this.mediumsList=[];this.mediumsList.push(...response);});
   }
   filterData(){
   }
}