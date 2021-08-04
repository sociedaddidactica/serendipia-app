import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpService } from '../services/http/http.service';
import { UtilsService } from '../services/utils/utils.service';

@Component({
  selector: 'app-musica',
  templateUrl: './musica.page.html',
  styleUrls: ['./musica.page.scss'],
})
export class MusicaPage implements OnInit {
	id_user: string;

  constructor(private navCtrl: NavController, 
              private http: HttpService,
							private util: UtilsService) { 
		
		this.id_user = localStorage.getItem("id_usuario");
  }
  goTo(page) {
    switch (page) {
        case 'concentracion':
						localStorage.setItem("background_img", "/assets/MUSICA/concentracion.jpg");
            localStorage.setItem("section_name", "Concentración");
            localStorage.setItem("section_icon", "");
            this.getIdSection("Concentración").then((res:any) => {
                let section = res.section;
                this.navCtrl.navigateForward("/main/musicplayer/" + section.id_seccion);
								this.util.saveInteraction({"id_usuario": this.id_user, "id_tipo_interaccion": "4", "id_objeto": section.id_seccion});
            }, (error) => {
								this.util.presentToast("Ocurrió un error, intente mas tarde", "danger");
                console.info("[Error]: " + JSON.stringify(error));
            });
            break;
        case 'sueño':
						localStorage.setItem("background_img", "/assets/MUSICA/encuentra_el_sueño.jpg");
            localStorage.setItem("section_name", "Encuentra el Sueño");
            localStorage.setItem("section_icon", "");
            this.getIdSection("Encuentra el Sueño").then((res:any) => {
                let section = res.section;
                this.navCtrl.navigateForward("/main/musicplayer/" + section.id_seccion);
								this.util.saveInteraction({"id_usuario": this.id_user, "id_tipo_interaccion": "4", "id_objeto": section.id_seccion});
            }, (error) => {
								this.util.presentToast("Ocurrió un error, intente mas tarde", "danger");
                console.info("[Error]: " + JSON.stringify(error));
            });
            break;
        case 'naturaleza':
						localStorage.setItem("background_img", "/assets/MUSICA/naturaleza.jpg");
            localStorage.setItem("section_name", "Naturaleza");
            localStorage.setItem("section_icon", "");
            this.getIdSection("Naturaleza").then((res:any) => {
                let section = res.section;
                this.navCtrl.navigateForward("/main/musicplayer/" + section.id_seccion);
								this.util.saveInteraction({"id_usuario": this.id_user, "id_tipo_interaccion": "4", "id_objeto": section.id_seccion});
            }, (error) => {
								this.util.presentToast("Ocurrió un error, intente mas tarde", "danger");
                console.info("[Error]: " + JSON.stringify(error));
            });
            break;
        case 'relajante':
						localStorage.setItem("background_img", "/assets/MUSICA/relajante.jpg");
            localStorage.setItem("section_name", "Relajante");
            localStorage.setItem("section_icon", "");
            this.getIdSection("Relajante").then((res:any) => {
                let section = res.section;
                this.navCtrl.navigateForward("/main/musicplayer/" + section.id_seccion);
								this.util.saveInteraction({"id_usuario": this.id_user, "id_tipo_interaccion": "4", "id_objeto": section.id_seccion});
            }, (error) => {
								this.util.presentToast("Ocurrió un error, intente mas tarde", "danger");
                console.info("[Error]: " + JSON.stringify(error));
            });
            break;
        case 'soñar_despierto':
						localStorage.setItem("background_img", "/assets/MUSICA/soñar_despierto.jpg");
            localStorage.setItem("section_name", "Soñar Despierto");
            localStorage.setItem("section_icon", "");
            this.getIdSection("Soñar Despierto").then((res:any) => {
                let section = res.section;
                this.navCtrl.navigateForward("/main/musicplayer/" + section.id_seccion);
								this.util.saveInteraction({"id_usuario": this.id_user, "id_tipo_interaccion": "4", "id_objeto": section.id_seccion});
            }, (error) => {
								this.util.presentToast("Ocurrió un error, intente mas tarde", "danger");
                console.info("[Error]: " + JSON.stringify(error));
            });
            break;
        case 'trabajo':
						localStorage.setItem("background_img", "/assets/MUSICA/trabajo.jpg");
            localStorage.setItem("section_name", "Trabajo");
            localStorage.setItem("section_icon", "");
            this.getIdSection("Trabajo").then((res:any) => {
                let section = res.section;
                this.navCtrl.navigateForward("/main/musicplayer/" + section.id_seccion);
								this.util.saveInteraction({"id_usuario": this.id_user, "id_tipo_interaccion": "4", "id_objeto": section.id_seccion});
            }, (error) => {
								this.util.presentToast("Ocurrió un error, intente mas tarde", "danger");
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
