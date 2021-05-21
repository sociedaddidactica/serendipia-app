import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HipnosisPage } from './hipnosis.page';

const routes: Routes = [
  {
    path: '',
    component: HipnosisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HipnosisPageRoutingModule {}
