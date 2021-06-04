import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpService } from '../http/http.service';
// import * as yt from 'ionic-youtube-streams';

@Injectable({
  providedIn: 'root'
})
export class CloudService {
  files: any[];
  video: { id_producto: string; nombre_producto: string; link_acceso: string; ruta_archivo: string; orden: number; duration: number; };
  play_list: any[];

  constructor(private http: HttpService) {
    this.files = [];
    this.video = {
        id_producto: "",
        nombre_producto: "",
        link_acceso: "",
        ruta_archivo: "",
        orden: 0,
        duration: -1
    };
    this.play_list = [this.video];
    this.files.splice(0, this.files.length);
  }

  async getAudios() {
    if (localStorage.getItem("trackList") === null) {
        const trackList = await this.getAllAudiosFile();
        let self = this;
        localStorage.setItem("trackList", JSON.stringify(trackList));
    }
  }
  
  getAllAudiosFile() {
      let self = this;
      return new Promise(function (resolve, reject) {
          self.http.getAllAudiosFile().then((res: any) => {
              resolve(res.files);
          }, (error) => {
              console.info("[Error]: " + JSON.stringify(error));
          });
      });
  }

  initList(id_seccion) {
      let play_list = [];
      let trackList = JSON.parse(localStorage.getItem("trackList")) === null ? [] : JSON.parse(localStorage.getItem("trackList"));
      trackList.forEach(function (track) {
          if (track.id_seccion == id_seccion) {
              play_list.push(track);
          }
      });
      let self = this;
      self.files.splice(0, self.files.length);
      for (let i = 0; i < play_list.length; i++) {
          let audio = {
              url: play_list[i].link_acceso,
              name: play_list[i].nombre_producto,
              duration: play_list[i].duration,
          };
          self.files.push(audio);
      }
  }

  getFiles() {
      return of(this.files);
  }

  // para videos de youtube 
  getVideos(id_seccion) {
      let self = this;
      return new Promise(function (resolve) {
          self.http.getAudioFiles(id_seccion).then((res: any) => {
              // self.play_list = res.files;
              resolve(res.files);
              // localStorage.setItem("trackVideoList", JSON.stringify(self.play_list));
              // localStorage.setItem("trackVideoListBck", JSON.stringify(self.play_list));
          }, (error) => {
              console.info("[Error]: " + JSON.stringify(error));
          });
      });
  }

  async initVideoList() {
    let play_list = JSON.parse(localStorage.getItem("trackVideoListBck"));
    var list2 = [];
    let link: any;
    let getlink: any;
    // for (let index = 0; index < play_list.length; index++) {
    //     const element = play_list[index];
    //     link = await this.updateUrl(element.ruta_archivo);
		// 		element.link_acceso = link.formats[0].url;
		// 		list2.push(element);
		// 		localStorage.setItem('trackVideoListBck', JSON.stringify(list2));           
    // }
  }

  // async updateUrl(videoId) {
  //   return new Promise(function (resolve) {
  //       resolve(yt.info(videoId));
  //   });
  //   // return await yt.info(videoId);
  // }

	
}
