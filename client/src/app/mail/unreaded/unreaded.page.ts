// Vendors
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastController, Events } from '@ionic/angular';

// Services
import { MailService, AlertService } from 'src/app/shared/services';
// Interfaces
import { IUser, ILetter } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-unreaded',
  templateUrl: './unreaded.page.html',
  styleUrls: ['./unreaded.page.scss'],
})
export class UnreadedPage implements OnInit {

  public letters: ILetter[] = [];
  private currentUserId: number;
  private visibility: number;

  constructor(
    private mailService: MailService,
    private storage: Storage,
    private router: Router,
    private events: Events,
    private alertService: AlertService,
    private domSanitizer: DomSanitizer,
    private toastController: ToastController,
  ) {

    this.storage.get('currentUser').then((res) => {
      this.mailService.getUnreaded(res.idUser).subscribe((res) => {
        this.letters = res;
      });

      this.currentUserId = res.idUser;
    });
  }

  ngOnInit() {
  }

  public showMessage(letterId: number, isRead: boolean): void {
    if (this.visibility === letterId) {
      this.visibility = null;
      return;
    }

    if (!isRead) {
      this.mailService.readLetter(letterId).subscribe((res) => {
        this.events.publish('oneLetterHasBeenRead');
        for (let i = 0; i < this.letters.length; i++) {
          if (this.letters[i].idLetter === letterId) {
            this.letters[i].isRead = true;
          }
        }
      },
      (err) => {
        console.log(err);
      });
    }

    this.visibility = letterId;
  }

  public doRefresh(event: any) {
    setTimeout(() => {
      this.storage.get('currentUser').then((res) => {
        this.mailService.getUnreaded(res.idUser).subscribe((res) => {
          this.letters = res;
          
          // for (let item of this.letters) {

          // }
          for (let i = 0; i < this.letters.length; i++) {
            const avatar = this.letters[i].sender.userAvatar;
            this.letters[i].sender.userAvatar = this.domSanitizer.bypassSecurityTrustUrl(avatar) as string;
          }
        },
        (err) => {
          console.log(err);
        });
      });
      event.target.complete();
    }, 2000);
  }

  loadData(event) {
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

  public reply(userName: string): void {
    this.storage.set('reply', userName);
    this.router.navigateByUrl('/mail/newLetter');
  }

  public deleteLetter(idLetter: number): void {
    this.mailService.deleteLetter(idLetter, this.currentUserId).subscribe( async (res) => {
      for (let i = 0; i < this.letters.length; i++) {
        if (idLetter === this.letters[i].idLetter) {
          this.letters.splice(i, 1);
        }
      }

      const toast = await this.toastController.create({
        message: 'Letter is delete',
        duration: 1500,
        color: 'dark',
      });

      toast.present();
    }, (err) => {
      this.alertService.alert(err.error.error);
    });
  }

}
