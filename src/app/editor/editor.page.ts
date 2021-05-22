import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { HttpService } from '../services/http/http.service';
import { UtilsService } from '../services/utils/utils.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.page.html',
  styleUrls: ['./editor.page.scss'],
})
export class EditorPage implements OnInit {
  id_note: string;
  texto: string;
  
  constructor(private navCtrl: NavController, 
              private alertCtrl:  AlertController,
              private route: ActivatedRoute, 
              private http: HttpService,
              private util: UtilsService,
              private router: Router) { 

    this.id_note = this.route.snapshot.paramMap.get('idNote');
    this.texto = "";
    this.getContentNote();
  }

  goBack() {
    this.navCtrl.back();
  }
  
  async getContentNote() {
    const myLoading = await this.util.presentLoading();
    this.http.getContentNote(this.id_note).then((res:any) => {
      if (res.error){
        myLoading.dismiss();
        this.util.presentToast(res.message, "danger");
      } else {
        this.texto = res.txt_note;
        myLoading.dismiss();  
      }
    },
    (error) => {
      myLoading.dismiss();
      this.util.presentToast("Ha ocurrido un error, inténtelo mas tarde", "danger");
      console.error("Error " + error.message);
    });
    
  }
  
  async saveNote(){
    const myLoading = await this.util.presentLoading();
    let id_usuario = localStorage.getItem('id_usuario');
    const txt_nota = <HTMLInputElement>document.getElementById("note");

    if (txt_nota.value == "") {
      myLoading.dismiss();  
      this.util.presentToast("La nota no puede estar vacía", "danger");
    } else {
      const datos = {
        id_nota: this.id_note,
        id_usuario: id_usuario,
        texto: txt_nota.value
      };

      this.http.saveNote(datos).then((res:any) => {
        if (res.error){
          myLoading.dismiss();
          this.util.presentToast(res.message, "danger");
        } else {
          myLoading.dismiss();  
          this.util.presentToast(res.message, "principal");
          setTimeout(()=>{
            this.router.navigate(['/main/cuaderno']);
          }, 2000);
        }
      },
      (error) => {
        myLoading.dismiss();
        this.util.presentToast("Ha ocurrido un error, inténtelo mas tarde", "danger");
        console.error("Error " + error.message);
      });
    }
  }

  async deleteNote(){
    const myLoading = await this.util.presentLoading();
    let id_usuario = localStorage.getItem('id_usuario');
    const datos = {
      id_nota: this.id_note,
      id_usuario: id_usuario,
    };

    this.http.deleteNote(datos).then((res:any) => {
      if (res.error){
        myLoading.dismiss();
        this.util.presentToast(res.message, "danger");
      } else {
        myLoading.dismiss();  
        this.util.presentToast(res.message, "principal");
        setTimeout(()=>{
          this.router.navigate(['/main/cuaderno']);
        }, 2000);
      }
    },
    (error) => {
      myLoading.dismiss();
      this.util.presentToast("Ha ocurrido un error, inténtelo mas tarde", "danger");
      console.error("Error " + error.message);
    });
    
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-alert',
      header: '¿Está seguro de eleminar la nota?',
      message: '',
      buttons: [
        {
          text: 'Si',
          cssClass: 'secondary',
          handler: () => {
            this.deleteNote();
          }
        }, 
        {
          text: 'No',
          cssClass: 'danger',
          role: 'cancel',
          handler: () => {
            // this.getPhotoFromGallery();
          }
        }
      ]
    });
    await alert.present();
  }

  checkLenght(evt){
    const txt_nota = <HTMLInputElement>document.getElementById("note");
    const max_length: number = parseInt(txt_nota.getAttribute("maxlength"));
    const longitud: number = txt_nota.value.length;
    if (longitud >= max_length && evt.key != "Backspace"){
      this.util.presentToast("Has llegado a longitud máxima de la nota", "danger");
      return false;
    }
  }

  ngOnInit() {
   
  }

}


