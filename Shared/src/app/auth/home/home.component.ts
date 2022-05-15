import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'shared-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  @Input() mode = "mode";
  @Output() homeSelection = new EventEmitter();

  constructor() { }

  ngOnInit() {}


  onButtonClick(selected) {
    this.homeSelection.next(selected);
  }

}
