import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

// const routes: Routes = [
//   {
//     path: '',
//     component: MainPage
//   }
// ];

const routes: Routes = [
    {
      path: '',
      component: MainPage,
      children: [
        {
          path: 'parati',
          loadChildren: () => import('../parati/parati.module').then(m => m.ParatiPageModule)
        },
        {
          path: 'categorias',
          loadChildren: () => import('../categorias/categorias.module').then(m => m.CategoriasPageModule)
        },
        {
          path: 'erradicaransiedad',
          loadChildren: () => import('../erradicaransiedad/erradicaransiedad.module').then( m => m.ErradicaransiedadPageModule)
        },
        {
          path: 'sub-section/:idFather',
          loadChildren: () => import('../sub-section/sub-section.module').then( m => m.SubSectionPageModule)
        },
        {
          path: 'meditacion',
          loadChildren: () => import('../meditacion/meditacion.module').then( m => m.MeditacionPageModule)
        },
        {
          path: 'hipnosis',
          loadChildren: () => import('../hipnosis/hipnosis.module').then( m => m.HipnosisPageModule)
        },
        {
          path: 'ejerc-corporales/:idSection',
          loadChildren: () => import('../ejerc-corporales/ejerc-corporales.module').then( m => m.EjercCorporalesPageModule)
        },
        {
          path: 'musicplayer/:idSection',
          loadChildren: () => import('../musicplayer/musicplayer.module').then( m => m.MusicplayerPageModule)
        },
        {
          path: 'musicplayer-dark/:idSection',
          loadChildren: () => import('../musicplayer-dark/musicplayer-dark.module').then( m => m.MusicplayerDarkPageModule)
        },
        {
          path: 'musica',
          loadChildren: () => import('../musica/musica.module').then( m => m.MusicaPageModule)
        },
        {
          path: 'midiario',
          loadChildren: () => import('../midiario/midiario.module').then( m => m.MidiarioPageModule)
        },
        {
          path: 'cuaderno',
          loadChildren: () => import('../cuaderno/cuaderno.module').then( m => m.CuadernoPageModule)
        },
        {
          path: 'editor/:idNote',
          loadChildren: () => import('../editor/editor.module').then( m => m.EditorPageModule)
        },
        {
          path: 'hablapositivo',
          loadChildren: () => import('../hablapositivo/hablapositivo.module').then( m => m.HablapositivoPageModule)
        },
        {
          path: 'informacion',
          loadChildren: () => import('../informacion/informacion.module').then( m => m.InformacionPageModule)
        },
        {
          path: 'configuracion',
          loadChildren: () => import('../configuracion/configuracion.module').then( m => m.ConfiguracionPageModule)
        },
        
        
        {
          path: '',
          redirectTo: 'parati',
          pathMatch: 'full'
        }
      ]
    },
    {
      path: '',
      redirectTo: 'parati',
      pathMatch: 'full'
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
