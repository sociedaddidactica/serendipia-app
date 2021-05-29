import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  // tittle= 'angular-http-client'
  constructor(private platform: Platform, 
              private _location: Location, 
              private alertController: AlertController,
							private router: Router) {
        
		this.initializeApp()
	}

  initializeApp() {
    // this.platform.ready().then(() => {
    //   this.statusBar.styleDefault();
    //   this.splashScreen.hide();

    // // get FCM token
		// 	this.fcm.getToken().then(token => {
		// 			console.info("FCM token");
		// 			console.info(token);
		// 	});

		// 	// ionic push notification example
		// 	this.fcm.onNotification().subscribe(data => {
		// 			console.info(data);
		// 			if (data.wasTapped) {
		// 					console.info('Received in background');
		// 					this.router.navigate(["/main/hablapositivo"]);
		// 			} else {
		// 					console.info('Received in foreground');
		// 					this.router.navigate(["/main/hablapositivo"]);
		// 			}
		// 	});      

		// 	// refresh the FCM token
		// 	this.fcm.onTokenRefresh().subscribe(token => {
		// 			console.info("FCM token");
		// 			console.info(token);
		// 	});

    // },
		// error => {
		// 	console.info("[Error]: Platform no ready");
		// });

		

		

    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
        if (this._location.isCurrentPathEqualTo('/inicio') || this._location.isCurrentPathEqualTo('/main/parati')) {
            // Show Exit Alert!
            console.info('Show Exit Alert!');
            this.showExitConfirm();
            processNextHandler();
        } else if (this._location.isCurrentPathEqualTo('/main/categorias') || this._location.isCurrentPathEqualTo('/main/musica') || this._location.isCurrentPathEqualTo('/main/midiario')  || this._location.isCurrentPathEqualTo('/main/informacion')  || this._location.isCurrentPathEqualTo('/main/configuracion')) {
          // nothing 
        } else {
            // Navigate to back page
            console.info('Navigate to back page');
            this._location.back();
        }
    });
		
    this.platform.backButton.subscribeWithPriority(5, () => {
        console.info('Handler called to force close!');
        this.alertController.getTop().then(r => {
            if (r) {
                navigator['app'].exitApp();
            }
        }).catch(e => {
            console.info(e);
        });
    });
  }

  showExitConfirm() {
      this.alertController.create({
          header: 'Serendipia App',
          message: '¿Deseas salir de la app?',
          backdropDismiss: false,
          buttons: [{
                  text: 'No',
                  role: 'cancel',
                  handler: () => {
                      console.info('Application exit prevented!');
                  }
              }, {
                  text: 'Salir',
                  handler: () => {
                      navigator['app'].exitApp();
                  }
              }]
      })
          .then(alert => {
          alert.present();
      });
  }

  ngOnInit(): void {
    
    
  }
}
