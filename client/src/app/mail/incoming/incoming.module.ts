// Vendors
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

// Pages
import { IncomingPage } from 'src/app/mail/incoming/incoming.page';

const routes: Routes = [
  {
    path: '',
    component: IncomingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [IncomingPage]
})
export class IncomingPageModule {}
