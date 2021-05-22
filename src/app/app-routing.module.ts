import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'introduccion/:idUser',
    loadChildren: () => import('./introduccion/introduccion.module').then( m => m.IntroduccionPageModule)
  },
  {
    path: 'subinicio',
    loadChildren: () => import('./subinicio/subinicio.module').then( m => m.SubinicioPageModule)
  },
  {
    path: 'sesion',
    loadChildren: () => import('./sesion/sesion.module').then( m => m.SesionPageModule)
  },
  {
    path: 'formulario',
    loadChildren: () => import('./formulario/formulario.module').then( m => m.FormularioPageModule)
  },
  {
    path: 'olvido-clave',
    loadChildren: () => import('./olvido-clave/olvido-clave.module').then( m => m.OlvidoClavePageModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then( m => m.MainPageModule)
  },
  

  

  

  

  

  

  

  

  

  

  

  

  

  
//   {
//     path: 'categorias',
//     loadChildren: () => import('./categorias/categorias.module').then( m => m.CategoriasPageModule)
//   },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
 
 }
