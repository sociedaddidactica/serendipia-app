import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpService } from '../services/http/http.service';

@Component({
  selector: 'app-musica',
  templateUrl: './musica.page.html',
  styleUrls: ['./musica.page.scss'],
})
export class MusicaPage implements OnInit {

  constructor(private navCtrl: NavController, 
              private http: HttpService) { 

  }
  goTo(page) {
    switch (page) {
        case 'concentracion':
            localStorage.setItem("section_name", "Concentración");
            localStorage.setItem("section_icon", "");
            this.getIdSection("Concentración").then((res:any) => {
                let section = res.section;
                this.navCtrl.navigateForward("/main/musicplayer-dark/" + section.id_seccion);
            }, (error) => {
                console.log("Error " + JSON.stringify(error));
            });
            break;
        case 'sueño':
            localStorage.setItem("section_name", "Encuentra el Sueño");
            localStorage.setItem("section_icon", "");
            this.getIdSection("Encuentra el Sueño").then((res:any) => {
                let section = res.section;
                this.navCtrl.navigateForward("/main/musicplayer-dark/" + section.id_seccion);
            }, (error) => {
                console.log("Error " + JSON.stringify(error));
            });
            break;
        case 'naturaleza':
            localStorage.setItem("section_name", "Naturaleza");
            localStorage.setItem("section_icon", "");
            this.getIdSection("Naturaleza").then((res:any) => {
                let section = res.section;
                this.navCtrl.navigateForward("/main/musicplayer-dark/" + section.id_seccion);
            }, (error) => {
                console.log("Error " + JSON.stringify(error));
            });
            break;
        case 'relajante':
            localStorage.setItem("section_name", "Relajante");
            localStorage.setItem("section_icon", "");
            this.getIdSection("Relajante").then((res:any) => {
                let section = res.section;
                this.navCtrl.navigateForward("/main/musicplayer-dark/" + section.id_seccion);
            }, (error) => {
                console.log("Error " + JSON.stringify(error));
            });
            break;
        case 'soñar_despierto':
            localStorage.setItem("section_name", "Soñar Despierto");
            localStorage.setItem("section_icon", "");
            this.getIdSection("Soñar Despierto").then((res:any) => {
                let section = res.section;
                this.navCtrl.navigateForward("/main/musicplayer-dark/" + section.id_seccion);
            }, (error) => {
                console.log("Error " + JSON.stringify(error));
            });
            break;
        case 'trabajo':
            localStorage.setItem("section_name", "Trabajo");
            localStorage.setItem("section_icon", "");
            this.getIdSection("Trabajo").then((res:any) => {
                let section = res.section;
                this.navCtrl.navigateForward("/main/musicplayer-dark/" + section.id_seccion);
            }, (error) => {
                console.log("Error " + JSON.stringify(error));
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
