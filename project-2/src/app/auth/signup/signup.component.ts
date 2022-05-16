import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {

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
