import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular'

@Component({
  selector: 'app-subinicio',
  templateUrl: './subinicio.page.html',
  styleUrls: ['./subinicio.page.scss'],
})
export class SubinicioPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  goToLogin(){
    this.navCtrl.navigateForward("/sesion");
  }

  goToRegister(){
    this.navCtrl.navigateForward("/formulario");
  }

  ngOnInit() {
  }

}
