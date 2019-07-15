// Vendors
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

// Services
import { AuthService } from 'src/app/shared/services/auth.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  public registForm: FormGroup;
  private userNamePattern: RegExp = /^[A-Za-z0-9_]{1,15}$/;
  private userPassPattern: RegExp = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private router: Router,
    private storage: Storage,
  ) {
    this.storage.get("currentUser").then((res) => {
      if (res) {
        this.router.navigate(['mail'])
      }
    })
  }

  ngOnInit() {
    this.registForm = this.formBuilder.group({
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
      userRepeatPassword: new FormControl(
        '', [
          Validators.required,
          Validators.pattern(this.userPassPattern),
      ]),
    });
  }

  public register(): void {
    const formValue = this.registForm.value;

    if (formValue.userPassword === formValue.userRepeatPassword) {
      delete formValue.userRepeatPassword;
      this.authService.registration(formValue).subscribe((res) => {
        this.registForm.reset();
        this.router.navigate(['auth/login'])
      },
      (err) => {
        this.alertService.alertAuth(err.error.error)
      });
    } else {
      this.alertService.alertAuth("Your passwords do not match")
    }
  }

}
