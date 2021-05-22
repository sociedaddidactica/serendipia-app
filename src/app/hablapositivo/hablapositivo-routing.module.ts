import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HablapositivoPage } from './hablapositivo.page';

const routes: Routes = [
  {
    path: '',
    component: HablapositivoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HablapositivoPageRoutingModule {}
