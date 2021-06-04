import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo/photo.service';
import { Photo } from '../services/photo/photo.service';
import { Camera } from '@ionic-native/camera/ngx';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../services/http/http.service';
import { UtilsService } from '../services/utils/utils.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {
	
	frm_usuario: FormGroup;
	base64img: string = '';
	private photoProfile: Photo;
	paises: Pais[] = [];
	pais_usuario: Pais = {};
	planes: Planes[] = [];
	suscrip_usuario: Planes = {};
  
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
		this.pais_usuario.code = localStorage.getItem("pais");
		this.suscrip_usuario.id = parseInt(localStorage.getItem("id_suscripcion"));
		this.buildForm();
		this.getPaises();
		this.getPlanes();
	}

	initForm() {
		let nombre_usuario = localStorage.getItem("nombre");
		this.frm_usuario.controls['nombre_apellido'].setValue(nombre_usuario);
		this.frm_usuario.controls['pais'].setValue(this.pais_usuario.code);
		this.frm_usuario.controls['plan'].setValue(this.suscrip_usuario.id);
		this.frm_usuario.controls['periodo_corte'].setValue('');
	}

	private buildForm(){
		
		this.frm_usuario = this.formBuilder.group({
				nombre_apellido: ['', Validators.required],
				pais: ['' , Validators.required],
				plan: ['', Validators.required],
				periodo_corte: ['']
			});
	}

	async getPaises(){
		const myLoading = await this.util.presentLoading();
    this.http.getPaises().then((res:any) => {
      if (res.error){
        myLoading.dismiss();
        this.util.presentToast(res.message, "danger");
      } else {
				this.paises = res.paises;
				
        myLoading.dismiss();  
      }
    },
    (error) => {
      myLoading.dismiss();
      this.util.presentToast("Ha ocurrido un error, inténtelo mas tarde", "danger");
      console.info("[Error]: " + error.message);
    });
	}

	async getPlanes(){
		const myLoading = await this.util.presentLoading();
    this.http.getPlanes().then((res:any) => {
      if (res.error){
        myLoading.dismiss();
        this.util.presentToast(res.message, "danger");
      } else {
        this.planes = res.planes;
				this.initForm();
        myLoading.dismiss();  
      }
    },
    (error) => {
      myLoading.dismiss();
      this.util.presentToast("Ha ocurrido un error, inténtelo mas tarde", "danger");
      console.info("[Error]: " + error.message);
    });
	}

	// compararPais(pais_cod1: Pais, pais_cod2: Pais) {
  //   if (pais_cod1==null || pais_cod2==null) {
  //     return false;
  //   }
		
  //   return pais_cod1.code===pais_cod2.code;
  // }

	compararPais(e1: Pais, e2: Pais): boolean {
		return e1 && e2 ? e1.code === e2.code : e1 === e2;
	}

	
  ngOnInit() {
		
  }

}

export class Pais {
	constructor(public id?:number, public name?:string, public code?:string) {
	}
}

export class Planes {
	constructor(public id?:number, public name?:string, public precio?:string) {
	}
}


