import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MusicplayerDarkPage } from './musicplayer-dark.page';

const routes: Routes = [
  {
    path: '',
    component: MusicplayerDarkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MusicplayerDarkPageRoutingModule {}
