import { DatePipe } from '@angular/common';

import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/services/administrator-login-services/authentication.service';
import { Tenders } from 'src/app/services/tenders-service/tenders';
import { JSONdoc } from 'src/app/services/tenders-service/jsondoc';
import { TendersService } from 'src/app/services/tenders-service/tenders.service';
import { DialogComponent } from '../dialog/dialog.component';
import { finalize, Subscription } from 'rxjs';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { DialogTagsComponent } from '../dialog-tags/dialog-tags.component';
import { DialogTenderClientsComponent } from '../dialog-tender-clients/dialog-tender-clients.component';
import { StringDecoder } from 'string_decoder';
import { clientTags } from 'src/app/services/client-tags-service/client-tags';
import { ClientTagsService } from 'src/app/services/client-tags-service/client-tags.service';
import { ClientsService } from 'src/app/services/clients-service/clients.service';
import { clientAdmin } from 'src/app/services/client-admin-services/client-admin';
import { ClientAdminService } from 'src/app/services/client-admin-services/client-admin.service';
import { DndDropEvent } from 'ngx-drag-drop';
import { Tags } from 'src/app/services/tags-service/tags';
import { TagsService } from 'src/app/services/tags-service/tags.service';
import { TenderTagsService } from 'src/app/services/tender-tags-services/tender-tags.service';
import { TenderTags } from 'src/app/services/tender-tags-services/tenderTags';
import { FunTagService } from 'src/app/services/functions/fun-tag.service';
import { FunTags } from 'src/app/services/functions/fun-tags';
//import { TendersSearchbarComponent } from '../tenders-searchbar/tenders-searchbar.component';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { serialize } from 'v8';
//import { Pipe, PipeTransform } from '@angular/core';



pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-tenders',
  templateUrl: './tenders.component.html',
  styleUrls: ['./tenders.component.css']
})
export class TendersComponent implements OnInit {

  //@ViewChild('tenderSearch') private tenderSearch: TendersSearchbarComponent;
  SearchSubject: string = '';
  SearchTender: string = '';
  SearchPrilog: boolean = false;
  SearchPonistuvanja: boolean = false;
  //@Input() tendersList= Tenders[];
  //@Input() title:string ='';

  // @Output() tendersListOutput:Tenders;
  //https://medium.com/quick-code/compare-one-array-to-another-make-filtration-in-angular-21dac021cc9f

  public tendersList: Tenders[]=[];
  public myList: JSONdoc[ ];
  public tagsList: FunTags[];
  public tenderTagList: TenderTags[];
  public numberOfAttachment: number;
  public numberOfTenders: number;
  public numberOfCancellations: number;
  public numberOfTechnicalDialog: number;
  public numberOfTenderWinners: number;
  public numberOfConcessionAnnouncements: number;
  public url: string;
  //showTenders = false;
  alert_warning: boolean = false;

  tenders: Tenders;
  tenderTags: TenderTags;
  tenderTagsLN: TenderTags;
  showTenderForm = false;
  showMailForm = false;
  showTenderClients = false;
  editMode = false;
  tenderID: number;
  tenderSubject: string;
  selectedTenders = [];
  openedTags: number[] = [];
  tenderTagID: number;

  tenderForm: FormGroup;
  tenderi: Tenders;
  additionalDetails: string;
  enteredUrl = true;
  enteredImage = true;
  enteredDescription = true;
  clientTagsList: clientTags[];
  clientTags: clientTags;
  clientList: clientAdmin[];
  client: clientAdmin;
  tenderTagsList: number[] = [];
  tenderClientsList: number[];


  //Checkbox default value
  showTenders: boolean = false;
  showPrilog: boolean = false;
  showDelete: boolean = false;

  searchFromDate: string;


  @ViewChild('to') dateTo: ElementRef;
  @ViewChild('from') dateFrom: ElementRef;


  example: string = '';
  tenderId: string;

