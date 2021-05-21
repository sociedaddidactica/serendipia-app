import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { SubinicioPageRoutingModule } from './subinicio-routing.module';

import { SubinicioPage } from './subinicio.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubinicioPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [SubinicioPage]
})
export class SubinicioPageModule {}
