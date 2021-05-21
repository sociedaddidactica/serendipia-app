import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MusicplayerDarkPageRoutingModule } from './musicplayer-dark-routing.module';

import { MusicplayerDarkPage } from './musicplayer-dark.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MusicplayerDarkPageRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [MusicplayerDarkPage]
})
export class MusicplayerDarkPageModule {}
