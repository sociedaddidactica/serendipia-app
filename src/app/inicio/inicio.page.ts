import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CloudService } from '../services/cloud/cloud.service';
import { HttpService } from '../services/http/http.service';
import { UtilsService } from '../services/utils/utils.service';

// import {
//   PushNotificationSchema,
//   PushNotifications,
//   Token,
//   ActionPerformed,
// } from '@capacitor/push-notifications';

import { FirebaseX } from '@ionic-native/firebase-x/ngx';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  page_next: string;
  version_app: any;

  constructor(private http: HttpService, 
              private router: Router, 
              private util: UtilsService, 
              private cloudService: CloudService,
							private firebaseX: FirebaseX) { 
    this.clearStorage();
    this.checkVersionApp();
    //this.checkConexion();
  }

  goTo() {

    let id_user  = localStorage.getItem("id_usuario");
    if (this.page_next == '/main'){
      this.util.updateAccess(id_user);
    }
    this.router.navigate([this.page_next]);
  }

  clearStorage() {
      localStorage.removeItem("version_app");
      localStorage.removeItem("trackList");
      localStorage.removeItem("section_name");
      localStorage.removeItem("section_icon");
      localStorage.removeItem("subsection_icon");
  }

  // Verifica si el usuario está en periodo de prueba o ya canceló la suscripción
  checkVersionApp() {
    let id_user = localStorage.getItem('id_usuario');
    if (id_user === null) {
        localStorage.setItem('sesion', "I");
        this.page_next = '/subinicio';
    }
    else {
        this.http.getVersionAppForUser(id_user).then((res: any) => {
            // Valores de version pueden ser: NULL, FULL, TRIAL, PENDIENT
            this.version_app = res.versionApp;
            localStorage.setItem('version_app', this.version_app);
            if (localStorage.getItem('sesion') == 'A') {
								// Refrescar los grupos de usuarios 
								this.http.getGroups(id_user).then((res: any) => {
									localStorage.setItem('id_grupo_usuario', res.grupos);
								},
								error => {
									console.info("[Error]: " + error.message);
								});
                this.page_next = '/main';
            }
            else {
                this.page_next = '/subinicio';
            }
        }, (error) => {
            localStorage.setItem('sesion', "I");
            this.util.presentToast("Ha ocurrido un error, inténtelo mas tarde", "danger");
            console.info("[Error]: " + error.message);
        });
    }
  }

  checkConexion() {
      this.util.presentToast("Verificando conexion a internet", "danger");
  }

  async initMultimediaList() {
    this.cloudService.getAudios();
    const vList = await this.cloudService.getVideos("6");
    localStorage.setItem("trackVideoList", JSON.stringify(vList));
    localStorage.setItem("trackVideoListBck", JSON.stringify(vList));
    this.cloudService.initVideoList();
  }
  
  ionViewDidEnter() {
      this.initMultimediaList();
  }

  ngOnInit() {
			console.log("iniciando PushNotifications inicio");
			
				// Request permission to use push notifications
				// iOS will prompt user and return if they granted permission or not
				// Android will just grant without prompting
				// PushNotifications.requestPermissions().then(result => {
				// 	if (result.receive === 'granted') {
				// 		// Register with Apple / Google to receive push via APNS/FCM
				// 		PushNotifications.register();
				// 	} else {
				// 		// Show some error
				// 	}
				// },
				// error => {
				// 	this.util.presentToast(JSON.stringify(error), "medium");
				// });

				// PushNotifications.addListener(
				// 	'registration',
				// 	(token: Token) => {
				// 		this.util.presentToast('Push registration success, token: ' + token.value, "warning");
				// 		console.log('Push registration success, token: ' + token.value);
				// 		localStorage.setItem("tokenFirebase", token.value);
				// 	},
				// );

				// PushNotifications.addListener('registrationError', (error: any) => {
				// 	this.util.presentToast('Error on registration: ' + JSON.stringify(error), "warning");
				// 	console.log('Error on registration: ' + JSON.stringify(error));
				// });

				// PushNotifications.addListener(
				// 	'pushNotificationReceived',
				// 	(notification: PushNotificationSchema) => {
				// 		this.util.presentToast('Push received: ' + JSON.stringify(notification), "success");
				// 		console.log('Push received: ' + JSON.stringify(notification));
				// 	},
				// );

				// PushNotifications.addListener(
				// 	'pushNotificationActionPerformed',
				// 	(notification: ActionPerformed) => {
				// 		alert('Push action performed: ' + JSON.stringify(notification));
				// 	},
				// );

				// FIREBASE-X
			this.firebaseX.getToken()
				.then(token => {
					console.log(`The token is ${token}`);
					this.util.presentToast(`The token is ${token}`, 'medium');
					localStorage.setItem("tokenFirebase", token);
			}) // save the token server-side and use it to push notifications to this device
				.catch(error => {
					console.error('Error getting token', error)
					this.util.presentToast('Error getting token' + JSON.stringify(error), 'warning');
				});

			this.firebaseX.onMessageReceived()
				.subscribe(data => {
					console.log(`User opened a notification ${data}`)
					this.util.presentToast(`User opened a notification ${data}`, 'medium');
				});

			this.firebaseX.onTokenRefresh()
				.subscribe((token: string) => {
					console.log(`Got a new token ${token}`)
					this.util.presentToast(`Got a new token ${token}`, 'success');
				});
			
  }
}
