import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CloudService } from '../services/cloud/cloud.service';
import { HttpService } from '../services/http/http.service';
import { UtilsService } from '../services/utils/utils.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  page_next: string;
  version_app: any;

  constructor(private http: HttpService, 
              private router: Router, 
              private util: UtilsService, 
              private cloudService: CloudService) { 
    this.clearStorage();
    this.checkVersionApp();
    //this.checkConexion();
  }

  goTo() {
    this.router.navigate([this.page_next]);
  }

  clearStorage() {
      localStorage.removeItem("version_app");
      localStorage.removeItem("trackList");
      localStorage.removeItem("section_name");
      localStorage.removeItem("section_icon");
      localStorage.removeItem("subsection_icon");
  }

  // Verifica si el usuario está en periodo de prueba o ya canceló la suscripción
  checkVersionApp() {
    let id_user = localStorage.getItem('id_usuario');
    if (id_user === null) {
        localStorage.setItem('sesion', "I");
        this.page_next = '/subinicio';
    }
    else {
        this.http.getVersionAppForUser(id_user).then((res: any) => {
            // Valores de version pueden ser: NULL, FULL, TRIAL, PENDIENT
            this.version_app = res.versionApp;
            localStorage.setItem('version_app', this.version_app);
            if (localStorage.getItem('sesion') == 'A') {
                this.page_next = '/main';
            }
            else {
                this.page_next = '/subinicio';
            }
        }, (error) => {
            localStorage.setItem('sesion', "I");
            this.util.presentToast("Ha ocurrido un error, inténtelo mas tarde", "danger");
            console.error("Error " + error.message);
        });
    }
  }

  checkConexion() {
      this.util.presentToast("Verificando conexion a internet", "danger");
  }

  async initMultimediaList() {
    this.cloudService.getAudios();
    const vList = await this.cloudService.getVideos("6");
    localStorage.setItem("trackVideoList", JSON.stringify(vList));
    localStorage.setItem("trackVideoListBck", JSON.stringify(vList));
    this.cloudService.initVideoList();
  }
  
  ionViewDidEnter() {
      console.info("ionViewDidEnter");
      this.initMultimediaList();
  }

  ngOnInit() {
  }
}