import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/_services/auth.services';

@Component({
  selector: 'shared-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isFormSubmit: boolean;

  @Input() position = 'floating';
  @Input() mode = "mode";
  @Output() loginApiOutput = new EventEmitter();

  emailValidation = "^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$";
  passwordValidation = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$";

  constructor(
    private FB: FormBuilder,
    private auth: AuthService
  ) {
    this.setDefaultData();
  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {}

  setDefaultData() {
    this.isFormSubmit = false;
    this.loginForm = this.FB.group({
      email: [ '', [
        Validators.required,
        Validators.pattern(this.emailValidation) 
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern(this.passwordValidation)
      ]]
    });
  }

  setEmitData(data, type) {
    switch(type.toString().toLowerCase()) {
      case 'email':
        this.f.email.setValue(data);
        break;
      case 'password':
        this.f.password.setValue(data);
        break;
      default:
        break;
    }
  }

  submitForm() {
    this.isFormSubmit = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.auth.SignIn(this.f.email.value, this.f.password.value).then(res => {
      this.loginApiOutput.next({
        isApiCalled: true,
        isApiSuccess: true,
        response: res
      });
      console.log('You\'re in!', res);
    }).catch(err => {
      this.loginApiOutput.next({
        isApiCalled: true,
        isApiSuccess: false,
        response: err
      });
      console.log('Something went wrong:', err.message);
    });
  }

}
