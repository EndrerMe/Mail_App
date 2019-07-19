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
  public letters: ILetter[] = [];
  public senderAvatarUrl: object;
  private visibility: number;
  private currentUserId: number;
  private isToggleLetters: boolean;
  public isMultiselect: boolean;
  private isShowLetterInfo: boolean;
  private multiselectedLetters: number[] = [];

  constructor(
    private mailService: MailService,
    private storage: Storage,
    private domSanitizer: DomSanitizer,
    private events: Events,
    private router: Router,
    private alertService: AlertService,
    private toastController: ToastController,
  ) {
    this.storage.remove('reply');

    this.storage.get('currentUser').then((res) => {
      this.mailService.getAllIncoming(res.idUser).subscribe((res) => {
        this.letters = res;

        for (let i = 0; i < this.letters.length; i++) {
          const avatar = this.letters[i].sender.userAvatar;
          this.letters[i].sender.userAvatar = this.domSanitizer.bypassSecurityTrustUrl(avatar) as string;
        }
      }, (err) => {
        console.log(err);
      });

      this.currentUserId = res.idUser;
    });

    this.isMultiselect = true;
    this.isShowLetterInfo = true;
  }

  ngOnInit() {

  }

  public onPress(e: Event) {
    this.isShowLetterInfo = false;
    this.isMultiselect = false;
  }

  public showMessage(letterId: number, isRead: boolean): void {
    if (this.isShowLetterInfo) {
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
  }

  public doRefresh(event: any) {
    setTimeout(() => {
      this.storage.get('currentUser').then((res) => {
        this.mailService.getAllIncoming(res.idUser).subscribe((res) => {
          this.letters = res;

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

  public multiChangeLetters(idLetter: number, e: any) {
    if (e.detail.checked) {
      this.multiselectedLetters.push(idLetter);
    } else {
      for (let i = 0; i < this.multiselectedLetters.length; i++) {
        if (this.multiselectedLetters[i] === idLetter) {
          this.multiselectedLetters.splice(i, 1);
        }
      }
    }
  }

  public multiselectDelete() {
    if (this.multiselectedLetters.length > 0) {
      this.mailService.deleteMany(this.multiselectedLetters).subscribe((res) => {
        for (let i = 0; i < this.multiselectedLetters.length; i++) {
          for (let j = 0; j < this.letters.length; j++) {
            if (this.multiselectedLetters[i] === this.letters[j].idLetter) {
              this.letters.splice(j, 1);
            }
          }
        }
      }, (err) => {
        console.log(err);
      });
    }
  }

  public closeMultiselect() {
    this.isShowLetterInfo = true;
    this.isMultiselect = true;
    this.multiselectedLetters = [];
  }

}
