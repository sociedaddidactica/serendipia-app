import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
})
export class InformacionPage implements OnInit {
	app_version: string;
	app_name: string;
	pack_name: string;
	url_politicas: string;
	url_terminos: string;
	url_metodo: string;

  constructor() { 
		this.app_version = localStorage.getItem("app_version");
		this.app_name = localStorage.getItem("app_name");
		this.pack_name = localStorage.getItem("pack_name");
		this.url_politicas = "https://serendipias.app/politica-privacidad/";
		this.url_terminos = "https://serendipias.app/terminos-y-condiciones/";
		this.url_metodo = localStorage.getItem("web_site");
	}

  ngOnInit() {
  }

}
