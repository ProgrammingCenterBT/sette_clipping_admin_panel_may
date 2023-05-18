import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Administrators } from 'src/app/services/administrator-login-services/administrators';
import { AdministratorsService } from 'src/app/services/administrator-login-services/administrators.service';
import { AuthenticationService } from 'src/app/services/administrator-login-services/authentication.service';
import { Permissions } from 'src/app/services/permissions-service/permissions';
import { PermissionsService } from 'src/app/services/permissions-service/permissions.service';
import { RolesAndRights } from 'src/app/services/roles-and-rights-services/roles-and-rights';
import { RolesAndRightsService } from 'src/app/services/roles-and-rights-services/roles-and-rights.service';
import { Roles } from 'src/app/services/roles-service/roles';
import { RolesService } from 'src/app/services/roles-service/roles.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-administrators',
  templateUrl: './administrators.component.html',
  styleUrls: ['./administrators.component.css']
})
export class AdministratorsComponent implements OnInit {
  administratorsList: Administrators[] = [];
  roleList: Roles[] = [];
  permissionsList: Permissions[] = [];
  rolesAndRightsList: RolesAndRights[] = [];
  administrator: Administrators;
  permission: Permissions;
  role: Roles;
  rolesAndRights: RolesAndRights;
  searchString: string;
  adminForm: FormGroup;
  roleForm: FormGroup;
  permissionForm: FormGroup;
  rolesAndRightsForm: FormGroup;
  showAdminForm = false;
  editMode = false;
  selectAll = false;
  alert_warning: boolean = false;
  isChecked: boolean = true;
  adminID: number;
  roleID: number;
  rolesAndRightsID: number;
  selectedAdminID: number;
  selectedAdmins = [];
  selectedRolesAndRights = [];
  username: string;
  selectedDropdown: number = 1;
  private numberOfAdmins: number = 0;
  private numberOfRoles: number = 0;
  private numberOfRoleAndRights: number = 0;
  private objRolesAndRights: RolesAndRights[] = [];
  checkBoxPermission: any;

  i: number;

  sha1 = require('sha-1');


  //Infinite scroll
  listArray: string[] = [];
  sum = 3;
  direction = "";


  constructor(private administratorsService: AdministratorsService, private roleService: RolesService,
    private permissionService: PermissionsService, private rolesAndRightsService: RolesAndRightsService,
    public authService: AuthenticationService, public http: HttpClient,
    private formBuilder: FormBuilder, private dialog: MatDialog, private _snackBar: MatSnackBar) {
    this.administrator = new Administrators();
    this.permission = new Permissions();
    this.role = new Roles();
    this.rolesAndRights = new RolesAndRights();
    this.appendItems();

  }

  ngOnInit(): void {
    this.adminForm = this.formBuilder.group({
      administrator_username: ['', Validators.required],
      administrator_password: ['', Validators.required],
      administrator_email: ['', Validators.required],
      role_id: ['']
    });
  
    this.roleForm = this.formBuilder.group({
      name_of_role: ['', Validators.required]
    });

    this.permissionForm = this.formBuilder.group({
      permissions_id: [''],
      permissions_name: ['']
      //permissions_status: ['']
    });


    this.rolesAndRightsForm = this.formBuilder.group({
      roles_and_rights_status: [''],
      permission_id: [''],
      role_id: ['']
    });


    this.getAdministrators();
    this.getRoles();
    this.getPermission();
    this.getRolesAndRights();
  }

  public getAdministrators(): void {
    this.administratorsService.getAdministrators().subscribe({
      next: (response: Administrators[]) => { this.administratorsList = response; },
      error: (error: HttpErrorResponse) => { console.log(error.message); },// errorHandler 
      complete: () => { console.log("completeHandler"); } // completeHandler
    });
  }

  selectAdmins(userID: number) {
    if (this.selectedAdmins.includes(userID)) {
      for (let i = 0; i < this.selectedAdmins.length; i++) {
        if (this.selectedAdmins[i] == userID) {
          this.selectedAdmins.splice(i, 1);
        }
      }
    } else {
      this.selectedAdmins.push(userID);
    }
    console.log(this.selectedAdmins)
  }

  selectAllAdmins() {
    this.selectAll = true;
    for (let administrator of this.administratorsList) {
      this.selectedAdmins.push(administrator.admin_id);
    }
  }

  deleteMultipleAdmins() {
    for (let adminID of this.selectedAdmins) {
      this.administratorsService.deleteAdministrators(adminID).subscribe(result => this.getAdministrators());
    }
    this.selectedAdmins = [];
  }

  openSnackBar(message: string, action: string,) {
    this._snackBar.open(message, action, {
      duration: 3000,
      panelClass: "sette-dialog"
    });
  }

