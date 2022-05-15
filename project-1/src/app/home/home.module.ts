import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { environment } from 'src/environments/environment';

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { HomeService } from './_core/_services/home.service';
import { UiSharedModule } from 'Shared';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';

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
    AddCategoryComponent,
    EditCategoryComponent
  ],
  exports: [
    AddCategoryComponent,
    EditCategoryComponent
  ],
  providers: [
    HomeService
  ]
})
export class HomePageModule {}
