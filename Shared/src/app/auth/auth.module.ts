import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { UiSharedModule } from '../ui-shared/ui-shared.module';
import { AuthService } from './core/_services/auth.services';
import { HomeComponent } from './home/home.component';

const firebaseConfig = {
  apiKey: "AIzaSyDpjjXW9HEm_3R1AIPmd5xwgYDjYpPlrBM",
  authDomain: "ionicfirebaseauth-ea911.firebaseapp.com",
  projectId: "ionicfirebaseauth-ea911",
  storageBucket: "ionicfirebaseauth-ea911.appspot.com",
  messagingSenderId: "959549815952",
  appId: "1:959549815952:web:5ba6f1e4e898bc044bac15"
}

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UiSharedModule,

    // Firebase
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule
  ],
  exports: [
    SignupComponent,
    LoginComponent,
    HomeComponent
  ],
  providers: [
    AuthService
  ]
})
export class SharedAuthModule { }
