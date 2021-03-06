import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CloudService } from '../services/cloud/cloud.service';
import { HttpService } from '../services/http/http.service';
import { UtilsService } from '../services/utils/utils.service';
import { FcmService } from '../services/fcm/fcm.service';
import { Plugins } from '@capacitor/core';
const { SplashScreen } = Plugins;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  page_next: string;
  version_app: any;
	ready: boolean;

  constructor(private http: HttpService, 
              private router: Router, 
              private util: UtilsService, 
              private cloudService: CloudService,
							private fcm: FcmService,
							) { 
    
		this.ready = false;
		this.checkVersionApp();
		this.clearStorage();
  }

  goTo() {

    let id_user  = localStorage.getItem("id_usuario");
    if (this.page_next == '/main'){
      this.util.updateAccess(id_user);
    }
    this.router.navigate([this.page_next]);
  }

  clearStorage() {
      localStorage.removeItem("version_app");
			localStorage.removeItem("id_suscripcion");
			localStorage.removeItem("fecha_corte");
      localStorage.removeItem("trackList");
      localStorage.removeItem("section_name");
      localStorage.removeItem("section_icon");
      localStorage.removeItem("subsection_icon");
			localStorage.removeItem("hp_message_list");
			localStorage.removeItem("planes");
			localStorage.removeItem("paises");
  }

  // Verifica si el usuario está en periodo de prueba o ya canceló la suscripción
  checkVersionApp() {
    let id_user = localStorage.getItem('id_usuario');
    if (id_user === null) {
        localStorage.setItem('sesion', "I");
        this.page_next = '/subinicio';
				this.ready = true;
    }
    else {
        this.http.getVersionAppForUser(id_user).then((res: any) => {
            // Valores de version pueden ser: NULL, FULL, TRIAL, PENDIENT, EXPIRATED
            this.version_app = res.versionApp;
            localStorage.setItem('version_app', this.version_app);
						localStorage.setItem('id_suscripcion', res.id_suscripcion);
						localStorage.setItem('id_tipo_suscripcion', res.id_tipo_suscripcion);
						localStorage.setItem('fecha_corte', res.fecha_corte);
            if (localStorage.getItem('sesion') == 'A') {
								console.info("Sesión Activa");
								this.fcm.init();
								// Refrescar los grupos de usuarios 
								this.http.getGroups(id_user).then((res: any) => {
									localStorage.setItem('id_grupo_usuario', res.grupos);
								},
								error => {
									console.info("[Error]: " + error.message);
								});
                this.page_next = '/main';
								this.ready = true;
            }
            else {
                this.page_next = '/subinicio';
								this.ready = true;
            }
        }, (error) => {
            localStorage.setItem('sesion', "I");
            this.util.presentToast("Ha ocurrido un error, inténtelo mas tarde", "danger");
            console.info("[Error]: " + error.message);
        });
    }
  }

  async initMultimediaList() {
    this.cloudService.getAudios();
    const vList = await this.cloudService.getVideos("6");
    localStorage.setItem("trackVideoList", JSON.stringify(vList));
  }
  
  ionViewDidEnter() {
		SplashScreen.hide();
		this.initMultimediaList();
		this.initDataSelects();
  }

	initDataSelects() {
		this.cloudService.getPaises();
		this.cloudService.getPlanes();
	}

	ngOnInit() {
		
  }

}

