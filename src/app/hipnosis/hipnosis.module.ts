import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HipnosisPageRoutingModule } from './hipnosis-routing.module';

import { HipnosisPage } from './hipnosis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HipnosisPageRoutingModule
  ],
  declarations: [HipnosisPage]
})
export class HipnosisPageModule {}
