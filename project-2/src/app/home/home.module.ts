import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { HomeService } from './_services/home.service';
import { AddPolicyComponent } from './add-policy/add-policy.component';
import { EditPolicyComponent } from './edit-policy/edit-policy.component';
import { environment } from 'src/environments/environment';

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { UiSharedModule } from 'Shared';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,

    UiSharedModule
  ],
  declarations: [
    HomePage,
    AddPolicyComponent,
    EditPolicyComponent
  ],
  exports: [
    AddPolicyComponent,
    EditPolicyComponent
  ],
  providers: [
    HomeService
  ]
})
export class HomePageModule {}
