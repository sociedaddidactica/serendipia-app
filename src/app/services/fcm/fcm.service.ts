import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(private firebaseX: FirebaseX,
							private router: Router, ) { }

	init(){
		console.info("Init service FCM");
		// FIREBASE-X
		this.firebaseX.getToken()
			.then(token => {
				if (token === ""){
					this.firebaseX.getToken()
					.then(token => {
							console.info(`Get Token 2, The token is ${token}`);
							localStorage.setItem("tokenFirebase", token);
					}) // save the token server-side and use it to push notifications to this device
					.catch(error => {
						console.info('[Error]: Getting token', JSON.stringify(error));
					});

				} else {
					console.info(`The token is ${token}`);
					localStorage.setItem("tokenFirebase", token);
				}
			}) // save the token server-side and use it to push notifications to this device
			.catch(error => {
				console.info('[Error]: Getting token', JSON.stringify(error));
			});

		this.firebaseX.onMessageReceived()
			.subscribe(data => {
				console.info(`User opened a notification ${data}`);
				this.router.navigate(["/main/hablapositivo"]);
			});

		this.firebaseX.onTokenRefresh()
			.subscribe((token: string) => {
				console.info(`Got a new token ${token}`)
			});
	}
}
