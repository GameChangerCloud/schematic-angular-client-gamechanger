import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-factonics-spinner',
  templateUrl: './factonics-spinner.component.html',
  styleUrls: ['./factonics-spinner.component.scss']
})
export class FactonicsSpinnerComponent implements OnInit {

  @Input() spinnerMsg: string;

  constructor() { }

  ngOnInit(): void {
  }

}
