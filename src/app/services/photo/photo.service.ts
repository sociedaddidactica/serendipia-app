import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Platform, ToastController } from '@ionic/angular';

declare var window;

@Injectable({
  providedIn: 'root'
})

export class PhotoService {
    
    public photos: Photo = {name: "person.jpg", filepath: "/assets/ICONS/person.jpg", webviewPath: "/assets/ICONS/person.jpg"};

    constructor(private camera: Camera,
                private webView: WebView,
                private crop: Crop,
                private toastCtrl: ToastController, 
								private plt: Platform,
								private filePath: FilePath
                
    ) { }

    createFileName() {
			const d = new Date(),
				n = d.getTime(),
				newFileName = n + '.jpg';
			return newFileName;
    }
       
    takePicture(mySourceType: any) {
			let options : CameraOptions;
			if (this.plt.is("android") && (mySourceType==0 || mySourceType==2)){
				options  = {
					quality: 60,
					destinationType: this.camera.DestinationType.DATA_URL,
					encodingType: this.camera.EncodingType.JPEG,
					mediaType: this.camera.MediaType.PICTURE,
					sourceType: mySourceType,
					saveToPhotoAlbum: false
				};
			} else {
				options = {
						quality: 60,
						destinationType: this.camera.DestinationType.FILE_URI,
						encodingType: this.camera.EncodingType.JPEG,
						mediaType: this.camera.MediaType.PICTURE,
						sourceType: mySourceType,
						saveToPhotoAlbum: false
				};
			}
			
			// let self = this;
			this.camera.getPicture(options)
			.then((imagePath) => {
				if (this.plt.is("android") && mySourceType == 1){ // android y camara 
					this.cropImage(imagePath);

				} else if (this.plt.is("android") && (mySourceType == 0 || mySourceType == 2)){ // android y galeria  
					var profilePic = document.getElementById('profilePic');
					profilePic.style.border = '1px solid var(--main-color)';
					profilePic.style.width = '100px';
					profilePic.style.height = '100px';

					// imagePath = 'file://'+imagePath;
					this.photos.filepath = "data:image/jpeg;base64," + imagePath;
					this.photos.name = this.createFileName();
					// this.photos.webviewPath = this.webView.convertFileSrc(imagePath);
					this.photos.webviewPath = "data:image/jpeg;base64," + imagePath;

				} else if (this.plt.is('ios')) { 
					var profilePic = document.getElementById('profilePic');
					profilePic.style.border = '1px solid var(--main-color)';
					profilePic.style.width = '100px';
					profilePic.style.height = '100px';

					this.photos.filepath = imagePath.replace(/^file:\/\//, '');
					this.photos.name = this.createFileName();
					this.photos.webviewPath = imagePath.replace(/^file:\/\//, '');
				
				}
			}, (err) => {
				console.info(err);
			});
    }

    cropImage(fileUrl) {
			var photo: Photo;
			this.crop.crop(fileUrl, { quality: 60 }).then(
					newPath => {
							var profilePic = document.getElementById('profilePic');
							profilePic.style.border = '1px solid var(--main-color)';
							profilePic.style.width = '100px';
							profilePic.style.height = '100px';

							this.photos.filepath = newPath;
							this.photos.name = this.createFileName();
							this.photos.webviewPath = this.webView.convertFileSrc(newPath);
					},
					error => {
							this.presentToast("Ocurri?? un error, intente mas tarde.", "danger");
							console.info('Error cropping image' + JSON.stringify(error));
			});
			
    }

    async presentToast(message: string, color: string) {
			const toast = await this.toastCtrl.create({
				message,
				color: color,
				cssClass: "align-center",
				position: 'top',
				duration: 2000
			});
			await toast.present();
		}
}

export interface Photo {
    name: string; 
    filepath: string;
    webviewPath: string;
  }
