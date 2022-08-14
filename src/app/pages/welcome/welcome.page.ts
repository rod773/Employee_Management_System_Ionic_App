import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { SignupPage } from '../signup/signup.page';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async login() {
    const modal = await this.modalCtrl.create({
      component: LoginPage,
      backdropDismiss: false,
      animated: true,
      mode: 'ios',
      breakpoints: [0.46, 0.55,0.7],
      initialBreakpoint: 0.46,
      cssClass: 'login-modal'
    });
    return await modal.present();
  }

  async signup() {
    const modal = await this.modalCtrl.create({
      component: SignupPage,
      backdropDismiss: false,
      animated: true,
      mode: 'ios',
      breakpoints: [0.60, 0.63],
      initialBreakpoint: 0.60,
      cssClass: 'signup-modal'
    });
    return await modal.present();
  }


}
