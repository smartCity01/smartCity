import { EventDetailsPage } from './../event-details/event-details';
import { Event } from './../../model/event';
import { UserService } from './../../services/users.service';
import { User } from './../../model/user';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  currentUser: User;
  items: Array<{ title: string, note: string, icon: String}>;
   icons: string[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
     var text=localStorage.getItem('currentUser');
       this.currentUser = JSON.parse(text);

this.icons = ['flask', 'wifi', 'paper-plane',
      'american-football', 'boat', 'bluetooth', 'build'];

       this.items = [];
    for (let i = 1; i < 6; i++) {
      this.items.push({
        title: 'event ' + i,
        note: 'see event ' + i + ' details',
         icon: this.icons[Math.floor(Math.random() * this.icons.length)]
             });
    }
    }
  
 Selected(item) {
    this.navCtrl.push(EventDetailsPage, {
      item: item
    });
  }

}
