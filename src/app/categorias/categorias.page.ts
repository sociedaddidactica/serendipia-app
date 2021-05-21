import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '../services/utils/utils.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  constructor(private util: UtilsService, private router: Router) { }

  goTo(page) {
    switch (page) {
        case 'ansiedad':
            this.router.navigate(['/main/erradicaransiedad']);
            break;
        case 'meditacion':
            this.router.navigate(['/main/meditacion']);
            break;
        case 'hipnosis':
            this.router.navigate(['/main/hipnosis']);
            break;
        default:
            break;
    }
  } 

  ngOnInit() {
  }

}
