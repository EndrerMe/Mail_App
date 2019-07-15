// Vendors
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { DomSanitizer } from '@angular/platform-browser';

// Serivces
import { MailService } from 'src/app/shared/services';
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
  public senderAvatarUrl: Object;
  private visibility: number;

  constructor(
    private mailService: MailService,
    private storage: Storage,
    private domSanitizer: DomSanitizer,
  ) {
    this.storage.get("currentUser").then((res) => {
      this.mailService.getAllOutcoming(res.idUser).subscribe((res) => {
        this.letters = res;

        for (let i = 0; i < this.letters.length; i++) {
          let avatar = this.letters[i].recipient.userAvatar;
          this.letters[i].recipient.userAvatar = this.domSanitizer.bypassSecurityTrustUrl(avatar) as string;
        }
      },
      (err) => {
        console.log(err)
      })
    })
  }

  ngOnInit() {
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

      this.storage.get("currentUser").then((res) => {
        this.mailService.getAllOutcoming(res.idUser).subscribe((res) => {
          this.letters = res;
  
          for (let i = 0; i < this.letters.length; i++) {
            let avatar = this.letters[i].recipient.userAvatar;
            this.letters[i].recipient.userAvatar = this.domSanitizer.bypassSecurityTrustUrl(avatar) as string;
          }
        },
        (err) => {
          console.log(err)
        })
      })

      event.target.complete();
    }, 2000);
  }

  loadData(event) {
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

}
