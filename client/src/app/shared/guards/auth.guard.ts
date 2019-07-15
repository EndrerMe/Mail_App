// Vendors
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {
  constructor(
    private router: Router,
    private storage: Storage,
  ) { }

  public async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const currentUser = await this.storage.get("currentUser")

    if (currentUser) {
      return true;
    }

    this.router.navigate(['auth/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
