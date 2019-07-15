// Vendors
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

// Services
import { AuthService, AlertService } from 'src/app/shared/services/';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;
  private userNamePattern: RegExp = /^[A-Za-z0-9_]{1,15}$/;
  private userPassPattern: RegExp = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/;
  public show: boolean;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private router: Router,
    private storage: Storage,
  ) {
    
    this.storage.get("currentUser").then((res) => {
      if (res) {
        this.router.navigateByUrl('mail');
      }
    })

    this.show = false;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: new FormControl (
        '', [
          Validators.required,
          Validators.pattern(this.userNamePattern)
      ]),
      userPassword: new FormControl(
        '', [
          Validators.required,
          Validators.pattern(this.userPassPattern),
        ]),
    });
  }

  public login() {
    const formValue = this.loginForm.value;

    this.authService.login(formValue).subscribe( async (res) => {
      const decode = jwt_decode(res.token);
      this.storage.set('currentUser', decode);
      this.router.navigateByUrl('mail');
    },
    (err) => {
      this.alertService.alertAuth(err.error.error);
    })
  }

  public showPassword(): void {
    this.show = !this.show;
  }

}
