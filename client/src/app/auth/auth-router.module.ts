import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPage } from './auth.page';

const routes: Routes = [
  {
    path: '',
    component: AuthPage,
    children: [
        {
            path: 'registration',
            children: [
              {
                path: '',
                loadChildren: 'src/app/auth/registration/registration.module#RegistrationPageModule'
              }
            ]
        },
          {
            path: 'login',
            children: [
              {
                path: '',
                loadChildren: 'src/app/auth/login/login.module#LoginPageModule'
              }
            ],
        },
        {
            path: '',
            redirectTo: '/auth/registration',
            pathMatch: 'full'
        }
    ]
  },
  {
    path: '',
    redirectTo: '/auth/registration',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthPageRoutingModule {}
