import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClipComponent } from '../clip/clip.component';

@Component({
  selector: 'app-dialog-clip-group',
  templateUrl: './dialog-clip-group.component.html',
  styleUrls: ['./dialog-clip-group.component.css']
})
export class DialogClipGroupComponent implements OnInit {

  title: string;
  message: string;

  @Input() clipObj: ClipComponent;

  constructor(public dialogRef: MatDialogRef<DialogClipGroupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void { 
  }

}
