import { PhoneBookFormComponent } from './components/phone-book-form/phone-book-form.component';
import { PhoneBookListingComponent } from './components/phone-book-listing/phone-book-listing.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: PhoneBookListingComponent,
  },
  {
    path: 'new',
    component: PhoneBookFormComponent
  },
  {
    path: ':id',
    component: PhoneBookFormComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhoneBookRoutingModule { }
