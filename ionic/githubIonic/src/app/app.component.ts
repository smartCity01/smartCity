import { LoginPage } from './../pages/login/login';
import { AccountService } from './../util/account.service';
import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav, ModalController } from 'ionic-angular';

import { StatusBar, Splashscreen, SecureStorage } from 'ionic-native';

import { LocationsPage } from '../pages/locations/locations';
import { ListPage } from '../pages/list/list';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  secureStorage: SecureStorage;
  pages: Array<{ component: any }>;
  tab1: any;
  tab2: any;
  tab3: any;
  notification: number = 3;
  accountService: AccountService;
  constructor(
    public platform: Platform,
    public menu: MenuController,
    public modalCtrl: ModalController
  ) {
    this.initializeApp();
    this.secureStorage = new SecureStorage();
    this.accountService = new AccountService(this.secureStorage);
    this.displayLoginPageIfApplicable();

    this.pages = [
      { component: LocationsPage },
      { component: ListPage }
    ];
    this.tab1 = this.pages[1].component;
    this.tab2 = this.pages[0].component;
    this.tab3 = this.pages[0].component;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.secureStorage.create('my_store')
        .then(
        () => console.log('Storage is ready!'),
        error => console.log(error)
        );
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  displayLoginPageIfApplicable() {
    if (!this.accountService.isLoggedIn()) {
      let modal = this.modalCtrl.create(LoginPage);
      modal.present();
    }
  }

}
