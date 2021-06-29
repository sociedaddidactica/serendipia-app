import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { HttpService } from '../services/http/http.service';
import { UtilsService } from '../services/utils/utils.service';

@Component({
  selector: 'app-modal-new-event',
  templateUrl: './modal-new-event.page.html',
  styleUrls: ['./modal-new-event.page.scss'],
})
export class ModalNewEventPage implements OnInit {

	@Input() p_id_task: string = "";
	@Input() p_title_task: string = "";
	@Input() p_descrip_task: string = "";
	@Input() p_fecha_task: string = "";
	@Input() p_time_task: string = "";

	frm_task: FormGroup;
	
	 constructor(public modalCtrl : ModalController,
							private alertCtrl: AlertController,
							private formBuilder: FormBuilder,
							private http: HttpService,
              private util: UtilsService,
							navParams: NavParams
							) {
		
		this.p_id_task = navParams.get('id_task');
		this.p_title_task = navParams.get('title_task');
		this.p_descrip_task = navParams.get('descrip_task');
		this.p_fecha_task = navParams.get('fecha_task');
		this.p_time_task = navParams.get('time_task');
		
		this.buildForm();
	
	}

	buildForm(){
		let fecha_t = this.p_fecha_task === undefined ? moment().format("YYYY/MM/DD") : moment(this.p_fecha_task, ["YYYY-MM-DD"]).format("YYYY/MM/DD");
		let time_t = this.p_time_task === undefined ? moment().format("HH:mm") : moment(this.p_time_task, ["hh:mm A"]).format("HH:mm");

		console.info(fecha_t);
		console.info(time_t);
		console.info(this.p_title_task);

		this.frm_task = this.formBuilder.group({
			title_task: [this.p_title_task, Validators.required],
			descrip_task: [this.p_descrip_task],
			fecha_task: [fecha_t, Validators.required],
			time_task: [time_t, Validators.required],
		});	
	}

	async goBack() {
		// const closeModal: string = "Modal Closed";
    await this.modalCtrl.dismiss();
  }

	async guardarDatos(){
		let datos_task = new Array();
		let fecha_t;
		datos_task = this.frm_task.value;
		// let fecha = datos.fecha.slice(0, datos.fecha.indexOf('T'));
		
		if (datos_task["fecha_task"].indexOf('T') >= 0){
			let ft = datos_task["fecha_task"].slice(0, datos_task["fecha_task"].indexOf('T'));
			// fecha_t = moment(ft, ["YYYY-MM-DD"]).format("YYYY/MM/DD");
			fecha_t = ft;
		} else {
			let ft = datos_task["fecha_task"];
			fecha_t = moment(ft, ["YYYY/MM/DD"]).format("YYYY-MM-DD");
			
		}
		datos_task["fecha_task"] = fecha_t;
		datos_task["id_task"] = this.p_id_task;
		this.saveTask(datos_task);
		// await this.modalCtrl.dismiss(datos_task);
	}

	async saveTask(data: any) {
		let id_usuario = localStorage.getItem('id_usuario');
		
		const myLoading = await this.util.presentLoading();
		const datos = {
			id_task: data.id_task,
			id_usuario: id_usuario,
			title: data.title_task,
			descrip: data.descrip_task,
			fecha: data.fecha_task,
			time: data.time_task
		};

		this.http.saveTask(datos).then((res:any) => {
			if (res.error){
				myLoading.dismiss();
				this.util.presentToast(res.message, "danger");
			} else {
				this.util.presentToast(res.message, "principal");
				myLoading.dismiss();
				this.modalCtrl.dismiss(res);
			}
		},
		(error) => {
			myLoading.dismiss();
			this.util.presentToast("Ha ocurrido un error, inténtelo mas tarde", "danger");
			console.info("[Error]: " + error.message);
		});
	}

	async deleteTask(){
    const myLoading = await this.util.presentLoading();
    let id_usuario = localStorage.getItem('id_usuario');
    const datos = {
      id_task: this.p_id_task,
      id_usuario: id_usuario,
    };

    this.http.deleteTask(datos).then((res:any) => {
      if (res.error){
        myLoading.dismiss();
        this.util.presentToast(res.message, "danger");
      } else {
        myLoading.dismiss();  
        this.util.presentToast(res.message, "principal");
        this.modalCtrl.dismiss(res);
      }
    },
    (error) => {
      myLoading.dismiss();
      this.util.presentToast("Ha ocurrido un error, inténtelo mas tarde", "danger");
      console.info("[Error]: " + error.message);
    });
    
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-alert',
      header: '¿Está seguro de eleminar la tarea?',
      message: '',
      buttons: [
        {
          text: 'Si',
          cssClass: 'secondary',
          handler: () => {
            this.deleteTask();
          }
        }, 
        {
          text: 'No',
          cssClass: 'danger',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    await alert.present();
  }

  ngOnInit() {
  }

}
