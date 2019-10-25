import { PhoneBookFormComponent } from './components/phone-book-form/phone-book-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './../shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhoneBookRoutingModule } from './phone-book-routing.module';
import { PhoneBookListingComponent } from './components/phone-book-listing/phone-book-listing.component';


@NgModule({
  declarations: [PhoneBookListingComponent, PhoneBookFormComponent],
  imports: [
    CommonModule,
    PhoneBookRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [PhoneBookListingComponent, PhoneBookFormComponent]
})
export class PhoneBookModule { }
