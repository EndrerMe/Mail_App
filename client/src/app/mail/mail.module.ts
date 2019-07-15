// Vendors
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Ng2ImgMaxModule } from 'ng2-img-max';

// Pages
import { MailPage } from 'src/app/mail/mail.page';
// Routers
import { MailSideMenuPageRoutingModule } from 'src/app/mail/mail-router.module';
// Components
import { MailMenuComponent } from 'src/app/shared/directives/mail-menu/mail-menu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MailSideMenuPageRoutingModule,
    Ng2ImgMaxModule,
  ],
  declarations: [
    MailPage,
    MailMenuComponent
  ],
  providers: [
  ]
})
export class MailPageModule {}
