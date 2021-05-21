import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { HttpService } from '../services/http/http.service';

@Component({
  selector: 'app-sub-section',
  templateUrl: './sub-section.page.html',
  styleUrls: ['./sub-section.page.scss'],
})
export class SubSectionPage implements OnInit {
  sub_section: { id_seccion: string; nombre_seccion: string; };
  play_list: { id_seccion: string; nombre_seccion: string; }[];
  section_name: string;
  section_icon: string;
  subsection_icon: string;

  constructor(private navCtrl: NavController, 
              private route: ActivatedRoute, 
              private http: HttpService) { 

    this.sub_section = {
      id_seccion: "",
      nombre_seccion: ""
    };
    this.play_list = [this.sub_section];
    this.section_name = localStorage.getItem("section_name");
    this.section_icon = localStorage.getItem("section_icon");
    this.subsection_icon = localStorage.getItem("subsection_icon");
    let id_father = this.route.snapshot.paramMap.get('idFather');
    this.getSubSections(id_father);
  }
              
  getSubSections(id_father) {
    this.http.getSubSections(id_father).then((res:any) => {
        this.play_list = res.subSections;
        // this.initPlaylist();
    }, (error) => {
        console.log("Error " + JSON.stringify(error));
    });
  }
  goSection(id_seccion) {
      localStorage.setItem("section_name", this.section_name);
      this.navCtrl.navigateForward("/main/musicplayer/" + id_seccion);
  }
  goBack() {
      this.navCtrl.back();
  }
  ngOnInit() {
      document.getElementById("name_section").innerHTML = this.section_name;
  }

}
