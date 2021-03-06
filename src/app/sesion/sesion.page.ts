import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import {
  FormGroup,
  FormBuilder, 
  Validators,
} from '@angular/forms';

import { HttpService } from '../services/http/http.service';
import { UtilsService } from '../services/utils/utils.service';
import { FcmService } from '../services/fcm/fcm.service';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.page.html',
  styleUrls: ['./sesion.page.scss'],
})
export class SesionPage implements OnInit {

    response: any[];
    frm_login: FormGroup;

    constructor(private http: HttpService,  
                private formBuilder: FormBuilder,
                private util: UtilsService,
                private navCtrl: NavController,
								private fcm: FcmService) { 
        
        this.buildForm();
    }

    private buildForm(){
        this.frm_login = this.formBuilder.group({
            user: ['', Validators.required],
            pass: ['', Validators.required],
            record: ['']
        });
    }

    async login(){
        let myLoading = await this.util.presentLoading();
        const datos_usuario = this.frm_login.value;
        this.http.loginUser(datos_usuario).then((res: any) => {
            myLoading.dismiss();
            if (res.error) {
                this.util.presentToast(res.message, "danger");
                localStorage.setItem('sesion', "I");
            }
            else {
                this.frm_login.reset();
                // Guardo las variables de sesion para la app en LocalStorage
                localStorage.setItem('id_usuario', res.usuario.id);
                localStorage.setItem('nombre', res.usuario.nombre_apellido);
								localStorage.setItem('profile_photo', res.usuario.foto);
								localStorage.setItem('pais', res.usuario.pais);
                localStorage.setItem('version_app', res.version_app);
								localStorage.setItem('id_suscripcion', res.id_suscripcion);
								localStorage.setItem('id_tipo_suscripcion', res.id_tipo_suscripcion);
								localStorage.setItem('fecha_corte', res.fecha_corte);
								localStorage.setItem('id_grupo_usuario', res.grupos);
                localStorage.setItem('sesion', "A");
								this.fcm.init();
                this.util.updateAccess(res.usuario.id);
								let interaction = { "id_usuario": res.usuario.id, "id_tipo_interaccion": "1", "id_objeto": res.usuario.id };
								this.util.saveInteraction(interaction); // 1=Inicio de sesi??n
                this.navCtrl.navigateForward('/main');
            }
        }, (error) => {
            myLoading.dismiss();
            localStorage.setItem('sesion', "I");
            this.util.presentToast("Ha ocurrido un error, int??ntelo mas tarde", "danger");
            console.info("[Error]: " + error.message);
        });

    }

    ngOnInit() {
    }
    
}
