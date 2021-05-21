import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private toastCtrl: ToastController, 
              public loadtCtrl: LoadingController,) { }

  async presentToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      color: color,
      cssClass: "align-center",
      position: 'top',
      duration: 2000
    });
    await toast.present();
  }

async presentLoading() {
    const loading = await this.loadtCtrl.create({
        message: 'Por favor espere..',
    });
    await loading.present();
    return loading;
}

}