  //Infinite scroll
  private offset = 0;
  private limit=50;
  // listArray: string[] = [];
  // sum = 20;
  // direction = "";

  required;
  deptCtrl;
  filterMode = false;
  public filteredList;


  constructor(public authService: AuthenticationService, private formBuilder: FormBuilder,
    private tenderService: TendersService, private dialog: MatDialog, private tenderTagService: TenderTagsService,
    private _snackBar: MatSnackBar, private datePipe: DatePipe, private funTagService: FunTagService,
    private clientTagService: ClientTagsService, private clientAdminService: ClientAdminService) {
    this.tenders = new Tenders();
    this.clientTags = new clientTags();
    this.client = new clientAdmin();
    this.tenderTags = new TenderTags();
    this.tenderTagsLN = new TenderTags();

    // this.appendItems();
  }

  ngOnInit(): void {
    
    //this.appendItems();
    this.tenderForm = this.formBuilder.group({
      tender_type: ['', Validators.required],
      tender_medium: ['', Validators.required],
      contractingInstitutionName: ['', Validators.required],
      tender_subject: ['', Validators.required],
      tender_description: [''],
      tender_url: [''],
      tender_image: [''],
      tender_date: ['', Validators.required],
      tender_expire: ['', Validators.required],
    });
    //this.getTenders();
    //this.appendItems();
    this.getClientTags();
    this.getClients();
    this.getTags();
    this.getTenderTags();
    this.pagination(this.limit,this.offset);

     //Filters
     this.numberOfTenders = this.tendersList.filter(Tenders => Tenders.tender_type === "Тендер").length;
     this.numberOfAttachment = this.tendersList.filter(Attachment => Attachment.tender_type === "Прилози").length;
     this.numberOfCancellations = this.tendersList.filter(Cancellations => Cancellations.tender_type === "Поништување").length;
     this.numberOfTechnicalDialog = this.tendersList.filter(TecnicalDialogue => TecnicalDialogue.tender_type === "Технички дијалог").length;
     this.numberOfTenderWinners = this.tendersList.filter(TenderWinners => TenderWinners.tender_type === "Одлуки").length;
     this.numberOfConcessionAnnouncements = this.tendersList.filter(numberOfConcessionAnnouncements => numberOfConcessionAnnouncements.tender_type === "Концесии/ЈПП").length;
    
  }

  removeTagFromTender(tagID: number) {
    this.tenderTagService.deleteTenderTag(tagID).subscribe(result => this.getTenderTags());
  }

  selectTender(tenderID: number, tenderCheckBox: boolean) {
    if (!tenderCheckBox) {
      this.selectedTenders.push(tenderID);
    }
    else {
      for (let i = 0; i < this.selectedTenders.length; i++) {
        if (this.selectedTenders[i] == tenderID) {
          this.selectedTenders.splice(i, 1);
        }
      }
    }
    console.log(this.selectedTenders);
  }

  addTagToTenderByCheck(tagID: number) {
    var checkExistingTag = false;
    for (let tenderTags of this.tenderTagList) {
      if (tenderTags.tag.tag_id == tagID && this.selectedTenders.includes(tenderTags.tender.tender_id)) {
        checkExistingTag = true;
      }
    }
    if (!checkExistingTag) {
      for (let tenderID of this.selectedTenders) {
        this.tenderTags.tender.tender_id = tenderID;
        this.tenderTags.tag.tag_id = tagID;
        this.tenderTagService.addTenderTag(this.tenderTags).subscribe(result => this.getTenderTags());
      }
    }
  }

  changeTenderType() {
    if (this.tenderForm.controls['tender_type'].value == "Други огласи") {
      this.tenderForm.controls['tender_medium'].setValue("Други огласи");
      this.tenderForm.controls['tender_url'].setValue("https://e-nabavki.gov.mk/PublicAccess/home.aspx#/otherannouncements");
    }
    if (this.tenderForm.controls['tender_type'].value == "Технички дијалог") {
      this.tenderForm.controls['tender_medium'].setValue("Технички дијалог");
      this.tenderForm.controls['tender_url'].setValue("https://e-nabavki.gov.mk/PublicAccess/home.aspx#/technical-dialog-announcements");
    }
    if (this.tenderForm.controls['tender_type'].value == "Останато") {
      this.tenderForm.controls['tender_medium'].setValue("");
      this.tenderForm.controls['tender_url'].setValue("");
    }
  }

