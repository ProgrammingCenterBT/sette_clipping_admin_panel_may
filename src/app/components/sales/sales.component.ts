import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/services/administrator-login-services/authentication.service';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/services/format-datepicker';
import { Sales } from 'src/app/services/sales-service/sales';
import { SalesService } from 'src/app/services/sales-service/sales.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class SalesComponent implements OnInit {

  salesList: Sales[];
  sales: Sales;
  filteredList: Sales[];
  salesForm: FormGroup;
  saleID: number;
  editMode = false;
  searchString: string;
  selectedSales: number[] = [];
  filterMode = false;
  srcResult: any;

  searchFromDate:string;

  @ViewChild('eSale') eSale: ElementRef;
  @ViewChild('to') dateTo: ElementRef;
  @ViewChild('from') dateFrom: ElementRef;

  title: string;
  showSalesForm: boolean = false;
  deptCtrl;
  required;
  //datepickerRef1;

    //Infinite scroll
    private offset = 0;
    private limit=50;

  constructor(public authService: AuthenticationService, private salesService: SalesService, private formBuilder: FormBuilder,
              private datePipe: DatePipe, private _snackBar: MatSnackBar, private http: HttpClient) {
                this.sales = new Sales();
              }

  ngOnInit(): void {
    this.salesForm = this.formBuilder.group({
      sales_creditor : ['',Validators.required],
      sales_debtor : ['',Validators.required],
      sales_place: ['',Validators.required],
      sales_esale: [''],
      sales_url: [''],
      sales_image: [''],
      sales_type: ['', Validators.required],
      sales_date: ['',  Validators.required],
      sales_expire: ['',Validators.required],
      sales_description: ['']
    });
    this.getSales();
    this.pagination(this.limit,this.offset);

  }

  transformDate(date) {
    var dateToDB = this.datePipe.transform(date, 'dd-MM-yyyy');
    return dateToDB;
  }

  addSale(eSale: boolean) {
    if(this.salesForm.valid) {
      this.salesForm.controls['sales_esale'].setValue(eSale);
      this.salesService.addSales(this.salesForm.value).subscribe(result => this.getSales());
      this.resetForm();
      this.openSnackBar("Успешно додадена продажба!", "Затвори");
    }
  }

  deleteSale(saleID: number) {
        this.salesService.deleteSales(saleID).subscribe(result => this.getSales());
        this.resetForm();
        this.openSnackBar("Продажбата е успешно избришана!", "Затвори");
  }

  loadSale(creditor: string, debtor: string, place: string, esale: boolean, url: string,
    image: string, type: string, date: string, expire: string, description: string) {
    this.salesForm.controls['sales_creditor'].setValue(creditor);
    this.salesForm.controls['sales_debtor'].setValue(debtor);
    this.salesForm.controls['sales_place'].setValue(place);
    this.salesForm.controls['sales_url'].setValue(url);
    this.salesForm.controls['sales_image'].setValue(image);
    this.salesForm.controls['sales_type'].setValue(type);
    this.salesForm.controls['sales_date'].setValue(date);
    this.salesForm.controls['sales_expire'].setValue(expire);
    this.salesForm.controls['sales_description'].setValue(description);
    this.eSale['checked'] = esale;
  }

  editSale(saleID: number) {
    this.sales.sales_creditor = this.salesForm.controls['sales_creditor'].value;
    this.sales.sales_debtor = this.salesForm.controls['sales_debtor'].value;
    this.sales.sales_place = this.salesForm.controls['sales_place'].value;
    this.sales.sales_esale = this.salesForm.controls['sales_esale'].value;
    this.sales.sales_url = this.salesForm.controls['sales_url'].value;
    this.sales.sales_image = this.salesForm.controls['sales_image'].value;
    this.sales.sales_type = this.salesForm.controls['sales_type'].value;
    this.sales.sales_date = this.salesForm.controls['sales_date'].value;
    this.sales.sales_expire = this.salesForm.controls['sales_expire'].value;
    this.sales.sales_description = this.salesForm.controls['sales_description'].value;
    this.salesService.updateSales(this.sales, saleID).subscribe(result => this.getSales());
    this.resetForm();
    this.openSnackBar("Продажбата е успешно изменета!", "Затвори");
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      panelClass: "sette-dialog"
    });
  }

  // reverseDate(date: string) {
  //   const reverse = new Date(date.split("-").reverse().join("-"));
  //   return reverse.getTime();
  // }

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
    let dateTo_format   = this.formatDate(dateTo);
      this.filterMode = true;
    return this.salesList = this.salesList.filter(Sales => (
      Sales.sales_date >= dateFrom_format && Sales.sales_date <= dateTo_format
    ));
  }

//   filterByDate(dateFrom: string, dateTo: string) {
//     let dateFrom_format = this.formatDate(dateFrom);
//     let dateTo_format   = this.formatDate(dateTo);
//     this.filterMode     = true;
//      return  this.tendersList=this.tendersList.filter(Tenders => (
//        Tenders.tender_date >= dateFrom_format && Tenders.tender_date <= dateTo_format
//       ));
// }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
    }
    this.salesForm.controls['sales_image'].setValue('http://clipping.sette.com.mk/uploads/images/' + inputNode.files[0].name)
  }

  resetFilter() {
    this.filterMode = false;
  }

  selectSales(salesID: number) {
    console.log("Ljubisa");
    if(this.selectedSales.includes(salesID)) {
      for (let i = 0; i < this.selectedSales.length; i++) {
      if (this.selectedSales[i] == salesID) {
      this.selectedSales.splice(i, 1);
       }
     }
    } else {
      this.selectedSales.push(salesID);
    }
    console.log(this.selectedSales)
}

deleteMultipleSales() {
  for (let saleID of this.selectedSales) {
    this.salesService.deleteSales(saleID).subscribe(result => this.getSales());
  }
  this.selectedSales = [];
  this.openSnackBar("Селектираните продажби се успешно избришани!", "Затвори");
}


  resetForm() {
    this.eSale['checked'] = false;
    this.salesForm.reset();
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

  checkSalesForm(){
      if (this.showSalesForm == false) { this.showSalesForm = true }else{ this.showSalesForm = false}
  }

  public getSales(): void {
    this.salesService.getSales().subscribe(
      (response: Sales[]) => {
        if(response.length>0){
        this.salesList = response;
        //order by
        this.salesList.sort((a, b) => {
          let sales_date_a = a.sales_date;
          let sales_date_b = b.sales_date;

          if (sales_date_a < sales_date_b) return -1;
          if (sales_date_a > sales_date_b) return 1;

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
generatePDF(action = 'open', creditor: string, debtor: string, type: string, place: string, expire: string, desc: string) {
  let docDefinition = {
    content: [
      {
        // Header content
      },
      {
      columns: [
        [
        {},
        {text: "Доверител", bold: true},
        {text: "Должник", bold: true},
        {text: "Вид на продажба", bold: true},
        {text: "Место на продажба", bold: true},
        {text: "Датум", bold: true},
        ],
        [
        {},
        {text: creditor},
        {text: debtor},
        {text: type},
        {text: place},
        {text: this.transformDate(expire)},
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
   this.salesService.getSalesPagination(limit,offset).subscribe((response: Sales[]) => {this.salesList=[];this.salesList.push(...response);});
 }

filterData(){}


}