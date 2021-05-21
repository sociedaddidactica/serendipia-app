import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentFullscreenComponent,} from './content-fullscreen.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ContentFullscreenComponent],
  imports: [CommonModule,IonicModule],
  exports: [ContentFullscreenComponent],
 })

export class ContentFullscreenModule { }
