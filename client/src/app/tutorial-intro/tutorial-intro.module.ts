// Vendors
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

// Pages
import { TutorialIntroPage } from 'src/app/tutorial-intro/tutorial-intro.page';

const routes: Routes = [
  {
    path: '',
    component: TutorialIntroPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TutorialIntroPage]
})
export class TutorialIntroPageModule {}
