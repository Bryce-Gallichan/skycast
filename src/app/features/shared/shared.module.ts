import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';

import { SpinnerComponent } from './spinner/spinner.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatListModule,
    MatButtonModule
  ],
  exports: [
    SpinnerComponent,
    LoaderComponent,

    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatListModule,
    MatButtonModule
  ]
})
export class SharedModule { }