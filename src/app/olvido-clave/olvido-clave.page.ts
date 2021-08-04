import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../services/http/http.service';
import { UtilsService } from '../services/utils/utils.service';


@Component({
  selector: 'app-olvido-clave',
  templateUrl: './olvido-clave.page.html',
  styleUrls: ['./olvido-clave.page.scss'],
})

export class OlvidoClavePage implements OnInit {
    
    frm_recovery: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private http: HttpService,
                public util: UtilsService,
                private navCtrl:  NavController,) 
    {
        this.buildForm();
    }

    private buildForm(){
        this.frm_recovery = this.formBuilder.group({
            email_recovery: ['', [Validators.required, Validators.email]],
        });
    }

    async enviar_datos(){
        let myLoading = await this.util.presentLoading();
        const datos_usuario = this.frm_recovery.value;
        this.http.recoveryPasswd(datos_usuario.email_recovery).then(
            (res: any) => {
                 myLoading.dismiss();
                if (res.error){
                    this.util.presentToast(res.message, "danger");
                } else {
                    this.frm_recovery.reset();
                    this.util.presentToast(res.message, "success");
                    setTimeout(()=>{
                        this.navCtrl.navigateForward('/sesion');
                    }, 3500);
                }
            },
            (error) => {
                myLoading.dismiss();
                this.util.presentToast("Ha ocurrido un error, inténtelo mas tarde", "danger");
                console.info("[Error]: " + error.message);
            }
        );
    }

    ngOnInit() {
    }

}
