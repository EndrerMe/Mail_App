// Vendors
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { Events } from '@ionic/angular';

// Interfaces
import { IUser } from 'src/app/shared/interfaces';
import { AuthService, MailService } from '../../services';
@Component({
  selector: 'app-mail-menu',
  templateUrl: './mail-menu.component.html',
  styleUrls: ['./mail-menu.component.scss'],
})
export class MailMenuComponent implements OnInit {

  public user: IUser;
  public userName: string;
  public avatarUrl: object | string;

  public menuLinks = [
    {
      title: 'Incoming',
      url: '/mail/incoming',
      unreadedLetter: 0,
    },
    {
      title: 'Outgoing',
      url: '/mail/outgoing'
    },
    {
      title: 'New Letter',
      url: '/mail/newLetter'
    }
  ];

  constructor(
    private storage: Storage,
    private domSanitizer: DomSanitizer,
    private router: Router,
    private authService: AuthService,
    private ng2ImgMax: Ng2ImgMaxService,
    private mailService: MailService,
    private events: Events,
  ) {
    this.storage.get('currentUser').then((res) => {
      this.user = res;
      this.userName = res.userName;
      this.avatarUrl = this.domSanitizer.bypassSecurityTrustUrl(res.userAvatar)

      this.mailService.getColOfUnreadedLetter(res.idUser).subscribe((res) => {
        this.menuLinks[0].unreadedLetter = res;
      }, (err) => {
        console.log(err)
      })

    }, (err) => {
      console.log(err);
    });

    this.events.subscribe('oneLetterHasBeenRead', (res) => {
      this.menuLinks[0].unreadedLetter -= 1;
    })
  }

  ngOnInit() {}

  public singOut(): void {
    this.storage.remove('currentUser').then((res) => {
      this.router.navigateByUrl('auth');
    });
  }

  public uploadImage(): void {
    document.getElementById('uploadFile').click();
  }

  public changeListener($event): void {
    this.readThis($event.target);
  }

  public async readThis(inputValue: any): Promise<void> {
    let file: File = inputValue.files[0];
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

      this.avatarUrl = myReader.result;
      this.user.userAvatar = this.avatarUrl as string;

      delete this.user.iat;
      delete this.user.exp;
      
      this.authService.chagneUserAvatar(this.user).subscribe((res) => {
        this.storage.set('currentUser', this.user);
      },
      (err) => {
        console.log(err);
      });
    };
    myReader.readAsDataURL(file);
  }

}
