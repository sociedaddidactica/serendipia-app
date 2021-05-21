import {Action} from '@ngrx/store';

export interface MediaAction extends Action {
  type: string;
  payload?: any;
}

export const CANPLAY = 'CANPLAY';
export const LOADEDMETADATA = 'LOADEDMETADATA';
export const PLAYING = 'PLAYING';
export const TIMEUPDATE = 'TIMEUPDATE';
export const LOADSTART = 'LOADSTART';
export const RESET = 'RESET';

export function mediaStateReducer(state: any, action: MediaAction) {
  let payload = action.payload;
  switch (action.type) {
      case CANPLAY:
          state = Object.assign({}, state);
          state.canplay = payload.value;
          return state;
      case LOADEDMETADATA:
          state = Object.assign({}, state);
          state.loadedmetadata = payload.value;
          state.duration = payload.data.time;
          state.durationSec = payload.data.timeSec;
          state.mediaType = payload.data.mediaType;
          return state;
      case PLAYING:
          state = Object.assign({}, state);
          state.playing = payload.value;
          return state;
      case TIMEUPDATE:
          // state = Object.assign({}, state);
          // state.media.time = payload.time;
          // state.media.timeSec = payload.timeSec;
          // return state;
          state = Object.assign({}, state);
          state.time = payload.time;
          state.timeSec = payload.timeSec;
          return state;
          // return {
          //   state,
          //   time: payload.time,
          //   timeSec:  payload.timeSec
          // }
      case LOADSTART:
          let estado = Object.assign({}, state);
          estado.loadstart = payload.value;
          return estado;
      case RESET:
          state = Object.assign({}, state);
          state.media = {};
          return state;
      default:
          state = {};
          state.media = {};
          return state;
  }
}