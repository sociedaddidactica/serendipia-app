import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators";
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  stop$: any;
  audioObj: HTMLAudioElement;
  isPlaying : boolean;

  constructor() { 
    this.stop$ = new Subject();
    this.audioObj = new Audio();
    this.isPlaying = false;
  }

  streamObservable(url) {
    let events = [
        'ended', 'error', 'play', 'playing', 'pause', 'timeupdate', 'canplay', 'loadedmetadata', 'loadstart'
    ];
    const addEvents = function (obj, events, handler) {
        events.forEach(event => {
            obj.addEventListener(event, handler);
        });
    };
    const removeEvents = function (obj, events, handler) {
        events.forEach(event => {
            obj.removeEventListener(event, handler);
        });
    };
    return Observable.create(observer => {
        // Play audio
        this.audioObj.src = url;
        this.audioObj.load();
        this.audioObj.play();
        // Media Events
        const handler = (event) => observer.next(event);
        addEvents(this.audioObj, events, handler);
        return () => {
            // Stop Playing
            this.audioObj.pause();
            this.audioObj.currentTime = 0;
            // Remove EventListeners
            removeEvents(this.audioObj, events, handler);
        };
    });
  }
  playStream(url) {
      this.isPlaying=true;
      return this.streamObservable(url).pipe(takeUntil(this.stop$));
  }
  play() {
    this.isPlaying=true;
    this.audioObj.play();
  }
  pause() {
    if (this.isPlaying){
      this.audioObj.pause();
      this.isPlaying=false;
    }
  }
  stop() {
    if (this.isPlaying){
        this.isPlaying=false;
        this.stop$.next();
    }
  }
  seekTo(seconds) {
      this.audioObj.currentTime = seconds;
  }
  formatTime(time, format) {
    return moment.utc(time).format(format);
  }
}


