import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-gamechanger-admin-entity-dialog',
  templateUrl: './gamechanger-admin-entity-dialog.component.html',
  styleUrls: ['./gamechanger-admin-entity-dialog.component.scss']
})
export class GamechangerAdminEntityDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    console.log(this.data);
  }



}
