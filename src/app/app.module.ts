import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { File } from '@ionic-native/file/ngx';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import { ContentFullscreenModule } from './components/content-fullscreen/content-fullscreen.module';
import { HttpService } from './services/http/http.service';
import { HttpClientModule } from '@angular/common/http';
import { pageTransition } from './page-transition';
import { NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { Crop } from '@ionic-native/crop/ngx';

import { StoreModule } from '@ngrx/store';
import { mediaStateReducer } from './services/store/store.service';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      appState: mediaStateReducer
    }),
    IonicModule.forRoot({ mode: 'md',  navAnimation: pageTransition }),
    AppRoutingModule,
    ComponentsModule,
    ContentFullscreenModule,
    HttpClientModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: 'es-ES' },
    HttpService,
    WebView, 
    File,
    FileTransfer,
    FilePath,
    Camera, 
    Crop,
    NativePageTransitions,
    StreamingMedia,
    Geolocation,
    NativeGeocoder,
		FirebaseX,
		YoutubeVideoPlayer,
		AppVersion
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
