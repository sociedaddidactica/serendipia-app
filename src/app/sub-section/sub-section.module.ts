import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubSectionPageRoutingModule } from './sub-section-routing.module';

import { SubSectionPage } from './sub-section.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubSectionPageRoutingModule
  ],
  declarations: [SubSectionPage]
})
export class SubSectionPageModule {}
