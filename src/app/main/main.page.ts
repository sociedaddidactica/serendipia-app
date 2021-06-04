import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
 

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  router: Router;
  optionsTrans: any;
  nativePageTransitions: NativePageTransitions;
  tab_categorias: string;
  tab_musica: string;
  tab_diario: string;
  activeParatTi: boolean;
  activeCategorias: boolean;
  activeMusica: boolean;
  activeDiario: boolean;
  activeInfo: boolean;
  activeConfig: boolean;

  constructor(router: Router, nativePageTransitions: NativePageTransitions) {
    this.router = router;
    this.nativePageTransitions = nativePageTransitions;
    this.optionsTrans = {
        duration: 350,
        slowdownfactor: 3,
        slidePixels: 20,
        iosdelay: 100,
        androiddelay: 150,
        fixedPixelsTop: 0,
        fixedPixelsBottom: 60
    };
    let versionApp = localStorage.getItem("version_app");
    if (versionApp == "FULL" || versionApp == "TRIAL") {
        this.tab_categorias = "/main/categorias";
        this.tab_musica = "/main/musica";
        this.tab_diario = "/main/midiario";
    }
    else if (versionApp == "PENDIENT" || versionApp == "EXPIRATED") {
        this.tab_categorias = "/main/configuracion";
        this.tab_musica = "/main/configuracion";
        this.tab_diario = "/main/configuracion";
    }
	}

  onClick(page) {
    this.nativePageTransitions.fade(this.optionsTrans);
    if (page == 'parati') {
        this.activeParatTi = true;
        this.activeCategorias = false;
        this.activeMusica = false;
        this.activeDiario = false;
        this.activeInfo = false;
        this.activeConfig = false;
        this.router.navigate(["/main/" + page]);
    }
    else if (page == 'categorias') {
        this.activeParatTi = false;
        this.activeCategorias = true;
        this.activeMusica = false;
        this.activeDiario = false;
        this.activeInfo = false;
        this.activeConfig = false;
        this.router.navigate([this.tab_categorias]);
    }
    else if (page == 'musica') {
        this.activeParatTi = false;
        this.activeCategorias = false;
        this.activeMusica = true;
        this.activeDiario = false;
        this.activeInfo = false;
        this.activeConfig = false;
        this.router.navigate([this.tab_musica]);
    }
    else if (page == 'diario') {
        this.activeParatTi = false;
        this.activeCategorias = false;
        this.activeMusica = false;
        this.activeDiario = true;
        this.activeInfo = false;
        this.activeConfig = false;
        this.router.navigate([this.tab_diario]);
    }
    else if (page == 'info') {
        this.activeParatTi = false;
        this.activeCategorias = false;
        this.activeMusica = false;
        this.activeDiario = false;
        this.activeInfo = true;
        this.activeConfig = false;
        this.router.navigate(["/main/informacion"]);
    }
    else if (page == 'config') {
        this.activeParatTi = false;
        this.activeCategorias = false;
        this.activeMusica = false;
        this.activeDiario = false;
        this.activeInfo = false;
        this.activeConfig = true;
        this.router.navigate(["/main/configuracion"]);
    }
	}

	active(page) {
    if (page == 'parati') {
        this.activeParatTi = true;
        this.activeCategorias = false;
        this.activeMusica = false;
        this.activeDiario = false;
        this.activeInfo = false;
        this.activeConfig = false;
    }
    else if (page == 'categorias') {
        this.activeParatTi = false;
        this.activeCategorias = true;
        this.activeMusica = false;
        this.activeDiario = false;
        this.activeInfo = false;
        this.activeConfig = false;
    }
    else if (page == 'musica') {
        this.activeParatTi = false;
        this.activeCategorias = false;
        this.activeMusica = true;
        this.activeDiario = false;
        this.activeInfo = false;
        this.activeConfig = false;
    }
    else if (page == 'midiario') {
        this.activeParatTi = false;
        this.activeCategorias = false;
        this.activeMusica = false;
        this.activeDiario = true;
        this.activeInfo = false;
        this.activeConfig = false;
    }
    else if (page == 'informacion') {
        this.activeParatTi = false;
        this.activeCategorias = false;
        this.activeMusica = false;
        this.activeDiario = false;
        this.activeInfo = true;
        this.activeConfig = false;
    }
    else if (page == 'configuracion') {
        this.activeParatTi = false;
        this.activeCategorias = false;
        this.activeMusica = false;
        this.activeDiario = false;
        this.activeInfo = false;
        this.activeConfig = true;
    }
	}

	tabChange(event) {
			this.active(event.tab);
	}

  ngOnInit() {
  }

}
