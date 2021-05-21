import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParatiPageRoutingModule } from './parati-routing.module';

import { ParatiPage } from './parati.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParatiPageRoutingModule
  ],
  declarations: [ParatiPage]
})
export class ParatiPageModule {}