  onCheckboxChange(e, param2) {
    if (e.target.checked) {
      this.showTenders = true;
      console.log("Search tendery checked " + param2);
    } else {
      console.log("Search tendery isn't checked " + param2);
      this.showTenders = false;
    }
  }
  reverseDate(date: string) {
    const reverse = new Date(date.split("-").reverse().join("-"));
    return reverse.getTime();
  }

  formatDate(dateFrom: string, dateTypeIndex: number = 0) {
    let currentDate = new Date();
    let dateFormatType = ['dd-MM-yyyy', 'yyyy-MM-dd'];
    //Index                 0               1
    let positionFormat;
    //get date format
    if (dateTypeIndex < dateFormatType.length) { positionFormat = dateFormatType[dateTypeIndex]; }
    return this.datePipe.transform(dateFrom, positionFormat);
  }

  filterByDate(dateFrom: string, dateTo: string, checkboxTenders: boolean, checkboxPrilog: boolean, checkboxDelete: boolean) {
    let dateFrom_format = this.formatDate(dateFrom);
    let dateTo_format = this.formatDate(dateTo);
    this.filterMode = true;

    let checked;

    console.log("SearchTender: " + this.SearchTender + " - " + " SearchPrilog: " + this.SearchPrilog + " - " + 
    "SearchPonistuvanja: " + this.SearchPonistuvanja );


    if (checkboxTenders) {
      checked = checkboxTenders;
      checked += `${this.tenders.tender_type = 'tender'} ||`;
    }

    if (checkboxPrilog) {
      //checked += "Tenders.tender_type='Прилог' && ";
      checked = checkboxPrilog;
      checked += `${this.tenders.tender_type = 'prilog'} || `;
    }

    if (checkboxDelete) {
      //checked += "Tenders.tender_type='Избришани' && ";
      checked = checkboxDelete;
      checked += `${this.tenders.tender_type = 'ponistuvanja'} || `;
    }

    console.log(checked.replace(/||\s/g, ''));

    return this.tendersList = this.tendersList.filter(Tenders => (
      console.log(Tenders.tender_date),
      console.log("Search tenders by date"),
      console.log(this.tendersList),
      Tenders.tender_date >= dateFrom_format && Tenders.tender_date <= dateTo_format && (checkboxTenders || checkboxPrilog || checkboxDelete)
    ));
  }

  //Checkbox START

  // showDefaultPage(event:MatCheckboxChange): void {
  //   if(event.checked){
  //     this.showTenders = true;
  //     console.log(event.checked);
  //   } else{
  //     this.showTenders = false;
  //     console.log(event.checked);
  //   }
  // }
  /*
    showTenderi(event:MatCheckboxChange): void {
      if(event.checked){
        this.showTenders = true;
        console.log(event.checked);
      } else{
        this.showTenders = false;
        console.log(event.checked);
      }
    }
  
    showPrilozi(event:MatCheckboxChange): void {
  
      if(event.checked){
        this.showPrilog = true;
        console.log(event.checked);
      } else{
        this.showPrilog = false;
        console.log(event.checked);
      }
    }
  
    showPonistuvanja(event:MatCheckboxChange): void {
      if(event.checked){
        this.showDelete = true;
        console.log(event.checked);
      } else{
        this.showDelete = false;
        console.log(event.checked);
     }
    }
  */
  //Checkbox END

