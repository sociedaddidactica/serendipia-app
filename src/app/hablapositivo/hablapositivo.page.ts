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
		date: string,
    time: string,
    title: string,
    content: string
  };

  message_list: any[];
  diaSelected: string;
  
  optionsRange: CalendarComponentOptions;
	id_grupo_usuario: string;

  constructor(private navCtrl: NavController, 
              private route: ActivatedRoute, 
              private http: HttpService,
              private util: UtilsService) { 

    this.id_usuario = localStorage.getItem('id_usuario');
		this.id_grupo_usuario = localStorage.getItem('id_grupo_usuario');
    let date = new Date(), y = date.getFullYear(), m = date.getMonth(), dm = date.getDay();
    let startOfMonth = new Date(y, 1, 1);
    
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

  async getMessages(mes: string) {
    const myLoading = await this.util.presentLoading();
    this.http.getMessagesHP(mes, this.id_grupo_usuario).then((res:any) => {
      if (res.error){
        myLoading.dismiss();
        this.util.presentToast(res.message, "danger");
      } else {
        let message_list = res.messages_list;
				localStorage.setItem("hp_message_list", JSON.stringify(message_list));
        myLoading.dismiss();  
      }
    },
    (error) => {
      myLoading.dismiss();
      this.util.presentToast("Ha ocurrido un error, inténtelo mas tarde", "danger");
      console.info("[Error]: " + error.message);
    });
    
  }

	getMessageOfDay(date) {
		let message_list = [];
		if (localStorage.getItem("hp_message_list") === null) {
			this.message_list = [];
		} else {
			let arry_message = JSON.parse(localStorage.getItem("hp_message_list"));
			arry_message.forEach(function (msg) {
				if (msg.date == date) {
					message_list.push(msg);
				}
			});
			this.message_list = message_list;
		}
	}

  goBack() {
    this.navCtrl.navigateBack('/main/midiario');
  }

  onChange(event) {
		this.clearDaySelected();
    if (event.isToday){
      this.diaSelected = "HOY";
    } else {
      this.diaSelected = moment(event.time).format("DD/MM/YYYY");
    }
    let hoy = moment();
    let time_sel = moment(event.time);
    if (time_sel <= hoy){
      let date_selected = time_sel.format("YYYY-MM-DD");
      this.getMessageOfDay(date_selected);
    } else {
      this.message_list = null;
    }
  }

	onMonthChange(event) {
		this.getMessages(event.newMonth.months);
	}

  ionViewWillEnter(){
		this.clearDaySelected();
		document.getElementsByClassName("today")[0].classList.add("on-selected");
    this.diaSelected = "HOY";
    let date_selected = moment().format("YYYY-MM-DD");
		let date = new Date(), mes_selected = date.getMonth() + 1;
    this.getMessages(mes_selected+"");
		this.getMessageOfDay(date_selected);
  }

	clearDaySelected(){
		var elemento = document.getElementsByClassName("on-selected");
		for(var i = 0; i < elemento.length; i++){
			elemento[i].classList.remove("on-selected");
		}
	}

  ngOnInit() {
  }

}