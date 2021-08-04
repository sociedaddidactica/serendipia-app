import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPage } from './main.page';

const routes: Routes = [
    {
      path: '',
      component: MainPage,
      children: [
        {
          path: 'parati',
          loadChildren: () => import('../parati/parati.module').then(m => m.ParatiPageModule),
					data: { preload: true },
        },
        {
          path: 'categorias',
          loadChildren: () => import('../categorias/categorias.module').then(m => m.CategoriasPageModule),
					data: { preload: true },
        },
        {
          path: 'erradicaransiedad',
          loadChildren: () => import('../erradicaransiedad/erradicaransiedad.module').then( m => m.ErradicaransiedadPageModule),
					data: { preload: true },
        },
        {
          path: 'sub-section/:idFather',
          loadChildren: () => import('../sub-section/sub-section.module').then( m => m.SubSectionPageModule),
					data: { preload: false },
					
        },
        {
          path: 'meditacion',
          loadChildren: () => import('../meditacion/meditacion.module').then( m => m.MeditacionPageModule),
					data: { preload: false },
        },
        {
          path: 'hipnosis',
          loadChildren: () => import('../hipnosis/hipnosis.module').then( m => m.HipnosisPageModule),
					data: { preload: false },

        },
        {
          path: 'ejerc-corporales/:idSection',
          loadChildren: () => import('../ejerc-corporales/ejerc-corporales.module').then( m => m.EjercCorporalesPageModule),
					data: { preload: false },
        },
        {
          path: 'musicplayer/:idSection',
          loadChildren: () => import('../musicplayer/musicplayer.module').then( m => m.MusicplayerPageModule),
					data: { preload: true },
        },
        {
          path: 'musica',
          loadChildren: () => import('../musica/musica.module').then( m => m.MusicaPageModule),
					data: { preload: true },
        },
        {
          path: 'midiario',
          loadChildren: () => import('../midiario/midiario.module').then( m => m.MidiarioPageModule),
					data: { preload: true },
        },
        {
          path: 'cuaderno',
          loadChildren: () => import('../cuaderno/cuaderno.module').then( m => m.CuadernoPageModule),
					data: { preload: false },
        },
        {
          path: 'editor/:idNote',
          loadChildren: () => import('../editor/editor.module').then( m => m.EditorPageModule),
					data: { preload: false },
        },
        {
          path: 'hablapositivo',
          loadChildren: () => import('../hablapositivo/hablapositivo.module').then( m => m.HablapositivoPageModule),
					data: { preload: true },
        },
        {
          path: 'informacion',
          loadChildren: () => import('../informacion/informacion.module').then( m => m.InformacionPageModule),
					data: { preload: false },
        },
        {
          path: 'configuracion',
          loadChildren: () => import('../configuracion/configuracion.module').then( m => m.ConfiguracionPageModule),
					data: { preload: true },
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
