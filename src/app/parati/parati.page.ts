import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http/http.service';
import { UtilsService } from '../services/utils/utils.service';

@Component({
  selector: 'app-parati',
  templateUrl: './parati.page.html',
  styleUrls: ['./parati.page.scss'],
})
export class ParatiPage implements OnInit {

  nombre_usuario: string;

  constructor(private util: UtilsService, 
              private router: Router,
							private http: HttpService) { }

  goTo(page) {
    let versionApp = localStorage.getItem("version_app");
		let name_section = "";
    switch (page) {
        case 'iniciando_meditacion':
					localStorage.setItem("background_img", "/assets/CATEGORIAS/meditacion/Iniciacion_a_la_meditacion_back.jpg");
					localStorage.setItem("section_name", "Iniciación a la meditación");
					// localStorage.setItem("section_icon", "/assets/ICONS/icon-iniciacion.svg");
					name_section = "Iniciación a la meditación";
          break;
        case 'eliminar_ansiedad':
					// localStorage.setItem("section_name", "Eliminando la ansiedad de comer");
					// localStorage.setItem("section_icon", "/assets/ICONS/icon-eliminando-ansiedad.svg");
					name_section = "Eliminando la ansiedad de comer";
          break;
        case 'salud_plena':
					localStorage.setItem("background_img", "/assets/CATEGORIAS/meditacion/Salud_plena.jpg");
          localStorage.setItem("section_name", "Salud plena");
					// localStorage.setItem("section_icon", "/assets/ICONS/icon-salud-plena.svg");
					name_section = "Salud plena";
          break;
				case 'miedo_rechazo':
					localStorage.setItem("background_img", "/assets/CATEGORIAS/hipnosis/miedo_al_rechazo.jpg");
					localStorage.setItem("section_name", "Miedo al rechazo");
					// localStorage.setItem("section_icon", "/assets/ICONS/icon-miedo.svg");
					name_section = "Miedo al rechazo";
					break;
				case 'triangulo_exito':
					localStorage.setItem("background_img", "/assets/CATEGORIAS/meditacion/Triangulo_del_exito.jpg");
					localStorage.setItem("section_name", "El triángulo del éxito");
					// localStorage.setItem("section_icon", "/assets/ICONS/icon-triangulo-exito.svg");
					name_section = "El triángulo del éxito";
					break;
				case 'dejando_fumar':
					localStorage.setItem("background_img", "/assets/CATEGORIAS/hipnosis/dejar_de_fumar.jpg");
					localStorage.setItem("section_name", "Dejar de fumar");
					// localStorage.setItem("section_icon", "/assets/ICONS/icon-no-fumar.svg");
					name_section = "Dejar de fumar";
					break;
        default:
            break;
    }

		if (versionApp == "PENDIENT" || versionApp == "EXPIRATED"){
			this.router.navigate(['/main/configuracion']);
		} else {
			if (page == 'eliminar_ansiedad'){
				this.router.navigate(["/main/erradicaransiedad"]);
			} else {
				this.getIdSection(name_section).then((res:any) => {
					let section = res.section;
					this.router.navigate(["/main/musicplayer/" + section.id_seccion]);
				}, (error) => {
					console.info("[Error]: " + JSON.stringify(error));
					this.util.presentToast("Verifique su conexión a internet he intente mas tarde", "warning");
				});
			}
		}
  
	}

	getIdSection(nombre_seccion) {
		return this.http.getIdProductSection(nombre_seccion);
	}

  ngOnInit() {
    this.nombre_usuario = localStorage.getItem('nombre');
  }

}
