import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
})
export class LabelComponent implements OnInit {

  @Input() text: string;
  @Input() class: string;
  @Input() color = "primary";
  @Input() position = "fixed";
  @Input() mode = "md";
  
  constructor() { }

  ngOnInit() {}

}
