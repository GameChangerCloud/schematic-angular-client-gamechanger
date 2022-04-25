import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {

  constructor() { }

  @Input() state: 'success' | 'error' | 'running' | 'in_queue' | 'waiting';

  ngOnInit(): void {
  }

}
