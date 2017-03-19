import { NewEventPage } from './../new-event/new-event';
import { Component } from '@angular/core';

import { NavController, NavParams, ModalController } from 'ionic-angular';

import { EventDetailsPage } from '../event-details/event-details';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{ title: string, note: string, icon: string }>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
      'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 1; i < 22; i++) {
      this.items.push({
        title: 'event ' + i,
        note: 'This is event #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, item) {
    this.navCtrl.push(EventDetailsPage, {
      item: item
    });
  }

  doRefresh(refresher) {
    console.log(this.items);
    this.items.push({
      title: 'event ' + (this.items.length + 1),
      note: 'This is event #' + (this.items.length + 1),
      icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    });

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  createNewEvent(){
     let modal = this.modalCtrl.create(NewEventPage);
        modal.present();
  }
}
