import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo/photo.service';
import { Photo } from '../services/photo/photo.service';
import { Camera } from '@ionic-native/camera/ngx';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpService } from '../services/http/http.service';
import { UtilsService } from '../services/utils/utils.service';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { IAPProduct, InAppPurchase2 } from '@ionic-native/in-app-purchase-2/ngx';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {
	
	frm_usuario: FormGroup;
	base64img: string = '';
	photoProfile: Photo;
	paises: Pais[] = [];
	pais_usuario: Pais = {};
	planes: Planes[] = [];
	
	suscrip_usuario: Planes = {};
	fecha_corte: string;
	enable_chang_plan: boolean;
	enable_pagar: boolean;
	visible_pagar: boolean;
	versionApp: string;
	nombre_usuario: string;
	photo_changed: boolean;
	isPro = false;
  products: IAPProduct[] = [];


	constructor(private http: HttpService,  
							private formBuilder: FormBuilder,
							private router: Router, 
							private alertCtrl:  AlertController,
							private camara: Camera,
							public photoService: PhotoService,
							public util: UtilsService,
							private plt: Platform, 
							private store: InAppPurchase2,
							private ref: ChangeDetectorRef
	) 
	{
		console.log("constructor");
		this.planes = JSON.parse(localStorage.getItem("planes"));
		this.plt.ready().then(() => {
      // Only for debugging!
      this.store.verbosity = this.store.DEBUG;
 
      this.registerProducts();
      this.setupListeners();
      
      // Get the real product information
      this.store.ready(() => {
				this.store.products.forEach(iapp => {
					let index = this.planes.findIndex(x => x.id_store = iapp.id);
					this.planes[index].iap_product = iapp;
				});
        // this.products = this.store.products;
        this.ref.detectChanges();
      });
    });
		
		this.initVars();
		this.buildForm();
	}

	initVars(){
		this.enable_pagar = false;
		this.versionApp = localStorage.getItem("version_app");
		if (this.versionApp == "PENDIENT" || this.versionApp == "TRIAL"){
			this.enable_chang_plan = false;
			this.enable_pagar = true;
		} else {
			this.enable_chang_plan = true;
		}
		if (this.versionApp == "FULL"){
			this.visible_pagar = false;
		} else {
			this.visible_pagar = true;
		}
		// this.planes = JSON.parse(localStorage.getItem("planes"));
		this.paises = JSON.parse(localStorage.getItem("paises"));
		this.nombre_usuario = localStorage.getItem("nombre");
		this.pais_usuario.code =  localStorage.getItem("pais");
		this.suscrip_usuario.id = parseInt(localStorage.getItem("id_suscripcion"));
		this.suscrip_usuario.tipo = parseInt(localStorage.getItem("id_tipo_suscripcion"));
		this.fecha_corte = localStorage.getItem("fecha_corte");
		let foto_perfil = this.http.url_base + "/" + localStorage.getItem("profile_photo");
		if (localStorage.getItem("profile_photo") == "null"){
			this.photoProfile = { name: "person.jpg", filepath: "/assets/ICONS/person.jpg", webviewPath: "/assets/ICONS/person.jpg" };
			this.photoService.photos = this.photoProfile;
		} else {
			this.photoProfile = {name: "", filepath: foto_perfil, webviewPath: foto_perfil};
			this.photoService.photos = this.photoProfile;
		}
		this.photo_changed = false;
		
	}

	initForm() {
		this.frm_usuario.controls['nombre_apellido'].setValue(this.nombre_usuario);
		if (this.pais_usuario.code !== "null"){
			this.frm_usuario.controls['pais'].setValue(this.pais_usuario.code);
		}
		
		if (this.versionApp=="EXPIRATED"){
			this.frm_usuario.controls['periodo_corte'].setValue("--");	
		} else {
			this.frm_usuario.controls['plan'].setValue(this.suscrip_usuario.tipo);
			this.frm_usuario.controls['periodo_corte'].setValue(this.fecha_corte);	
		}
	}

	buildForm(){
		this.frm_usuario = this.formBuilder.group({
				nombre_apellido: ['', Validators.required],
				pais: ['', Validators.required],
				plan: ['', Validators.required],
				periodo_corte: ['']
			});
	}

	capturePhoto() {
		console.log(this.camara.PictureSourceType.CAMERA);
		this.photoService.takePicture(this.camara.PictureSourceType.CAMERA);
		if (this.photoProfile.webviewPath != this.photoService.photos.webviewPath && this.photoService.photos.name != "person.jpg"){
			this.photo_changed = true;
		} else {
			this.photo_changed = false;
		}
		this.photoProfile = this.photoService.photos.name == "person.jpg" ? this.photoProfile : this.photoService.photos;
	}

	getPhotoFromGallery() {
		console.log(this.camara.PictureSourceType.SAVEDPHOTOALBUM);
		this.photoService.takePicture(this.camara.PictureSourceType.SAVEDPHOTOALBUM);
		if (this.photoProfile.webviewPath != this.photoService.photos.webviewPath && this.photoService.photos.name != "person.jpg"){
			this.photo_changed = true;
		} else {
			this.photo_changed = false;
		}
		this.photoProfile = this.photoService.photos.name == "person.jpg" ? this.photoProfile : this.photoService.photos;
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

	async cerrarSesion(){
		const myLoading = await this.util.presentLoading();
		let id_user = localStorage.getItem("id_usuario");
		let interaction = { "id_usuario": id_user, "id_tipo_interaccion": "2", "id_objeto": id_user };
		this.util.saveInteraction(interaction); // 2=Finalización de sesión
		localStorage.clear();
		// this.router.navigate(["/inicio"]);
		this.frm_usuario.reset();
		myLoading.dismiss();
		navigator['app'].exitApp();
	}

	ionViewWillEnter(){
		this.initVars();
		this.initForm();
	}

	changePlan(ev){
		let selec_value = ev.detail.value;
		if ((this.versionApp=="EXPIRATED" || this.versionApp=="TRIAL" || this.versionApp=="PENDIENT") && selec_value !== ""){
			// Actualizar fecha de corte 
			let plan_selected = this.planes.find(x => x.id = selec_value);
			let f_fin = moment().add(plan_selected.valid_period, 'months').format("DD/MM/YYYY");
			let hoy = moment().format("DD/MM/YYYY");
			this.fecha_corte = hoy + " - " + f_fin;
			this.frm_usuario.controls['periodo_corte'].setValue(this.fecha_corte);	
		}
	}

	async updateDatos(){
		let change_nombre: boolean = true;
		let change_plan: boolean = true;
		let change_pais: boolean = true;

		if (this.frm_usuario.controls["nombre_apellido"].value === this.nombre_usuario) {
			change_nombre = false;
		}
		if (this.frm_usuario.controls["pais"].value === this.pais_usuario.code) {
			change_pais = false;
		}
		if (this.frm_usuario.controls["plan"].value === this.suscrip_usuario.tipo) {
			change_plan = false;
		}
		
		if (this.photo_changed || change_nombre || change_pais || change_plan){
			let id_user = localStorage.getItem("id_usuario");
			if (change_nombre || change_pais || change_plan){
				const myLoading = await this.util.presentLoading();
				let datos = {
					"id_usuario" : id_user,
					"nombre_apellido" : this.frm_usuario.controls["nombre_apellido"].value,
					"pais" : this.frm_usuario.controls["pais"].value,
					"change_plan" : change_plan,
					"plan_tipo" : this.frm_usuario.controls["plan"].value,
					"plan_old" : this.suscrip_usuario.id
				}	
				this.http.updatePerfil(datos).then((res:any) => {
					myLoading.dismiss();
					this.util.presentToast(res.message, "principal");
					//Update localStorage
					localStorage.setItem("pais", this.frm_usuario.controls["pais"].value);
					localStorage.setItem("nombre", this.frm_usuario.controls["nombre_apellido"].value);
					if (change_plan){
						this.http.getVersionAppForUser(id_user).then((res: any) => {
							// Valores de version pueden ser: NULL, FULL, TRIAL, PENDIENT, EXPIRATED
							this.versionApp = res.versionApp;
							localStorage.setItem('version_app', res.versionApp);
							localStorage.setItem('id_suscripcion', res.id_suscripcion);
							localStorage.setItem('id_tipo_suscripcion', res.id_tipo_suscripcion);
							localStorage.setItem('fecha_corte', res.fecha_corte);
						},
						error => {
							this.util.presentToast("Debe iniciar su sesión nuevamente", "warning");
							setTimeout(() => {
								this.cerrarSesion();	
							}, 2000);
						});
					}
				},
				error => {
					myLoading.dismiss();
					this.util.presentToast("Ha ocurrido un error, inténtelo mas tarde", "danger");
					console.info("[Error]: " + error.message);
				});
			}
			if (this.photo_changed){
				const myLoading2 = await this.util.presentLoading();
				this.http.uploadProfilePic(this.photoProfile, id_user).then(
					(data: any) => {
							myLoading2.dismiss();
							this.util.presentToast("Foto de perfil actualizada exitosamente!", "principal");
							localStorage.setItem('profile_photo', data.pathphoto);
							console.info(JSON.stringify(data));
					},
					(error2) => {
							myLoading2.dismiss();
							this.util.presentToast("Ocurrió un error actualizando su foto", "danger");
							console.info("[Error]: Cargando file: " + JSON.stringify(error2));
					}
			 );
			}
		} else {
			this.util.presentToast("No hay cambios que actualizar", "warning");
		}
		
	}

	/**  Metodos para la compra de la suscripción */
	registerProducts() {
		this.planes.forEach(plan => {
			this.store.register({
				id: plan.id_store,
				type: this.store.CONSUMABLE,
			});	
		});
    this.store.refresh();
  }
 
  setupListeners() {
    // General query to all products
    this.store.when('product')
      .approved((p: IAPProduct) => {
        // Handle the product deliverable
        // if (p.id === PRODUCT_PRO_KEY) {
        //   this.isPro = true;
        // } else if (p.id === PRODUCT_GEMS_KEY) {
        //   this.gems += 100;
        // }
        // this.ref.detectChanges();
 
        return p.verify();
      })
      .verified((p: IAPProduct) => {
				// actualizar los datos de la suscripción en la base de datos
				p.finish()
			});
 
 
    // Specific query for one ID
    // this.store.when(PRODUCT_PRO_KEY).owned((p: IAPProduct) => {
    //   this.isPro = true;
    // });
  }
 
  purchase() {
		let plan_select = this.frm_usuario.controls["plan"].value;
		let index = this.planes.findIndex(x => x.tipo = plan_select);
		let product = this.planes[index].iap_product;
    this.store.order(product).then(p => {
      // Purchase in progress!
			
    }, e => {
			this.util.presentToast(`Failed to purchase: ${e}`, "danger");
    });
  }
 
  // To comply with AppStore rules
  restore() {
    this.store.refresh();
  }
	/****   */

	ngOnInit() {
		console.log("ngOnInit");
  }

	ngOnDestroy(): void {
		console.log("ngOnDestroy");
	}

	ionViewDidLeave() {
		this.frm_usuario.reset();
	}

}

export class Pais {
	constructor(public id?:number, public name?:string, public code?:string) {
	}
}

export class Planes {
	constructor(public id?:number, public id_store?:string, public tipo?:number, public name?:string, public price?:string, public currency?:string, public valid_period?:number, public iap_product?: IAPProduct) {
	}
}


