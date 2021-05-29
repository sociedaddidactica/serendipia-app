import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AudioService } from '../services/audio/audio.service';
import { CloudService } from '../services/cloud/cloud.service';
import { UtilsService } from '../services/utils/utils.service';

import {CANPLAY, LOADEDMETADATA, PLAYING, TIMEUPDATE, LOADSTART, RESET} from '../services/store/store.service';
import {pluck, filter, map, distinctUntilChanged} from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-musicplayer',
  templateUrl: './musicplayer.page.html',
  styleUrls: ['./musicplayer.page.scss'],
})

export class MusicplayerPage implements OnInit {
  section_name: string;
  section_icon: string;
  file: { url: string; name: string; duration: number; };
  files: any = [];
  seekbar: number;
  state: any = {};
  currentFile: any = {};
  current_track_title: string;
  show_toolbar: boolean;
  id_section: any;
  onSeekState: any;
    
  constructor(private navCtrl: NavController, 
              private platform: Platform, 
              private util: UtilsService, 
              private route: ActivatedRoute, 
              private audioService: AudioService, 
              private cloudService: CloudService, 
              private store: Store<any>) { 

    this.section_name = localStorage.getItem("section_name");
    this.section_icon = localStorage.getItem("section_icon");
    this.file = {
        url: "",
        name: "",
        duration: -1
    };
    this.files = [];
    this.seekbar = 0;
    this.state = {};
    this.currentFile = {};
    this.current_track_title = '';
    this.show_toolbar = false;
    this.files.splice(0, this.files.length);
    this.id_section = this.route.snapshot.paramMap.get('idSection');
  }

  getDocuments(myLoading) {
    this.cloudService.getFiles().subscribe(files => {
      this.files = files;
      myLoading.dismiss();
    });
  }
  
  goBack() {
    this.navCtrl.back();
  }
  
  ionViewWillEnter() {
    this.store.select('appState').subscribe((value) => {
        this.state = value;
        this.seekbar = value.timeSec;
    });
  }
  
  resetState() {
    if (this.state.playing){
      this.audioService.stop();
      this.store.dispatch({ type: RESET });
    }
  }
  
  playStream(url, loader) {
    
    this.resetState();
    this.audioService.playStream(url).subscribe(event => {
      const audioObj = event.target;
      switch (event.type) {
          case 'canplay':
              return this.store.dispatch({ type: CANPLAY, payload: { value: true } });
          case 'loadedmetadata':
              return this.store.dispatch({
                type: LOADEDMETADATA,
                payload: {
                  value: true,
                  data: {
                    time: this.audioService.formatTime(
                      audioObj.duration * 1000,
                      'mm:ss'
                    ),
                    timeSec: audioObj.duration,
                    mediaType: 'mp3'
                  }
                }
              });
          case 'playing':
              return this.store.dispatch({ type: PLAYING, payload: { value: true } });
          case 'pause':
              return this.store.dispatch({ type: PLAYING, payload: { value: false } });
          case 'timeupdate':
              return this.store.dispatch({
                  type: TIMEUPDATE,
                  payload: {
                      timeSec: audioObj.currentTime,
                      time: this.audioService.formatTime(audioObj.currentTime * 1000, 'mm:ss')
                  }
              });
          case 'loadstart':
              return this.store.dispatch({ type: LOADSTART, payload: { value: true } });
      }
      loader.dismiss();
    }, error => {
        loader.dismiss();
        console.info(error);
    });
  }

  async openFile(file, index, nombre) {
    let loader = await this.util.presentLoading();
    this.currentFile = { index, file };
    this.current_track_title = nombre;
    this.playStream(file.url, loader);
    if (!this.show_toolbar) {
        this.show_toolbar = true;
    }
  }

  pause() {
    this.audioService.pause();
  }

  play() {
    this.audioService.play();
  }

  stop() {
    this.audioService.stop();
  }

  next() {
    let index = this.currentFile.index + 1;
    let file = this.files[index];
    this.openFile(file, index, file.name);
  }

  previous() {
    let index = this.currentFile.index - 1;
    let file = this.files[index];
    this.openFile(file, index, file.name);
  }

  isFirstPlaying() {
    return this.currentFile.index === 0;
  }

  isLastPlaying() {
    return this.currentFile.index === this.files.length - 1;
  }

  onSeekStart() {
    this.onSeekState = this.state.playing;
    if (this.onSeekState) {
        this.pause();
    }
  }

  onSeekEnd() {
    const range = <HTMLInputElement>document.getElementById("time-range");
    if (this.onSeekState) {
        this.audioService.seekTo(range.value);
        this.play();
    }
    else {
        this.audioService.seekTo(range.value);
    }
  }

  controlSeconds(action, step) {
    const range = <HTMLInputElement>document.getElementById("time-range");
    let number = ~~range.value;
    let position = 0;
    switch (action) {
    case 'back':
        position = number < step ? 0.001 : number - step;
        this.audioService.seekTo(position);
        break;
    case 'forward':
        position = number + step < this.state.durationSec ? number + step : this.state.durationSec;
        this.audioService.seekTo(position);
        break;
    default:
        break;
    }
  }

  reset() {
    this.resetState();
    this.currentFile = {};
    this.show_toolbar = false;
  }

  formatTime(time, format) {
    return moment.utc(time).format(format);
  }

  async ngOnInit() {
    document.getElementById("name_section_player").innerHTML = this.section_name;
    let myLoading = await this.util.presentLoading();
    this.cloudService.initList(this.id_section);
    this.getDocuments(myLoading);
  }

  ngOnDestroy() {
    console.info("onDestroy");
    this.reset();
    // this.util.loadtCtrl.dismiss();
  }
}
