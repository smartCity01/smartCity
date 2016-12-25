import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar, Splashscreen } from 'ionic-native';

import { LocationsPage } from '../pages/locations/locations';
import { ListPage } from '../pages/list/list';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = LocationsPage;
  pages: Array<{ title: string, component: any }>;
  tab1: any;
  tab2: any;
  tab3: any;
  notification: number = 3;
  constructor(
    public platform: Platform,
    public menu: MenuController
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Hello Ionic', component: LocationsPage },
      { title: 'My First List', component: ListPage }
    ];
    this.tab1 = this.pages[1].component;
    this.tab2 = this.pages[0].component;
    this.tab3 = this.pages[0].component;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

}
