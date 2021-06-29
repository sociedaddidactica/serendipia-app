import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpService } from '../services/http/http.service';
import { UtilsService } from '../services/utils/utils.service';

@Component({
  selector: 'app-midiario',
  templateUrl: './midiario.page.html',
  styleUrls: ['./midiario.page.scss'],
})
export class MidiarioPage implements OnInit {
	id_user: string;

  constructor(private navCtrl: NavController, 
              private http: HttpService,
							private util: UtilsService) { 
		
		this.id_user = localStorage.getItem("id_usuario");
  }

  async goTo(page) {
		let section: any;
    switch (page) {
        case 'cuaderno':
					this.getIdSection("Cuaderno").then((res:any) =>{ 
						section = res.section;
						this.navCtrl.navigateForward("/main/cuaderno");
						this.util.saveInteraction({"id_usuario": this.id_user, "id_tipo_interaccion": "4", "id_objeto": section.id_seccion});
					}, error => {
						this.util.presentToast("Ocurrió un error, intente de nuevo", "danger");
						console.info("[Error]: " + JSON.stringify(error));
					});
          break;
        case 'habla':
					this.getIdSection("Habla positivo").then((res:any) =>{ 
						section = res.section;
						this.navCtrl.navigateForward("/main/hablapositivo");
						this.util.saveInteraction({"id_usuario": this.id_user, "id_tipo_interaccion": "4", "id_objeto": section.id_seccion});
					}, error => {
						this.util.presentToast("Ocurrió un error, intente de nuevo", "danger");
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
