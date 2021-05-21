import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErradicaransiedadPage } from './erradicaransiedad.page';

const routes: Routes = [
  {
    path: '',
    component: ErradicaransiedadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErradicaransiedadPageRoutingModule {}
