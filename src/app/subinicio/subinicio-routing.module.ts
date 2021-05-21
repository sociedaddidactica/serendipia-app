import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubinicioPage } from './subinicio.page';

const routes: Routes = [
  {
    path: '',
    component: SubinicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubinicioPageRoutingModule {}
