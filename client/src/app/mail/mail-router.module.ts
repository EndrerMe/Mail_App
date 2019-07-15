// Vendors
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Pages
import { MailPage } from 'src/app/mail/mail.page';

const routes: Routes = [
  {
    path: '',
    component: MailPage,
    children: [
      {
        path: 'incoming',
        children: [
          {
            path: '',
            loadChildren: 'src/app/mail/incoming/incoming.module#IncomingPageModule'
          }
        ]
      },
      {
        path: 'outgoing',
        children: [
          {
            path: '',
            loadChildren: 'src/app/mail/outgoing/outgoing.module#OutgoingPageModule'
          }
        ]
      },
      {
        path: 'newLetter',
        children: [
          {
            path: '',
            loadChildren: 'src/app/mail/new-letter/new-letter.module#NewLetterPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/mail/incoming',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/mail/incoming',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MailSideMenuPageRoutingModule {}
