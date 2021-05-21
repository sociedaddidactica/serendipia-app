import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MidiarioPage } from './midiario.page';

const routes: Routes = [
  {
    path: '',
    component: MidiarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MidiarioPageRoutingModule {}
