import { Injectable } from '@angular/core';

import { Message } from '@ngscaffolding/models';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(public toastController: ToastController) {}

  async showMessage(message: Message) {
    switch (message.severity) {
      case 'error': {
        const toast = await this.toastController.create({
            header: message.summary,
          message: message.detail,
          color: 'danger',
          duration: 5000,
          showCloseButton: true
        });
        toast.present();
        break;
      }
      default: {
        const toast = await this.toastController.create({
          message: message.detail,
          duration: 2000
        });
        toast.present();
      }
    }
  }
}
