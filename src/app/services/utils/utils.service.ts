import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private toastCtrl: ToastController, 
              public loadtCtrl: LoadingController,
              private http: HttpService) { }

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

  updateAccess(id_user) {
    this.http.updateAccess(id_user).then((res: any) => {
      console.info(res.message);
    },
    (error) => {
      console.error(error.message);
    });
  }
}
