import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OlvidoClavePageRoutingModule } from './olvido-clave-routing.module';

import { OlvidoClavePage } from './olvido-clave.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    OlvidoClavePageRoutingModule
  ],
  declarations: [OlvidoClavePage]
})
export class OlvidoClavePageModule {}
