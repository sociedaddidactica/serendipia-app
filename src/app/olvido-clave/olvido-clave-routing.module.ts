import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OlvidoClavePage } from './olvido-clave.page';

const routes: Routes = [
  {
    path: '',
    component: OlvidoClavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OlvidoClavePageRoutingModule {}
