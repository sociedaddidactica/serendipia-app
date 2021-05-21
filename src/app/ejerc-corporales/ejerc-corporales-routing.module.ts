import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EjercCorporalesPage } from './ejerc-corporales.page';

const routes: Routes = [
  {
    path: '',
    component: EjercCorporalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EjercCorporalesPageRoutingModule {}
