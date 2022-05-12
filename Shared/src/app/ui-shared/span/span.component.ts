import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-span',
  templateUrl: './span.component.html',
  styleUrls: ['./span.component.scss'],
})
export class SpanComponent implements OnInit {

  @Input() text: string;
  @Input() class: string;
  @Input() color = "primary";
  @Input() mode = "md";
  
  constructor() { }

  ngOnInit() {}

}
