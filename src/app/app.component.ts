import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { Location } from '@angular/common';
import { AppVersion } from '@ionic-native/app-version/ngx';


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
							private router: Router,
							private appVersion: AppVersion
							) {
        
		this.initializeApp()
	}

  initializeApp() {
		this.appVersion.getAppName().then(
			(appName) => {
				localStorage.setItem("app_name", appName);
			},
			(error) => {
				console.info("[Error]: " + JSON.stringify(error));
			});
		
		this.appVersion.getPackageName().then(
			(packageName) => {
				localStorage.setItem("pack_name", packageName);
			},
			(error) => {
				console.info("[Error]: " + JSON.stringify(error));
			});
		
		this.appVersion.getVersionNumber().then(
			(versionNumber) => {
				localStorage.setItem("app_version", versionNumber);
			},
			(error) => {
				console.info("[Error]: " + JSON.stringify(error));
			});

		localStorage.setItem("web_site", "https://serendipias.app/");
	

    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
        if (this._location.isCurrentPathEqualTo('/inicio') || this._location.isCurrentPathEqualTo('/main/parati') || this._location.isCurrentPathEqualTo('/main/categorias') || this._location.isCurrentPathEqualTo('/main/musica') || this._location.isCurrentPathEqualTo('/main/midiario')  || this._location.isCurrentPathEqualTo('/main/informacion')  || this._location.isCurrentPathEqualTo('/main/configuracion')) {
            // Show Exit Alert!
            this.showExitConfirm();
            processNextHandler();
        } else {
            // Navigate to back page
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
          header: 'Serendipia',
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

}
