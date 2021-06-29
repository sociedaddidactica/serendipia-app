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
		let id_user = localStorage.getItem("id_usuario");
    switch (page) {
        case 'ansiedad':
						this.util.saveInteraction({"id_usuario": id_user, "id_tipo_interaccion": "4", "id_objeto": "1"});
            this.router.navigate(['/main/erradicaransiedad']);
            break;
        case 'meditacion':
						this.util.saveInteraction({"id_usuario": id_user, "id_tipo_interaccion": "4", "id_objeto": "7"});
            this.router.navigate(['/main/meditacion']);
            break;
        case 'hipnosis':
						this.util.saveInteraction({"id_usuario": id_user, "id_tipo_interaccion": "4", "id_objeto": "16"});
            this.router.navigate(['/main/hipnosis']);
            break;
        default:
            break;
    }
  } 

  ngOnInit() {
  }

}
