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

	@Input() id_task: string;
	@Input() title_task: string;
	@Input() descrip_task: string;
	@Input() fecha_task: string;
	@Input() time_task: string;

	frm_task: FormGroup;
	
	
  constructor(public modalCtrl : ModalController,
							private alertCtrl: AlertController,
							private formBuilder: FormBuilder,
							private http: HttpService,
              private util: UtilsService,
							navParams: NavParams
							) {
		
		this.id_task = navParams.get('id_task');
		this.title_task = navParams.get('title_task');
		this.descrip_task = navParams.get('descrip_task');
		this.fecha_task = navParams.get('fecha_task');
		this.time_task = navParams.get('time_task');
		this.buildForm();
	
	}

	private buildForm(){
		let fecha_t = this.fecha_task === undefined ? moment().format("YYYY MM DD") : this.fecha_task;
		let time_t = this.time_task === undefined ? moment().format("HH:mm") : moment(this.time_task, ["hh:mm A"]).format("HH:mm");

		this.frm_task = this.formBuilder.group({
			title_task: [this.title_task, Validators.required],
			descrip_task: [this.descrip_task],
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
		datos_task = this.frm_task.value;
		datos_task["id_task"] = this.id_task;
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
			// this.modalCtrl.dismiss();
		});
	}

	async deleteTask(){
    const myLoading = await this.util.presentLoading();
    let id_usuario = localStorage.getItem('id_usuario');
    const datos = {
      id_task: this.id_task,
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
