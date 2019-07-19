// Vendors
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { DomSanitizer } from '@angular/platform-browser';
import { Events } from '@ionic/angular';

// Interfaces
import { IUser } from 'src/app/shared/interfaces';
// Services
import { AuthService } from 'src/app/shared/services';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public avatarUrl: object | string;
  public userName: string;
  private user: IUser;

  constructor(
    private storage: Storage,
    private domSanitizer: DomSanitizer,
    private authService: AuthService,
    private events: Events,
  ) {
    this.storage.get('currentUser').then((res) => {
      this.user = res;
      this.userName = res.userName;
      this.avatarUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(res.userAvatar);
    })
  }

  ngOnInit() {
  }

  public toogleLetter(e: any) {
    this.events.publish('isToggleLetters', e.detail.checked);
    this.storage.set('isToggleLetters', e.detail.checked);
  }

  public uploadImage(): void {
    document.getElementById('uploadFile').click();
  }

  public changeListener($event): void {
    this.readThis($event.target);
  }

  public async readThis(inputValue: any): Promise<void> {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    // await this.ng2ImgMax.resizeImage(file, 100, 100).subscribe(
    //   result => {
    //     file = result;
    //   },
    //   error => {
    //     console.log('😢 Oh no!', error);
    //   }
    // );

    myReader.onloadend = (e) => {

      delete this.user.iat;
      delete this.user.exp;
      this.authService.chagneUserAvatar(this.user).subscribe((res) => {
        this.storage.set('currentUser', this.user);
        console.log(myReader.result)
        this.avatarUrl = myReader.result;
        this.user.userAvatar = this.avatarUrl as string;
      },
      (err) => {
        console.log(err);
      });
    };
    myReader.readAsDataURL(file);
  }

}
