import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpService } from '../services/http/http.service';
import { UtilsService } from '../services/utils/utils.service';

@Component({
  selector: 'app-meditacion',
  templateUrl: './meditacion.page.html',
  styleUrls: ['./meditacion.page.scss'],
})
export class MeditacionPage implements OnInit {

	id_user: string;
  constructor(private navCtrl: NavController, private http: HttpService, private util: UtilsService) { 
		this.id_user = localStorage.getItem("id_usuario");
	}


  goBack() {
    this.navCtrl.back();
  }
  goTo(page) {
      switch (page) {
          case 'reto_7_dias':
              localStorage.setItem("section_name", "<b>Reto de 7 días de meditación</b><br/>Reencontrándote con tus raíces");
              localStorage.setItem("section_icon", "/assets/ICONS/icon-reto-7dias.svg");
              this.getIdSection("Reto 7 días meditación").then((res:any) => {
                  let section = res.section;
                  this.navCtrl.navigateForward("/main/musicplayer/" + section.id_seccion);
									this.util.saveInteraction({"id_usuario": this.id_user, "id_tipo_interaccion": "4", "id_objeto": section.id_seccion});
              }, (error) => {
                  console.info("[Error]: " + JSON.stringify(error));
              });
              break;
          case 'triangulo':
              localStorage.setItem("section_name", "<br>El triángulo del éxito</br>");
              localStorage.setItem("section_icon", "/assets/ICONS/icon-triangulo-exito.svg");
              this.getIdSection("El triángulo del éxito").then((res:any) => {
                  let section = res.section;
                  this.navCtrl.navigateForward("/main/musicplayer/" + section.id_seccion);
									this.util.saveInteraction({"id_usuario": this.id_user, "id_tipo_interaccion": "4", "id_objeto": section.id_seccion});
              }, (error) => {
                  console.info("[Error]: " + JSON.stringify(error));
              });
              break;
          case '4meditacion':
              localStorage.setItem("section_name", "<b>4 meditaciones</b> <br/>para transformar tu vida");
              localStorage.setItem("section_icon", "/assets/ICONS/icon-4-meditaciones.svg");
              this.getIdSection("4 meditaciones para transformar tu vida").then((res:any) => {
                  let section = res.section;
                  this.navCtrl.navigateForward("/main/musicplayer/" + section.id_seccion);
									this.util.saveInteraction({"id_usuario": this.id_user, "id_tipo_interaccion": "4", "id_objeto": section.id_seccion});
              }, (error) => {
                  console.info("[Error]: " + JSON.stringify(error));
              });
              break;
          case 'iniciacion':
              localStorage.setItem("section_name", "<b>Iniciación a la meditación</b>");
              localStorage.setItem("section_icon", "/assets/ICONS/icon-iniciacion.svg");
              this.getIdSection("Iniciación a la meditación").then((res:any) => {
                  let section = res.section;
                  this.navCtrl.navigateForward("/main/musicplayer/" + section.id_seccion);
									this.util.saveInteraction({"id_usuario": this.id_user, "id_tipo_interaccion": "4", "id_objeto": section.id_seccion});
              }, (error) => {
                  console.info("[Error]: " + JSON.stringify(error));
              });
              break;
          case 'ansiedad_estres':
              localStorage.setItem("section_name", "<b>Ansiedad, estrés y depresión</b>");
              localStorage.setItem("section_icon", "/assets/ICONS/icon-ansiedad-estres.svg");
              this.getIdSection("Ansiedad, estrés y depresión").then((res:any) => {
                  let section = res.section;
                  this.navCtrl.navigateForward("/main/musicplayer/" + section.id_seccion);
									this.util.saveInteraction({"id_usuario": this.id_user, "id_tipo_interaccion": "4", "id_objeto": section.id_seccion});
              }, (error) => {
                  console.info("[Error]: " + JSON.stringify(error));
              });
              break;
          case 'salud_plena':
              localStorage.setItem("section_name", "<b>Salud plena</b>");
              localStorage.setItem("section_icon", "/assets/ICONS/icon-salud-plena.svg");
              this.getIdSection("Salud plena").then((res:any) => {
                  let section = res.section;
                  this.navCtrl.navigateForward("/main/musicplayer/" + section.id_seccion);
									this.util.saveInteraction({"id_usuario": this.id_user, "id_tipo_interaccion": "4", "id_objeto": section.id_seccion});
              }, (error) => {
                  console.info("[Error]: " + JSON.stringify(error));
              });
              break;
          case 'exito_realizacion':
              localStorage.setItem("section_name", "<b>Éxito y realización</b>");
              localStorage.setItem("section_icon", "/assets/ICONS/icon-exito-realizacion.svg");
              this.getIdSection("Éxito y realización").then((res:any) => {
                  let section = res.section;
                  this.navCtrl.navigateForward("/main/musicplayer/" + section.id_seccion);
									this.util.saveInteraction({"id_usuario": this.id_user, "id_tipo_interaccion": "4", "id_objeto": section.id_seccion});
              }, (error) => {
                  console.info("[Error]: " + JSON.stringify(error));
              });
              break;
          case 'sueño_dia_perfecto':
              localStorage.setItem("section_name", "<b>Sueño y día perfecto</b>");
              localStorage.setItem("section_icon", "/assets/ICONS/icon-suenho-dia-p.svg");
              this.getIdSection("Sueño y día perfecto").then((res:any) => {
                  let section = res.section;
                  this.navCtrl.navigateForward("/main/musicplayer/" + section.id_seccion);
									this.util.saveInteraction({"id_usuario": this.id_user, "id_tipo_interaccion": "4", "id_objeto": section.id_seccion});
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
