// Vendors
import { AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
  })
export class AlertService {
    constructor(
        private alertController: AlertController,
    ) {}

    public async alert(header: string) {
        const alert = await this.alertController.create({
            header: header,
            message: 'Please, check your data',
            buttons: ['OK']
        });

        await alert.present();
    }
}
