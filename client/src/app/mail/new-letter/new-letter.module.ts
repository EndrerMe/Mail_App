// Vendors
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

// Pages
import { NewLetterPage } from 'src/app/mail/new-letter/new-letter.page';
// Modules
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: NewLetterPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
    PickerModule
  ],
  declarations: [NewLetterPage],
  providers: [
  ]
})
export class NewLetterPageModule {}
