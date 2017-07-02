import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import {  ModalController, LoadingController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController,  ToastController } from 'ionic-angular';


@Component({
  selector: 'settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  selectedItem: any;

  constructor(public navCtrl: NavController, 
  public modalCtrl: ModalController,
  public viewCtrl: ViewController,
  public navParams: NavParams) {
   
  }
  SignOut(){
  localStorage.removeItem('user-token');
   let modal = this.modalCtrl.create(LoginPage);
    modal.present();
  }
   dismiss() {
        this.viewCtrl.dismiss();
    }

}
