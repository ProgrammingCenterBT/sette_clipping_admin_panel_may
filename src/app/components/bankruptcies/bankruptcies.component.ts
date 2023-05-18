import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/services/administrator-login-services/authentication.service';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/services/format-datepicker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Bankruptcies } from 'src/app/services/bankruptcies-service/bankruptcies';
import { BankruptciesService } from 'src/app/services/bankruptcies-service/bankruptcies.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-bankruptcies',
  templateUrl: './bankruptcies.component.html',
  styleUrls: ['./bankruptcies.component.css'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class BankruptciesComponent implements OnInit {

  bankruptciesList: Bankruptcies[];
  filteredList: Bankruptcies[];
  bankruptciesForm: FormGroup;
  bankruptcyID: number;
  editMode = false;
  bankruptcies: Bankruptcies;
  searchString: string;
  selectedBankruptcies: number[] = [];
  filterMode = false;
  alert_warning: boolean = false;
  srcResult: any;

  searchFromDate:string;

  @ViewChild('to') dateTo: ElementRef;
  @ViewChild('from') dateFrom: ElementRef;

  title: string;
  showBankruptciesForm: boolean = false;
  deptCtrl;
  required;

    //Infinite scroll
    private offset = 0;
    private limit=50;

  constructor(public authService: AuthenticationService, private bankruptciesService: BankruptciesService, private formBuilder: FormBuilder,
              private datePipe: DatePipe, private _snackBar: MatSnackBar, private http: HttpClient) {
                this.bankruptcies = new Bankruptcies();
              }

  ngOnInit(): void {
    this.bankruptciesForm = this.formBuilder.group({
      bankruptcy_name : ['',Validators.required],
      bankruptcy_embs : ['',Validators.required],
      bankruptcy_date : ['',Validators.required],
      bankruptcy_url: [''],
      bankruptcy_image: [''],
      bankruptcy_description: [''],
      bankruptcy_phase: ['',Validators.required],
      customMessage:['']
    });
    this.getBankruptcies();
    this.pagination(this.limit,this.offset);

  }

  transformDate(date) {
    var dateToDB = this.datePipe.transform(date, 'dd-MM-yyyy');
    return dateToDB;
  }

  addBankruptcy() {
    this.alert_warning=false;
    let bankruptcy_date_tran =this.transformDate(this.bankruptciesForm.controls['bankruptcy_date'].value);
    this.bankruptciesForm.controls['bankruptcy_date'].setValue(bankruptcy_date_tran);
    
    if( this.bankruptciesForm.controls['bankruptcy_name'].value!="" && 
        this.bankruptciesForm.controls['bankruptcy_embs'].valid && 
        //this.bankruptciesForm.controls['bankruptcy_embs'].value.length==7 &&
        this.bankruptciesForm.controls['bankruptcy_date'].value!="" &&
        this.bankruptciesForm.controls['bankruptcy_phase'].value!="") {
          this.bankruptciesForm.controls['bankruptcy_description'].setValue(this.bankruptciesForm.controls['customMessage'].value);
          let bankruptcy = {
            bankruptcy_id: -1,
            bankruptcy_name : this.bankruptciesForm.controls['bankruptcy_name'].value,
            bankruptcy_embs : this.bankruptciesForm.controls['bankruptcy_embs'].value,
            bankruptcy_date : this.bankruptciesForm.controls['bankruptcy_date'].value,
            bankruptcy_url: this.bankruptciesForm.controls['bankruptcy_url'].value,
            bankruptcy_image: this.bankruptciesForm.controls['bankruptcy_image'].value,
            bankruptcy_description: this.bankruptciesForm.controls['customMessage'].value,
            bankruptcy_phase: this.bankruptciesForm.controls['bankruptcy_phase'].value
          };
      console.log(this.bankruptciesForm.value);
      this.bankruptciesService.addBankruptcies(bankruptcy).subscribe(result => this.getBankruptcies());
      this.resetForm();
      this.openSnackBar("Успешно додаден стечај!", "Затвори");
    }else{
      this.alert_warning=true;
    }
  }

  deleteBankruptcy(bankruptcyID: number) {
        this.bankruptciesService.deleteBankruptcies(bankruptcyID).subscribe(result => this.getBankruptcies());
        this.resetForm();
        this.openSnackBar("Стечајот е успешно избришан!", "Затвори");
  }

  loadBankruptcy(name: string, embs: string, date: string, url: string, image: string, description: string, phase: string) {
    this.bankruptciesForm.controls['bankruptcy_name'].setValue(name);
    this.bankruptciesForm.controls['bankruptcy_embs'].setValue(embs);
    this.bankruptciesForm.controls['bankruptcy_date'].setValue(date);
    this.bankruptciesForm.controls['bankruptcy_url'].setValue(url);
    this.bankruptciesForm.controls['bankruptcy_image'].setValue(image);
    this.bankruptciesForm.controls['bankruptcy_description'].setValue(description);
    this.bankruptciesForm.controls['bankruptcy_phase'].setValue(phase);
  }

  editBankruptcy(bankruptcyID: number) {
    this.alert_warning=false;
    this.editMode = true; 
    if(this.bankruptciesForm.controls['bankruptcy_name'].value!="" && 
      this.bankruptciesForm.controls['bankruptcy_embs'].valid && 
      //this.bankruptciesForm.controls['bankruptcy_embs'].value.length==7 &&
      this.bankruptciesForm.controls['bankruptcy_date'].value!="" &&
      this.bankruptciesForm.controls['bankruptcy_phase'].value!=""){
        this.bankruptcies.bankruptcy_name = this.bankruptciesForm.controls['bankruptcy_name'].value;
        this.bankruptcies.bankruptcy_embs = this.bankruptciesForm.controls['bankruptcy_embs'].value;
        this.bankruptcies.bankruptcy_date = this.bankruptciesForm.controls['bankruptcy_date'].value;
        this.bankruptcies.bankruptcy_url = this.bankruptciesForm.controls['bankruptcy_url'].value;
        this.bankruptcies.bankruptcy_image = this.bankruptciesForm.controls['bankruptcy_image'].value;
        this.bankruptcies.bankruptcy_description = this.bankruptciesForm.controls['bankruptcy_description'].value;
        this.bankruptcies.bankruptcy_phase = this.bankruptciesForm.controls['bankruptcy_phase'].value;
        this.bankruptciesService.updateBankruptcies(this.bankruptcies, bankruptcyID).subscribe(result => this.getBankruptcies());
        this.resetForm();
        this.openSnackBar("Стечајот е успешно изменет!", "Затвори");
        this.editMode = false; 
    }else{
      this.alert_warning=true;
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      panelClass: "sette-dialog"
    });
  }

  formatDate(dateFrom: string){
    var myDate = dateFrom;
    var chunks = myDate.split("-");
    var formattedDate = chunks[1] + "-" + chunks[0] + "-" + chunks[2];

    console.log("formated date " + formattedDate);

    //dd-mm-yyyy convert to mm-dd-yyyy
    //let currentDate = new Date(dateFrom.toString());
    //return this.datePipe.transform(dateFrom, 'yyyy-MM-dd');
    console.log(dateFrom + " " + formattedDate);
    return this.datePipe.transform(formattedDate, 'yyyy-MM-dd', 'en-US');

 }

 filterByDate(dateFrom: string, dateTo: string) {
     let dateFrom_format = this.formatDate(dateFrom);
     let dateTo_format = this.formatDate(dateTo);
     this.filterMode = true;
    console.log(this.formatDate(dateFrom));
     return this.bankruptciesList= this.bankruptciesList.filter(Bankruptcies => (
     console.log(Bankruptcies.bankruptcy_date + " " + dateFrom_format + " " + dateTo_format),
     console.log(this.bankruptciesList),
        Bankruptcies.bankruptcy_date >= dateFrom_format && Bankruptcies.bankruptcy_date <= dateTo_format
     ));

 }
 selectedFile: any = null;
 onFileSelectedNew(event: any): void {
  //https://blog.angular-university.io/angular-file-upload/
  //https://blog.jscrambler.com/implementing-file-upload-using-node-and-angular
  const file:File = event.target.files[0];

  //       if (file) {

  //           this.selectedFile = file.name;

  //           const formData = new FormData();
  //           formData.append("thumbnail", file);
  //           console.log(formData);
  //           const upload$ = this.http.post("D:/ljubisa/bitbucket/sette_clipping/main/sette/src/app/uploads/", formData);

  //           upload$.subscribe();
  //       }

  const endpoint = 'D:/ljubisa/bitbucket/sette_clipping/main/sette/src/app/uploads/';
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    const upload$ = this.http.post("D:/ljubisa/bitbucket/sette_clipping/main/sette/src/app/uploads/", formData);

  upload$.subscribe();
}
  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
    }
    this.bankruptciesForm.controls['bankruptcy_image'].setValue('D:/ljubisa/bitbucket/sette_clipping/main/sette/src/app/uploads/' + inputNode.files[0].name)
  }

  resetFilter() {
    this.filterMode = false;
  }

  selectBankruptcies(bankruptcyID: number) {
    if(this.selectedBankruptcies.includes(bankruptcyID)) {
      for (let i = 0; i < this.selectedBankruptcies.length; i++) {
      if (this.selectedBankruptcies[i] == bankruptcyID) {
      this.selectedBankruptcies.splice(i, 1);
       }
     }
    } else {
      this.selectedBankruptcies.push(bankruptcyID);
    }
    console.log(this.selectedBankruptcies)
}

  deleteMultipleBankruptcies() {
  for (let bankruptcyID of this.selectedBankruptcies) {
    this.bankruptciesService.deleteBankruptcies(bankruptcyID).subscribe(result => this.getBankruptcies());
  }
  this.selectedBankruptcies = [];
  this.openSnackBar("Селектираните стечаи се успешно избришани!", "Затвори");
}


  resetForm() {
    this.bankruptciesForm.reset();
  }


  logOut() {
    this.authService.logOut();
  }

  Search() {
    if (this.title == "") {
      this.ngOnInit();
    }
    /*this.clipList = this.clipList.filter(res => {
      return res.clip_title.toLocaleLowerCase().match(this.title.toLocaleLowerCase());
    })*/
  }

  checkBankruptciesForm(){
      if (this.showBankruptciesForm == false) { this.showBankruptciesForm = true }else{ this.showBankruptciesForm = false}
  }

  public getBankruptcies(): void {
    this.bankruptciesService.getBankruptcies().subscribe(
      (response: Bankruptcies[]) => {
        if(response.length>0){
        this.bankruptciesList = response;
        //order by
        this.bankruptciesList.sort((a, b) => {
          let bankruptcy_date_a = a.bankruptcy_date;
          let bankruptcy_date_b = b.bankruptcy_date;

          if (bankruptcy_date_a < bankruptcy_date_b) return -1;
          if (bankruptcy_date_a > bankruptcy_date_b) return 1;

          return 0;
          })
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

/* PDF */
generatePDF(action = 'open', name: string, embs: string, phase: string, desc: string) {
  let docDefinition = {
    content: [
      {
        // Header content
      },
      {
      columns: [
        [
        {},
        {text: "Име", bold: true},
        {text: "ЕМБС", bold: true},
        {text: "Фаза", bold: true},
        ],
        [
        {},
        {text: name},
        {text: embs},
        {text: phase},
        ],
      ],
      },
     {
      // Footer content
    },
    {
      /*layout: 'lightHorizontalLines', // optional*/
      table: {
        style: 'center',
        headerRows: 1,
        widths: [ '*', '0', 4, '0' ],

        body: [
          [ 'Опис'],
          [desc],
        ]
      }
    }
    ],
      styles: {
        center: {
          alignment: 'center'
        }
      } // Styles
  }

  if(action==='download'){
    pdfMake.createPdf(docDefinition).download();
  }else if(action === 'print'){
    pdfMake.createPdf(docDefinition).print();
  }else{
    pdfMake.createPdf(docDefinition).open();
  }
}
onScrollUp(){
  console.log("Page scroll:"+this.offset);
  this.offset+=this.limit;
  this.pagination(this.limit,this.offset);
 }
 pagination(limit,offset){
   console.log("Pagination "+offset);
   this.bankruptciesService.getBankruptciesPagination(limit,offset).subscribe((response: Bankruptcies[]) => {this.bankruptciesList=[];this.bankruptciesList.push(...response);});
 }
filterData(){
}

}