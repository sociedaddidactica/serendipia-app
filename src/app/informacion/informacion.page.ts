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
	web_site: string;

  constructor() { 
		this.app_version = localStorage.getItem("app_version");
		this.app_name = localStorage.getItem("app_name");
		this.pack_name = localStorage.getItem("pack_name");
		this.web_site = localStorage.getItem("web_site");
	}

  ngOnInit() {
  }

}
