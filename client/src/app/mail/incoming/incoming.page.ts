// Vendors
import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { DomSanitizer } from '@angular/platform-browser';
import { Events, ToastController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { Router } from '@angular/router';

// Serivces
import { MailService, AlertService } from 'src/app/shared/services';
// Interfaces
import { ILetter } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-incoming',
  templateUrl: './incoming.page.html',
  styleUrls: ['./incoming.page.scss'],
})
export class IncomingPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  
  public userName: string;
  public letters: ILetter[];
  public senderAvatarUrl: Object;
  private visibility: number;

  constructor(
    private mailService: MailService,
    private storage: Storage,
    private domSanitizer: DomSanitizer,
    private events: Events,
    private router: Router,
    private alertService: AlertService,
    private toastController: ToastController,
  ) { 
    this.storage.get("currentUser").then((res) => {
      this.mailService.getAllIncoming(res.idUser).subscribe((res) => {
        this.letters = res;

        for (let i = 0; i < this.letters.length; i++) {
          let avatar = this.letters[i].sender.userAvatar;
          this.letters[i].sender.userAvatar = this.domSanitizer.bypassSecurityTrustUrl(avatar) as string;
        }
      },
      (err) => {
        console.log(err)
      })
    })
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
        console.log(err)
      })
    }

    this.visibility = letterId;
  }

  public doRefresh(event) {
    setTimeout(() => {
      this.storage.get("currentUser").then((res) => {
        this.mailService.getAllIncoming(res.idUser).subscribe((res) => {
          this.letters = res;

          for (let i = 0; i < this.letters.length; i++) {
            let avatar = this.letters[i].sender.userAvatar;
            this.letters[i].sender.userAvatar = this.domSanitizer.bypassSecurityTrustUrl(avatar) as string;
          }
        },
        (err) => {
          console.log(err)
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
    this.events.publish('reply', userName);
    this.router.navigateByUrl('/mail/newLetter');
  }

  public logDrag(idLetter: number): void {
    this.mailService.deleteLetter(idLetter).subscribe( async (res) => {
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
      this.alertService.alertAuth(err.error.error)
    })
  }

}
