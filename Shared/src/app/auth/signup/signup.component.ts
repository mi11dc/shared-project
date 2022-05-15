import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../core/_helpers/must-match.validator';
import { AuthService } from '../core/_services/auth.services';

@Component({
  selector: 'shared-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  isFormSubmit: boolean;

  @Input() position = 'floating';
  @Input() mode = "mode";
  @Output() signUpApiOutput = new EventEmitter();

  emailValidation = "^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$";
  passwordValidation = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$";

  constructor(
    private FB: FormBuilder,
    private auth: AuthService
  ) {
    this.setDefaultData();
  }

  get f() {
    return this.signupForm.controls;
  }

  ngOnInit() {}

  setDefaultData() {
    this.isFormSubmit = false;
    this.signupForm = this.FB.group({
      email: [ '', [
        Validators.required,
        Validators.pattern(this.emailValidation) 
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern(this.passwordValidation)
      ]],
      confirm: ['', [
        Validators.required
      ]]
    }, {
      validator: MustMatch('password', 'confirm')
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
      case 'confirm':
        this.f.confirm.setValue(data);
        break;
      default:
        break;
    }
  }

  submitForm() {
    this.isFormSubmit = true;

    if (this.signupForm.invalid) {
      return;
    }

    this.auth.SignUp(this.f.email.value, this.f.password.value).then(res => {
      this.signUpApiOutput.next({
        isApiCalled: true,
        isApiSuccess: true,
        response: res
      });
      console.log(res);
    }).catch(err => {
      this.signUpApiOutput.next({
        isApiCalled: true,
        isApiSuccess: false,
        response: err
      });
      console.log('Something went wrong:', err.message);
    });
  }

}
