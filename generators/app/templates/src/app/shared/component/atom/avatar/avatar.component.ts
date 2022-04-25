import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  @Input() user; // Improve with user types
  @Input() size: string; // CHOICE : S M L
  @Input() type; // CHOICE : card-owner | card-collab | userprofil

  constructor() { }

  ngOnInit(): void {

  }

}
