import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http/http.service';
import { UtilsService } from '../services/utils/utils.service';

@Component({
  selector: 'app-introduccion',
  templateUrl: './introduccion.page.html',
  styleUrls: ['./introduccion.page.scss'],
})
export class IntroduccionPage implements OnInit {

    id_user: any;

    preferences = [
        { id: 'pre1', name: 'Reducir la ansiedad', isChecked: false },
        { id: 'pre2', name: 'Mejorar la productividad', isChecked: false },
        { id: 'pre3', name: 'Crear bienestar', isChecked: false },
        { id: 'pre4', name: 'Crear consciencia', isChecked: false },
    ];

  constructor(private navCtrl: NavController, 
                private route: ActivatedRoute, 
                private util: UtilsService, 
                private http: HttpService,) { }

  goToRegistro(){
      let prefer_user = [{
          id_user: this.id_user,
          pref1: this.preferences[0].isChecked, 
          pref2: this.preferences[1].isChecked, 
          pref3: this.preferences[2].isChecked, 
          pref4: this.preferences[3].isChecked
      }];
      

      this.http.saveUserPreferences(prefer_user).then(
        (res: any) => {
            this.util.loadtCtrl.dismiss();
            if (res.error){
                this.util.presentToast(res.message, "danger");
            } else {
                this.util.presentToast(res.message, "principal");
                setTimeout(()=>{
                    this.navCtrl.navigateForward('/subinicio');
                }, 3000);
            }
        },
        (error) => {
            this.util.loadtCtrl.dismiss();
            this.util.presentToast("Ha ocurrido un error, inténtelo mas tarde", "danger");
            console.error("Error " + error.message);
        }
    );
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('idUser');
    this.id_user = id;
  }

}
