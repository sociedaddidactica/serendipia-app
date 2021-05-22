import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import {
  FormGroup,
  FormBuilder, 
  Validators,
} from '@angular/forms';

import { HttpService } from '../services/http/http.service';
import { UtilsService } from '../services/utils/utils.service';

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
                private navCtrl: NavController) { 
        
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
                localStorage.setItem('version_app', res.version_app);
                localStorage.setItem('sesion', "A");
                this.util.updateAccess(res.usuario.id);
                this.navCtrl.navigateForward('/main');
            }
        }, (error) => {
            myLoading.dismiss();
            localStorage.setItem('sesion', "I");
            this.util.presentToast("Ha ocurrido un error, inténtelo mas tarde", "danger");
            console.error("Error " + error.message);
        });

    }

    ngOnInit() {
    }
    
}
