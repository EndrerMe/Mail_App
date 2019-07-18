// Vendors
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastController } from '@ionic/angular';

// Serivces
import { MailService, AlertService } from 'src/app/shared/services';
// Interfaces
import { ILetter } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-outgoing',
  templateUrl: './outgoing.page.html',
  styleUrls: ['./outgoing.page.scss'],
})
export class OutgoingPage implements OnInit {

  public userName: string;
  public letters: ILetter[];
  public senderAvatarUrl: object;
  private visibility: number;
  private currentUserId: number;

  constructor(
    private mailService: MailService,
    private storage: Storage,
    private domSanitizer: DomSanitizer,
    private alertService: AlertService,
    private toastController: ToastController,
  ) {
    this.storage.remove('reply');
  }

  ngOnInit() {
    this.storage.get('currentUser').then((res) => {
      this.mailService.getAllOutcoming(res.idUser).subscribe((res) => {
        this.letters = res;

        for (let i = 0; i < this.letters.length; i++) {
          const avatar = this.letters[i].recipient.userAvatar;
          this.letters[i].recipient.userAvatar = this.domSanitizer.bypassSecurityTrustUrl(avatar) as string;
        }
      },
      (err) => {
        console.log(err);
      });

      this.currentUserId = res.idUser;
    });
  }

  public showMessage(letterId: number): void {
    if (this.visibility === letterId) {
      this.visibility = null;
      return;
    }

    this.visibility = letterId;
  }

  doRefresh(event) {
    setTimeout(() => {

      this.storage.get('currentUser').then((res) => {
        this.mailService.getAllOutcoming(res.idUser).subscribe((res) => {
          this.letters = res;
  
          for (let i = 0; i < this.letters.length; i++) {
            const avatar = this.letters[i].recipient.userAvatar;
            this.letters[i].recipient.userAvatar = this.domSanitizer.bypassSecurityTrustUrl(avatar) as string;
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

  public logDrag(idLetter: number): void {
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
