import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { ViewController, ModalController } from 'ionic-angular';

@Component({
    selector: 'login',
    templateUrl: 'login.html'
})
export class LoginPage {
    constructor(public viewCtrl: ViewController, public modalCtrl: ModalController) { }
    openSignUp() {
        let modal = this.modalCtrl.create(SignupPage);
        modal.present();
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}