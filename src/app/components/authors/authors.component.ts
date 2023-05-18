import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/services/administrator-login-services/authentication.service';
import { Authors } from 'src/app/services/authors-service/authors';
import { AuthorsService } from 'src/app/services/authors-service/authors.service';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class AuthorsComponent {
  authorsList: Authors[] = [];
  authors: Authors;
  public searchString: string;
  private numberOfAuthors: number = 0;
  authorForm: FormGroup;
  authorID: number;
  editMode = false;
  authorName: string;
  private mode = 'create';
  private authorId: string;
  showAuthorsForm = false;
  authorsEmpty = false;
  alert_warning: boolean = false;
 
  //Infinite scroll
  private offset = 0;
  private limit=100;

  constructor(public http: HttpClient, private authorService: AuthorsService, public authService: AuthenticationService,
    private formBuilder: FormBuilder, public dialog: MatDialog, private _snackBar: MatSnackBar) {
    this.authors = new Authors();
  }

  ngOnInit(): void {
    this.authorForm = this.formBuilder.group({full_name_c: ['', Validators.required],full_name_l: ['', Validators.required]});
    this.pagination(this.limit,this.offset);
  }

  openSnackBar(message: string, action: string,) {
    this._snackBar.open(message, action, {
      duration: 3000,
      panelClass: "sette-dialog"
    });
  }

  addAuthor() {
    //filters
    this.alert_warning = false;
    this.numberOfAuthors = this.authorsList.filter(Authors => (Authors.full_name_c === this.authorForm.controls['full_name_c'].value ||
      Authors.full_name_l === this.authorForm.controls['full_name_l'].value)).length;
    if (this.authorForm.valid && this.numberOfAuthors == 0) {
      this.authorService.addAuthors(this.authorForm.value).subscribe(result => this.getAuthors());
      this.resetForm();
    } else {
      this.alert_warning = true;
    }
  }

  editAuthor(authorID: number) {
    this.authors.full_name_c = this.authorForm.controls['full_name_c'].value;
    this.authors.full_name_l = this.authorForm.controls['full_name_l'].value;
    this.authorService.updateAuthors(this.authors, authorID).subscribe(result => this.getAuthors());
    this.resetForm();
  }

  loadAuthor(fullNameLatin: string, fullNameCyrilic: string) {
    this.authorForm.controls['full_name_c'].setValue(fullNameCyrilic)
    this.authorForm.controls['full_name_l'].setValue(fullNameLatin)
  }

  deleteAuthor(authorID: number, authorName: string) {
    // this.authorService.deleteAuthors(authorID).subscribe(result => this.getAuthors());
    // this.resetForm();
    // this.editMode = false;

    const confirmDialog = this.dialog.open(DialogComponent, {
      data: {
        title: 'Избриши автор',
        message: 'Дали сте сигурни дека сакате да го избришите авторот: ' + this.authorName + '?',
        true: 'Избриши',
        false: 'Откажи'
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.authorService.deleteAuthors(authorID).subscribe(result => this.getAuthors());
        this.resetForm();
        this.openSnackBar("Авторот е успешно избришан!", "Затвори");
        this.editMode = false;
      }
    });
  }

  resetForm() {
    this.authorForm.reset();
  }

  logOut() {
    this.authService.logOut();
  }

   getAuthors(): void {
    this.authorService.getAuthors().subscribe(
      {
        next: (response: Authors[]) => { this.authorsList = response; this.numberOfAuthors=response.length;},
        error: (error: HttpErrorResponse) => { console.log(error.message); this.authorsEmpty = true; },// errorHandler 
        complete: () => { console.log("completeHandler"); } // completeHandler
      }
    );
  }

  getAuthorsList(){
    // this.authorService.getAuthors().subscribe(
    //   {
    //     next: (response: Authors[]) => { this.authorsList = response; console.log(this.authorsList );},
    //     error: (error: HttpErrorResponse) => { console.log(error.message); this.authorsEmpty = true; },// errorHandler 
    //     complete: () => { console.log("completeHandler"); } // completeHandler
    //   }
    // );
    this.authorService.getAuthors().subscribe((response: Authors[]) => {this.authorsList=[];this.authorsList.push(...response);});
    //this.authorService.getAuthorsPagination(8000,0).subscribe((response: Authors[]) => {this.authorsList=[];this.authorsList.push(...response);});
  }
  openAuthorsForm() {
    if (this.showAuthorsForm == false) {this.showAuthorsForm = true;
    } else {this.showAuthorsForm = false;}
  }

  keepOpen() {this.showAuthorsForm = true;}

  //https://techstrology.com/cannot-read-a-property-push-of-undefined-in-angular/
  //https://levelup.gitconnected.com/implementing-infinite-scrolling-using-angular-82c66f27e817
  onScroll(){
   console.log("Page scroll:"+this.offset);
   this.offset+=this.limit;
   this.pagination(this.limit,this.offset);
  }
  pagination(limit,offset){
    console.log("Pagination "+offset);
    this.authorService.getAuthorsPagination(limit,offset).subscribe((response: Authors[]) => {this.authorsList.push(...response);});
  }
  filterData(){
    //this.authorsList.filter(Authors => (Authors.full_name_c === this.searchString || Authors.full_name_l === this.searchString));
    //this.authorService.getAuthorsPagination(100,1).subscribe((response: Authors[]) => {this.authorsList=[];this.authorsList.push(...response);});
    // console.log("Full name "+this.searchString);
    // //this.authorsList=[];
    // this.authorService.getAuthorByFullName(this.searchString).subscribe((response: Authors[]) => {
    //   if(response.length>0){
    //     this.authorsList.push(...response);
    //   }
    // });

  //   setTimeout(() => {
  //     this.authorsList=[];
  //     this.authorService.getAuthorByFullName(this.searchString).subscribe((response: Authors[]) => {
  //         if(response.length>0){
  //           this.authorsList.push(...response);
  //         }
  //       });
  // }, 1000);
  }
  
}