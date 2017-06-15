import { UserService } from './../../services/users.service';
import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { ViewController, ModalController, ToastController } from 'ionic-angular';

@Component({
    selector: 'login',
    templateUrl: 'login.html'
})
export class LoginPage {
    username: string;
    password: string;


    constructor(public viewCtrl: ViewController,
        public modalCtrl: ModalController,
        private userService: UserService,
        private toastCtrl: ToastController
    ) { }
    openSignUp() {
        let modal = this.modalCtrl.create(SignupPage);
        modal.present();
    }

    signIn() {
        this.userService.signIn(this.username, this.password).subscribe(response => {

            this.viewCtrl.dismiss();
            let toast = this.toastCtrl.create({
                message: 'Login Successful',
                duration: 3000,
                position: 'top'
            })
            toast.present();
        }, err => {
            console.log(err);
        }
        );
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}