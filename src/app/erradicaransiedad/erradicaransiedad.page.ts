import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavController } from '@ionic/angular';
import { CloudService } from '../services/cloud/cloud.service';
import { HttpService } from '../services/http/http.service';

@Component({
  selector: 'app-erradicaransiedad',
  templateUrl: './erradicaransiedad.page.html',
  styleUrls: ['./erradicaransiedad.page.scss'],
})
export class ErradicaransiedadPage implements OnInit {
  dangerousVideoUrl: string;
  trustedVideoUrl: any;

  constructor(private navCtrl: NavController, 
              private domSanitizer: DomSanitizer, 
              private http: HttpService, 
              private cloud: CloudService) { 
    this.updateVideoUrl('_GusQwhAl3Q');
  }

  updateVideoUrl(id) {
    this.dangerousVideoUrl = 'https://www.youtube.com/embed/' + id;
    this.trustedVideoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
  }
  goBack() {
    this.navCtrl.back();
  }
  goTo(page) {
    switch (page) {
        case 'audios_semanales':
            localStorage.setItem("section_name", "Audios Semanales");
            localStorage.setItem("section_icon", "/assets/ICONS/icon-audifonos.svg");
            localStorage.setItem("subsection_icon", "/assets/ICONS/icon-audifonos-filled.svg");
            this.getIdSection("Audios Semanales").then((res: any) => {
                let section = res.section;
                this.navCtrl.navigateForward("/main/sub-section/" + section.id_seccion);
            }, (error) => {
                console.info("[Error]: " + JSON.stringify(error));
            });
            break;
        case 'meditacion':
            localStorage.setItem("section_name", "Meditación guiada");
            localStorage.setItem("section_icon", "/assets/ICONS/icon-meditacion_guiada.svg");
            this.getIdSection("Meditación guiada").then((res: any) => {
                let section = res.section;
                this.navCtrl.navigateForward("/main/musicplayer/" + section.id_seccion);
            }, (error) => {
                console.info("[Error]: " + JSON.stringify(error));
            });
            break;
        case 'tla':
            localStorage.setItem("section_name", "Tu lugar apartado <br><b>TLA</b>");
            localStorage.setItem("section_icon", "/assets/ICONS/icon-TLA.svg");
            this.getIdSection("Tu lugar apartado TLA").then((res:any) => {
                let section = res.section;
                this.navCtrl.navigateForward("/main/musicplayer/" + section.id_seccion);
            }, (error) => {
                console.info("[Error]: " + JSON.stringify(error));
            });
            break;
        case 'ejercicios':
            localStorage.setItem("section_name", "Ejercicios Corporales");
            localStorage.setItem("section_icon", "/assets/ICONS/icon-ejercicios.svg");
            localStorage.setItem("subsection_icon", "/assets/ICONS/icon-audifonos-filled.svg");
            this.getIdSection("Ejercicios Corporales").then((res:any) => {
                let section = res.section;
                //inicializar lista de videos 
                // this.cloud.getVideos(section.id_seccion);
                this.navCtrl.navigateForward("/main/ejerc-corporales/" + section.id_seccion);
            }, (error) => {
                console.info("[Error]: " + JSON.stringify(error));
            });
            break;
        default:
            break;
    }
  }
  getIdSection(nombre_seccion) {
      return this.http.getIdProductSection(nombre_seccion);
  }
  ngOnInit() {
  }

}