  disableFormInput() {
    // if (this.tenderForm.controls['tender_url'].value != "") {
    //   this.tenderForm.controls['tender_description'].disable();
    //   this.tenderForm.controls['tender_image'].disable();
    // }
    // if (this.tenderForm.controls['tender_image'].value != "") {
    //   this.tenderForm.controls['tender_description'].disable();
    //   this.tenderForm.controls['tender_url'].disable();
    // }
    // if (this.tenderForm.controls['tender_description'].value != "") {
    //   this.tenderForm.controls['tender_url'].disable();
    //   this.tenderForm.controls['tender_image'].disable();
    // }
    // if (this.tenderForm.controls['tender_url'].value == "" && this.tenderForm.controls['tender_description'].value == "" && this.tenderForm.controls['tender_image'].value == "") {
    //   this.tenderForm.controls['tender_url'].enable();
    //   this.tenderForm.controls['tender_description'].enable();
    //   this.tenderForm.controls['tender_image'].enable();
    // }
  }

  transformDate(date, index = 0) {
    var dateFormat = ['dd.MM.yyyy'];
    var dateToDB = this.datePipe.transform(date, dateFormat[index]);
    return dateToDB;
  }

  //generatePDF(action = 'open', tenderMedium: string, contractingInstitutionName: string, tenderSubject: string) {
  generatePDF(pk_value: number) {

    let action = 'open';
    let singleTender: any = this.tendersList.filter(Tenders => Tenders.tender_id === pk_value);
    console.log(singleTender);
    let docDefinition = {
      content: [
        {
          // image: 'logo',
          // width: 160,
          // height: 160, 
        },
        // {text: 'zebra style', margin: [0, 20, 0, 8]},

        {

          style: 'tableExample',
          table: {
            heights: 30,
            body: [
              [{ text: 'Медиум', style: 'header' }, singleTender[0].tender_medium],
              [{ text: 'Договорен орган', style: 'header' }, singleTender[0].contractingInstitutionName],
              [{ text: 'Предмет на договор', style: 'header' }, singleTender[0].tender_subject],
              [{ text: 'Тип на тендер', style: 'header' }, singleTender[0].tender_type],
              [{ text: 'Број на оглас', style: 'header' }, singleTender[0].processNumber],
              [{ text: 'Датум на објава', style: 'header' }, this.transformDate(singleTender[0].tender_date)],
              [{ text: 'Датум на краен рок', style: 'header' }, this.transformDate(singleTender[0].tender_expire)],
              [{ text: 'Вид на постапка', style: 'header' }, singleTender[0].entityProcedureType],
              [{ text: 'Вид на договор', style: 'header' }, singleTender[0].goodsWorksServices],
              [{ text: 'Линк на тендерот', style: 'header' }, singleTender[0].tender_url],
              // [{text:'Набавката e делива', style: 'header'}, singleTender[0].isDevided],
              [{ text: 'Проценета вредност', style: 'header' }, singleTender[0].estimatedValue]

            ]
          },

          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              return (rowIndex % 2 === 0) ? '#EDF2F7' : null;
            },
            hLineColor: '#dce2e8',
            vLineColor: '#dce2e8'
          }
        },
        {
          // Footer content
        }
      ],
      styles: {
        header: {
          fontSize: 12,
          bold: true
        }
      }
    }

    if (action === 'download') {
      pdfMake.createPdf(docDefinition).download();
    } else if (action === 'print') {
      pdfMake.createPdf(docDefinition).print();
    } else {
      pdfMake.createPdf(docDefinition).open();
    }
  }

  openFile(fileName) {
    //window.open("../../../assets/sette_documents/" + fileName, '_blank');
    window.open("../../../../../main/src/main/sette_documents/" + fileName, '_blank');
  }

  addTender() {
    if (this.tenderForm.controls['tender_url'].valid &&
      this.tenderForm.controls['tender_date'].valid &&
      this.tenderForm.controls['tender_expire'].value &&
      this.tenderForm.controls['tender_image'].value) {
      this.alert_warning = false;
      //format date
      let tender_date_format = this.formatDate(this.tenderForm.controls['tender_date'].value, 1);
      let tender_expire_format = this.formatDate(this.tenderForm.controls['tender_expire'].value, 1);

      //change value
      this.tenderForm.controls['tender_date'].setValue(tender_date_format);
      this.tenderForm.controls['tender_expire'].setValue(tender_expire_format);

      /*
        tender_id, 
        tender_date, 
        tender_description, 
        tender_expire, 
        tender_medium, 
        tender_publisher, 
        tender_subject, 
        tender_type, 
        tender_url, 
        datumnaobjava, 
        dogovorenorgan, 
        vidnapostapka, 
        datumkraenrok, 
        vidnadogovor, 
        nabavkataedeliva, 
        keys_arr, 
        broglas, 
        str_out, 
        predmetnadogovor, 
        is_ponistuvanje, 
        is_prilog, 
        tender_document
      */
      this.tenders.tender_date = this.tenderForm.controls['tender_date'].value;
      this.tenders.tender_description = this.tenderForm.controls['tender_description'].value;
      this.tenders.tender_expire = this.tenderForm.controls['tender_expire'].value;
      this.tenders.tender_medium = this.tenderForm.controls['tender_medium'].value;
      //this.tenders.tender_publisher   = "";
      this.tenders.tender_subject = this.tenderForm.controls['tender_subject'].value;
      this.tenders.tender_type = "";
      this.tenders.tender_url = this.tenderForm.controls['tender_url'].value;
      // this.tenders.datumnaobjava      = this.tenderForm.controls['tender_date'].value;
      //this.tenders.dogovorenorgan     = "";
      // this.tenders.vidnapostapka      = "";
      //this.tenders.datumkraenrok      = this.tenderForm.controls['tender_expire'].value;
      //this.tenders.vidnadogovor       = "";
      //this.tenders.nabavkataedeliva   = "";
      //this.tenders.keys_arr           = "";
      //this.tenders.broglas            = "";
      // this.tenders.str_out            = ""; 
      // this.tenders.predmetnadogovor   = ""; 
      this.tenders.isPonistuvanje = false; //isPonistuvanje
      this.tenders.isPrilog = false; //isPrilog
      this.tenders.tender_document = this.tenderForm.controls['tender_url'].value;

      this.tenderService.addTender(this.tenders).subscribe(result => this.getTenders());
      this.resetForm();
    } else {
      this.alert_warning = true;
    }
  }

  scrapeTender() {
    if (this.tenderForm.controls['tender_url'].value == "") {
      this.tenderForm = this.formBuilder.group({
        tender_type: ['',],
        tender_medium: ['',],
        contractingInstitutionName: ['',],
        tender_subject: ['',],
        tender_description: [''],
        tender_url: ['', Validators.required],
        tender_image: [''],
        tender_date: ['',],
        tender_expire: ['',],
      });
    }
    else {
      const splitBy = this.tenderForm.controls['tender_url'].value.split('\/');
      this.tenderService.getSingleTender(splitBy[0], splitBy[1], this.tendersList).subscribe(result => this.getTenders());
    }
    this.resetForm();
  }

  public getTenders(): void {
    this.tenderService.getTenders().subscribe(
      (response: Tenders[]) => {

        this.numberOfTenders = response.length;
        if (this.numberOfTenders > 0) {
          this.tendersList = response;
          //Filters
          // this.numberOfTenders = this.tendersList.filter(Tenders => Tenders.tender_type === "Тендер").length;
          // this.numberOfAttachment = this.tendersList.filter(Attachment => Attachment.tender_type === "Прилози").length;
          // this.numberOfCancellations = this.tendersList.filter(Cancellations => Cancellations.tender_type === "Поништување").length;
          // this.numberOfTechnicalDialog = this.tendersList.filter(TecnicalDialogue => TecnicalDialogue.tender_type === "Технички дијалог").length;
          // this.numberOfTenderWinners = this.tendersList.filter(TenderWinners => TenderWinners.tender_type === "Одлуки").length;
          // this.numberOfConcessionAnnouncements = this.tendersList.filter(numberOfConcessionAnnouncements => numberOfConcessionAnnouncements.tender_type === "Концесии/ЈПП").length;
          // //order by
          this.tendersList.sort((a, b) => {
            let tender_date_a = a.tender_date;
            let tender_date_b = b.tender_date;

            if (tender_date_a < tender_date_b) return -1;
            if (tender_date_a > tender_date_b) return 1;

            return 0;
          })
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getJson(): void {
    this.tenderService.getJsonTenders().subscribe(
      (response: JSONdoc[]) => {

        this.numberOfTenders = response.length;
        if (this.numberOfTenders > 0) {
          this.myList = response;
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getClientTags(): void {
    this.clientTagService.getClientTags().subscribe({
      next: (response: clientTags[]) => { this.clientTagsList = response; },
      error: (error: HttpErrorResponse) => { console.log(error.message); },// errorHandler 
      complete: () => { console.log("completeHandler"); } // completeHandler
    });
  }

  public getClients(): void {
    this.clientAdminService.getClient().subscribe({
      next: (response: clientAdmin[]) => { this.clientList = response; },
      error: (error: HttpErrorResponse) => { console.log(error.message); },// errorHandler 
      complete: () => { console.log("completeHandler"); } // completeHandler
    });
  }

  openSnackBar(message: string, action: string,) {
    this._snackBar.open(message, action, {
      duration: 3000,
      panelClass: "sette-dialog"
    });
  }

  editTender(tenderID: number) {
    if (this.tenderForm.controls['tender_url'].valid &&
      this.tenderForm.controls['tender_date'].valid &&
      this.tenderForm.controls['tender_expire'].value &&
      this.tenderForm.controls['tender_image'].value) {

      this.alert_warning = false;
      this.tenders.tender_type = this.tenderForm.controls['tender_type'].value;
      this.tenders.tender_medium = this.tenderForm.controls['tender_medium'].value;
      this.tenders.tender_subject = this.tenderForm.controls['tender_subject'].value;
      this.tenders.tender_description = this.tenderForm.controls['tender_description'].value;
      this.tenders.tender_url = this.tenderForm.controls['tender_url'].value;
      this.tenders.tender_date = this.tenderForm.controls['tender_date'].value;
      this.tenders.tender_expire = this.tenderForm.controls['tender_expire'].value;
      this.tenders.tender_document = this.tenderForm.controls['tender_image'].value;
      console.log(this.tenders);
      console.log("Tender ID:" + tenderID);
      this.tenderService.updateTender(tenderID, this.tenders).subscribe(result => this.getTenders());
      this.resetForm();
      this.openSnackBar('Тендерот е успешно изменет!', 'Затвори');
      this.editMode = false;
    } else {
      this.alert_warning = true;
    }
  }

  loadTender(tenderType: string, tenderMedium: string, tender_description: string,
    tenderSubject: string, contractingInstitutionName: string, tenderURL: string,
    tenderDate: string, tenderExpire: string, indexOfelement: number) {
    //console.log("Load Ljubisa index: "+indexOfelement+" "+this.tendersList[indexOfelement].tender_type);

    this.showTenderForm = true;
    this.tenderForm.controls['tender_type'].setValue(tenderType);
    this.tenderForm.controls['tender_medium'].setValue(tenderMedium);
    this.tenderForm.controls['tender_description'].setValue(tender_description);
    this.tenderForm.controls['tender_subject'].setValue(tenderSubject);
    this.tenderForm.controls['contractingInstitutionName'].setValue(contractingInstitutionName);
    this.tenderForm.controls['tender_url'].setValue(tenderURL);
    this.tenderForm.controls['tender_date'].setValue(tenderDate);
    this.tenderForm.controls['tender_expire'].setValue(tenderExpire);
  }

  tenderClients(tenderID: number, tenderName: string) {
    this.tenderClientsList = [];
    var clientNames: string[] = [];
    this.tenderTagsList = [];
    for (let tenderTag of this.tenderTagList) {
      if (tenderTag.tender.tender_id == tenderID) {
        this.tenderTagsList.push(tenderTag.tag.tag_id)
      }
    }

    for (let clientTag of this.clientTagsList) {
      if (this.tenderTagsList.includes(clientTag.tags.tag_id)) {
        this.tenderClientsList.push(clientTag.clients.client_id)
      }
    }

    for (let client of this.clientList) {
      if (this.tenderClientsList.includes(client.client_id)) {
        clientNames.push(client.client_name)
      }
    }

    const confirmDialog = this.dialog.open(DialogTenderClientsComponent, {
      data: {
        title: 'Клиенти',
        explain: 'Клиенти поврзани со тендерот: ' + tenderName,
        message: clientNames,
        false: 'Затвори'
      }
    });
  }

  deleteTender(tenderID: number, tenderSubject: string) {
    /*this.mediumService.deleteMediums(mediumID).subscribe(result => this.getMediums());
    this.resetForm();*/
    const confirmDialog = this.dialog.open(DialogComponent, {
      data: {
        title: 'Избриши тендер',
        message: 'Дали сте сигурни дека сакате да го избришите тендерот: ' + tenderSubject + '?',
        true: 'Избриши',
        false: 'Откажи'
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.tenderService.deleteTender(tenderID).subscribe(result => this.getTenders());
        this.resetForm();
        this.editMode = false;
        this.openSnackBar("Тендерот е успешно избришан!", "Затвори");
      }
    });
  }

  resetForm() {
    this.tenderForm.reset();
  }


  logOut() {
    this.authService.logOut();
  }

  checkTenderForm() {
    if (this.showTenderForm == false) { this.showTenderForm = true } else { this.showTenderForm = false }
  }


  checkMailForm() {
    if (this.showMailForm == false) { this.showMailForm = true } else { this.showMailForm = false }
  }

  checkTenderClients() {
    if (this.showTenderClients == false) { this.showTenderClients = true } else { this.showTenderClients = false }
  }

  draggable = {
    data: "myDragData",
    effectAllowed: "all",
    disable: false,
    handle: false
  };

  public getTags(): void {
    this.funTagService.fun_tags().subscribe({
      next: (response: FunTags[]) => { this.tagsList = response; },
      error: (error: HttpErrorResponse) => { console.log(error.message); },// errorHandler 
      complete: () => { console.log("completeHandler"); } // completeHandler
    });
  }

  public getTenderTags(): void {
    this.tenderTagService.getTenderTags().subscribe({
      next: (response: TenderTags[]) => { this.tenderTagList = response; },
      error: (error: HttpErrorResponse) => { console.log(error.message); },// errorHandler 
      complete: () => { console.log("completeHandler"); } // completeHandler
    });
  }


  onDragEnd(event: DragEvent) { }

  onDraggableCopied(event: DragEvent, tagID: number) {
    var checkExistingTag = false;
    for (let tenderTag of this.tenderTagList) {
      if (tenderTag.tag.tag_id == tagID && tenderTag.tender.tender_id == this.tenderTagID) {
        checkExistingTag = true;
      }
    }
    if (!checkExistingTag) {
      this.tenderTags = {
        tender_tag_id: -1,
        tender: {
          tender_id: -1,
          tender_type: "",
          tender_medium: "",
          tender_document: "",
          tender_subject: "",
          tender_description: "",
          tender_url: "",
          tender_date: "",
          tender_expire: "",
          isPonistuvanje: false,
          isPrilog: false,
          processNumber: "",
          contractingInstitutionName: "",
          subject: "",
          goodsWorksServices: "",
          entityProcedureType: "",
          announcementDate: "",
          finalDay: "",
          devided: true,
          prilog: false,
          ponistuvanje: false
        },
        tag: {
          tag_id: tagID,
          tag_name_c: "",
          tag_name_l: "",
          tag_color: "",
          parent_tag: true,
          parent_tag_id: -1,
          tags_category: {
            tags_category_id: -1,
            tags_category_name: ""
          }
        }
      };
      //this.tenderTags.tag.tag_id = tagID;
      if (this.selectedTenders.length == 0) {
        this.tenderTags.tender.tender_id = this.tenderTagID;
        this.tenderTagService.addTenderTag(this.tenderTags).subscribe(result => this.getTenderTags());
      }
      if (this.selectedTenders.length != 0) {
        for (let tenderID of this.selectedTenders) {
          this.tenderTags.tender.tender_id = tenderID;
          this.tenderTagService.addTenderTag(this.tenderTags).subscribe(result => this.getTenderTags())
        }
        this.selectedTenders = [];
      }
    }
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
    console.log(this.openedTags)
  }

  onDraggableMoved(event: DragEvent) { }

  onDragCanceled(event: DragEvent) { }

  onDrop(event: DndDropEvent, tenderID: number) {
    this.tenderTagID = tenderID;
  }

  // appendItems() {
  //   console.log("Append Item");
  //   this.addItems("push");
  // }
  // prependItems() {
  //   console.log("Prepend Item");
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
  //   console.log("Add Item "+_method+" sum="+this.sum);
  //  // let start=0;
  //   //if(this.sum>20){start=this.sum-20;}
  //     this.tenderService.getTenders().subscribe(
  //       (response: Tenders[]) => {
  //         if(response.length>0){
  //           this.numberOfTenders = response.length;
  //          // this.tendersList=response.slice(start, this.sum);
  //           //console.log(this.tendersList);
  //           for (let i =0; i < this.sum; ++i) {
  //                if( _method === 'push'){
  //                // this.tendersList=response.slice(0, this.sum);
  //                // console.log("Tender slice "+this.tendersList.length);
  //                // console.log(this.tendersList);

  //           //       console.log("Add Item "+_method+" i:"+i);
  //           //       console.log(response[i]);
  //                  this.tendersList.push(response[i]);
  //               }  else if( _method === 'unshift'){
  //                  this.tendersList.unshift(response[i]);
  //                }
  //           }
            //Filters
          // this.numberOfTenders = this.tendersList.filter(Tenders => Tenders.tender_type === "Тендер").length;
          // this.numberOfAttachment = this.tendersList.filter(Attachment => Attachment.tender_type === "Прилози").length;
          // this.numberOfCancellations = this.tendersList.filter(Cancellations => Cancellations.tender_type === "Поништување").length;
          // this.numberOfTechnicalDialog = this.tendersList.filter(TecnicalDialogue => TecnicalDialogue.tender_type === "Технички дијалог").length;
          // this.numberOfTenderWinners = this.tendersList.filter(TenderWinners => TenderWinners.tender_type === "Одлуки").length;
          // this.numberOfConcessionAnnouncements = this.tendersList.filter(numberOfConcessionAnnouncements => numberOfConcessionAnnouncements.tender_type === "Концесии/ЈПП").length;

             //order by

  //         this.tendersList.sort((a, b) => {
  //           let tender_date_a = a.tender_date;
  //           let tender_date_b = b.tender_date;

  //           if (tender_date_a < tender_date_b) return -1;
  //           if (tender_date_a > tender_date_b) return 1;

  //           return 0;
  //         })
  //           }
  //   },(error: HttpErrorResponse) => {
  //       alert(error.message);
  //   });
  //   //console.log("Lista");
  //   //console.log(this.tendersList[0]);
  //  // return this.tendersList;
  // }
  onScrollUp(){
    console.log("Page scroll:"+this.offset);
    this.offset+=this.limit;
    this.pagination(this.limit,this.offset);
   }
   pagination(limit,offset){
     console.log("Pagination "+offset);
     this.tenderService.getTendersPagination(limit,offset).subscribe((response: Tenders[]) => {this.tendersList=[];this.tendersList.push(...response);});
   }
   filterData(){
   }

}