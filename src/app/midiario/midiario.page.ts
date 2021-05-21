import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpService } from '../services/http/http.service';

@Component({
  selector: 'app-midiario',
  templateUrl: './midiario.page.html',
  styleUrls: ['./midiario.page.scss'],
})
export class MidiarioPage implements OnInit {

  constructor(private navCtrl: NavController, 
              private http: HttpService) { 

  }

  goTo(page) {
    switch (page) {
        case 'cuaderno':
          this.navCtrl.navigateForward("/main/cuaderno");
          break;
        case 'habla':
          this.navCtrl.navigateForward("/main/hablapositivo");
          break;
        default:
            break;
    }
  }

  ngOnInit() {
  }

}
