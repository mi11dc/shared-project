import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'shared-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  @Output() homeSelection = new EventEmitter();

  constructor() { }

  ngOnInit() {}


  onButtonClick(selected) {
    this.homeSelection.next(selected);
  }

}
