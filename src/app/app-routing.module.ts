import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'phone-book-list',
    loadChildren: () => import('./phone-book/phone-book.module').then(m => m.PhoneBookModule)
  },
  {
    path: '**',
    redirectTo: 'phone-book-list'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
