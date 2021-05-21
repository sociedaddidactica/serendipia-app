import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { PhotoService } from '../services/photo/photo.service';
import { Photo } from '../services/photo/photo.service';
import { Camera } from '@ionic-native/camera/ngx';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../services/http/http.service';
import { UtilsService } from '../services/utils/utils.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {
  
    resultado: any[];
    frm_usuario: FormGroup;
    base64img: string = '';
    private photoProfile: Photo;
    
    constructor(private http: HttpService,  
                private formBuilder: FormBuilder,
                private navCtrl:  NavController,
                private alertCtrl:  AlertController,
                private camara: Camera,
                public photoService: PhotoService,
                public util: UtilsService,
                private geolocation: Geolocation, 
                private nativeGeocoder: NativeGeocoder
                ) 
    {
        this.buildForm();
        
    }

    private buildForm(){
        this.frm_usuario = this.formBuilder.group({
            nombre_apellido: ['', Validators.required],
            f_nacimiento: ['', Validators.required],
            genero: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            usuario: ['',[
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(16),
            ]],
            contrasena: ['', Validators.required]
          });
    }

    async guardarDatos() {
        const myLoading = await this.util.presentLoading();
        const datos_usuario = this.frm_usuario.value;
        
        this.http.createPerfil(datos_usuario).then(
            (res: any) => {
                if (res.error){
                    myLoading.dismiss();
                    this.util.presentToast(res.message, "danger");
                } else {
                    
                    const idUser = res.id_user;
                    // upload profile picture
                    
                    this.http.uploadProfilePic(this.photoProfile, idUser).then(
                       (data) => {
                           myLoading.dismiss();
                           this.util.presentToast(res.message, "principal");
                           console.log(JSON.stringify(data));
                       },
                       (error2) => {
                           myLoading.dismiss();
                           this.util.presentToast(res.message + ", Sin embargo no pudimos cargar su foto", "principal");
                           console.error("Error cargando file: " + JSON.stringify(error2));
                       }
                    );
                    this.frm_usuario.reset();
                    this.photoProfile = {name: "person.jpg", filepath: "/assets/ICONS/person.jpg", webviewPath: "/assets/ICONS/person.jpg"};
                    setTimeout(()=>{
                        this.navCtrl.navigateForward('/introduccion/'+idUser);
                    }, 3000);
                }
            },
            (error) => {
                myLoading.dismiss();
                this.util.presentToast("Ha ocurrido un error, inténtelo mas tarde", "danger");
                console.error("Error " + error.message);
            }
        );
    }

    

    capturePhoto() {
        // this.photoProfile = this.photoService.takePicture(this.camara.PictureSourceType.CAMERA);
        this.photoService.takePicture(this.camara.PictureSourceType.CAMERA);
        this.photoProfile = this.photoService.photos;
    }

    getPhotoFromGallery() {
        // this.photoProfile = this.photoService.takePicture(this.camara.PictureSourceType.PHOTOLIBRARY);
        this.photoService.takePicture(this.camara.PictureSourceType.SAVEDPHOTOALBUM);
        this.photoProfile = this.photoService.photos;
    }

    async presentAlertConfirm() {
        const alert = await this.alertCtrl.create({
          cssClass: 'my-alert',
          header: '¿Que deseas usar?',
          message: '',
          buttons: [
            {
              text: 'Cámara',
              cssClass: 'secondary',
              handler: () => {
                this.capturePhoto();
              }
            }, 
            {
              text: 'Galería',
              cssClass: 'alert-btn-gallery',
              handler: () => {
                this.getPhotoFromGallery();
              }
            }
          ]
        });
    
        await alert.present();
    }

    getCoordinates() {
      let latitude;
      let longitude;
      let self = this;
      console.log("obteniendo coordenadas ");
      this.geolocation.getCurrentPosition().then((resp) => {
          latitude = resp.coords.latitude;
          longitude = resp.coords.longitude;
          // localStorage.setItem('latitude',  latitude + "");
          // localStorage.setItem('longitude', longitude + "");
          self.getUbication(latitude, longitude);
      }).catch((error) => {
          console.log('Error getting location', error);
          localStorage.setItem('countryCode', "NULL");
      });
    }

    getUbication(latitude, longitude) {
        let options = {
            useLocale: true,
            maxResults: 5
        };
        this.nativeGeocoder.reverseGeocode(latitude, longitude, options)
            .then((result) => {
            localStorage.setItem('countryCode', result[0].countryCode);
            //countryCode
            //countryName
            //locality
            console.log(JSON.stringify(result[0]));
        })
            .catch((error) => {
            console.log(error);
            localStorage.setItem('countryCode', "NULL");
        });
    }
    
    ngOnInit() {
        this.getCoordinates();
        this.frm_usuario.reset();
        this.photoProfile = { name: "person.jpg", filepath: "/assets/ICONS/person.jpg", webviewPath: "/assets/ICONS/person.jpg" };
    }
 
}


