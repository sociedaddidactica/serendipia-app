import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeditacionPage } from './meditacion.page';

const routes: Routes = [
  {
    path: '',
    component: MeditacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeditacionPageRoutingModule {}
