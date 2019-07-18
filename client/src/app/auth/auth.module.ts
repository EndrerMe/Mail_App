// Vendors
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

// Pages
import { AuthPage } from 'src/app/auth/auth.page';
// Routers
import { AuthPageRoutingModule } from 'src/app/auth/auth-router.module';
// Components
import { AuthMenuComponent } from '../shared/directives/auth-menu/auth-menu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthPageRoutingModule
  ],
  declarations: [
    AuthPage,
    AuthMenuComponent
  ]
})
export class AuthPageModule {}
