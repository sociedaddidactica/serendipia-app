import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpService } from '../services/http/http.service';

@Component({
  selector: 'app-hipnosis',
  templateUrl: './hipnosis.page.html',
  styleUrls: ['./hipnosis.page.scss'],
})
export class HipnosisPage implements OnInit {

  constructor(private navCtrl: NavController, 
              private http: HttpService) { }

  goBack() {
    this.navCtrl.back();
  }
  goTo(page) {
      let name_section = "";
      switch (page) {
          case 'transformando':
              // localStorage.setItem("section_name", "Transformando lo desconocido en conocido y lo conocido en desconocido");
              localStorage.setItem("section_name", "");
              localStorage.setItem("section_icon", "/assets/ICONS/icon-transforma.svg");
              name_section = "Transformando lo desconocido en conocido y lo conocido en desconocido";
              break;
          case 'soy_necesario':
              // localStorage.setItem("section_name", "Soy necesario (éxito total)");
              localStorage.setItem("section_name", "");
              localStorage.setItem("section_icon", "/assets/ICONS/icon-soy-necesario.svg");
              name_section = "Soy necesario (éxito total)";
              break;
          case 'eliminando_ansiedad':
              // localStorage.setItem("section_name", "Eliminando la ansiedad de comer");
              localStorage.setItem("section_name", "");
              localStorage.setItem("section_icon", "/assets/ICONS/icon-eliminando-ansiedad.svg");
              name_section = "Eliminando la ansiedad de comer";
              break;
          case 'dejando_fumar':
              // localStorage.setItem("section_name", "Dejar de fumar");
              localStorage.setItem("section_name", "");
              localStorage.setItem("section_icon", "/assets/ICONS/icon-no-fumar.svg");
              name_section = "Dejar de fumar";
              break;
          case 'dependencia':
              // localStorage.setItem("section_name", "Dependencia sentimental");
              localStorage.setItem("section_name", "");
              localStorage.setItem("section_icon", "/assets/ICONS/icon-dependencia.svg");
              name_section = "Dependencia sentimental";
              break;
          case 'miedo':
              // localStorage.setItem("section_name", "Miedo al rechazo");
              localStorage.setItem("section_name", "");
              localStorage.setItem("section_icon", "/assets/ICONS/icon-miedo.svg");
              name_section = "Miedo al rechazo";
              break;
          case 'inmune':
              // localStorage.setItem("section_name", "Haciéndome inmune a las críticas");
              localStorage.setItem("section_name", "");
              localStorage.setItem("section_icon", "/assets/ICONS/icon-inmune.svg");
              name_section = "Haciéndome inmune a las críticas";
              break;
          default:
              break;
      }
      this.getIdSection(name_section).then((res:any) => {
          let section = res.section;
          this.navCtrl.navigateForward("/main/musicplayer/" + section.id_seccion);
      }, (error) => {
          console.info("[Error]: " + JSON.stringify(error));
      });
  }
  getIdSection(nombre_seccion) {
      return this.http.getIdProductSection(nombre_seccion);
  }
  ngOnInit() {
  }

}
