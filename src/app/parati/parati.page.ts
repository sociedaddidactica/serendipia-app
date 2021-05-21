import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '../services/utils/utils.service';

@Component({
  selector: 'app-parati',
  templateUrl: './parati.page.html',
  styleUrls: ['./parati.page.scss'],
})
export class ParatiPage implements OnInit {

  nombre_usuario: string;

  constructor(private util: UtilsService, 
              private router: Router) { }

  goTo(page) {
    switch (page) {
        case 'ansiedad':
            this.router.navigate(['/main/erradicaransiedad']);
            break;
        case 'meditacion':
            this.router.navigate(['/main/meditacion']);
            break;
        case 'diario':
            this.router.navigate(['/main/midiario']);
            break;
        default:
            break;
    } 
  }

  ngOnInit() {
    this.nombre_usuario = localStorage.getItem('nombre');
  }

}
