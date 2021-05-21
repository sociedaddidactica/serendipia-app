import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EjercCorporalesPageRoutingModule } from './ejerc-corporales-routing.module';

import { EjercCorporalesPage } from './ejerc-corporales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EjercCorporalesPageRoutingModule
  ],
  declarations: [EjercCorporalesPage]
})
export class EjercCorporalesPageModule {}
