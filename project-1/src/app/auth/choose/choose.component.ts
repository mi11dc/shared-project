import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-choose',
  templateUrl: './choose.component.html',
  styleUrls: ['./choose.component.scss'],
})
export class ChooseComponent implements OnInit {

  mode = environment.mode;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  onBtnClick(data) {
    switch(data) {
      case 0:
        this.router.navigate(['/auth/signup']);
        break;
      case 1:
        this.router.navigate(['/auth/login']);
        break;
    }
  }

}