  addAdministrator() {
    console.log("Admin added");
    this.alert_warning = false;
    this.numberOfAdmins = this.administratorsList.filter(Administrators => (Administrators.administrator_username === this.adminForm.controls['administrator_username'].value &&
      Administrators.administrator_password === this.adminForm.controls['administrator_password'].value && Administrators.administrator_email === this.adminForm.controls['administrator_email'].value)).length;

    if (this.numberOfAdmins == 0) {
      console.log("find ME: " + this.numberOfAdmins + " / " + this.adminForm.value);
      this.adminForm.controls['administrator_password'].setValue(this.sha1(this.adminForm.controls['administrator_password'].value));
      this.administratorsService.addAdministrators(this.adminForm.value).subscribe(result => this.getAdministrators());
      this.resetAdminForm();
      this.openSnackBar("Успешно додаден администратор!", "Затвори");
    } else {
      this.alert_warning = true;
    }
  }

  editAdministrator(adminID: number) {
    this.administrator.administrator_username = this.adminForm.controls['administrator_username'].value;
    this.administrator.administrator_password = this.adminForm.controls['administrator_password'].value;
    this.administrator.administrator_email = this.adminForm.controls['administrator_email'].value;
    this.administrator.role_id = this.adminForm.controls['role_id'].value;
    this.administratorsService.updateAdministrators(adminID, this.administrator).subscribe(result => this.getAdministrators());
    this.resetAdminForm();
    this.openSnackBar('Администраторот е успешно изменет!', 'Затвори');
  }

  loadAdministrator(administrator_username: string, administrator_password: string, administrator_email: string, role_id: number) {
    this.adminForm.controls['administrator_username'].setValue(administrator_username);
    this.adminForm.controls['administrator_password'].setValue(administrator_password);
    this.adminForm.controls['administrator_email'].setValue(administrator_email);
    this.adminForm.controls['role_id'].setValue(role_id);
  }

  deleteAdministrator(adminID: number, username: string) {
    /*this.clientAdminService.deleteClient(clientID).subscribe(result => this.getClients());
    this.resetForm();*/
    const confirmDialog = this.dialog.open(DialogComponent, {
      data: {
        title: 'Избриши администратор',
        message: 'Дали сте сигурни дека сакате да го избришите администраторот: ' + username + '?',
        true: 'Избриши',
        false: 'Откажи'
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.administratorsService.deleteAdministrators(adminID).subscribe(result => this.getAdministrators());
        this.resetAdminForm()
        this.openSnackBar("Администраторот е успешно избришан!", "Затвори");
        this.editMode = false;
      }
    });
  }

  //Infinite scroll
  appendItems() {
    this.addItems("push");
  }

  prependItems() {
    this.addItems("unshift");
  }
  onScrollDown(ev: any) {
    console.log("scrolled down!!", ev);

    this.sum += 3;
    this.appendItems();

    this.direction = "scroll down";
  }

  onScrollUp(ev: any) {
    console.log("scrolled up!", ev);
    this.sum += 3;
    this.prependItems();

    this.direction = "scroll up";
  }

