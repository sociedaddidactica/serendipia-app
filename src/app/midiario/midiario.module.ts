import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MidiarioPageRoutingModule } from './midiario-routing.module';

import { MidiarioPage } from './midiario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MidiarioPageRoutingModule
  ],
  declarations: [MidiarioPage]
})
export class MidiarioPageModule {}
