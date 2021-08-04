import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { Platform } from '@ionic/angular';
import { HttpService } from '../http/http.service';
import { UtilsService } from '../utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(private firebaseX: FirebaseX,
							private router: Router, 
							private http: HttpService,
							private platform: Platform,
							private util: UtilsService) { }

	init(){
		console.info("Init service FCM");
		let id_user = localStorage.getItem('id_usuario');
		let plataforma = "";
		if (this.platform.is("android")){
			plataforma = "android";
		} else if (this.platform.is("ios")){
			plataforma = "ios";
		}
		// FIREBASE-X
		this.firebaseX.getToken()
			.then((token: string) => {
				if (token == ""){
					this.firebaseX.getToken()
					.then((token: string) => {
						if (token != ""){
							console.info(`Get Token 2, The token is ${token}`);
							if (localStorage.getItem("tokenFirebase") === null || localStorage.getItem("tokenFirebase") !== token){
								//Update token en BD
								this.http.updateTokenFCM(id_user, token, plataforma).then((res: any) => {
									console.info("[Info]: " + res.message);
									localStorage.setItem("tokenFirebase", token);
								},
								error => {
									console.info("[Error]: " + error.message);
								});
							}
						}
					}) // save the token server-side and use it to push notifications to this device
					.catch(error => {
						console.info('[Error]: Getting token', JSON.stringify(error));
					});

				} else {
					console.info(`The token is ${token}`);
					if (localStorage.getItem("tokenFirebase") === null || localStorage.getItem("tokenFirebase") !== token){
						//Update token en BD
						this.http.updateTokenFCM(id_user, token, plataforma).then((res: any) => {
							console.info("[Info]: " + res.message);
							localStorage.setItem("tokenFirebase", token);
						},
						error => {
							console.info("[Error]: " + error.message);
						});
					}
				}
			}) // save the token server-side and use it to push notifications to this device
			.catch(error => {
				console.info('[Error]: Getting token', JSON.stringify(error));
			});

		this.firebaseX.onMessageReceived()
			.subscribe(data => {
				console.info(`User opened a notification ${data}`);
				this.router.navigate(["/inicio"]);
			});

		this.firebaseX.onTokenRefresh()
			.subscribe((token: string) => {
				if (token != ""){
					console.info(`Got a new token ${token}`)
					if (localStorage.getItem("tokenFirebase") === null || localStorage.getItem("tokenFirebase") !== token){
						//Update token en BD
						this.http.updateTokenFCM(id_user, token, plataforma).then((res: any) => {
							console.info("[Info]: " + res.message);
							localStorage.setItem("tokenFirebase", token);
						},
						error => {
							console.info("[Error]: " + error.message);
						});
					}
				}
			});
	}
}
