import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/services/administrator-login-services/authentication.service';
import { clipTags } from 'src/app/services/clip-tags-service/clip-tags';
import { ClipTagsService } from 'src/app/services/clip-tags-service/clip-tags.service';
import { FunTagService } from 'src/app/services/functions/fun-tag.service';
import { Tags } from 'src/app/services/tags-service/tags';
import { TagsService } from 'src/app/services/tags-service/tags.service';
import { TagsCategoriesService } from 'src/app/services/tagsCategoriesService/tags-categories.service';
import { tagsCategories } from 'src/app/services/tagsCategoriesService/tagsCategories';
import { DialogTagsComponent } from '../dialog-tags/dialog-tags.component';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class TagsComponent implements OnInit {
  public tagsList: Tags[] = [];
  public tagsCategoriesList: tagsCategories[];
  public clipTagsList: clipTags[];
  tags: Tags;
  position: number = -1;
  tagsCategory: tagsCategories;
  //funTagsList: FunTags[];

  showCategoryName = false;
  tagCategoryTagId: number;
  tagCategoryTagName: string;
  searchCategoryById: number;
  dropdownListFilterType = 'Contains';
  selectedCategoryFilter: string;

  public searchString: string;
  private numberOfTags: number = 0;
  tagForm: FormGroup;
  tagCategoryForm: FormGroup;
  deleteTagCategoryForm: FormGroup;
  tagID: number;
  editMode = false;
  parentTag = true;
  selectedCategory: string;
  selectedCategoryID: string;
  tagName: string;
  parentTagChecked: boolean;
  showTagsForm = false;
  selectedDropdown: number = 1;
  selectedDropdownDelete: number = 1;
  selectedDropdownParent: number = 1;
  //alerts
  alert_warning: boolean = false;
  alert_warning_form: boolean = false;
  // Infinite scroll
  private offset = 0;
  private limit=50;


  constructor(private tagService: TagsService, public authService: AuthenticationService, public http: HttpClient,
    public tagsCategoriesService: TagsCategoriesService, private clipTagService: ClipTagsService,
    private formBuilder: FormBuilder, private dialog: MatDialog, private _snackBar: MatSnackBar) {
    this.tags = new Tags();
    this.tagsCategory = new tagsCategories();
  }

  ngOnInit(): void {
    this.tagForm = this.formBuilder.group({
      tag_name_c: ['', Validators.required],
      tag_name_l: ['', Validators.required],
      tag_color: ['', Validators.required],
      parent_tag_id: [''],
      tags_category_id: [''],
      parent_tag: ['']
    });
    this.tagCategoryForm = this.formBuilder.group({ tags_category_name: ['', Validators.required] });
    this.deleteTagCategoryForm = this.formBuilder.group({ tags_category_id: ['', Validators.required] });
    //this.getFunTags();
    this.getClipTags();
    this.getTags();
    this.getTagsCategories();
    this.pagination(this.limit,this.offset);
    //this.tagCategoryTags();
    // if(this.checkParentTag = true ){
    // this.disabledValue = true;
    // }else{
    //   this.disabledValue = false;
    // }
  }

  openSnackBar(message: string, action: string,) {
    this._snackBar.open(message, action, {
      duration: 3000,
      panelClass: "sette-dialog"
    });
  }

  checkParentTag() {

    //console.log("Ljubisa "+this.selectedDropdownParent);
    // if (this.parentTagChecked) { 
    //   this.disabledValue = true;
    //     //console.log("checkbox has been checked"); 
    //     //this.tagForm.controls['tag_color'].enable();
    //   } else { 
    //     this.disabledValue = true;

    //    // console.log("checkbox has been unchecked"); 
    //     //this.tagForm.controls['tag_color'].disable();
    //   } 
    this.tagForm.controls['parent_tag_id'].setValue("");
  }

  addTag(checked: boolean) {
    this.alert_warning_form = false;
    this.alert_warning = false;
    //filters
    this.numberOfTags = this.tagsList.filter(Tags => (Tags.tag_name_c === this.tagForm.controls['tag_name_c'].value || Tags.tag_name_l === this.tagForm.controls['tag_name_l'].value)).length;
    if (this.numberOfTags == 0) {
      if (this.tagForm.controls['tag_name_c'].value != "" && this.tagForm.controls['tag_name_l'].value != "") {
        let tags_category = {
          tags_category_id: this.tagForm.controls['tags_category_id'].value,
          tags_category_name: ""
        };
        this.tagForm.controls['parent_tag'].setValue(checked);
        if (checked) { this.tagForm.controls['parent_tag_id'].setValue(0); }
        if (!checked && (this.tagForm.controls['parent_tag_id'].value == undefined || this.tagForm.controls['parent_tag_id'].value == null || this.tagForm.controls['parent_tag_id'].value == "")) {
          this.alert_warning_form = true;
        }
        if (!this.alert_warning_form) {
          this.tags.tag_name_c = this.tagForm.controls['tag_name_c'].value;
          this.tags.tag_name_l = this.tagForm.controls['tag_name_l'].value;
          this.tags.tag_color = this.tagForm.controls['tag_color'].value;
          this.tags.parent_tag = this.tagForm.controls['parent_tag'].value;
          this.tags.parent_tag_id = this.tagForm.controls['parent_tag_id'].value;
          this.tags.tags_category = tags_category;
          delete this.tags["tags_category_id"];
          this.tagService.addTags(this.tags).subscribe(result => this.getTags());
          this.resetTagForm();
          this.openSnackBar("Успешно додаден таг!", "Затвори");
        }
      } else {
        this.alert_warning_form = true;
      }
    } else {
      this.alert_warning = true;
    }
  }

  editTag(tagID: number, index: number, selectedParent: boolean) {
    //Alerts
    this.alert_warning_form = false;
    this.alert_warning = false;
    //https://stackblitz.com/edit/angular-mat-select-no-label?file=src%2Fapp%2Fapp.component.ts
    if (this.tagForm.controls['tag_name_c'].value != "" && this.tagForm.controls['tag_name_l'].value != "") {
      if (selectedParent) { this.tagForm.controls['parent_tag_id'].setValue(0); }
      if (!selectedParent && (this.tagForm.controls['parent_tag_id'].value == undefined || this.tagForm.controls['parent_tag_id'].value == null || this.tagForm.controls['parent_tag_id'].value == "")) {
        this.alert_warning_form = true;
      }
      if (!this.alert_warning_form) {
        let tags_category = {
          tags_category_id: this.tagForm.controls['tags_category_id'].value,
          tags_category_name: ""
        };
        this.tags.tag_id = tagID;
        this.tags.tag_name_c = this.tagForm.controls['tag_name_c'].value;
        this.tags.tag_name_l = this.tagForm.controls['tag_name_l'].value;
        this.tags.tag_color = this.tagForm.controls['tag_color'].value;
        this.tags.parent_tag = selectedParent;
        this.tags.parent_tag_id = this.tagsList[index].parent_tag_id;
        this.tags.tags_category = tags_category;
        delete this.tags["tags_category_id"];
        this.tagService.updateTags(this.tags, tagID).subscribe(result => (this.getTags()));
        this.resetTagForm();
        this.openSnackBar('Тагот е успешно изменет!', 'Затвори');

      }
    } else {
      this.alert_warning_form = true;
    }
  }

  loadTag(obj: any, index1: any) {
    this.position = index1;

    this.tagForm.controls['tag_name_c'].setValue(obj.tag_name_c);
    this.tagForm.controls['tag_name_l'].setValue(obj.tag_name_l);
    this.tagForm.controls['tag_color'].setValue(obj.tag_color);
    this.tagForm.controls['tags_category_id'].setValue(obj.tags_category.tags_category_id);
    this.tagForm.controls['parent_tag'].setValue(obj.parent_tag);
    this.tagForm.controls['parent_tag_id'].setValue(obj.parent_tag_id);
    this.selectedDropdown = obj.tags_category.tags_category_id;
  }
  onChangeDropdown(event) {
    this.selectedDropdown = event;
    console.log("DropDown " + this.selectedDropdown);
  }
  onChangeDropdownParent(event) {
    this.selectedDropdownParent = event;

    // if (event) { 
    //   console.log("checkbox has been checked"); 
    //   //this.tagForm.controls['tag_color'].enable();
    // } else { 
    //   console.log("checkbox has been unchecked");
    //    // this.tagForm.controls['tag_color'].disable();
    // } 

    let numberOfParents = this.tagsList.filter(Tags => Tags.tag_id == event).length;
    if (numberOfParents == 1) {
      let getColor = this.tagsList.filter(Tags => Tags.tag_id == event)[0];
      this.tagForm.controls['tag_color'].setValue(getColor.tag_color);
      this.tagForm.controls['tag_color'].disable();
    } else {
      this.tagForm.controls['tag_color'].enable();
    }
  }
  onChangeDropdownDelete(event) {
    this.selectedDropdownDelete = event;
  }
  deleteTagsCategories() {
    let selectedCategoryIdDropDown = this.deleteTagCategoryForm.controls['tags_category_id'].value;
    this.selectedCategoryID = selectedCategoryIdDropDown;
    let tags_name = this.tagsCategoriesList.filter(tagsCategories => (tagsCategories.tags_category_id == selectedCategoryIdDropDown));
    let findMe = this.tagsList.filter(Tags => (Tags.tags_category.tags_category_id == selectedCategoryIdDropDown));
    if (findMe.length == 0) {
      this.alert_warning = false;
      this.selectedCategory = tags_name[0].tags_category_name;//treba da se zemi
      const confirmDialog = this.dialog.open(DialogTagsComponent, {
        data: {
          title: 'Избриши Категорија',
          message: 'Внесете лозинка за бришење на категоријата: ' + this.selectedCategory
        }
      });
      confirmDialog.afterClosed().subscribe(result => {
        if (result === '7110eda4d09e062aa5e4a390b0a572ac0d2c0220') {
          this.tagsCategoriesService.deleteTagsCategories(parseInt(this.selectedCategoryID)).subscribe(result => this.getTagsCategories());
          this.resetTagForm();
          this.openSnackBar("Категоријата е успешно избришана!", "Затвори");
          this.editMode = false;

        } else if (result !== '7110eda4d09e062aa5e4a390b0a572ac0d2c0220' && result) {
          this.resetTagForm();
          this.openSnackBar("Погрешна лозинка!", "Затвори");
          this.editMode = false;
        }

      });
    } else {
      this.alert_warning = true;
    }
  }
  deleteTagsCategoryPassword() {
    this.selectedCategoryID = this.deleteTagCategoryForm.controls['tags_category_id'].value;
    this.selectedCategory = "";//treba da se zemi
    console.log("delete: " + this.selectedCategoryID);
    for (let tagCategory of this.tagsCategoriesList) {
      if (this.selectedCategoryID == tagCategory.tags_category_id.toString()) {
        this.selectedCategory = tagCategory.tags_category_name;
      }
    }
    const confirmDialog = this.dialog.open(DialogTagsComponent, {
      data: {
        title: 'Избриши Категорија',
        message: 'Внесете лозинка за бришење на категоријата: ' + this.selectedCategory
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === '7110eda4d09e062aa5e4a390b0a572ac0d2c0220') {

        this.tagsCategoriesService.deleteTagsCategories(parseInt(this.selectedCategoryID)).subscribe(result => this.getTagsCategories());
        this.resetTagForm();
        this.openSnackBar("Категоријата е успешно избришана!", "Затвори");
        this.editMode = false;

      } else if (result !== '7110eda4d09e062aa5e4a390b0a572ac0d2c0220' && result) {
        this.resetTagForm();
        this.openSnackBar("Погрешна лозинка!", "Затвори");
        this.editMode = false;
      }

    });
  }

  deleteTag(tagID: number, tagName: string) {
    const confirmDialog = this.dialog.open(DialogTagsComponent, {
      data: { title: 'Избриши таг', message: 'Внесете лозинка за бришење на тагот: ' + tagName }
    });
    confirmDialog.afterClosed().subscribe(result => {

      console.log("Brisi " + tagID + " " + tagName + " pass:" + result);
      if (result === '7110eda4d09e062aa5e4a390b0a572ac0d2c0220') {
        //filters
        let numberOfMediums = this.clipTagsList.filter(tagInClip => (tagInClip.clip_tag_id == tagID)).length;
        if (numberOfMediums == 1) {
          this.clipTagService.deleteClipTag(tagID).subscribe(result => this.getTags());// da se proveri
        }
        //   for (let tagInClip of this.clipTagsList) {
        //     if (tagInClip.tag_id == tagID) {
        //       this.clipTagService.deleteClipTag(tagInClip.clip_tag_id).subscribe(result => this.getFunTags());
        //     }
        //   }
        this.tagService.deleteTags(tagID).subscribe(result => this.getTags());
        this.resetTagForm();
        this.openSnackBar("Тагот е успешно избришан!", "Затвори");
        this.editMode = false;
      } else if (result !== '7110eda4d09e062aa5e4a390b0a572ac0d2c0220' && result) {
        this.resetTagForm();
        this.openSnackBar("Погрешна лозинка!", "Затвори");
        this.editMode = false;
      }
    });
  }

  resetTagForm() {
    this.tagForm.reset();
  }

  resetTagCategoryForm() {
    this.tagCategoryForm.reset();
  }

  checkList() {
    console.log(this.tagsCategoriesList)
  }

  addTagCategory() {
    this.alert_warning = false;
    this.numberOfTags = this.tagsCategoriesList.filter(tagsCategories => (tagsCategories.tags_category_name === this.tagCategoryForm.controls["tags_category_name"].value)).length;
    if (this.tagCategoryForm.valid && this.numberOfTags == 0) {
      this.tagsCategoriesService.addTagsCategories(this.tagCategoryForm.value).subscribe(result => this.getTagsCategories());
      this.resetTagCategoryForm();
      this.openSnackBar("Успешно додадена категорија!", "Затвори");
    } else {
      this.alert_warning = true;
    }
  }

  deleteTagCategory() {
    this.selectedCategoryID = this.deleteTagCategoryForm.controls['tags_category_id'].value;
    for (let tagCategory of this.tagsCategoriesList) {
      if (this.selectedCategoryID == tagCategory.tags_category_id.toString()) {
        this.selectedCategory = tagCategory.tags_category_name;
      }
    }
    const confirmDialog = this.dialog.open(DialogComponent, {
      data: {
        title: 'Избриши категорија',
        message: 'Дали сте сигурни дека сакате да ја избришите категоријата: ' + this.selectedCategory + '?',
        true: 'Избриши',
        false: 'Откажи'
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.tagsCategoriesService.deleteTagsCategories(parseInt(this.selectedCategoryID)).subscribe(result => this.getTagsCategories());
        this.resetTagForm();
        this.openSnackBar("Категоријата е успешно избришана!", "Затвори");
        this.editMode = false;
      }
    });
  }

  selectChangeHandler(event: any) {
    this.selectedCategory = event.target.value;
    console.log(this.selectedCategory)
  }

  logOut() {
    this.authService.logOut();
  }

  // tagCategoryTags() {
  //   this.tagsList = [];
  //   for (var tag of this.tagsList) {
  //     this.tagCategoryTagId = tag.tags_category_id;
  //     for (var tagCategory of this.tagsCategoriesList) {
  //       if (tagCategory.tags_category_id == this.tagCategoryTagId) {
  //         this.tagCategoryTagName = tagCategory.tags_category_name;
  //       }
  //     }
  //   }
  // }


  getTagsCategories() {
    this.tagsCategoriesService.getTagsCategories().subscribe({
      next: (response: tagsCategories[]) => { this.tagsCategoriesList = response; },
      error: (error: HttpErrorResponse) => { console.log(error.message); },// errorHandler 
      complete: () => { console.log("completeHandler"); } // completeHandler
    });
  }

  onClick(id: number) {
    this.tagService.deleteTags(id).subscribe(result => this.getTags());
  }


  getTagsList(){
    this.tagService.getTags().subscribe((response: Tags[]) => {this.tagsList=[];this.tagsList.push(...response);});
  }


  getTags(): void {
    this.tagService.getTags().subscribe({
      next: (response: Tags[]) => { this.tagsList = response; },
      error: (error: HttpErrorResponse) => { console.log(error.message); },// errorHandler 
      complete: () => { console.log("completeHandler"); } // completeHandler
    });
  }

  // public getFunTags(): void {
  //   this.funTagService.fun_tags().subscribe({
  //     next:     (response: FunTags[])        => {this.funTagsList = response;},
  //     error:    (error:HttpErrorResponse) => {console.log(error.message);},// errorHandler 
  //     complete: ()                        => {console.log("completeHandler");} // completeHandler
  //   });
  // }

  openTagsForm() {
    if (this.showTagsForm == false) {
      this.showTagsForm = true;
    } else {
      this.showTagsForm = false;
    }
  }

  keepOpen() {
    this.showTagsForm = true;
  }

  // appendItems() {
  //   this.addItems("push");
  // }

  // prependItems() {
  //   this.addItems("unshift");
  // }

  // onScrollDown(ev: any) {
  //   console.log("scrolled down!!", ev);

  //   this.sum += 20;
  //   this.appendItems();

  //   this.direction = "scroll down";
  // }

  // onScrollUp(ev: any) {
  //   console.log("scrolled up!", ev);
  //   this.sum += 20;
  //   this.prependItems();

  //   this.direction = "scroll up";
  // }


  // addItems(_method: string) {
  //     this.tagService.getTags().subscribe(
  //       (response: Tags[]) => {
  //         if(response.length>0){
  //           for (let i = 0; i < this.sum; ++i) {
  //               if( _method === 'push' && (this.sum<response.length)){
  //                 this.tagsList.push(response[i]);
  //               }else if( _method === 'unshift'&& (this.sum<response.length && this.sum>0)){
  //                 this.tagsList.unshift(response[i]);
  //               }
  //           }
  //         }
  //   },(error: HttpErrorResponse) => {
  //       alert(error.message);
  //   });
  // }

  public getClipTags(): void {
    this.clipTagService.getClipTags().subscribe({
      next: (response: clipTags[]) => { this.clipTagsList = response; },
      error: (error: HttpErrorResponse) => { console.log(error.message); },// errorHandler 
      complete: () => { console.log("completeHandler"); } // completeHandler
    });
  }

  onScrollUp(){
    console.log("Page scroll:"+this.offset);
    this.offset+=this.limit;
    this.pagination(this.limit,this.offset);
   }
   pagination(limit,offset){
     console.log("Pagination "+offset);
     this.tagService.getTagsPagination(limit,offset).subscribe((response: Tags[]) => {this.tagsList=[];this.tagsList.push(...response);});
   }
   filterData(){
   }
}