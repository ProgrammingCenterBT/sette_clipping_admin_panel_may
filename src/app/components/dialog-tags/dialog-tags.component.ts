
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-tags',
  templateUrl: './dialog-tags.component.html',
  styleUrls: ['./dialog-tags.component.css']
})
export class DialogTagsComponent implements OnInit {

  title: string;
  message: string;
  sha1 = require('sha-1');

  constructor(public dialogRef: MatDialogRef<DialogTagsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
