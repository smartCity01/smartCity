import { LoginPage } from './../pages/login/login';
import { AccountService } from './../util/account.service';
import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav, ModalController } from 'ionic-angular';

import { StatusBar, Splashscreen, SecureStorage } from 'ionic-native';

import { LocationsPage } from '../pages/locations/locations';
import { ListPage } from '../pages/list/list';
import { ProfilePage } from '../pages/profile/profile';

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
  tab4: any;
  notification: number = 3;
  accountService: AccountService;
  mode = 'Observable'; //T
  constructor(
    public platform: Platform,
    public menu: MenuController,
    public modalCtrl: ModalController
  ) {
    this.initializeApp();
    this.secureStorage = new SecureStorage();
    this.accountService = new AccountService();
    this.displayLoginPageIfApplicable();

    this.pages = [
      { component: LocationsPage },
      { component: ListPage },
      { component:  ProfilePage}
    ];
    this.tab1 = this.pages[1].component;
    this.tab2 = this.pages[0].component;
    this.tab3 = this.pages[0].component;
    this.tab4 = this.pages[2].component;
  }

  initializeApp() {
    this.platform.ready().then(() => {
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
