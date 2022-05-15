import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {

  mode = environment.mode;
  errorMessage = '';

  constructor(
    private router: Router
  ) { }

  onAPIOutput(data) {
    if (data.isApiSuccess) {
      this.errorMessage = '';
      localStorage.setItem('res', JSON.stringify(data));
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = data.response.message
    }
  }

}
