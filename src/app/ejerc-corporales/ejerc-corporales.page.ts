import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
// import { CloudService } from '../services/cloud/cloud.service';
// import { HttpService } from '../services/http/http.service';
import { UtilsService } from '../services/utils/utils.service';
// import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';

@Component({
  selector: 'app-ejerc-corporales',
  templateUrl: './ejerc-corporales.page.html',
  styleUrls: ['./ejerc-corporales.page.scss'],
})
export class EjercCorporalesPage implements OnInit {
  video: { id_producto: string; nombre_producto: string; link_acceso: string; ruta_archivo: string; orden: number; duration: number; };
  play_list: [any];
  section_name: string;
  section_icon: string;
  subsection_icon: string;

  constructor(private navCtrl: NavController, 
              private util: UtilsService, 
              private route: ActivatedRoute, 
							private youTube: YoutubeVideoPlayer
							) { 

    this.video = {
      id_producto: "",
      nombre_producto: "",
      link_acceso: "",
      ruta_archivo: "",
      orden: 0,
      duration: -1
    };
    this.play_list = [this.video];
    this.section_name = localStorage.getItem("section_name");
    this.section_icon = localStorage.getItem("section_icon");
    this.subsection_icon = localStorage.getItem("subsection_icon");
    let id_section = this.route.snapshot.paramMap.get('idSection');
    this.getVideosFromStorage();
  }

  getVideosFromStorage() {
    this.play_list = JSON.parse(localStorage.getItem("trackVideoList")) === null ? [] : JSON.parse(localStorage.getItem("trackVideoList"));
  }

	playYoutubeVideo(videoId){
		this.youTube.openVideo(videoId);
	}
  
  // async playVideo(videoId, index) {
  //   let myLoading = await this.util.presentLoading();
  //   let play_list = JSON.parse(localStorage.getItem("trackVideoListBck")) === null ? [] : JSON.parse(localStorage.getItem("trackVideoListBck"));
  //   let play_list2 = JSON.parse(localStorage.getItem("trackVideoList")) === null ? [] : JSON.parse(localStorage.getItem("trackVideoList"));
  //   const options = {
  //       successCallback: () => {
  //       },
  //       errorCallback: (e) => {
  //           console.info(e);
  //       },
  //       shouldAutoClose: true,
  //       controls: true
  //   };
  //   let videoUrl = play_list[index].link_acceso;
  //   let result: any;
  //   if (videoUrl.indexOf("www.youtube.com") >= 0) {
  //       result = await this.cloud.updateUrl(videoId);
	// 			videoUrl = result.formats[0].url;
	// 			// result.then(link => {
	// 			// 	videoUrl = link.formats[0].url;
	// 			// },
	// 			// error => {
	// 			// 	console.info("[Error]: " + error);
	// 			// });
  //   }
  //   let self = this;
  //   let p1 = new Promise(function (resolve, reject) {
  //       resolve(self.streamingMedia.playVideo(videoUrl, options));
  //   });
  //   p1.then(() => {
  //       myLoading.dismiss();
  //   }, error => {
  //       myLoading.dismiss();
  //       console.info(error);
  //       this.util.presentToast("Error mostrando el video, intente mas tarde", "danger");
  //   });
  // }

  goBack() {
      this.util.loadtCtrl.dismiss();
      this.navCtrl.back();
  }
  ngOnInit() {
      document.getElementById("name_section").innerHTML = this.section_name;
  }
  ngOnDestroy() {
      this.util.loadtCtrl.dismiss();
  }
  
}
