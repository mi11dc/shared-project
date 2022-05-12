import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LabelComponent } from './label/label.component';
import { SpanComponent } from './span/span.component';
import { InputComponent } from './input/input.component';
import { TextAreaComponent } from './text-area/text-area.component';
import { CheckboxComponent } from './checkbox/checkbox.component';


@NgModule({
  declarations: [
    LabelComponent,
    SpanComponent,
    InputComponent,
    TextAreaComponent,
    CheckboxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
  exports: [
    LabelComponent,
    SpanComponent,
    InputComponent,
    TextAreaComponent,
    CheckboxComponent
  ]
})
export class UiSharedModule { }