  addItems(_method: string) {
    this.administratorsService.getAdministrators().subscribe(
      (response: Administrators[]) => {
        if (response.length > 0) {
          for (let i = 0; i < this.sum; ++i) {
            if (_method === 'push' && (this.sum < response.length)) {
              this.administratorsList.push(response[i]);
            } else if (_method === 'unshift' && (this.sum < response.length && this.sum > 0)) {
              this.administratorsList.unshift(response[i]);
            }
          }
        }
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }


  public getRoles(): void {
    this.roleService.getRoles().subscribe({
      next: (response: Roles[]) => { this.roleList = response; },
      error: (error: HttpErrorResponse) => { console.log(error.message); },// errorHandler 
      complete: () => { console.log("completeHandler"); } // completeHandler
    });
  }


  addRole() {
    this.alert_warning = false;
    this.numberOfRoles = this.roleList.filter(Roles => (Roles.name_of_role === this.roleForm.controls['name_of_role'].value)).length;

    if (this.numberOfRoles == 0) {
      console.log("find ME: " + this.numberOfRoles + " / " + this.roleForm.value);
      this.roleForm.controls['name_of_role'].setValue(this.roleForm.controls['name_of_role'].value);
      this.roleService.addRoles(this.roleForm.value).subscribe(result => this.getRoles());
      this.resetRoleForm();
      this.openSnackBar("Успешно додаденa улога!", "Затвори");
    } else {
      this.alert_warning = true;
    }
  }

  editRole(roleID: number) {
    this.role.name_of_role = this.roleForm.controls['name_of_role'].value;
    this.roleService.updateRoles(this.role, roleID).subscribe(result => this.getRoles());
    this.resetRoleForm();
    this.openSnackBar('Улогата е успешно изменета!', 'Затвори');
  }

  loadRole(name_of_role: string) {
    this.roleForm.controls['name_of_role'].setValue(name_of_role);
  }

  deleteRole(roleID: number, name_of_role: string) {
    const confirmDialog = this.dialog.open(DialogComponent, {
      data: {
        title: 'Избриши улога',
        message: 'Дали сте сигурни дека сакате да ја избришите улогата: ' + name_of_role + '?',
        true: 'Избриши',
        false: 'Откажи'
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.roleService.deleteRoles(roleID).subscribe(result => this.getRoles());
        this.resetRoleForm()
        this.openSnackBar("Улогата е успешно избришана!", "Затвори");
        this.editMode = false;
      }
    });
  }



  public getPermission(): void {
    this.permissionService.getPermissions().subscribe({
      next: (response: Permissions[]) => { this.permissionsList = response; },
      error: (error: HttpErrorResponse) => { console.log(error.message); },// errorHandler 
      complete: () => { console.log("completeHandler"); } // completeHandler
    });
  }

  public getRolesAndRights(): void {
    this.rolesAndRightsService.getRolesAndRights().subscribe({
      next: (response: RolesAndRights[]) => { this.rolesAndRightsList = response; },
      error: (error: HttpErrorResponse) => { console.log(error.message); },// errorHandler 
      complete: () => { console.log("completeHandler"); } // completeHandler
    });
  }

  onChange(event) {
    //const objRolesAndRights=[];
    //https://stackblitz.com/edit/angular-tyfg2z?file=app%2Fapp.component.ts
    if (event.checked) {
      //this.objRolesAndRights.push({"role_id":this.selectedDropdown,"permission_id":event.source.value, "roles_and_rights_status":event.checked});

      this.objRolesAndRights.push({
        "roles_and_rights_id": -1,
        "roles_and_rights_status": event.checked,
        "permission": {
          "permission_id": event.source.value,
          "permissions_name": ""
        },
        "role": {
          "role_id": this.selectedDropdown,
          name_of_role: ""
        }
      });
    } else {
      //const i = this.permissionForm.controls["permission_id"].findIndex(x => x.value === event.source.value);
      //   obj.removeAt(i);

    }

    console.log(this.objRolesAndRights);
  }

  addRolesAndRights() {
    this.alert_warning = false;
    if (this.numberOfRoleAndRights == 0) {
      for (let i = 0; i < this.objRolesAndRights.length; i++) {
        this.rolesAndRightsService.addRolesAndRights(this.objRolesAndRights[i]).subscribe(result => this.getRolesAndRights());
      }
      // for (let item in this.permissionsList){
      //   if this.isChecked==false;
      // }
      this.resetRolesAndRightsForm();
      this.openSnackBar("Успешно додадени Roles&Rights!", "Затвори");
    } else {
      this.alert_warning = true;
    }
  }


  editRolesAndRights(rolesAndRightsID: number) {
    this.rolesAndRights.roles_and_rights_status = this.rolesAndRightsForm.controls['roles_and_rights_status'].value;
    this.rolesAndRights.permission = this.rolesAndRightsForm.controls['permission_id'].value;
    this.rolesAndRights.role = this.rolesAndRightsForm.controls['role_id'].value;
    this.rolesAndRightsService.updateRolesAndRights(this.rolesAndRights, rolesAndRightsID).subscribe(result => this.getRolesAndRights());
    this.resetAdminForm();
    this.openSnackBar('Roles&rights се успешно изменети!', 'Затвори');
  }

  loadRolesAndRights(roles_and_rights_status: string, permission_id: number, role_id: number) {
    this.adminForm.controls['roles_and_rights_status'].setValue(roles_and_rights_status);
    this.adminForm.controls['permission_id'].setValue(permission_id);
    this.adminForm.controls['role_id'].setValue(role_id);
  }

  deleteRolesAndRights(rolesAndRightsID: number) {
    const confirmDialog = this.dialog.open(DialogComponent, {
      data: {
        title: 'Избриши Roles&Rights',
        message: 'Дали сте сигурни дека сакате да го избришите Roles&Rights ?',
        true: 'Избриши',
        false: 'Откажи'
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.rolesAndRightsService.deleteRolesAndRights(rolesAndRightsID).subscribe(result => this.getRolesAndRights());
        this.resetRolesAndRightsForm()
        this.openSnackBar("Roles&Rights е успешно избришан!", "Затвори");
        this.editMode = false;
      }
    });
  }

  selectRolesAndRights(rolesAndRightsID: number) {
    if (this.selectedRolesAndRights.includes(rolesAndRightsID)) {
      for (let i = 0; i < this.selectedAdmins.length; i++) {
        if (this.selectedRolesAndRights[i] == rolesAndRightsID) {
          this.selectedRolesAndRights.splice(i, 1);
        }
      }
    } else {
      this.selectedRolesAndRights.push(rolesAndRightsID);
    }
    console.log(this.selectedRolesAndRights)
  }

  onChangeDropdown(event) {
    this.selectedDropdown = event;
  }

  openAdminForm() {
    if (this.showAdminForm == false) {
      this.showAdminForm = true;
    } else {
      this.showAdminForm = false;
    }
  }
  keepOpen() {
    this.showAdminForm = true;
  }

  resetAdminForm() {
    this.adminForm.reset();
  }

  resetRoleForm() {
    this.roleForm.reset();
  }

  resetRolesAndRightsForm() {
    this.rolesAndRightsForm.reset();
  }
}