import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ErradicaransiedadPageRoutingModule } from './erradicaransiedad-routing.module';

import { ErradicaransiedadPage } from './erradicaransiedad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ErradicaransiedadPageRoutingModule
  ],
  declarations: [ErradicaransiedadPage]
})
export class ErradicaransiedadPageModule {}
