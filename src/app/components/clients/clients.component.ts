import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/services/administrator-login-services/authentication.service';
import { clientAdmin } from 'src/app/services/client-admin-services/client-admin';
import { ClientAdminService } from 'src/app/services/client-admin-services/client-admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogComponent } from '../dialog/dialog.component';
import { DndDropEvent } from 'ngx-drag-drop';
import { Tags } from 'src/app/services/tags-service/tags';
import { TagsCategoriesService } from 'src/app/services/tagsCategoriesService/tags-categories.service';
import { tagsCategories } from 'src/app/services/tagsCategoriesService/tagsCategories';
import { FunTagService } from 'src/app/services/functions/fun-tag.service';
import { FunTags } from 'src/app/services/functions/fun-tags';
import { clientTags } from 'src/app/services/client-tags-service/client-tags';
import { ClientTagsService } from 'src/app/services/client-tags-service/client-tags.service';
import { FunClientService } from 'src/app/services/functions/fun-client.service';
import { FunClients } from 'src/app/services/functions/fun-clients';
import { Clients } from 'src/app/services/clients-service/clients';
import { ClientsService } from 'src/app/services/clients-service/clients.service';
import { TagsComponent } from '../tags/tags.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  public clientList: clientAdmin[] =[];
  public funClientList: FunClients[];
  public tagList:Tags[]=[];
  clients: clientAdmin;
  public searchString: string;
  public switchForm = false;
  showOptions = false;
  showMailForm = false;
  showClientForm = false;
  showMailTenderForm = false;

  tagCategoryTagId: number;
  tagCategoryTagName: string;

  clientForm: FormGroup;
  tagCategoryForm: FormGroup;
  clientID: number;
  editMode = false;
  client_name: string;
  trialClients: number[] = [];
  clipForm = true;
  businessForm = false;
  tagsList: Tags[];
  tagsCategory: tagsCategories;
  tagsCategoriesList: tagsCategories[];
  clientTagList: clientTags[];
  tagsToAdd: number[] = [];
  funTagsList: FunTags[];
  alert_warning: boolean      = false;
  alert_warning_tags:boolean  = false;
  searchByCategory: number;

  isCheckedK:boolean=false;
  isCheckedA:boolean=false;
  isCheckedT:boolean=false;
  isCheckedS:boolean=false;
  isCheckedP:boolean=false;
  isCheckedI:boolean=false;
  isCheckedPP:boolean=false;
  isCheckedL:boolean=false;
  isCheckedLT:boolean=false;
  sha1 = require('sha-1');

  @ViewChild('followsClips') followsClips: ElementRef;
  @ViewChild('followsAnalytics') followsAnalytics: ElementRef;
  @ViewChild('followsTenders') followsTenders: ElementRef;
  @ViewChild('followsBankruptcies') followsBankruptcies: ElementRef;
  @ViewChild('followsSales') followsSales: ElementRef;
  @ViewChild('followsNotifications') followsNotifications: ElementRef;
  @ViewChild('isTrial') isTrial: ElementRef;
  @ViewChild('isLatin') isLatin: ElementRef;
  @ViewChild('showTags') showTags: ElementRef;


  //Infinite scroll
  private offset = 0;
  private limit=50;

  constructor(public authService: AuthenticationService, public http: HttpClient, public clientAdminService: ClientAdminService,
    private formBuilder: FormBuilder, public dialog: MatDialog, private _snackBar: MatSnackBar,
    private tagComponent: TagsComponent, private clientTagService: ClientTagsService, private clientsService: ClientsService,
    private funClientService: FunClientService, public tagsCategoriesService: TagsCategoriesService, private funTagService: FunTagService) {
    this.clients = new clientAdmin();
    this.tagsCategory = new tagsCategories();
  }

  ngOnInit(): void {
    this.clientForm = this.formBuilder.group({
      client_name: ['', Validators.required],
      client_id: [''],
      client_username: ['', Validators.required],
      client_password: ['', Validators.required],
      client_email: ['', Validators.required],
      client_bcc: ['', Validators.required],
      mail_title: ['', Validators.required],
      pdf_title: ['', Validators.required],
      follows_clips: [],
      follows_analytics: [''],
      follows_tenders: [''],
      follows_bankruptcies: [''],
      follows_notifications: [''],
      follows_sales: [''],
      is_latin: [''],
      is_trial: [''],
      is_tags: [''],
      pdf_detail: [''],
      custom_message: [''],
      last_clip_report_date: [''],
      last_clip_report_time: [''],
      validate_until: [''],
      is_active: ['']
    });

    this.tagCategoryForm = this.formBuilder.group({
      tags_category_name: ['', Validators.required],
      tags_category_id: [''],
    })


    this.getFunClients();
    this.getClients();
    this.getFunTags();
    this.getTags();
    this.getClientTags();
    this.getTagsCategories();
    this.pagination(this.limit,this.offset);

  }

  checkMailForm() {
    if (this.showMailForm == false) { this.showMailForm = true } else { this.showMailForm = false }
  }

  checkMailTenderForm() {
    if (this.showMailTenderForm == false) { this.showMailTenderForm = true } else { this.showMailTenderForm = false }
  }

  changeForms() {
    if (this.clipForm) this.clipForm = false; else this.clipForm = true;
    if (this.businessForm) this.businessForm = false; else this.businessForm = true;
  }

  openSnackBar(message: string, action: string,) {
    this._snackBar.open(message, action, {
      duration: 3000,
      panelClass: "sette-dialog"
    });
  }

  openClientForm() {
    if (this.showClientForm == false) {
      this.showClientForm = true
    } else {
      this.showClientForm = false
    }
  }

  keepOpen() {
    this.showClientForm = true;
  }

  selectTrialClients() {
    this.trialClients = [];
    for (let client of this.clientList) {
      if (client.is_trial) {
        this.trialClients.push(client.client_id)
      }
    }
    console.log(this.trialClients)
  }
  private createClientTagObject(tag_id: number, client_id: number) {
    let clientTagListNew: any;
    clientTagListNew = ({
      client_tag_id: -1,
      tags: {
        tag_id: tag_id,
        tag_name_c: "",
        tag_name_l: "",
        tag_color: "",
        parent_tag: false,
        parent_tag_id: -1,
        tags_category: {
          tags_category_id: -1,
          tags_category_name: ""
        }
      },
      clients: {
        client_id: client_id,
        client_name: "",
        client_username: "",
        client_password: "",
        client_email: "",
        client_bcc: "",
        mail_title: "",
        pdf_title: "",
        pdf_detail: "",
        custom_message: "",
        follows_clips: false,
        follows_analytics: false,
        follows_tenders: false,
        follows_bankruptcies: false,
        follows_notifications: false,
        follows_sales: false,
        is_latin: false,
        is_trial: false,
        is_tags: false
      }
    });
    return clientTagListNew;
  }
  addClient(followsClips: boolean, followsAnalytics: boolean, followsTenders: boolean, followsBankruptcies: boolean,
    followsSales: boolean, followsNotifications: boolean, isTrial: boolean, isLatin: boolean, showTags: boolean) {

    if (this.clientForm.controls['client_name'].valid &&
      this.clientForm.controls['client_username'].valid &&
      this.clientForm.controls['client_password'].valid &&
      this.clientForm.controls['client_email'].valid &&
      (followsClips || followsAnalytics || followsTenders || followsBankruptcies || followsSales || followsNotifications)) {

      //Valid form
      this.alert_warning = false;
      const number_of_tags:number  = this.tagsToAdd.length;
      const tagsArray = this.tagsToAdd;
      if (number_of_tags > 0) {

        this.clientForm.controls['follows_clips'].setValue(followsClips);
        this.clientForm.controls['follows_analytics'].setValue(followsAnalytics);
        this.clientForm.controls['follows_tenders'].setValue(followsTenders);
        this.clientForm.controls['follows_bankruptcies'].setValue(followsBankruptcies);
        this.clientForm.controls['follows_sales'].setValue(followsSales);
        this.clientForm.controls['follows_notifications'].setValue(followsNotifications);
        this.clientForm.controls['is_trial'].setValue(isTrial);
        this.clientForm.controls['is_latin'].setValue(isLatin);
        this.clientForm.controls['is_tags'].setValue(showTags);
        this.clientForm.controls['client_username'].setValue(this.removeSpaces(this.clientForm.controls['client_username'].value));
        this.clientForm.controls['client_password'].setValue(this.sha1(this.removeSpaces(this.clientForm.controls['client_password'].value)));
        this.clientForm.controls['last_clip_report_date'].setValue(null);
        this.clientForm.controls['last_clip_report_time'].setValue(null);
        this.clientForm.controls['validate_until'].setValue("2023-12-12");
        this.clientForm.controls['is_active'].setValue("true");

        this.clientAdminService.addClient(this.clientForm.value).subscribe((response) => {
          for (let i = 0; i < number_of_tags; i++) {
            let clientTagListNew: clientTags;
            clientTagListNew = this.createClientTagObject(tagsArray[i], response.client_id);
            this.clientTagService.addClientTag(clientTagListNew).subscribe((response) => { this.getClients() });
          }
        });

        this.resetForm();
        this.openSnackBar("Успешно додаден клиент!", "Затвори");
      } else { this.alert_warning = true; }
    } else { this.alert_warning = true; }
  }

  private updateTagsFromClient(clientID: number) {
    if (this.tagsToAdd.length > 0) {
      for (let i = 0; i < this.tagsToAdd.length; i++) {
        let tagsClient: clientTags[] = [];
        tagsClient = this.clientTagList.filter(clientTag => (clientTag.clients.client_id == clientID && clientTag.tags.tag_id == this.tagsToAdd[i]));
        
        if (tagsClient.length == 0) {
          //doesn't exists tag
          let clientTagListNew: clientTags;
          clientTagListNew = this.createClientTagObject(this.tagsToAdd[i], clientID);
          this.clientTagService.addClientTag(clientTagListNew).subscribe((response) => { this.getClients() });
        } else {
          console.log("Find tags for client: " + clientID);
        }
      }
    }
  }
  private removeSpaces(str: string): string {
    let removedSpaces;
    if (str) { removedSpaces = str.split(' ').join(''); }
    return removedSpaces;
  }
  editClient(clientID: number, followsClips: boolean, followsAnalytics, followsTenders, followsBankruptcies,
    followsSales, followsNotifications, isTrial, isLatin: boolean, showTags) {
    if (this.clientForm.controls['client_name'].valid &&
      this.clientForm.controls['client_username'].valid &&
      this.clientForm.controls['client_password'].valid &&
      this.clientForm.controls['client_email'].valid &&
      (followsClips || followsAnalytics || followsTenders || followsBankruptcies || followsSales || followsNotifications)) {

      this.alert_warning = false;//allert
      if (this.tagsToAdd.length > 0) {
        this.clients.client_id              = clientID;
        this.clients.client_name            = this.clientForm.controls['client_name'].value;
        this.clients.client_username        = this.removeSpaces(this.clientForm.controls['client_username'].value);
        this.clients.client_password        = this.sha1(this.removeSpaces(this.clientForm.controls['client_password'].value));
        this.clients.client_email           = this.clientForm.controls['client_email'].value;
        this.clients.client_bcc             = this.clientForm.controls['client_bcc'].value;
        this.clients.mail_title             = this.clientForm.controls['mail_title'].value;
        this.clients.pdf_title              = this.clientForm.controls['pdf_title'].value;
        this.clients.pdf_detail             = this.clientForm.controls['pdf_detail'].value;
        this.clients.custom_message         = this.clientForm.controls['custom_message'].value;
        this.clients.follows_clips          = followsClips;
        this.clients.follows_analytics      = followsAnalytics;
        this.clients.follows_tenders        = followsTenders;
        this.clients.follows_bankruptcies   = followsBankruptcies;
        this.clients.follows_sales          = followsSales;
        this.clients.follows_notifications  = followsNotifications;
        this.clients.is_latin               = isLatin;
        this.clients.is_trial               = isTrial;
        this.clients.is_tags                = showTags;
        console.log(this.clients);
        this.clientAdminService.updateClient(this.clients, clientID).subscribe((result) => { 
        this.updateTagsFromClient(clientID);this.resetForm(); this.getClients(); });
        //this.resetForm();
        this.openSnackBar('Клиентот е успешно изменет!', 'Затвори');
      } else { this.alert_warning = true; }
    } else {
      this.alert_warning = true;
    }
  }

  private dropCopyTags(tagsClient: clientTags[]) {
    if (tagsClient.length > 0) {
      for (let i = 0; i < tagsClient.length; i++) {
        if (!this.tagsToAdd.includes(tagsClient[i].tags.tag_id)) { this.tagsToAdd.push(tagsClient[i].tags.tag_id); }
      }
    } else {
      this.tagsToAdd = [];
    }
    console.log("Add tag");
    console.log(this.tagsToAdd);
  }
  loadClient(name, username, password, email, bcc, mailTitle, pdfTitle, followsClips, followsAnalytics, followsTenders, followsBankruptcies, followsSales, followsNotifications, isTrial, isLatin, showTags) {
    this.alert_warning_tags=false;
    this.clientForm.controls['client_name'].setValue(name);
    this.clientForm.controls['client_username'].setValue(username);
    this.clientForm.controls['client_password'].setValue(password);
    this.clientForm.controls['client_email'].setValue(email);
    this.clientForm.controls['client_bcc'].setValue(bcc);
    this.clientForm.controls['mail_title'].setValue(mailTitle);
    this.clientForm.controls['pdf_title'].setValue(pdfTitle);

    console.log(this.tagList);
    const tagsClient: clientTags[] = this.clientTagList.filter(clientTag => (clientTag.clients.client_id == this.clientID));
    //console.log(tagsClient);
    this.tagsToAdd = [];
    this.dropCopyTags(tagsClient);
    //checked problemot go resava
    this.isCheckedK=followsClips;
    this.isCheckedA=followsAnalytics;
    this.isCheckedT=followsTenders;
    this.isCheckedS=followsBankruptcies;
    this.isCheckedP=followsSales;
    this.isCheckedI=followsNotifications;
    this.isCheckedPP=isLatin;
    this.isCheckedL=isTrial;
    this.isCheckedLT=showTags;
   
    this.getTags();
    console.log(this.clientID + "Load Client " + followsClips + " " + followsTenders + " " + followsBankruptcies + " /" + showTags);

  }

  deleteClient(clientID: number) {
    let client_name = this.clientForm.controls['client_name'].value;
    console.log("delete " + clientID + " " + this.clientForm.controls['client_name'].value);
    const confirmDialog = this.dialog.open(DialogComponent, {
      data: {
        title: 'Избриши клиент',
        message: 'Дали сте сигурни дека сакате да го избришите клиентот: ' + client_name + '?',
        true: 'Избриши',
        false: 'Откажи'
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.clientAdminService.deleteClient(clientID).subscribe(result => this.getClients());
        this.resetForm();
        this.openSnackBar("Клиентот е успешно избришан!", "Затвори");
        this.editMode = false;
      }
    });
  }

  private getFunTags(): void {
    this.funTagService.fun_tags().subscribe({
      next: (response: FunTags[]) => { this.funTagsList = response; },
      error: (error: HttpErrorResponse) => { console.log(error.message); },// errorHandler 
      complete: () => { console.log("completeHandler"); } // completeHandler
    });
  }

  getTagsCategories() {
    this.tagsCategoriesService.getTagsCategories().subscribe(
      (response: tagsCategories[]) => {
        if (response.length > 0) {
          this.tagsCategoriesList = response;
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  resetForm() {
    this.clientForm.reset();
    this.followsClips['checked'] = false;
    this.followsAnalytics['checked'] = false;
    this.followsTenders['checked'] = false;
    this.followsBankruptcies['checked'] = false;
    this.followsSales['checked'] = false;
    this.followsNotifications['checked'] = false;
    this.isLatin['checked'] = false;
    this.isTrial['checked'] = false;
    this.showTags['checked'] = false;
    this.tagsToAdd = [];
  }

  logOut() { this.authService.logOut(); }

  getClients(): any {
    this.clientAdminService.getClient().subscribe(
      {
        next: (response: clientAdmin[]) => { this.clientList = response;},
        error: (error: HttpErrorResponse) => { console.log(error.message); },// errorHandler 
        complete: () => { console.log("completeHandler"); } // completeHandler
      }
    );
  }

  getFunClients(): void {
    this.funClientService.fun_clients().subscribe(
      (response: FunClients[]) => {
        if (response.length > 0) {
          this.funClientList = response;
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  private getTags() {
    //component Authors
    this.tagComponent.getTagsList();
    this.tagsList=this.tagComponent.tagsList;
    console.log(this.tagsList);
  }

  // getTags(): void {
  //   this.tagService.getTags().subscribe(
  //     {
  //       next: (response: Tags[]) => { this.tagsList = response; },
  //       error: (error: HttpErrorResponse) => { console.log(error.message); },// errorHandler 
  //       complete: () => { console.log("completeHandler"); } // completeHandler
  //     }
  //   );
  // }

  getClientTags(): void {
    this.clientTagService.getClientTags().subscribe(
      (response: clientTags[]) => {
        if (response.length > 0) {
          this.clientTagList = response;
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onDrop(event: DndDropEvent) { }

  onDraggableCopied(event: DragEvent, tagID: number) {
    if (!this.editMode) {
      console.log("Doesnt edit mode "+tagID);
      if (!this.tagsToAdd.includes(tagID)) { this.tagsToAdd.push(tagID); }
    } else {
      console.log("Edit mode " + this.clientID + " tag Id:" + tagID);
      if (!this.tagsToAdd.includes(tagID)) { this.tagsToAdd.push(tagID); }
    }
  }

  removeTagFromClient(tagID: number,clientID:number) {
    this.alert_warning_tags=false;
    this.tagsToAdd = this.tagsToAdd.filter(item => item !== tagID);
    const tagsClientLength: number = this.clientTagList.filter(clientTag => (clientTag.clients.client_id == clientID )).length;
    if(tagsClientLength>1){
      const tagsClient: clientTags[] = this.clientTagList.filter(clientTag => (clientTag.clients.client_id == clientID && clientTag.tags.tag_id==tagID));
      this.clientTagService.deleteClientTag(tagsClient[0].client_tag_id).subscribe((result) => {this.getClients(); });
    }else{
      this.alert_warning_tags=true;
    }
  }

  onDraggableMoved(event: DragEvent) { }

  onDragCanceled(event: DragEvent) { }

  draggable = { data: "myDragData", effectAllowed: "all", disable: false, handle: false };

  onDragEnd(event: DragEvent) { }

  create_report():void{
   // const tagsClient: clientTags[] = this.clientTagList.filter(clientTag => (clientTag.clients.client_id == this.clientID));
    console.log("Client id: "+this.clientID);
    this.clientsService.getClientsByID(this.clientID).subscribe( (response:any)  => {
        this.clientsService.sendEmailReport(response).subscribe((result) => { });
      }// nextHandler
     );
  }
  onScrollUp(){
    console.log("Page scroll:"+this.offset);
    this.offset+=this.limit;
    this.pagination(this.limit,this.offset);
   }
   pagination(limit,offset){
     console.log("Pagination "+offset);
     this.clientsService.getClientsPagination(limit,offset).subscribe((response: Clients[]) => {this.clientList=[];this.clientList.push(...response);});
   }
   filterData(){
   }
}