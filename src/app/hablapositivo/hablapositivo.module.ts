import { NgModule, LOCALE_ID  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HablapositivoPageRoutingModule } from './hablapositivo-routing.module';

import { HablapositivoPage } from './hablapositivo.page';

import { CalendarModule } from 'ion2-calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HablapositivoPageRoutingModule,
    CalendarModule
  ],
  declarations: [HablapositivoPage],
  providers: [{ provide: LOCALE_ID, useValue: "es-ES" }]
})
export class HablapositivoPageModule {}
