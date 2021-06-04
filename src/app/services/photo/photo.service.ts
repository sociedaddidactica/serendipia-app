import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class PhotoService {
    
    public photos: Photo = {name: "person.jpg", filepath: "/assets/ICONS/person.jpg", webviewPath: "/assets/ICONS/person.jpg"};

    constructor(private camera: Camera,
                private webView: WebView,
                private crop: Crop,
                private toastCtrl: ToastController, 
                
    ) { }

    createFileName() {
        const d = new Date(),
          n = d.getTime(),
          newFileName = n + '.jpg';
        return newFileName;
    }

       
       // sourceType: this.camera.PictureSourceType.CAMERA,
    takePicture(mySourceType: any) {
        const options = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: mySourceType
        };

        this.camera.getPicture(options).then((imagePath) => {
            this.cropImage(imagePath);
        }).catch(e => {
          console.info(e);
        });
    }

    cropImage(fileUrl) {
        var photo: Photo;
        this.crop.crop(fileUrl, { quality: 100 }).then(
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
                this.presentToast(JSON.stringify(error), "danger");
                console.info('Error cropping image' + JSON.stringify(error));
        });
    }

    // showCroppedImage(ImagePath) {
    //     var photo: Photo;
    //     var copyPath = ImagePath;
    //     var splitPath = copyPath.split('/');
    //     var imageName = splitPath[splitPath.length - 1];
    //     var filePath = ImagePath.split(imageName)[0];
    
    //     this.file.readAsDataURL(filePath, imageName).then(base64 => {
    //         // this.croppedImagepath = base64;
            
    //         // this.photos.webviewPath = this.webView.convertFileSrc(base64);

    //     //   this.isLoading = false;
    //     }, error => {
    //       alert('Error in showing image' + error);
    //     //   this.isLoading = false;
    //     });

    //     // return photo;
    // }

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
