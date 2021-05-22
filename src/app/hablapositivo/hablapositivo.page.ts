import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CalendarComponentOptions } from 'ion2-calendar';
import * as moment from 'moment';
import { HttpService } from '../services/http/http.service';
import { UtilsService } from '../services/utils/utils.service';

@Component({
  selector: 'app-hablapositivo',
  templateUrl: './hablapositivo.page.html',
  styleUrls: ['./hablapositivo.page.scss'],
})
export class HablapositivoPage implements OnInit {
  id_usuario: string;
  date: string;
  type: 'string';

  message: {
    id: string,
    time: string,
    title: string,
    content: string
  };

  message_list: any[];
  
  optionsRange: CalendarComponentOptions;

  constructor(private navCtrl: NavController, 
              private route: ActivatedRoute, 
              private http: HttpService,
              private util: UtilsService) { 

    this.id_usuario = localStorage.getItem('id_usuario');
    let date = new Date(), y = date.getFullYear(), m = date.getMonth();
    let startOfMonth = new Date(y, m, 1);

    this.optionsRange = {
      from: startOfMonth,
      monthFormat: 'MMMM YYYY',
      weekdays: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
      weekStart: 1,
      color: 'light',
      monthPickerFormat: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'],
      showToggleButtons: true,

    };
  }

  async getMessages(fecha: string) {
    const myLoading = await this.util.presentLoading();
    
    this.http.getMessages(fecha).then((res:any) => {
      
      if (res.error){
        myLoading.dismiss();
        this.util.presentToast(res.message, "danger");
      } else {
        this.message_list = res.messages_list;
        myLoading.dismiss();  
      }
    },
    (error) => {
      myLoading.dismiss();
      this.util.presentToast("Ha ocurrido un error, inténtelo mas tarde", "danger");
      console.error("Error " + error.message);
    });
    
  }

  goBack() {
    this.navCtrl.navigateBack('/main/midiario');
  }

  onChange(event) {
    let date_selected = moment(event.time).format("YYYY-MM-DD")
    console.log(date_selected);
    this.getMessages(date_selected);
  }

  ngOnInit() {
  }

}

