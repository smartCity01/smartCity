import { RefresherService } from './../../services/refresher.service';
import { UserService } from './../../services/users.service';
import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { ViewController, ModalController, ToastController, LoadingController } from 'ionic-angular';

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
    private toastCtrl: ToastController,
    private refresherService: RefresherService,
    private loadingCtrl: LoadingController
  ) { }
  openSignUp() {
    let modal = this.modalCtrl.create(SignupPage);
    modal.present();
  }

  signIn() {
    let loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Loading Please Wait...'
    });
    loading.present();
    this.userService.signIn(this.username, this.password).subscribe(response => {
      localStorage.setItem('user-token', response.access_token);
      localStorage.setItem('refresh-token', response.refresh_token);
      this.refresherService.refresh();
      this.viewCtrl.dismiss();
      loading.dismiss();
      let toast = this.toastCtrl.create({
        message: 'Login Successful',
        duration: 3000,
        position: 'top'
      })
      toast.present();
    }, err => {
      console.log(err);
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
