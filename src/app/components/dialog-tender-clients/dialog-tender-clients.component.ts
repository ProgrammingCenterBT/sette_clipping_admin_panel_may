import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-dialog-tender-clients',
  templateUrl: './dialog-tender-clients.component.html',
  styleUrls: ['./dialog-tender-clients.component.css']
})
export class DialogTenderClientsComponent implements OnInit {
  
  title: string;
  message: string;
  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
}
