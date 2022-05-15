import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ChooseComponent } from './choose/choose.component';
import { SharedAuthModule, UiSharedModule } from 'Shared';

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    ChooseComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AuthRoutingModule,
    SharedAuthModule,
    UiSharedModule
  ],
  exports: [
    SigninComponent,
    SignupComponent,
    ChooseComponent
  ]
})
export class AuthModule { }
