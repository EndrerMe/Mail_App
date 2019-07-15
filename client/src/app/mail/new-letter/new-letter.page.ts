// Vendors
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { PickerModule } from '@ctrl/ngx-emoji-mart'
import { Events } from '@ionic/angular';

// Services
import { MailService, AlertService } from 'src/app/shared/services';

@Component({
  selector: 'app-new-letter',
  templateUrl: './new-letter.page.html',
  styleUrls: [
    './new-letter.page.scss',
    "../../../../node_modules/@ctrl/ngx-emoji-mart/picker.css"
    ],
})
export class NewLetterPage implements OnInit {

  public newLetterForm: FormGroup;
  public recipients: string[] = [];
  public replyUser: string = null

  constructor(
    private formBuilder: FormBuilder,
    private mailService: MailService,
    private alertService: AlertService,
    private storage: Storage,
    private events: Events,
  ) {
    this.events.subscribe('reply', (res) => {
      this.replyUser = res;
    })
  }

  ngOnInit() {
    this.newLetterForm = this.formBuilder.group({
      recipient: new FormControl (
        '', [
          Validators.required,
      ]),
      letterText: new FormControl(
        '', [
          Validators.required,
        ]),
    });
  }

  public async sendLetter(): Promise<void> {

    const value = {
      recipient: [],
      letterText: this.newLetterForm.value.letterText,
      sender: null,
    }

    // if (this.newLetterForm.value.recipient.length === 0 
    //   && this.recipients.length === 0) {
    //     this.alertService.alertAuth('Write for who you letter');
    //     return;
    //   }

    if (this.recipients.length === 0) {

      value.recipient.push(this.newLetterForm.value.recipient)

      if (value.letterText.length === 0) {
        this.alertService.alertAuth('Length of the letter should not be equal to 0');
        return;
      }

      await this.storage.get('currentUser').then((res) => {
        value.sender = res.idUser;
      });

      this.mailService.sendLetter(value).subscribe((res) => {
      },
      (err) => {
        this.alertService.alertAuth(err.error.error);
      });
    }

    if (this.recipients.length > 0) {
      value.recipient = this.recipients;

      await this.storage.get('currentUser').then((res) => {
        value.sender = res.idUser;
      });

      this.mailService.sendLetter(value).subscribe((res) => {
      },
      (err) => {
        this.alertService.alertAuth(err.error.error);
      });
    }
  }

  public addRecipient(): void {
    const value = this.newLetterForm.value.recipient;

    this.recipients.push(value)
    this.newLetterForm.reset();
  }

  public deleteRecipient(recipient): void {
    for (let i = 0; i < this.recipients.length; i++) {
      if (this.recipients[i] === recipient) {
        this.recipients.splice( i, 1 );
      }
    }
  }

  doRefresh(event) {
    setTimeout(() => {

      this.newLetterForm.reset();
      this.recipients = []

      event.target.complete();
    }, 2000);
  }

}
