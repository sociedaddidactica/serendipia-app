import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParatiPage } from './parati.page';

const routes: Routes = [
  {
    path: '',
    component: ParatiPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParatiPageRoutingModule {}
