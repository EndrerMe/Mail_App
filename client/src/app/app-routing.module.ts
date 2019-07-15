// Vendors
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// Guards
import { TutorialGuard, AuthGuard } from 'src/app/shared/guards';

const routes: Routes = [
  { path: '', redirectTo: 'tutorial-intro', pathMatch: 'full' },
  { path: 'tutorial-intro', loadChildren: 'src/app/tutorial-intro/tutorial-intro.module#TutorialIntroPageModule' },
  { path: 'auth', loadChildren: 'src/app/auth/auth.module#AuthPageModule', canActivate: [TutorialGuard]},
  { path: 'mail', loadChildren: 'src/app/mail/mail.module#MailPageModule', canActivate: [AuthGuard] },
  { path: 'new-letter', loadChildren: './mail/new-letter/new-letter.module#NewLetterPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
