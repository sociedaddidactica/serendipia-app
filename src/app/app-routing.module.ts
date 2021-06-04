import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SimpleLoadingStrategy } from './simple-loading-strategy';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule),
		data: {
      preload: true
    },
  },
  {
    path: 'introduccion/:idUser',
    loadChildren: () => import('./introduccion/introduccion.module').then( m => m.IntroduccionPageModule),
		data: {
      preload: false
    },
  },
  {
    path: 'subinicio',
    loadChildren: () => import('./subinicio/subinicio.module').then( m => m.SubinicioPageModule),
		data: {
      preload: true
    },
  },
  {
    path: 'sesion',
    loadChildren: () => import('./sesion/sesion.module').then( m => m.SesionPageModule),
		data: {
      preload: true
    },
  },
  {
    path: 'formulario',
    loadChildren: () => import('./formulario/formulario.module').then( m => m.FormularioPageModule),
		data: {
      preload: false
    },
  },
  {
    path: 'olvido-clave',
    loadChildren: () => import('./olvido-clave/olvido-clave.module').then( m => m.OlvidoClavePageModule),
		data: {
      preload: false
    },
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then( m => m.MainPageModule),
		data: {
      preload: true
    },
  },
  {
    path: 'modal-new-event',
    loadChildren: () => import('./modal-new-event/modal-new-event.module').then( m => m.ModalNewEventPageModule),
		data: {
      preload: false
    },
  },

];

@NgModule({
	providers: [SimpleLoadingStrategy],
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: SimpleLoadingStrategy })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
 
 }
