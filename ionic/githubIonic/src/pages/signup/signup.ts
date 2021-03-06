import { ViewController, LoadingController, ToastController } from 'ionic-angular';
import { Component } from '@angular/core';
import { UserService } from '../../services/users.service';
@Component({
  selector: 'signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  username;
  password;
  email;

  constructor(
    private userService: UserService,
    public viewCtrl: ViewController,
    public loadctrl: LoadingController,
    public toastCtrl: ToastController
  ) { }


  dismiss() {
    this.viewCtrl.dismiss();
  }

  signUp() {
    let loading = this.loadctrl.create({
      spinner: 'dots',
      content: 'Loading Please Wait...'
    });
    loading.present();
    this.userService.signUp(this.username, this.password, this.email).subscribe(res => {
      loading.dismiss();
      this.viewCtrl.dismiss();
      let toast = this.toastCtrl.create({
        message: 'User was added successfully',
        duration: 3000,
        position: 'top'
      })
      toast.present();
    },
      err => {
        loading.dismiss();
        let toast = this.toastCtrl.create({
          message: err.statusText,
          duration: 3000,
          position: 'top'
        })
        toast.present();
      });

  }
}
