import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { HttpService } from '../services/http/http.service';
import { UtilsService } from '../services/utils/utils.service';

@Component({
  selector: 'app-cuaderno',
  templateUrl: './cuaderno.page.html',
  styleUrls: ['./cuaderno.page.scss'],
})
export class CuadernoPage implements OnInit {

  note: {
    id: string,
    date: string,
    content: string
  };

  notebook: any[];
  id_usuario: string;

  constructor(private navCtrl: NavController, 
              private route: ActivatedRoute, 
              private http: HttpService,
              private util: UtilsService) { 
    
    console.log("constrcutor cuaderno ");
    this.id_usuario = localStorage.getItem('id_usuario');
    
    
  }

  async getNotes(id_usuario: string){
    const myLoading = await this.util.presentLoading();
    
    this.http.getNotes(id_usuario).then((res:any) => {
      
      if (res.error){
        myLoading.dismiss();
        this.util.presentToast(res.message, "danger");
      } else {
        this.notebook = res.notes;
        myLoading.dismiss();  
      }
    },
    (error) => {
      myLoading.dismiss();
      this.util.presentToast("Ha ocurrido un error, inténtelo mas tarde", "danger");
      console.error("Error " + error.message);
    });
    
  }

  goTo(id_note){
    console.log(id_note);
    this.navCtrl.navigateForward("/main/editor/" + id_note);
  }

  goBack() {
    this.navCtrl.navigateBack('/main/midiario');
  }

  ionViewWillEnter(){
    console.log("ionViewWillEnter cuaderno ");
    this.getNotes(this.id_usuario);
  }
  ngOnInit() {
    console.log("ngOnInit cuaderno ");
  }

}
